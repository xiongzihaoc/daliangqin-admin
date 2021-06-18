<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="轮播图名称"
          align="left"
          prop="title">
          <el-input v-model="searchForm.title"
            size="small"
            placeholder="请输入轮播图名称"></el-input>
        </el-form-item>
        <el-form-item label="呈现位置"
          prop="type">
          <el-select v-model="searchForm.type"
            size="small"
            placeholder="请选择呈现位置">
            <el-option v-for="item in appTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态"
          prop="status">
          <el-select style="width: 100%"
            size="small"
            v-model="searchForm.status"
            placeholder="请选择状态">
            <el-option v-for="item in typeList"
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
    <!-- 表格上方操作按钮 -->
    <div>
      <el-button @click="add"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-plus">新增</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="selection"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="imageUrl"
        label="轮播图图片">
        <template slot-scope="scope">
          <div v-if="scope.row.imageUrl">
            <img fit
              class="tableImg"
              :src="scope.row.imageUrl" />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="linkUrl"
        label="跳转地址">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="appType"
        label="呈现位置">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.appType"
            :key="index">
            <span v-if="item === 'PATIENT'">用户端 </span>
            <span v-else>医生端 </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"
            @change="statusChange(scope.row)"
            active-value="UP"
            inactive-value="DOWN"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="320">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
          <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button>
          <el-button size="mini"
            plain
            icon="el-icon-top"
            @click="sortTop(scope.row.id)"></el-button>
          <el-button size="mini"
            plain
            icon="el-icon-bottom"
            @click="sortBottom(scope.row.id)"></el-button>
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
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="轮播图名称"
          prop="title">
          <el-input v-model.trim="editAddForm.title"
            placeholder="请输入轮播图名称"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片"
          prop="imageUrl">
          <single-upload v-model="editAddForm.imageUrl"
            uploadType="BANNER" />
        </el-form-item>
        <el-form-item label="呈现位置"
          prop="appType">
          <el-select style="width: 100%"
            multiple
            v-model="editAddForm.appType"
            placeholder="请选择呈现位置">
            <el-option v-for="item in appTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址"
          prop="linkUrl">
          <el-input v-model.trim="editAddForm.linkUrl"
            placeholder="请输入跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="权重"
          prop="zOrder">
          <el-input v-model.trim="editAddForm.zOrder"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入权重"></el-input>
        </el-form-item>
        <el-form-item label="状态"
          prop="status">
          <el-select style="width: 100%"
            v-model="editAddForm.status"
            placeholder="请选择状态">
            <el-option v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
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
import singleUpload from "@/components/Upload";
import { httpAdminBanner } from "@/api/admin/httpAdminBanner";
import { appTypeList, typeList } from "@/utils/index";
export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      // app类型列表
      appTypeList,
      // 上下架状态
      typeList,
      FormRules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
        ],
        imageUrl: [
          { required: true, message: "请上传轮播图图片", trigger: "blur" },
        ],

        appType: [
          { required: true, message: "请选择呈现位置", trigger: "blur" },
        ],
        // linkUrl: [
        //   { required: true, message: "请输入跳转地址", trigger: "blur" },
        // ],
        zOrder: [{ required: true, message: "请输入权重", trigger: "blur" }],

        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      // 表格数据
      list: [],
      tableHeaderBig: [
        { type: "index", label: "序号" },
        { prop: "title", label: "轮播图名称" },
      ],
      // 新增编辑表单
      editAddForm: {
        title: "",
        appType: [],
        imageUrl: "",
        linkUrl: "",
        zOrder: "",
        type: "",
        status: "",
      },
      searchForm: {
        title: "",
        type: "",
        status: "",
      },
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
      httpAdminBanner
        .getBanner({
          page: this.pageNum,
          pageSize: this.pageSize,
          title: this.searchForm.title,
          positionTypeList: this.searchForm.type,
          status: this.searchForm.status,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 开关change事件
    statusChange(val) {
      this.editAddForm.status = val;
      httpAdminBanner.putBanner(val).then((res) => {
        if (res.code === "OK") {
          this.$notify.success({
            title: "状态更改成功",
          });
          this.getList();
        }
      });
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
    /***** 增删改 *****/
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
      httpAdminBanner.deleteBanner(id).then((res) => {
        if (res.code === "OK") {
          this.$notify.success({
            title: "删除成功",
          });
          this.getList();
        }
      });
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === "新增") {
            // 发送请求
            httpAdminBanner.postBanner(this.editAddForm).then((res) => {
              if (res.code === "OK") {
                this.$notify.success({
                  title: "新增成功",
                });
                this.getList();
                this.editDialogVisible = false;
              }
            });
          } else {
            // 发送请求
            httpAdminBanner.putBanner(this.editAddForm).then((res) => {
              if (res.code === "OK") {
                this.$notify.success({
                  title: "编辑成功",
                });
                this.getList();
                this.editDialogVisible = false;
              }
            });
          }
        }
      });
    },
    // 排序
    sortTop(id) {
      httpAdminBanner.postBannerSort({ id: id, status: "UP" }).then((res) => {
        if (res.code === "OK") {
          this.getList();
          return this.$notify.success({
            title: res.message,
          });
        }
      });
    },
    sortBottom(id) {
      httpAdminBanner.postBannerSort({ id: id, status: "DOWN" }).then((res) => {
        if (res.code === "OK") {
          this.getList();
          return this.$notify.success({
            title: res.message,
          });
        }
      });
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
