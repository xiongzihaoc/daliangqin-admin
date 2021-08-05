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
            format="yyyy-MM-dd HH:mm"
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
            format="yyyy-MM-dd HH:mm"
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
      <div class="chat-content">
        <!-- 聊天记录数组-->
        <div v-for="(item,index) in messageList"
          :key="index">
          <!-- 对方 -->
          <div class="word"
            v-if="!item.isSelf">
            <img :src="toInfo.avatarUrl">
            <div class="info">
              <p class="time">{{toInfo.userName}} {{parseTime(item.createTime)}}</p>
              <div class="info-content">{{item.leaveContent}}</div>
            </div>
          </div>
          <!-- 我的 -->
          <div class="word-my"
            v-else>
            <div class="info">
              <p class="time">{{selfInfo.userName}} {{parseTime(item.createTime)}}</p>
              <div class="info-content">{{item.leaveContent}}</div>
            </div>
            <img :src="selfInfo.avatarUrl">
          </div>
        </div>
      </div>
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
import EleTable from '@/components/Untable'
import { parseTime } from '@/utils/index'
import { httpAdminChat } from '@/api/admin/httpAdminChat'
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
          { required: true, trigger: 'blur', message: '请输入回复内容' },
        ],
      },
      // 搜索表单
      searchForm: {
        fromUserName: '',
        toUserName: '',
        leaveStartTime: '',
        leaveEndTime: '',
        replyStartTime: '',
        replayEndTime: '',
      },
      // 列表数据
      list: [],
      // 消息列表
      messageList: [],
      // 增改表单
      editAddForm: {
        contentType: 'TEXT',
        doctorUserId: '',
        leaveContent: '',
        isSelf: true,
        patientUserId: '',
      },
      selfInfo: {},
      toInfo: {},
      // 表格数据
      tableHeaderBig: [
        { type: 'index', label: '序号' },
        { prop: 'patientUserName', label: '用户姓名' },
        { prop: 'patientPhone', label: '用户手机号' },
        { prop: 'leaveCount', label: '用户留言数' },
        {
          prop: 'leaveTime',
          label: '最近留言时间',
          formatter: (row) => {
            return parseTime(row.leaveTime)
          },
        },
        { prop: 'doctorUserName', label: '医生姓名' },
        { prop: 'doctorPhone', label: '医生手机号' },
        { prop: 'replyCount', label: '医生回复数' },
        {
          prop: 'replyTime',
          label: '最近回复时间',
          formatter: (row) => {
            return parseTime(row.replyTime)
          },
        },
      ],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 聊天记录分页
      chatPageNum: 1,
      chatPageSize: 20000,
      //   弹框区域
      editDialogVisible: false,
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.scrollToBottom()
  },
  updated() {
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('.chat-content')
        container.scrollTop = container.scrollHeight
      })
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
          console.log(res)
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    getChatSubscribe(val) {
      httpAdminChat
        .getChatSubscribe({
          page: this.chatPageNum,
          pageSize: this.chatPageSize,
          sessionId: val.sessionId,
          doctorUserId: val.doctorUserId,
        })
        .then((res) => {
          this.messageList = res.data.elements.reverse()
          this.selfInfo = res.data.expand.selfInfo
          this.toInfo = res.data.expand.toInfo
        })
    },
    // 日期控件选择事件
    selectLeaveTime(val) {
      this.searchForm.leaveStartTime = val[0]
      this.searchForm.leaveEndTime = val[1]
    },
    selectReplyTime(val) {
      this.searchForm.replyStartTime = val[0]
      this.searchForm.replayEndTime = val[1]
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {}
      this.getList()
    },
    /***** 增删改 *****/
    // 查看
    examineBtn(val) {
      this.val = val
      this.getChatSubscribe(val)
      this.editAddForm.doctorUserId = val.doctorUserId
      this.editAddForm.patientUserId = val.patientUserId
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    // 发送消息
    editPageEnter() {
      let currentTime = new Date().getTime()
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 发送请求
          httpAdminChat
            .postChat({
              contentType: 'TEXT',
              createTime: currentTime,
              leaveContent: this.editAddForm.leaveContent,
              doctorUserId: this.editAddForm.doctorUserId,
              isSelf: true,
              patientUserId: this.editAddForm.patientUserId,
            })
            .then((res) => {
              if (res.code === 'OK') {
                this.messageList.push({
                  contentType: 'TEXT',
                  createTime: currentTime,
                  leaveContent: this.editAddForm.leaveContent,
                  doctorUserId: this.editAddForm.doctorUserId,
                  isSelf: true,
                  patientUserId: this.editAddForm.patientUserId,
                })
                this.editAddForm.leaveContent = ''
                this.getList()
              }
            })
        }
      })
    },
    /***** 分页 *****/
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-content {
  width: 100%;
  height: 600px;
  overflow-y: scroll;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  .word {
    display: flex;
    margin-bottom: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info {
      margin-left: 10px;
      .time {
        font-size: 12px;
        color: rgba(51, 51, 51, 0.8);
        margin: 0;
        height: 20px;
        line-height: 20px;
        margin-top: -5px;
      }
      .info-content {
        max-width: 70%;
        padding: 10px;
        font-size: 14px;
        float: left;
        margin-right: 10px;
        position: relative;
        left: 0;
        margin-top: 8px;
        background: #fff;
        color: #000;
        border-radius: 5px;
      }
      //小三角形
      .info-content::before {
        position: absolute;
        left: -8px;
        top: 8px;
        content: '';
        border-right: 10px solid #fff;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }

  .word-my {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info {
      width: 90%;
      margin-left: 10px;
      text-align: right;
      .time {
        font-size: 12px;
        color: rgba(51, 51, 51, 0.8);
        margin: 0;
        height: 20px;
        line-height: 20px;
        margin-top: -5px;
        margin-right: 10px;
      }
      .info-content {
        max-width: 70%;
        padding: 10px;
        font-size: 14px;
        float: right;
        margin-right: 10px;
        position: relative;
        margin-top: 8px;
        background: #425c5a;
        color: #fff;
        border-radius: 5px;
        text-align: left;
      }
      .info-content::after {
        position: absolute;
        right: -8px;
        top: 8px;
        content: '';
        border-left: 10px solid #425c5a;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }
}
</style>