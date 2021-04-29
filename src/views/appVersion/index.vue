<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input
        @input="searchChange"
        v-model="searchInput"
        class="el-input-style"
        type="text"
        placeholder="search"
      ></el-input>
      <el-button @click="add" class="el-button-style" type="primary" icon="el-icon-edit"
        >新增</el-button
      >
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list" :header="tableHeaderBig">
      <!-- 操作 -->
      <el-table-column
        align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="220"
      >
        <template>
          <el-button size="mini" type="primary" @click="editBtn"
            >编辑</el-button
          >
          <el-button size="mini" type="success" @click="sendBtn"
            >发布</el-button
          >
          <el-button size="mini" type="danger" @click="deleteBtn"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </EleTable>
    <!-- 分页 -->
    <el-pagination
      background
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
import EleTable from "../../components/Table";
import { list } from "@/api/appVersion";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchInput: "",
      list: [],
      tableHeaderBig: [
        { prop: "id", label: "id" },
        { prop: "updateLog", label: "更新日志" },
        { prop: "versionString", label: "版本号" },
        { prop: "url", label: "安装包地址" },

      ],
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    var value = {
      page: this.pageNum,
      pageSize: this.pageSize,
      updateAppType: "ANDROID",
    };
    list(value).then(res=>{
        this.list = res.data.elements
    })
  },
  mounted() {},
  methods: {
    // 搜索
    searchChange(val) {},
    add(){
        
    },
    editBtn() {
      this.$notify.success({
        title: "编辑成功",
      });
    },
    sendBtn() {
      this.$notify.success({
        title: "发布成功",
      });
    },
    deleteBtn() {
      this.$notify.success({
        title: "删除成功",
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style>
</style>
