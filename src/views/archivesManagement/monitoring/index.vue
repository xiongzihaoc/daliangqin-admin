<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
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
      show-summary
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        label="序号"
        type="index">
      </el-table-column>
      <el-table-column align="center"
        label="医院名称"
        prop="hospitalName">
        <template slot-scope="scope">
          <span class="skipStyle"
            @click="skipHeart(scope.row)">{{scope.row.hospitalName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="测量总人数"
        prop="measureTotalAmount">
      </el-table-column>
      <el-table-column align="center"
        label="测量总次数"
        prop="measureTotalFrequency">
        <!-- <template slot-scope="scope">
          <span class="skipStyle"
            @click="skipHeart(scope.row)">{{scope.row.measureTotalFrequency}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center"
        label="公司已审核报告数"
        prop="companyAuditNumber">
      </el-table-column>
      <el-table-column align="center"
        label="医院已审核报告数"
        prop="hospitalAuditNumber">
      </el-table-column>
      <el-table-column align="center"
        label="公司待审核报告数"
        prop="companyWaitAuditNumber">
      </el-table-column>
      <el-table-column align="center"
        label="医院待审核报告数"
        prop="hospitalWaitAuditNumber">
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
      },
      hospitalList: [],
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
    getSummaries() {
      console.log(333)
    },
    // 跳转心率检测
    skipHeart(val) {
      this.$router.push('/archivesManagement/record/heart')
      localStorage.setItem('hospitalId', val.hospitalId)
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
