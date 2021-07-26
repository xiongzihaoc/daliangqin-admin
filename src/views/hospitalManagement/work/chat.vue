<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="用户姓名"
          prop="patientUserName">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号"
          prop="patientPhone">
          <el-input v-model="searchForm.patientPhone"
            size="small"
            placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="留言时间"
          prop="leaveTime">
          <el-date-picker v-model="searchForm.leaveTime"
            size="small"
            type="datetimerange"
            @change="selectLeaveTime"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="医生姓名"
          prop="doctorUserName">
          <el-input v-model="searchForm.doctorUserName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生手机号"
          prop="doctorPhone">
          <el-input v-model="searchForm.doctorPhone"
            size="small"
            placeholder="请输入医生手机号"></el-input>
        </el-form-item>
        <el-form-item label="回复时间"
          prop="replyTime">
          <el-date-picker v-model="searchForm.replyTime"
            size="small"
            type="datetimerange"
            @change="selectReplyTime"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBtn"
            type="primary"
            size="small"
            icon="el-icon-search">搜索</el-button>
          <el-button @click="searchReset"
            size="small"
            plain
            icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="examineBtn(scope.row)"
            type="primary">查看</el-button>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 增改页面 -->
    <el-dialog title="查看"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <ul class="ul"
        style="height:500px;overflow:auto;padding:15px;box-sizing:border-box;background:#f5f5f5">
        <li v-for="item in messageList"
          :key="item.id">
          <!-- 病人信息 -->
          <div v-if="!item.isSelf"
            style="display:flex">
            <div style="display:flex;">
              <img style="width:64px;height:64px;border-radius:50%;"
                :src="toInfo.avatarUrl">
            </div>
            <div style="padding-left:10px;margin-bottom:15px;">
              <div>{{toInfo.userName}}</div>
              <div style="margin:5px 0;">{{parseTime(item.createTime).slice(6)}}</div>
              <div style="color:#000;background:#fff;max-width:300px;border-radius:5px;padding:10px;box-sizing:border-box;">{{item.leaveContent}}</div>
            </div>
          </div>
          <!-- 医生信息 -->
          <div v-else
            style="display:flex;justify-content: flex-end;">
            <div style="padding-right:10px;margin-bottom:15px;">
              <div style="text-align:right">{{selfInfo.userName}}</div>
              <div style="text-align:right;margin:5px 0;">{{parseTime(item.createTime).slice(6)}}</div>
              <div style="color:#fff;background:#405C59;max-width:300px;border-radius:5px;padding:10px;box-sizing:border-box;">{{item.leaveContent}}</div>
            </div>
            <div>
              <img style="width:64px;height:64px;border-radius:50%;"
                :src="selfInfo.avatarUrl"
                alt="">
            </div>
          </div>
        </li>
      </ul>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm">
        <el-form-item prop="leaveContent">
          <el-input type="textarea"
            :rows="5"
            v-model="editAddForm.leaveContent"
            size="small"
            placeholder="请输入回复内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from "@/components/Untable";
import { parseTime } from "@/utils/index";
import { httpAdminChat } from "@/api/admin/httpAdminChat";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      // 表单验证规则
      FormRules: {
        leaveContent: [
          { required: true, trigger: "blur", message: "请输入回复内容" },
        ],
      },
      // 搜索表单
      searchForm: {
        fromUserName: "",
        toUserName: "",
        leaveStartTime: "",
        leaveEndTime: "",
        replyStartTime: "",
        replayEndTime: "",
      },
      // 列表数据
      list: [],
      // 消息列表
      messageList: [],
      // 增改表单
      editAddForm: {
        contentType: "TEXT",
        doctorUserId: "",
        leaveContent: "",
        patientUserId: "",
      },
      selfInfo: {},
      toInfo: {},
      // 表格数据
      tableHeaderBig: [
        { type: "index", label: "序号" },
        { prop: "patientUserName", label: "用户姓名" },
        { prop: "patientPhone", label: "用户手机号" },
        { prop: "leaveCount", label: "用户留言数" },
        {
          prop: "leaveTime",
          label: "最近留言时间",
          formatter: (row) => {
            return parseTime(row.leaveTime);
          },
        },
        { prop: "doctorUserName", label: "医生姓名" },
        { prop: "doctorPhone", label: "医生手机号" },
        { prop: "replyCount", label: "医生回复数" },
        {
          prop: "replyTime",
          label: "最近回复时间",
          formatter: (row) => {
            return parseTime(row.replyTime);
          },
        },
      ],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".ul");
        container.scrollTop = container.scrollHeight;
      });
    },
    getList() {
      httpAdminChat
        .getChat({
          page: this.pageNum,
          pageSize: this.pageSize,
          patientUserName: this.searchForm.patientUserName,
          doctorUserName: this.searchForm.doctorUserName,
          leaveStartTime: this.searchForm.leaveStartTime,
          leaveEndTime: this.searchForm.leaveEndTime,
          replyStartTime: this.searchForm.replyStartTime,
          replayEndTime: this.searchForm.replayEndTime,
          patientPhone: this.searchForm.patientPhone,
          doctorPhone: this.searchForm.doctorPhone,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    getChatSubscribe(val) {
      httpAdminChat
        .getChatSubscribe({
          sessionId: val.sessionId,
          doctorUserId: val.doctorUserId,
        })
        .then((res) => {
          this.messageList = res.data.elements.reverse();
          this.selfInfo = res.data.expand.selfInfo;
          this.toInfo = res.data.expand.toInfo;
        });
    },
    // 日期控件选择事件
    selectLeaveTime(val) {
      this.searchForm.leaveStartTime = val[0];
      this.searchForm.leaveEndTime = val[1];
    },
    selectReplyTime(val) {
      this.searchForm.replyStartTime = val[0];
      this.searchForm.replayEndTime = val[1];
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList();
    },
    // 重置
    searchReset() {
      this.searchForm = {};
      this.getList();
    },
    /***** 增删改 *****/
    // 查看
    examineBtn(val) {
      this.val = val;
      this.getChatSubscribe(val);
      this.editAddForm.doctorUserId = val.doctorUserId;
      this.editAddForm.patientUserId = val.patientUserId;
      this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 发送请求
          httpAdminChat.postChat(this.editAddForm).then((res) => {
            console.log(res);
            if (res.code === "OK") {
              this.editAddForm.leaveContent = "";
              this.getList();
              this.getChatSubscribe(this.val);
            }
          });
        }
      });
    },
    /***** 分页 *****/
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getList();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.getList();
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>