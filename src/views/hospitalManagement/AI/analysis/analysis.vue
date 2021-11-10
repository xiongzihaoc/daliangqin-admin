<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医院名称"
          align="left"
          prop="title">
          <el-select class="w100"
            size="small"
            v-model="searchForm.hospitalId">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-select multiple
            collapse-tags
            v-model="searchForm.aiNameList"
            size="small"
            filterable
            value-key="aiName"
            placeholder="请选择任务名称(必填)">
            <el-option v-for="item in aiTaskList"
              :key="item.aiName"
              :label="item.aiName"
              :value="item.aiName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期名">
          <el-select v-model="searchForm.taskStage"
            size="small"
            filterable
            value-key="taskStage"
            placeholder="请选择期名">
            <el-option v-for="item in aiPeriodsList"
              :key="item.taskStage"
              :label="item.taskStage"
              :value="item.taskStage"></el-option>
          </el-select>
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
    <!-- 数字展示 -->
    <div class="show-card">
      <el-card class="box-card"
        v-for="(item, index) in outboundList"
        :key="index">
        <div class="title">
          <span>{{ item.title }}</span>
          <el-tooltip class="item"
            effect="dark"
            :content="item.hint"
            placement="top">
            <i style="margin: 0 5px"
              class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <p class="title">{{ item.ratio }}</p>
        <span>{{ item.minuteNumber }}</span>
      </el-card>
    </div>
    <!-- 图表区域 -->
    <div class="chart-box">
      <!-- 外呼数据 -->
      <div class="chart">
        <Print :listData="listData" />
      </div>
      <!-- 通话状态 -->
      <div class="chart">
        <Callstate :listData="listData" />
      </div>
      <!-- 通话时长(s) -->
      <div class="chart">
        <!-- <Outbound /> -->
        <Calltimes :listData="listData" />
      </div>
      <!-- 通话时长(用户数量) -->
      <div class="chart">
        <Timequantum :listData="listData" />
      </div>
      <!-- 对话轮次 -->
      <div class="chart">
        <Dialog :listData="listData" />
      </div>
      <!-- 接听率 -->
      <div class="chart">
        <Audience :listData="listData" />
      </div>
    </div>
  </div>
</template>

<script>
import Print from './chart/print'
import Callstate from './chart/callstate'
import Calltimes from './chart/calltimes'
import Timequantum from './chart/calltimequantum'
import Dialog from './chart/dialog'
import Audience from './chart/audience'

