<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" class="searchForm" :inline="true">
        <el-form-item label="医院名称" align="left">
          <el-select v-model="searchForm.hospitalId" size="small" filterable placeholder="请选择医院">
            <el-option
              v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchForm.superviseTime"
            size="small"
            align="right"
            type="daterange"
            unlink-panels
            value-format="timestamp"
            range-separator="至"
            :default-time="['00:00:00', '23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="选择日期"
            @change="changeMonitorTime"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBtn" type="primary" size="small" icon="el-icon-search">搜索</el-button>
          <el-button @click="searchReset" size="small" plain icon="el-icon-refresh">重置</el-button>
          <el-button type="success" size="small" @click="getAll">全部</el-button>
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
      show-summary
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column align="center" label="序号" type="index"></el-table-column>
      <el-table-column align="center" label="医院名称" prop="hospitalName">
        <!-- <template slot-scope="scope">
          <span class="skipStyle" @click="skipHeart(scope.row)">{{ scope.row.hospitalName }}</span>
        </template>-->
      </el-table-column>
      <el-table-column align="center" label="测量总人数" prop="measureTotalFrequency"></el-table-column>
      <el-table-column align="center" label="测量总次数" prop="measureTotalAmount">
        <template slot-scope="scope">
          <span
            class="skipStyle"
            @click="skipHeart(scope.row, 'people')"
          >{{ scope.row.measureTotalAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司已审核报告数" prop="companyAuditNumber">
        <template slot-scope="scope">
          <span class="skipStyle" @click="skipHeart(scope.row, 'PLATFORM_COMPLETE_AUDIT')">
            {{
              scope.row.companyAuditNumber
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院已审核报告数" prop="hospitalAuditNumber">
        <template slot-scope="scope">
          <span class="skipStyle" @click="skipHeart(scope.row, 'HOSPITAL_COMPLETE_AUDIT')">
            {{
              scope.row.hospitalAuditNumber
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司待审核报告数" prop="companyWaitAuditNumber">
        <template slot-scope="scope">
          <span class="skipStyle" @click="skipHeart(scope.row, 'TO_AUDIT')">
            {{
              scope.row.companyWaitAuditNumber
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院待审核报告数" prop="hospitalWaitAuditNumber">
        <template slot-scope="scope">
          <span class="skipStyle" @click="skipHeart(scope.row, 'TO_HOSPITAL_AUDIT')">
            {{
              scope.row.hospitalWaitAuditNumber
            }}
          </span>
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminEquipmentMonitoring } from '@/api/admin/httpAdminEquipmentMonitoring'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { parseTime } from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      list: [],
      tableHeaderBig: [],
      searchForm: {
        hospitalId: '',
        superviseTime: '',
        startTime: new Date(new Date().toLocaleDateString()).getTime(),
        endTime: new Date().getTime(),
      },
      hospitalList: [],
      // 监测时间
      superviseTime: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
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
        ],
      },
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    let startTime = new Date(new Date().toLocaleDateString()).getTime()
    let endTime = new Date().getTime()
    this.searchForm.superviseTime = [startTime, endTime]
    this.getList()
  },
  mounted() {
    this.getHospitalList()
  },
  methods: {
    getList() {
      httpAdminEquipmentMonitoring
        .getEquipmentMonitoring({
          page: this.pageNum,
          pageSize: this.pageSize,
          hospitalId: this.searchForm.hospitalId,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    getSummaries() { },
    // 跳转心率检测
    skipHeart(val, state) {
      if (state != 'people') {
        sessionStorage.setItem('monitoringAuditStatus', state)
      }
      sessionStorage.setItem('monitoringHospitalId', val.hospitalId)
      sessionStorage.setItem('monitoringStartTime', this.searchForm.startTime)
      sessionStorage.setItem('monitoringEndTime', this.searchForm.endTime)
      this.$router.push('/archivesManagement/record/heart')
    },
    // 用户选择时间
    changeMonitorTime(val) {
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    // 获取全部数据
    getAll() {
      this.searchForm.superviseTime = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.getList()
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    searchReset() {
      //待优化
      this.pageNum = 1
      this.searchForm.startTime = new Date( new Date().toLocaleDateString()).getTime()
      this.searchForm.endTime = new Date().getTime()
      this.searchForm.superviseTime = [new Date(), new Date()]
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

<style>
</style>
