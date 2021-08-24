<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="姓名"
          align="left">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left">
          <el-input v-model="searchForm.phone"
            size="small"
            maxlength="11"
            v-Int
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="设备号"
          align="left"
          prop="deviceSn">
          <el-input v-model="searchForm.deviceSn"
            size="small"
            placeholder="请输入设备号"></el-input>
        </el-form-item>
        <el-form-item label="监测模式"
          align="left">
          <el-select v-model="searchForm.detectType"
            size="small"
            placeholder="请选择监测模式">
            <el-option label="24小时监测"
              value="TWENTY_FOUR_HOURS"></el-option>
            <el-option label="日常监测"
              value="DAILY"></el-option>
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
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        label="序号"
        type="index">
      </el-table-column>
      <el-table-column align="center"
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column align="center"
        label="手机号"
        prop="phone">
      </el-table-column>
      <el-table-column align="center"
        label="设备名称"
        prop="equipmentName">
      </el-table-column>
      <el-table-column align="center"
        label="设备号"
        prop="deviceSn">
      </el-table-column>
      <el-table-column align="center"
        label="监测模式"
        prop="detectType">
        <template slot-scope="scope">
          <span v-if="scope.row.detectType === 'DAILY'">日常监测</span>
          <span v-else>24小时监测</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="设备状态"
        prop="equipmentStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.equipmentStatus === 'MEASURING'">测量中</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="监测日期"
        prop="checkDate">
        <template slot-scope="scope">
          {{parseTime(scope.row.checkDate)}}
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminUsage } from '@/api/admin/httpAdminUsage'
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
      searchForm: {},
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      httpAdminUsage
        .getUsage({
          page: this.pageNum,
          pageSize: this.pageSize,
          deviceSn: this.searchForm.deviceSn,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          deviceSn: this.searchForm.deviceSn,
          detectType: this.searchForm.detectType,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {}
      this.getList()
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

<style>
</style>