import { httpAdminAiHistory } from '@/api/admin/httpAdminAiHistory'
import { httpAdminAiAnalysis } from '@/api/admin/httpAdminAiAnalysis'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { formatSeconds } from '@/utils/index'
export default {
  components: { Print, Callstate, Calltimes, Timequantum, Dialog, Audience },
  data() {
    return {
      formatSeconds,
      hospitalList: [], // 医院列表
      outboundList: [], // 外呼列表
      chartList: [], // 图表数据
      listData: {}, // 全图表数据
      searchForm: {
        hospitalId: '',
        aiNameList: [],
        taskStage: '',
      },
      // 任务名称与期数
      aiTaskList: [],
      aiPeriodsList: [],
      getSearchForm: {
        getTaskStage: '',
        selectTaskStage: '',
        callDuration: '',
      },
    }
  },
  async created() {
    // this.searchForm.robotCallJobIds = this.$route.params.id
    this.searchForm.hospitalId = sessionStorage.getItem('taskHospitalId')
    this.searchForm.taskStage = sessionStorage.getItem('taskStage')
    let aiName = sessionStorage.getItem('taskAiName')
    const { data: res } = await this.getAiTaskNameList()
    this.aiTaskList = res
    if (aiName) {
      this.searchForm.aiNameList = [aiName]
    } else {
      this.searchForm.aiNameList = [res[0].aiName]
    }
    this.getJobStats()
  },
  mounted() {
    this.getHospitalList()
    this.getAiStageList()
  },
  beforeDestroy() {
    this.removeSession()
  },
  methods: {
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospitalAll({ pageSize: -1 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 获取图表数据
    getJobStats() {
      httpAdminAiAnalysis.getJobStats(this.searchForm).then((res) => {
        let outboundList = res.data.aiHistoryStatisticalVO
        this.listData = res.data
        this.outboundList = [
          {
            title: '总外呼人数',
            ratio: `${
              outboundList.peopleNumber ? outboundList.peopleNumber : '0'
            }位`,
            hint: '总的外呼人数',
          },
          {
            title: '任务时长',
            ratio: `${
              outboundList.taskTime
                ? formatSeconds(outboundList.taskTime)
                : '0秒'
            }`,
            hint: '任务完成时间-任务开始时间',
          },
          {
            title: '已接听率',
            ratio: `${
              outboundList.answerRate
                ? this.getDecimals(outboundList.answerRate)
                : '0'
            }%`,
            minuteNumber: `已接听人数${outboundList.answerNumber}位`,
            hint: '已接听人数/已呼人数',
          },
          {
            title: '未接听率',
            ratio: `${
              outboundList.noAnswerRate ? outboundList.noAnswerRate : '0'
            }%`,
            minuteNumber: `未接听人数${outboundList.noAnswerNumber}位`,
            hint: '未接听人数/已呼人数',
          },
          {
            title: '挂机率',
            ratio: `${
              outboundList.hangupRate ? outboundList.hangupRate : '0'
            }%`,
            minuteNumber: `挂机人数${outboundList.hangupNumber}位`,
            hint: '接听且通话轮次未达到两轮的人数/已接听人数',
          },
          {
            title: '总通话时长',
            ratio: `${
              outboundList.sumTalkTime
                ? formatSeconds(outboundList.sumTalkTime)
                : '0'
            }`,
            minuteNumber: `平均通话时长${
              outboundList.avgTalkTime
                ? formatSeconds(outboundList.avgTalkTime)
                : '0秒'
            }`,
            hint: '通话时长总和/接听总量',
          },
        ]
      })
    },
    /**
     * 接口 任务与期数
     */
    getAiStageList() {
      httpAdminAiHistory.getAiStageList().then((res) => {
        this.aiPeriodsList = res.data
      })
    },
    async getAiTaskNameList() {
      let res = await httpAdminAiHistory.getAiTaskNameList()
      return res
    },
    /**
     * 已接听整数补零
     */
    getDecimals(val) {
      if (val.toString().length == 2) {
        val = val + '.00'
      }
      return val
    },
    /**
     * 清除缓存
     */
    removeSession() {
      sessionStorage.removeItem('taskHospitalId')
      sessionStorage.removeItem('taskAiName')
      sessionStorage.removeItem('taskStage')
    },
    /**
     * 搜索
     */
    searchBtn() {
      let hospitalId = this.searchForm.hospitalId
      let aiNameList = this.searchForm.aiNameList
      let taskStage = this.searchForm.taskStage
      if (!hospitalId && !taskStage) {
        if (!aiNameList || aiNameList.length == 0) {
          this.outboundList = []
          this.$message.error('请选择任务名称')
          return
        }
      }
      this.getJobStats()
    },
    // 重置
    async searchReset() {
      this.removeSession()
      this.$set(this, 'searchForm', {})
      this.$set(this, 'getSearchForm', {})
      this.$set(this, 'aiTaskList', [])
      this.getAiStageList()
      this.outboundList = []
      const { data: res } = await this.getAiTaskNameList()
      this.searchForm.aiNameList = [res[0].aiName]
      this.aiTaskList = res
      this.getJobStats()
    },
  },
}
</script>

<style lang="scss" scoped>
.show-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  .box-card {
    min-width: 180px;
    min-height: 130px;
  }
}
.chart-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  // grid-template-columns: repeat(2, 45%);
}
</style>
