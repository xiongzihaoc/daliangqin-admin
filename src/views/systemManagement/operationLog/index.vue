<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="目录"
          align="left"
          prop="description">
          <el-input v-model="searchForm.description"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="姓名"
          align="left"
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.phone"
            size="small"
            maxlength="11"
            v-Int
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
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
    </EleTable>
  </div>
</template>
<script>
import EleTable from "@/components/Untable";
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
        {
          prop: "createTime",
          label: "操作时间",
          formatter: (row) => {
            return parseTime(row.createTime);
          },
        },
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
        name: "",
        phone: "",
        description: "",
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
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          description: this.searchForm.description,
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
