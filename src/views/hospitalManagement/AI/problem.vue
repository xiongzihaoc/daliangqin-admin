<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-button-group style="margin-bottom: 15px">
        <el-button size="small"
          :type="timebtn"
          @click="checkBtn('date')">按日期查看</el-button>
        <el-button size="small"
          :type="weekbtn"
          @click="checkBtn('stage')">按期名查看</el-button>
      </el-button-group>
      <el-form :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医院名称"
          align="left">
          <el-select v-model="searchForm.hospitalId"
            size="small"
            filterable
            placeholder="请选择医院">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-select v-model="searchForm.aiNameList"
            size="small"
            filterable
            multiple
            collapse-tags
            value-key="robotCallJobId"
            placeholder="请选择任务名称">
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
        <el-form-item label="统计日期">
          <el-date-picker v-model="getSearchForm.callDuration"
            :picker-options="pickerOptions"
            value-format="timestamp"
            type="daterange"
            range-separator="至"
            :default-time="['00:00:00', '23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            @change="getSearchFormTime"></el-date-picker>
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
      <el-table-column align="center"
        label="序号"
        width="50"
        type="index"></el-table-column>
      <el-table-column v-if="show"
        width="150px"
        align="center"
        label="日期"
        prop="callStartTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.callStartTime).slice(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="医院名称"
        prop="hospitalName"></el-table-column>
      <el-table-column align="center"
        label="任务名称"
        prop="aiName"></el-table-column>
      <el-table-column align="center"
        label="期名"
        prop="taskStage"></el-table-column>
      <el-table-column align="center"
        label="外呼总量(位)"
        prop="callTotal"></el-table-column>
      <el-table-column align="center"
        label="接听总量(位)"
        prop="answeredTotal"></el-table-column>
      <el-table-column align="center"
        label="挂机总量(位)"
        prop="hangupByTotal"></el-table-column>
      <el-table-column align="center"
        label="总接听率(%)"
        prop="answerRate"></el-table-column>
      <el-table-column align="center"
        label="总挂机率(%)"
        prop="hangupRate">
        <template slot-scope="scope">
          <span>{{ scope.row.hangupRate ?  scope.row.hangupRate : '0'  }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="对话总轮次"
        prop="chatRoundTotal"></el-table-column>
      <el-table-column align="center"
        label="总通话时长(s)"
        prop="chatDurationTotal">
        <template slot-scope="scope">
          <span>{{ formatSeconds(scope.row.chatDurationTotal)  }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="平均通话时长(s)"
        prop="avgTalkTime">
        <template slot-scope="scope">
          <span>{{ scope.row.avgTalkTime ?  formatSeconds(scope.row.avgTalkTime) : '00秒' }}</span>
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>

<script>
import EleTable from '@/components/Table'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminAiHistory } from '@/api/admin/httpAdminAiHistory'
import { httpAdminAiAnalysis } from '@/api/admin/httpAdminAiAnalysis'

import { parseTime, formatSeconds } from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      formatSeconds,
      show: true,
      timebtn: 'primary',
      weekbtn: '',
      searchForm: {
        aiCallSummaryType: 'DATE',
        aiNameList: [],
      },
      getSearchForm: {
        getTaskStage: '',
        selectTaskStage: '',
        callDuration: '',
      },
      list: [],
      taskStage: [
        { id: 'robotCallJobId', name: '任务名称' },
        { id: 'taskStage', name: '期名' },
      ],
      // 任务、期名
      aiTaskList: [],
      aiPeriodsList: [],
      tableHeaderBig: [],
      hospitalList: [],
      // 日期快捷选项
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getHospitalList()
    this.getAiStageList()
    this.getAiTaskNameList()
  },
  methods: {
    getList() {
      let data = Object.assign(this.searchForm, {
        page: this.pageNum,
        pageSize: this.pageSize,
      })
      httpAdminAiAnalysis.getCallSummary(data).then((res) => {
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospitalAll({ pageSize: -1 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    getAiStageList() {
      httpAdminAiHistory.getAiStageList().then((res) => {
        this.aiPeriodsList = res.data
      })
    },
    getAiTaskNameList() {
      httpAdminAiHistory.getAiTaskNameList().then((res) => {
        this.aiTaskList = res.data
      })
    },
    /**
     * 逻辑
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
      console.log(val)
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    checkBtn(val) {
      if (val === 'date') {
        this.searchForm.aiCallSummaryType = 'DATE'
        this.show = true
        this.timebtn = 'primary'
        this.weekbtn = ''
      } else {
        this.searchForm.aiCallSummaryType = 'STAGE'
        this.show = false
        this.timebtn = ''
        this.weekbtn = 'primary'
      }
      this.getList()
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
      this.$set(this.searchForm, 'aiCallSummaryType', 'DATE')
      this.$set(this, 'aiTaskList', [])
      this.getList()
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

<style></style>
