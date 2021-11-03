<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form :model="searchForm" class="searchForm" :inline="true">
        <el-form-item label="用户姓名">
          <el-input
            v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入用户姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input
            v-model="searchForm.calledPhoneNumber"
            maxlength="11"
            size="small"
            placeholder="请输入用户手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院名称">
          <el-select
            v-model="searchForm.hospitalId"
            size="small"
            filterable
            placeholder="请选择医院"
          >
            <el-option
              v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务">
          <el-select
            v-model="getSearchForm.getTaskStage"
            size="small"
            filterable
            value-key="name"
            placeholder="请选择任务"
            @change="selectTaskStage"
          >
            <el-option
              v-for="item in taskStage"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务或期名">
          <el-select
            v-model="getSearchForm.selectTaskStage"
            size="small"
            filterable
            value-key="text"
            placeholder="请选择任务名称与期名"
            @change="getTaskStage"
          >
            <el-option
              v-for="item in aiTaskList"
              :key="item.text"
              :label="item.text"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="呼叫时间">
          <el-date-picker
            v-model="getSearchForm.callDuration"
            format="yyyy-MM-dd HH:mm"
            value-format="timestamp"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            @change="getSearchFormTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="通话状态">
          <el-select
            v-model="searchForm.resultStatus"
            size="small"
            filterable
            placeholder="通话状态"
          >
            <el-option
              v-for="item in AiResultStatus"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="searchBtn"
            type="primary"
            size="small"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            @click="searchReset"
            size="small"
            plain
            icon="el-icon-refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <EleTable
      :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        align="center"
        label="序号"
        type="index"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医院名称"
        prop="hospitalName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户姓名"
        prop="patientUserName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户手机号"
        prop="calledPhoneNumber"
      ></el-table-column>
      <el-table-column
        align="center"
        label="任务名称"
        prop="aiName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="BOT名称"
        prop="dialogFlowName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="期名"
        prop="taskStage"
      ></el-table-column>
      <el-table-column align="center" label="通话时长" prop="chatDuration">
        <template slot-scope="scope">
          <span>{{ formatSeconds(scope.row.chatDuration) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="对话轮次"
        prop="chatRound"
      ></el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="呼叫时间"
        prop="callStartTime"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.callStartTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="通话状态"
        prop="resultStatus"
        :formatter="phoneState"
      ></el-table-column>
      <el-table-column
        align="center"
        label="挂断状态"
        prop="hangupBy"
        :formatter="hangupState"
      ></el-table-column>
      <el-table-column align="center" label="通话详情" prop="hospitalName">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="getAlCallDetailList(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </EleTable>
    <!-- 弹出层 -->
    <el-dialog title="通话详情" :visible.sync="dialogVisible" width="50%">
      <div class="chat">
        <div class="flex-bet">
          <div>
            <p>{{ telephoneMessage.uname }} - {{ telephoneMessage.phone }}</p>
            <p>
              通话ID：{{ telephoneMessage.callRecordId }} 通话时长：{{
                formatSeconds(telephoneMessage.chatDuration)
              }}
            </p>
          </div>
          <div>
            <audio autoplay="autoplay" controls="controls" ref="audio">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        <div class="chat-content">
          <!-- 聊天记录数组-->
          <div v-for="(item, index) in messageList" :key="index">
            <!-- 对方 -->
            <div class="word" v-if="!item.isSelf">
              <!-- 如果头像不为空 -->
              <img v-if="toInfo.avatarUrl != ''" :src="toInfo.avatarUrl" />
              <img
                v-else
                src="http://cdn.daliangqing.com/patient/%E6%BE%B6%E6%9D%91%E5%84%9A2.png"
              />
              <div class="info">
                <p class="time">{{ toInfo.userName }} {{ item.createTime }}</p>
                <div class="info-content">{{ item.leaveContent }}</div>
              </div>
            </div>
            <!-- 我的 -->
            <div class="word-my" v-else>
              <div class="info">
                <p class="time">Ai机器人 {{ item.createTime }}</p>
                <div class="info-content">{{ item.leaveContent }}</div>
              </div>
              <img
                src="http://cdn.daliangqing.com/patient/%E6%BE%B6%E6%9D%91%E5%84%9A2.png"
              />
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EleTable from '@/components/Table'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminAiHistory } from '@/api/admin/httpAdminAiHistory'
import { httpAdminAiCall } from '@/api/admin/httpAdminAiCall'

import {
  parseTime,
  formatSeconds,
  AiResultStatus,
  formatterElement,
} from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      formatSeconds,
      AiResultStatus,
      value: '',
      src: '', // 语音播放路径
      searchForm: {},
      getSearchForm: {
        getTaskStage: '',
        selectTaskStage: '',
        callDuration: '',
      },
      telephoneMessage: {},
      selfInfo: {},
      toInfo: {},
      taskStage: [
        { id: 'robotCallJobId', name: '任务' },
        { id: 'taskStage', name: '期名' },
      ],
      hospitalList: [],
      list: [],
      messageList: [],
      tableHeaderBig: [],
      aiTaskList: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹出层
      dialogVisible: false,
    }
  },
  created() {
    this.getHospitalList()
    this.getList()
  },
  mounted() {},
  methods: {
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    getList() {
      let data = Object.assign(this.searchForm, { page: this.pageNum, pageSize: this.pageSize, })
      httpAdminAiHistory.getAiHistoryList(data).then((res) => {
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    // 聊天详情
    getAlCallDetailList(val) {
      httpAdminAiCall
        .getAlCallDetailList({
          callRecordId: val.callRecordId,
          phone: val.calledPhoneNumber,
        })
        .then((res) => {
          this.chatList = []
          this.messageList = []
          let callDetailList = JSON.parse(res.data.thirdJson)
          let uname = callDetailList.data.customerPersonName
          this.telephoneMessage.uname = uname
          this.telephoneMessage.phone = callDetailList.data.calledPhoneNumber
          this.telephoneMessage.callRecordId = callDetailList.data.callRecordId
          this.telephoneMessage.chatDuration = callDetailList.data.chatDuration
          this.toInfo.userName = callDetailList.data.customerPersonName
          this.toInfo.avatarUrl = res.data.avatarUrl
          callDetailList.data.callDetailList.forEach((val) => {
            this.messageList.push({
              createTime: val.startTime,
              isSelf: val.type === 'ROBOT' ? true : false,
              leaveContent: val.text,
            })
          })
          this.handlePlay(callDetailList.data)
          this.dialogVisible = true
        })
    },
    getAiStageList() {
      httpAdminAiHistory.getAiStageList().then((res) => {
        this.aiTaskList = []
        res.data.forEach((val) => {
          this.aiTaskList.push({ text: val.taskStage })
        })
      })
    },
    getAiTaskNameList() {
      httpAdminAiHistory.getAiTaskNameList().then((res) => {
        this.aiTaskList = []
        res.data.forEach((val) => {
          this.aiTaskList.push({
            text: val.aiName,
            robotCallJobId: val.robotCallJobId,
          })
        })
      })
    },
    /**
     * 任务与期数选择
     */
    selectTaskStage(val) {
      this.$set(this.getSearchForm, 'selectTaskStage', '')
      if (val === 'robotCallJobId') {
        this.getAiTaskNameList()
      } else {
        this.getAiStageList()
      }
    },
    getTaskStage(val) {
      if (this.getSearchForm.getTaskStage === 'robotCallJobId') {
        this.$set(this.searchForm, 'taskStage', '')
        this.searchForm.robotCallJobId = val.robotCallJobId
      } else {
        this.$set(this.searchForm, 'robotCallJobId', '')
        this.searchForm.taskStage = val.text
      }
    },
    getSearchFormTime(val) {
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.getList()
    },
    searchReset() {
      this.$set(this, 'searchForm', {})
      this.$set(this, 'getSearchForm', {})
      this.$set(this, 'aiTaskList', [])
      this.getList()
    },
    /**
     * 播放语音
     */
    handlePlay(val) {
      setTimeout(() => {
        this.$refs.audio.src = val.fullAudioUrl
        this.$refs.audio.pause()
        this.$refs.audio.currentTime = 0
      }, 0)
    },
    stop() {
      this.$refs.audio.pause()
    },
    /**
     * 表格格式化
     */
    phoneState(row) {
      return formatterElement.phoneState[row.resultStatus]
    },
    hangupState(row) {
      return formatterElement.hangUpState[row.hangupBy]
    },
    /**
     * 分页
     */
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
.flex-bet {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
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
        max-width: 600px;
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
