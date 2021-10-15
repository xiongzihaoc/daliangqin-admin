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
          ></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input
            v-model="searchForm.customerPersonName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="呼叫时间">
          <el-date-picker
            v-model="time"
            value-format="timestamp"
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
          <el-select v-model="searchForm.resultStatus" size="small" filterable>
            <el-option
              v-for="(item, index) in AiResultStatus"
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
        label="用户名"
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
      <el-table-column align="center" label="呼叫时间" prop="startTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
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
          <el-button type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </EleTable>
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
      searchForm: {
        patientUserName: '',
        customerPersonName: '',
        robotCallJobId: '',
        startTime: '',
        endTime: '',
        hospitalId: '',
        resultStatus: '',
      },
      time: [],
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.searchForm.robotCallJobId = this.$route.query.robotCallJobId
    this.getAlreadyStatisticsList()
  },
  methods: {
    /**
     * 接口
     */
    getAlreadyStatisticsList() {
      httpAdminAiCall.getAlreadyStatisticsList(this.searchForm).then((res) => {
        console.log(res)
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    /**
     * 逻辑
     */
    callTime(val) {
      console.log(val)
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getAlreadyStatisticsList()
    },
    searchReset() {
      this.searchForm = {}
      this.searchForm.robotCallJobId = this.$route.query.robotCallJobId
      this.getAlreadyStatisticsList()
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
</style>