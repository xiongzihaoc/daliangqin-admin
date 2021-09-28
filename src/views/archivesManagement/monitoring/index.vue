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
            v-model="superviseTime"
            size="small"
            align="right"
            type="daterange"
            unlink-panels
            value-format="timestamp"
            range-separator="至"
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
      <el-table-column align="center" label="测量总次数" prop="measureTotalAmount"></el-table-column>
      <el-table-column align="center" label="公司已审核报告数" prop="companyAuditNumber">
        <template slot-scope="scope">
          <span class="skipStyle" @click="skipHeart(scope.row)">{{ scope.row.companyAuditNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院已审核报告数" prop="hospitalAuditNumber">
        <template slot-scope="scope">
          <span class="skipStyle" @click="skipHeart(scope.row)">{{ scope.row.hospitalAuditNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司待审核报告数" prop="companyWaitAuditNumber">
        <template slot-scope="scope">
          <span
            class="skipStyle"
            @click="skipHeart(scope.row)"
          >{{ scope.row.companyWaitAuditNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院待审核报告数" prop="hospitalWaitAuditNumber">
        <template slot-scope="scope">
          <span
            class="skipStyle"
            @click="skipHeart(scope.row)"
          >{{ scope.row.hospitalWaitAuditNumber }}</span>
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
        startTime: '',
        endTime: '',
      },
      hospitalList: [],
      // 监测时间
      superviseTime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime())
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }]
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
    skipHeart(val) {
      let self = this
      console.log('tiaozhuan', this.searchForm)
      this.$router.push({
        path: '/archivesManagement/record/heart', 
        query: {
          monitoringHospitalId: self.searchForm.hospitalId,
          monitoringStartTime: self.searchForm.startTime,
          monitoringEndTime: self.searchForm.endTime,
        }
      })
    },
    // 用户选择时间
    changeMonitorTime(val) {
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    searchReset() {
      this.pageNum = 1
      this.searchForm = {}
      this.superviseTime = ""
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
