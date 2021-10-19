<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true"
      >
        <el-form-item label="医院名称" align="left">
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
        <el-form-item label="姓名" align="left">
          <el-input
            v-model="searchForm.name"
            size="small"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" align="left">
          <el-input
            v-model="searchForm.phone"
            size="small"
            maxlength="11"
            v-Int
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备号" align="left" prop="deviceSn">
          <el-input
            v-model="searchForm.deviceSn"
            size="small"
            placeholder="请输入设备号"
          ></el-input>
        </el-form-item>
        <!-- 监测模式和app端统一不用枚举  0 日常 5 24小时-->
        <!-- <el-form-item label="监测模式"
          align="left">
          <el-select v-model="searchForm.ecgComingMode"
            size="small"
            placeholder="请选择监测模式">
            <el-option label="24小时监测"
              value=5></el-option>
            <el-option label="日常监测"
              value=0></el-option>
          </el-select>
        </el-form-item>-->
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
      <el-table-column align="center" label="姓名" prop="name">
        <template slot-scope="scope">
          <span class="skipStyle" @click="skipPatient(scope.row)">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="手机号"
        prop="phone"
      ></el-table-column>
      <el-table-column
        align="center"
        label="设备名称"
        prop="equipmentName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="设备号"
        prop="deviceSn"
      ></el-table-column>
      <!-- <el-table-column align="center"
        label="监测模式"
        prop="ecgComingMode">
        <template slot-scope="scope">
          <span v-if="scope.row.ecgComingMode === 0">日常监测</span>
          <span v-else>24小时监测</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="设备状态" prop="equipmentStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.deviceStatus === 'DEVICE_COLLECT'">监测中</span>
          <span v-if="scope.row.deviceStatus === 'DEVICE_EXPORT'">待上传</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="监测日期" prop="ecgStartTime">
        <template slot-scope="scope">{{
          parseTime(scope.row.ecgStartTime)
        }}</template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminUsage } from '@/api/admin/httpAdminUsage'
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
      hospitalList: [],
      searchForm: {
        deviceSn: '',
        name: '',
        phone: '',
        ecgComingMode: '',
      },
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getList()
    this.getHospitalList()
  },
  mounted() {},
  beforeDestroy() {
    sessionStorage.removeItem('monitoringHospitalId')
  },
  methods: {
    getList() {
      let hospitalId = JSON.parse(
        sessionStorage.getItem('monitoringHospitalId')
      )
      if (hospitalId !== null) {
        this.searchForm.hospitalId = hospitalId[0]
      }
      httpAdminUsage
        .getUsage({
          page: this.pageNum,
          pageSize: this.pageSize,
          deviceSn: this.searchForm.deviceSn,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          ecgComingMode: this.searchForm.ecgComingMode,
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
    // 跳转用户档案
    skipPatient(val) {
      this.$router.push(
        '/archivesManagement/details?id=' +
          val.patientUserId +
          '&type=edit' +
          '&isArchives=true'
      )
    },
    /**
     * 搜索
     */
    // 搜索
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    // 重置
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
