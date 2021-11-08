<template>
  <div class="app-container">
    <div class="search-box">
      <el-form class="searchForm" :inline="true">
        <el-form-item label="医院名称">
          <el-select v-model="searchForm.shop" size="small">
            <el-option label="规格" value="规格"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生姓名">
          <el-input placeholder="请输入医生姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input placeholder="请输入用户手机号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input placeholder="请输入订单编号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" size="small">
            <el-option v-for="item in ordeStatus" :key="item.id" :label="item.label" :value="item.value"> </el-option>
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
      <el-table-column align="center" label="医院名称" prop="hospitalName"></el-table-column>
      <el-table-column align="center" label="医师姓名" prop="doctorName"></el-table-column>
      <el-table-column align="center" label="用户姓名" prop="userName"></el-table-column>
      <el-table-column align="center" label="年龄" prop="age"></el-table-column>
      <el-table-column align="center" label="用户手机号" prop="phone"></el-table-column>
      <el-table-column align="center" label="订单编号" prop=""></el-table-column>
      <el-table-column align="center" label="收获地址" prop=""></el-table-column>
      <el-table-column align="center" label="商品名称" prop=""></el-table-column>
      <el-table-column align="center" label="商品规格" prop=""></el-table-column>
      <el-table-column align="center" label="积分数" prop=""></el-table-column>
      <el-table-column align="center" label="订单状态" prop=""></el-table-column>
      <el-table-column align="center" label="创建时间" prop=""></el-table-column>
      <el-table-column align="center" label="发货时间" prop=""></el-table-column>
      <el-table-column align="center" label="发货备注" prop=""></el-table-column>
      <el-table-column align="center" label="收货时间" prop=""></el-table-column>
      <el-table-column align="center" label="操作"></el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { ordeStatus } from '@/utils/index'
import { httpAdminOrder } from '@/api/admin/httpAdminOrder'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      ordeStatus,
      searchForm: {},
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList() {
      httpAdminOrder.getOrder().then((res)=>{
        console.log(res)
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
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