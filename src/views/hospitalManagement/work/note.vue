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
            <el-option value="DOCTOR"
              label="主任"></el-option>
            <el-option value="PATIENT"
              label="医师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间"
          size="small"
          prop="status">
          <el-date-picker v-model="searchForm.searchTime"
            type="datetimerange"
            value-formate="timestamp"
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
        prop="userName"
        label="医生姓名"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="content"
        label="笔记内容"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="笔记图集"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="发布时间"
        prop="createTime"></el-table-column>
      <!-- 操作 -->
      <!-- <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
          <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column> -->
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
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @open="getData"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="轮播图名称"
          prop="title">
          <el-input v-model="editAddForm.title"
            placeholder="请输入轮播图名称"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片"
          prop="imageUrl">
          <el-input v-model="editAddForm.imageUrl"
            placeholder="暂时输入图片名称"></el-input>
          <!-- <single-upload v-model="editAddForm.imageUrl" /> -->
        </el-form-item>
        <el-form-item label="呈现位置"
          prop="type">
          <el-select style="width:100%"
            multiple
            clearable
            v-model="editAddForm.type"
            placeholder="请选择呈现位置">
            <el-option value="DOCTOR"
              label="医生端"></el-option>
            <el-option value="PATIENT"
              label="用户端"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址"
          prop="linkUrl">
          <el-input v-model.trim="editAddForm.linkUrl"
            placeholder="请输入跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="权重"
          prop="zorder">
          <el-input v-model.trim="editAddForm.zorder"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入权重"></el-input>
        </el-form-item>
        <el-form-item label="状态"
          prop="status">
          <el-select style="width:100%"
            v-model="editAddForm.status"
            placeholder="请选择状态">
            <el-option value="UP"
              label="上架"></el-option>
            <el-option value="DOWN"
              label="下架"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from "@/components/Table";
import { list } from "@/api/hospitalManagement/note";
import singleUpload from "@/components/UploadFile";
export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      searchForm: {
        name: "",
        job: "",
        searchTime:"",
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
      tableHeaderBig: [
        { prop: "linkUrl", label: "职位" },
        { prop: "title", label: "笔记标题" },
      ],
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
        id: this.searchInput,
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
