<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="姓名"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.userName"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.phone"
            size="small"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入手机号"></el-input>
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
      :header="tableHeaderBig">
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="createTime"
        label="操作">
        <template slot-scope="scope">
            <span>{{parseTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="el-pagination-style"></el-pagination>
  </div>
</template>
<script>
import EleTable from "@/components/Table";
import { httpAdminLog } from "@/api/admin/httpAdminLog";
import { validatePhone, parseTime } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      // 列表数据
      list: [],
      tableHeaderBig: [
        { label: "序号", type: "index" },
        { prop: "description", label: "目录" },
        { prop: "url", label: "链接" },
        { prop: "name", label: "姓名" },
        { prop: "phone", label: "手机号" },
        { prop: "idCard", label: "身份证号" },
        { prop: "ip", label: "ip" },
      ],
      FormRules: {
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
      },
      editAddForm: {
        userName: "",
        name: "",
        phone: "",
        relationship: "",
      },
      // 关系列表
      relationshipList: [
        { id: 1, label: "家人", value: "FAMILY" },
        { id: 2, label: "朋友", value: "FRIENDS" },
        { id: 3, label: "亲戚", value: "RELATIVE" },
      ],
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
      httpAdminLog
        .getLog({
          page: this.pageNum,
          pageSize: this.pageSize,
          userName: this.searchForm.userName,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          relationship: this.searchForm.relationship,
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
      this.searchInput = "";
      this.getList();
    },
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
