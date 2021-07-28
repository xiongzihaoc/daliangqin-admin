<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="用户姓名"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.userName"
            size="small"
            placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.userPhone"
            size="small"
            v-Int
            placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份"
          prop="relationship">
          <el-select style="width: 100%"
            size="small"
            v-model="searchForm.relationship"
            placeholder="请选择身份">
            <el-option v-for="item in relationshipList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
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
    </EleTable>
  </div>
</template>
<script>
import EleTable from "@/components/Untable"
import { httpAdminRelatives } from "@/api/admin/httpAdminRelatives"
import {
  validatePhone,
  parseTime,
  relationshipList,
  formatterElement,
} from "@/utils/index"
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
        { prop: "userName", label: "用户姓名" },
        { prop: "userPhone", label: "用户手机号" },
        { prop: "name", label: "亲属姓名" },
        { prop: "phone", label: "亲属手机号" },
        {
          prop: "relationship",
          label: "身份",
          formatter: (row) => {
            return this.relationshipFormatter(row)
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
      relationshipList,
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
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminRelatives
        .getRelatives({
          page: this.pageNum,
          pageSize: this.pageSize,
          userName: this.searchForm.userName,
          userPhone: this.searchForm.userPhone,
          relationship: this.searchForm.relationship,
        })
        .then((res) => {
          console.log(res)
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 搜索
    searchBtn(val) {
      this.getList()
    },
    // 搜索条件重置
    searchReset() {
      this.searchForm = {}
      this.getList()
    },
    /***** 表格格式化内容区域 *****/
    relationshipFormatter(row) {
      return formatterElement.relationship[row.relationship]
    },
    // 分页
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

<style scoped>
.search-box {
  margin-bottom: 10px;
}
.el-input-style {
  margin-right: 10px;
}
</style>
