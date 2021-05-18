<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input v-model="searchInput"
        class="el-input-style"
        type="text"
        size="small"
        placeholder="请输入手机号"></el-input>
      <el-button @click="searchBtn"
        type="primary"
        size="small"
        icon="el-icon-search">搜索</el-button>
      <el-button @click="searchReset"
        size="small"
        plain
        icon="el-icon-refresh">重置</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            type="warning"
            @click="resetBtn(scope.row.phone)">重置</el-button>
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
import { list, reset } from "@/api/operationsManagement/message";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchInput: "",
      // 列表数据
      list: [],
      tableHeaderBig: [
        { prop: "phone", label: "手机号" },
        { prop: "type", label: "发送类型" },
        // { prop: "content", label: "内容" },
        { prop: "createTime", label: "发送时间" },
        // { prop: "ua", label: "浏览器类型" },
        // { prop: "ip", label: "访问ip" },
      ],
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
      list({
        page: this.pageNum,
        pageSize: this.pageSize,
        phone: this.searchInput,
      }).then((res) => {
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
    // 短信重置
    resetBtn(phone) {
      reset({ phone: phone }).then((res) => {
        console.log(res);
        this.$notify.success({
          title: "重置成功",
        });
        this.getList();
      });
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
