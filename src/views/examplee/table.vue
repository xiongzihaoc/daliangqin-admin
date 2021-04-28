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
      <el-button class="el-button-style" type="primary" icon="el-icon-edit"
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

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchInput: "",
      list: [
        {
          id: 1,
          name: "陆游",
          dynasty: "南宋",
          magnumOpus: "《醉中出西门偶书》",
        },
        {
          id: 2,
          name: "李清照",
          dynasty: "南宋",
          magnumOpus: "《声声慢·寻寻觅觅》",
        },
        { id: 3, name: "李白", dynasty: "唐", magnumOpus: "《月下独酌》" },
        { id: 4, name: "杜甫", dynasty: "唐", magnumOpus: "《登高》" },
        {
          id: 5,
          name: "晏殊",
          dynasty: "北宋",
          magnumOpus: "《浣溪沙·一曲新词酒一杯》",
        },
        { id: 6, name: "孟浩然", dynasty: "唐", magnumOpus: "《春晓》" },
      ],
      tableHeaderBig: [
        { prop: "name", label: "名字" },
        { prop: "dynasty", label: "朝代" },
        { prop: "magnumOpus", label: "代表作" },
      ],
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  methods: {
    // 搜索
    searchChange(val) {},
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
