<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="姓名"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.userName"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="userPhone">
          <el-input v-Int
            maxlength="11"
            v-model="searchForm.userPhone"
            size="small"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="医院名称"
          align="left"
          prop="hospitalId">
          <el-select v-model="searchForm.hospitalId"
            @change="selectChange"
            class="w100">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
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
    <el-button @click="add"
      type="primary"
      class="tableAdd"
      size="small"
      plain
      icon="el-icon-plus">新增</el-button>
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
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
          <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button>
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
        <el-form-item label="选择医院"
          prop="hospitalId">
          <el-select v-model="editAddForm.hospitalId"
            @change="selectChange"
            class="w100">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名"
          prop="userName">
          <el-input v-model="editAddForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="userPhone">
          <el-input maxlength="11"
            v-Int
            v-model="editAddForm.userPhone"></el-input>
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
import { httpAdminHospitalRole } from "@/api/admin/httpAdminHospitalRole";
import { httpAdminHospital } from "@/api/admin/httpAdminHospital";
import { parseTime, validatePhone } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      FormRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        hospitalId: [
          { required: true, message: "请选择医院", trigger: "blur" },
        ],
        userPhone: [{ required: true, validator: validatePhone }],
      },
      searchForm: {
        userName: "",
        userPhone: "",
        hospitalId: "",
      },
      list: [],
      hospitalList: [],
      editAddForm: {
        userName: "",
        userPhone: "",
        hospitalRoleType: "ADMIN",
        hospitalId: "",
      },
      tableHeaderBig: [
        { label: "序号", type: "index" },
        { prop: "userName", label: "姓名" },
        { prop: "userPhone", label: "手机号" },
        { prop: "hospitalName", label: "医院名称" },
        {
          prop: "createTime",
          label: "添加时间",
          formatter: (row) => {
            return parseTime(row.createTime);
          },
        },
        {
          prop: "updateTime",
          label: "最后登录时间",
          formatter: (row) => {
            return parseTime(row.updateTime);
          },
        },
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
  created() {
    this.getList();
  },
  mounted() {
    this.getHospitalList();
  },
  methods: {
    getList() {
      httpAdminHospitalRole
        .getRole({
          page: this.pageNum,
          pageSize: this.pageSize,
          userName: this.searchForm.userName,
          userPhone: this.searchForm.userPhone,
          hospitalId: this.searchForm.hospitalId,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    getHospitalList() {
      httpAdminHospital.getHospital().then((res) => {
        this.hospitalList = res.data.elements;
      });
    },
    selectChange(val) {
      this.hospitalId = val;
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
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      console.log(this.editAddForm);
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
      httpAdminHospitalRole.deleteRole(id).then((res) => {
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
      console.log(this.editAddForm);
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 发送请求
          httpAdminHospitalRole.postRole(this.editAddForm).then((res) => {
            if (res.code === "OK") {
              this.$notify.success({
                title: "操作成功",
              });
              this.getList();
              this.editDialogVisible = false;
            }
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
