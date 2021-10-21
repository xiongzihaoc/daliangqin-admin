<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form class="searchForm" ref="searchFormRef" :model="searchForm" :inline="true">
        <el-form-item label="用户姓名">
          <el-input v-model="searchForm.calledPhoneNumber" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="searchForm.customerPersonName" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBtn" type="primary" size="small" icon="el-icon-search"
            >搜索</el-button
          >
          <el-button @click="searchReset" size="small" plain icon="el-icon-refresh"
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
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column
        align="center"
        label="用户名"
        prop="customerPersonName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户手机号"
        prop="calledPhoneNumber"
      ></el-table-column>
    </EleTable>
  </div>
</template>

<script>
import EleTable from "@/components/Table";
import { httpAdminAiCall } from "@/api/admin/httpAdminAiCall";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {
        calledPhoneNumber: "",
        customerPersonName: "",
        robotCallJobId: "",
      },
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    this.searchForm.robotCallJobId = this.$route.query.robotCallJobId;
    this.getNotStatisticsList();
  },
  beforeDestroy() {
    sessionStorage.removeItem('taskPhoneState');
    sessionStorage.removeItem('taskHospitalId');
  },
  methods: {
    /**
     * 接口
     */
    getNotStatisticsList() {
      httpAdminAiCall.getNotStatisticsList(this.searchForm).then((res) => {
        console.log(res);
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1;
      this.getNotStatisticsList();
    },
    searchReset() {
      this.searchForm.calledPhoneNumber = "";
      this.searchForm.customerPersonName = "";
      this.getNotStatisticsList();
    },
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
    },
  },
};
</script>

<style lang="scss" scoped></style>
