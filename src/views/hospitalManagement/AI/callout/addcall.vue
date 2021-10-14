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
          <el-input v-model="searchForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="searchForm.name" size="small"></el-input>
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
          <el-button @click="searchBtn" type="primary" size="small"
            >单个导入</el-button
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
      show-summary
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
        prop="aiName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户手机号"
        prop="aiName"
      ></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editBtn(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="deleteBtn(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>

<script>
import EleTable from '@/components/Table'
import { httpAdminAiCall } from '@/api/admin/httpAdminAiCall'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {
        name: '',
      },
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getStatisticsList()
  },
  methods: {
    /**
     * 获取外呼总人数
     */
    getStatisticsList() {
      let robotCallJobId = this.$route.query.robotCallJobId
      httpAdminAiCall.getStatisticsList({ robotCallJobId }).then((res) => {
        this.list = res.data
      })
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getAiCallList()
      this.getTask()
      console.log('期名', this.searchForm)
    },
    searchReset() {},
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getAiCallList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getAiCallList()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>