<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        label-width="100px">
        <el-form-item label="医生姓名"
          align="left"
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          size="small"
          prop="job">
          <el-select v-model="searchForm.job"
            placeholder="请选择职位">
            <el-option value="FAMILY_DOCTOR"
              label="家医"></el-option>
            <el-option value="HOSPITAL_DOCTOR"
              label="院医"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间"
          size="small"
          prop="status">
          <el-date-picker v-model="searchForm.searchTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="30px">
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
          <span v-if="scope.row.type === 'FAMILY_DOCTOR'">家医</span>
          <span v-else>院医</span>
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
            <!-- <img v-for="(item,index) in scope.row.imageUrlList"
              :key="index"
              :src="item"
              alt="" /> -->
            <span style="margin:0 5px;"
              v-for="(item,index) in scope.row.imageUrlList"
              :key="index">{{item}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="发布时间"
        prop="createTime"></el-table-column>
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
import { list } from "@/api/hospitalManagement/note";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {
        name: "",
        job: "",
        searchTime: "",
      },
      list: [],
      editAddForm: {
        title: "",
        imageUrl: "",
        linkUrl: "",
        zorder: "",
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
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      list({
        page: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        console.log(res);
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      console.log(this.value1);
    },
    // 重置
    searchReset() {
      this.searchForm = {};
    },
    /***** CRUD *****/
    // 新增
    add() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    // 编辑
    editBtn(val) {
      console.log(val);
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
    },
    // 删除
    async deleteBtn(id) {
      const confirmResult = await this.$confirm(
        "你确定要执行此操作, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => console.log(err));
      if (confirmResult != "confirm") {
        return this.$message.info("取消删除");
      }
      // 发送请求
      deleteE(id).then((res) => {
        console.log(res);
        this.$notify.success({
          title: "删除成功",
        });
        this.getList();
      });
    },
    // 弹框关闭
    getData() {},
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === "新增") {
            // 发送请求
            add(this.editAddForm).then((res) => {
              if (res.code != "OK") {
                return;
              } else {
                this.$notify.success({
                  title: "新增成功",
                });
                this.getList();
              }
            });
          } else {
            // 发送请求
            edit(this.editAddForm).then((res) => {
              if (res.code != "OK") {
                return;
              } else {
                this.$notify.success({
                  title: "编辑成功",
                });
                this.getList();
              }
            });
          }
          this.editDialogVisible = false;
        }
      });
    },
    /***** 分页 *****/
    handleSizeChange(newSize) {
      console.log(newSize);
      this.pageSize = newSize;
      this.getList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.pageNum = newPage;
      this.getList();
    },
  },
};
</script>

<style>
</style>
