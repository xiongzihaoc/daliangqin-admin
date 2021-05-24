<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医生姓名"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.userName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          prop="type">
          <el-select v-model="searchForm.type"
            size="small"
            placeholder="请选择职位">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间"
          prop="status">
          <el-date-picker v-model="searchForm.noteTime"
            size="small"
            type="datetimerange"
            @change="selectNoteTime"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="index"
        label="序号"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="userName"
        label="医生姓名"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="type"
        label="职位">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 'PHYSICIAN'">医师</span>
          <span v-else-if="scope.row.type === 'ATTENDING_PHYSICIAN'">主治医师</span>
          <span v-else-if="scope.row.type === 'ASSOCIATE_CHIEF_PHYSICIAN'">副主任医师</span>
          <span v-else>主任医师</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="content"
        label="笔记内容"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="笔记图集">
        <template slot-scope="scope">
          <div v-if="scope.row.imageUrlList.length > 0">
            <img class="tableImg"
              v-for="(item, index) in scope.row.imageUrlList"
              :src="item"
              :key="index" />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="发布时间"
        prop="createTime">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 分页 -->
    <el-pagination background
      @size-change="handleSizeChange"
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
import { httpAdminNote } from "@/api/admin/httpAdminNote";
import { parseTime } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      searchForm: {
        userName: "",
        type: "",
        startTime: "",
        endTime: "",
      },
      list: [],
      doctorTypeList: [
        { id: 1, label: "医师", value: "PHYSICIAN" },
        { id: 2, label: "主治医师", value: "ATTENDING_PHYSICIAN" },
        { id: 3, label: "副主任医师", value: "ASSOCIATE_CHIEF_PHYSICIAN" },
        { id: 4, label: "主任医师", value: "CHIEF_PHYSICIAN" },
      ],
      editAddForm: {
        userName: "",
        imageUrl: "",
        linkUrl: "",
        type: "",
        status: "",
      },
      tableHeaderBig: [{ prop: "title", label: "笔记标题" }],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      httpAdminNote
        .getNotes({
          page: this.pageNum,
          pageSize: this.pageSize,
          userName: this.searchForm.userName,
          type: this.searchForm.type,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 日期选择事件
    selectNoteTime(val) {
      this.searchForm.startTime = val[0];
      this.searchForm.endTime = val[1];
      console.log(this.searchForm.startTime);
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList();
    },
    // 重置
    searchReset() {
      this.searchForm = {};
      this.getList();
    },
    /***** 分页 *****/
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

<style>
</style>