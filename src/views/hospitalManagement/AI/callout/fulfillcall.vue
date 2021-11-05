<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form
        class="searchForm"
        ref="searchFormRef"
        :model="searchForm"
        :inline="true"
      >
        <el-form-item label="用户姓名">
          <el-input
            v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input
            v-model="searchForm.calledPhoneNumber"
            size="small"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="呼叫时间">
          <el-date-picker
            v-model="time"
            value-format="timestamp"
            format="yyyy-MM-dd HH:mm"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            @change="callTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="通话状态">
          <el-select
            v-model="searchForm.resultStatusList"
            multiple
            collapse-tags
            size="small"
            filterable
          >
            <el-option
              v-for="(item, index) in AiResultStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题名称">
          <el-select v-model="searchForm.problem" size="small" filterable>
            <el-option
              v-for="(item, index) in problemName"
              :key="index"
              :label="item.problem"
              :value="item.problem"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答案">
          <el-select v-model="searchForm.answer" size="small" filterable>
            <el-option
              v-for="(item, index) in problemState"
              :key="index"
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
          <el-button
            @click="exportExcel"
            type="success"
            size="small"
            plain
            icon="el-icon-upload2"
            >导出</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
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
        type="index"
        label="序号"
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
      <el-table-column align="center" label="呼叫时间" prop="callStartTime">
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
        :formatter="hangupByState"
      ></el-table-column>
      <el-table-column align="center" label="通话详情" prop="calledPhoneNumber">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="getAlCallDetailList(scope.row)"
            :disabled="disabledLookOver(scope.row.hangupBy)"
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
import { httpAdminAiCall } from '@/api/admin/httpAdminAiCall'
import {
  parseTime,
  formatSeconds,
  formatterElement,
  AiResultStatus,
  problemState,
} from '@/utils/index'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      formatSeconds,
      problemState,
      AiResultStatus,
      inputMsg: '',
      src: '', // 语音播放路径
      searchForm: {
        patientUserName: '',
        customerPersonName: '',
        robotCallJobId: '',
        startTime: '',
        endTime: '',
        hospitalId: '',
        answer: '',
        problem: '',
        resultStatusList: [],
      },
      telephoneMessage: {
        uname: '',
        phone: '',
        calltime: '',
        callRecordId: '',
        chatDuration: '',
      },
      selfInfo: {},
      toInfo: {},
      time: [],
      list: [],
      chatList: [],
      tableHeaderBig: [],
      messageList: [],
      problemName: [], // 问题名称
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      dialogVisible: false,
    }
  },
  created() {
    let taskPhoneState = JSON.parse(sessionStorage.getItem('taskPhoneState'))
    let taskHospitalId = sessionStorage.getItem('taskHospitalId')
    let problem = sessionStorage.getItem('problemName')
    let problemState = sessionStorage.getItem('problemState')
    if (taskPhoneState) {
      this.searchForm.resultStatusList = taskPhoneState
    }
    if (taskHospitalId) {
      this.searchForm.hospitalId = taskHospitalId
    }
    if (problem) {
      this.searchForm.problem = problem
    }
    if (problemState) {
      this.searchForm.answer = problemState
    }

    this.searchForm.robotCallJobId = this.$route.query.robotCallJobId
    this.getProblemList()
    this.getList()
  },
  beforeDestroy() {
    sessionStorage.removeItem('taskPhoneState')
    sessionStorage.removeItem('taskHospitalId')
    sessionStorage.removeItem('problemName')
    sessionStorage.removeItem('problemState')
  },
  methods: {
    /**
     * 列表
     */
    getList() {
      let list = Object.assign(this.searchForm, {
        page: this.pageNum,
        pageSize: this.pageSize,
      })
      httpAdminAiCall.getAlreadyStatisticsList(list).then((res) => {
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
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
    getProblemList() {
      httpAdminAiCall
        .getProblemList({ robotCallJobId: this.searchForm.robotCallJobId })
        .then((res) => {
          this.problemName = res.data
        })
    },
    /**
     * 查看按钮 状态
     */
    disabledLookOver(state) {
      if (state === '' || state === null) {
        return true
      } else {
        return false
      }
    },
    /**
     * 选择时间
     */
    callTime(val) {
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
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
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    searchReset() {
      this.$set(this, 'searchForm', {})
      this.$set(this, 'time', [])
      this.searchForm.robotCallJobId = this.$route.query.robotCallJobId
      this.searchForm.hospitalId = sessionStorage.getItem('hospitalId')
      sessionStorage.removeItem('taskPhoneState')
      sessionStorage.removeItem('taskHospitalId')
      sessionStorage.removeItem('problemName')
      sessionStorage.removeItem('problemState')
      this.getList()
    },
    /**
     * 导出excel
     */
    exportExcel() {
      if (this.total <= 3000) {
        this.$confirm(
          '确定要导出当前<strong>' + this.total + '</strong>条数据？',
          '提示',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }
        )
          .then(() => {
            this.getExpportData()
          })
          .catch(() => {})
      } else {
        this.$confirm(
          '当前要导出的<strong>' +
            this.total +
            '</strong>条数据，数据量过大，不能一次导出！<br/>建议分时间段导出所需数据。',
          '提示',
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
          }
        )
          .then(() => {})
          .catch(() => {})
      }
    },
    // 对导出数据格式处理
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    getExpportData() {
      const loading = this.$loading({
        lock: true,
        text: '正在导出，请稍等......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      httpAdminAiCall.getAlreadyStatisticsList(this.searchForm).then(
        (res) => {
          let handleDataList = res.data.elements
          handleDataList.forEach((item) => {
            if (item.chatDuration) {
              item.chatDuration = formatSeconds(item.chatDuration)
            }
            if (item.callStartTime) {
              item.callStartTime = parseTime(item.callStartTime)
            }
            switch (item.resultStatus) {
              case 'ANSWERED':
                item.resultStatus = '已接听'
                break
              case 'NO_ANSWER':
                item.resultStatus = '无应答'
                break
              case 'BUSY':
                item.resultStatus = '忙线中'
                break
              case 'POWER_OFF':
                item.resultStatus = '关机'
                break
              case 'OUT_OF_SERVICE':
                item.resultStatus = '停机'
                break
              case 'REFUSED':
                item.resultStatus = '拒接'
                break
              case 'VACANT_NUMBER':
                item.resultStatus = '空号'
                break
              case 'CAN_NOT_CONNECT':
                item.resultStatus = '无法接通'
                break
              case 'FROM_PHONE_ERROR':
                item.resultStatus = '主叫欠费'
                break
              case 'SYSTEM_ERROR':
                item.resultStatus = '外呼失败'
                break
              case 'CALL_LOSS':
                item.resultStatus = '转人工呼损'
                break
            }
            switch (item.hangupBy) {
              case 'REMOTE_HANGUP':
                item.hangupBy = '客户挂断'
                break
              case 'INITIAL_HANGUP':
                item.hangupBy = 'AI挂断'
                break
              case 'CS_HANGUP':
                item.hangupBy = '人工坐席挂断'
                break
              case 'OTHER_HANGUP':
                item.hangupBy = '未知原因'
                break
            }
          })
          if (handleDataList.length > 0) {
            require.ensure([], () => {
              const {
                export_json_to_excel,
              } = require('@/utils/vendor/Export2Excel')
              // 导出的表头
              const tHeader = [
                '用户名',
                '用户手机号',
                '通话时长',
                '对话轮次',
                '呼叫时间',
                '通话状态',
                '挂断状态',
              ]
              // 导出表头要对应的数据
              const filterVal = [
                'patientUserName',
                'calledPhoneNumber',
                'chatDuration',
                'chatRound',
                'callStartTime',
                'resultStatus',
                'hangupBy',
              ]
              const data = this.formatJson(filterVal, handleDataList)
              export_json_to_excel(tHeader, data, '已呼用户列表')
            })
          } else {
            this.$message({
              message: '数据出錯，请稍后重试',
              duration: 2000,
              type: 'warning',
            })
          }
          loading.close()
        },
        (error) => {
          console.log(error)
          loading.close()
        }
      )
    },
    /**
     * 表格格式化
     */
    phoneState(row) {
      return formatterElement.phoneState[row.resultStatus]
    },
    hangupByState(row) {
      return formatterElement.hangUpState[row.hangupBy]
    },
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
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
