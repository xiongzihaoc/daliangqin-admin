<template>
  <div class="app-container">
    <!-- <h1>积分商品</h1> -->
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
        <el-form-item label="任务名称">
          <el-select v-model="searchForm.shop" size="small">
            <el-option label="规格" value="规格"> </el-option>
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
    <div>
      <el-button
        type="primary"
        size="small"
        plain
        class="tableAdd"
        icon="el-icon-plus"
        >积分收入</el-button
      >
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
      <el-table-column align="center" label="医院名称"></el-table-column>
      <el-table-column align="center" label="医师姓名"></el-table-column>
      <el-table-column align="center" label="用户姓名"></el-table-column>
      <el-table-column align="center" label="年龄"></el-table-column>
      <el-table-column align="center" label="用户手机号"></el-table-column>
      <el-table-column align="center" label="积分数"></el-table-column>
      <el-table-column align="center" label="当前积分"></el-table-column>
      <el-table-column align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="商品名称"></el-table-column>
      <el-table-column align="center" label="商品图片"></el-table-column>
      <el-table-column align="center" label="商品规格"></el-table-column>
      <el-table-column align="center" label="任务名称"></el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {},
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  methods: {
    getList() {},
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