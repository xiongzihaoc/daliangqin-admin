<template>
  <div class="app-container">
    <!-- <h1>积分商品</h1> -->
    <div class="search-box">
      <el-form class="searchForm" :inline="true">
        <el-form-item label="医院名称">
          <el-select v-model="searchForm.hospitalName" size="small">
            <el-option v-for="item in hospitalList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生姓名">
          <el-input
            v-model="searchForm.doctorName"
            placeholder="请输入医生姓名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input
            v-model="searchForm.userName"
            placeholder="请输入用户姓名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input
            v-model="searchForm.phone"
            placeholder="请输入用户手机号"
            size="small"
          ></el-input>
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
        label="医院名称"
        prop="hospitalName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医师姓名"
        prop="doctorName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户姓名"
        prop="userName"
      ></el-table-column>
      <el-table-column align="center" label="年龄" prop="age"></el-table-column>
      <el-table-column
        align="center"
        label="用户手机号"
        prop="phone"
      ></el-table-column>
      <el-table-column
        align="center"
        label="可用积分"
        prop="available"
      ></el-table-column>
      <el-table-column
        align="center"
        label="已使用积分"
        prop="used"
      ></el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="skipParticulars(scope.row)"
            >查看明细</el-button
          >
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminUserIntegral } from '@/api/admin/httpAdminUserIntegral'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {},
      list: [],
      hospitalList: [],
      tableHeaderBig: [],
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
  methods: {
    getList() {
      let data = Object.assign(this.searchForm, {
        page: this.pageNum,
        pageSize: this.pageSize,
      })
      httpAdminUserIntegral.getUserIntegral(data).then((res) => {
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    // 获取医院列表
    getHospitalList(hospitalId) {
      httpAdminHospital
        .getHospital({ pageSize: -1, hospitalId })
        .then((res) => {
          this.hospitalList = res.data.elements
        })
    },
    skipParticulars(val) {
      sessionStorage.setItem('hospitalNameAccount', val.hospitalName)
      sessionStorage.setItem('userNameAccount', val.userName)
      sessionStorage.setItem('doctorNameAccount', val.doctorName)
      sessionStorage.setItem('phoneAccount', val.phone)
      this.$router.push('particulars')
    },
    /**
     * 切换
     */
    checkBtn() {},
    /**
     * 搜索
     */
    searchBtn() {},
    searchReset() {},
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
</style>