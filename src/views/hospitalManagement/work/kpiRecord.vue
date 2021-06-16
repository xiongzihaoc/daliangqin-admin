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
        <el-form-item label="日期" align="left" prop="userName">
          <el-input
            v-model="searchForm.userName"
            size="small"
            placeholder="请选择日期"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院" align="left" prop="userName">
          <el-input
            v-model="searchForm.phone"
            size="small"
            placeholder="请输入医院"
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
    <!-- 表格上方操作按钮 -->
    <div>
      <el-button
        @click="add"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-plus"
        >新增</el-button
      >
    </div>
    <!-- 表格区域 -->
    <EleTable
      :data="list"
      :showSummary="true"
      :summary-method="getSummaries"
      :header="tableHeaderBig"
    >
    </EleTable>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="el-pagination-style"
    ></el-pagination>
  </div>
</template>
<script>
import EleTable from "@/components/Table";
import { httpAdminKpiRecord } from "@/api/admin/httpAdminKpiRecord";
import { parseTime } from "@/utils";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      // 列表数据
      list: [],
      tableHeaderBig: [
        { label: "序号", type: "index" },
        {
          prop: "createTime",
          label: "日期",
          formatter: (row) => {
            return parseTime(row.createTime).slice(0, 7);
          },
        },
        { prop: "finishCount", label: "完成总次数" },
        { prop: "finishPeople", label: "完成总人数" },
        { prop: "equivalentCount", label: "获得总当量" },
        { prop: "equivalentAvg", label: "人均总当量" },
      ],
      FormRules: {},
      editAddForm: {
        userName: "",
        name: "",
        phone: "",
        relationship: "",
      },
      // 搜索区域
      searchForm: {
        userName: "",
        name: "",
        phone: "",
        relationship: "",
      },
      // 分页数据
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      httpAdminKpiRecord
        .getKpiRecord({
          page: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 搜索
    searchBtn(val) {
      this.getList();
    },
    // 搜索条件重置
    searchReset() {
      this.searchForm = {};
      this.getList();
    },
    add(){
      
    },
    getSummaries(param) {},
    // 分页
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getList();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.getList();
    },
  },
};
</script>

<style scoped>
.search-box {
  margin-bottom: 10px;
}
.el-input-style {
  margin-right: 10px;
}
</style>
