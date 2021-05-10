<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input
        @input="searchChange"
        v-model="searchInput"
        class="el-input-style"
        type="text"
        placeholder="请输入手机号"
      ></el-input>
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
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="resetBtn(scope.row.msgPhone)"
            >重置</el-button
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
import { list, reset, query } from "@/api/message";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchInput: "",
      list: [],
      tableHeaderBig: [
        { prop: "msgPhone", label: "手机号" },
        { prop: "sendType", label: "发送类型" },
        // { prop: "content", label: "内容" },
        { prop: "createTime", label: "发送时间" },
        // { prop: "ua", label: "浏览器类型" },
        // { prop: "ip", label: "访问ip" },
      ],
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      list({
        page: this.pageNum,
        pageSize: this.pageSize,
        msgPhone: this.searchInput,
      }).then((res) => {
        console.log(res);
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    // 搜索
    searchChange(val) {
      this.getList();

    },
    // 重置
    resetBtn(msgPhone) {
      reset({ phone: msgPhone }).then((res) => {
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
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.getList()

    },
  },
};
</script>

<style>
</style>
