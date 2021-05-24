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
      :header="tableHeaderBig">
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="patientUserName"
        label="用户姓名">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="leaveCount"
        label="用户留言数">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="leaveTime"
        label="最近留言时间">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.leaveTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="doctorUserName"
        label="医生姓名">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="replyCount"
        label="医生回复数">
      </el-table-column>、
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="replyTime"
        label="最近回复时间">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.replyTime)}}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="220">
        <template>
          <!-- @click="editBtn(scope.row)" -->
          <el-button size="mini"
            type="primary">查看</el-button>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 分页 -->
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="el-pagination-style"></el-pagination>
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="110px">
        <el-form-item label="医院名称"
          prop="name">
          <el-input v-model="editAddForm.name"
            placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="医院电话"
          prop="contract">
          <el-input v-model="editAddForm.contract"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入医院电话"></el-input>
        </el-form-item>
        <el-form-item label="医院地址"
          prop="address">
          <el-input v-model="editAddForm.address"
            placeholder="请输入医院地址"></el-input>
        </el-form-item>
        <el-form-item label="管理员手机号"
          prop="adminPhone">
          <el-input v-if="this.infoTitle === '新增'"
            v-model="editAddForm.adminPhone"
            placeholder="请输入管理员手机号"></el-input>
          <el-input v-else
            disabled
            v-model="editAddForm.adminPhone"></el-input>
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
import EleTable from "@/components/Table";
import { validatePhone, parseTime } from "@/utils/index";
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
        adminPhone: [
          { required: true, trigger: "blur", validator: validatePhone },
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
      // 增改表单
      editAddForm: {
        fromUserName: "",
        contract: "",
        address: "",
      },
      // 表格数据
      tableHeaderBig: [{ type: "index", label: "序号" }],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 日期控件选择事件
    selectLeaveTime(val) {
      console.log(val);
    },
    selectReplyTime(val) {
      console.log(val);
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
    /***** CRUD *****/
    // 新增
    add() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    // 编辑
    editBtn(val) {
      console.log(val);
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
    },
    // 删除多个
    deleteMultiple() {},
    // 删除单个
    async deleteBtn(id) {
      const confirmResult = await this.$confirm(
        "你确定要执行此操作, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => console.log(err));
      if (confirmResult != "confirm") {
        return this.$message.info("取消删除");
      }
      // 发送请求
      httpAdminChat.deleteChat(id).then((res) => {
        if (res.code != "OK") {
          return;
        } else {
          this.$notify.success({
            title: "删除成功",
          });
        }
        this.getList();
      });
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === "新增") {
            // 发送请求
            httpAdminChat.postChat(this.editAddForm).then((res) => {
              if (res.code != "OK") {
                return;
              } else {
                this.$notify.success({
                  title: "新增成功",
                });
                this.getList();
                this.editDialogVisible = false;
              }
            });
          } else {
            // 发送请求
            httpAdminChat.putChat(this.editAddForm).then((res) => {
              if (res.code != "OK") {
                return;
              } else {
                this.$notify.success({
                  title: "编辑成功",
                });
                this.getList();
                this.editDialogVisible = false;
              }
            });
          }
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

<style>
</style>