<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        :inline="true"
        class="searchForm">
        <el-form-item label="姓名"
          align="left"
          prop="name">
          <el-input v-model.trim="searchForm.name"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="phone">
          <el-input v-model.trim="searchForm.phone"
            size="small"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证"
          align="left"
          prop="idCard">
          <el-input v-model.trim="searchForm.idCard"
            size="small"
            placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="性别"
          align="left"
          prop="gender">
          <el-select v-model="searchForm.gender"
            size="small">
            <el-option v-for="item in genderList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应医师"
          align="left"
          prop="doctorName">
          <el-input placeholder="请输入对应医师"
            v-model.trim="searchForm.doctorName"></el-input>
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
          <el-button size="small"
            type="success"
            icon="el-icon-download">导入</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格操作按钮 -->
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
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="selection"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="index"
        label="序号"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="name"
        label="姓名"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="avatarUrl"
        label="头像">
        <template slot-scope="scope">
          <el-image v-if="scope.row.avatarUrl"
            :src="scope.row.avatarUrl"
            class="tableImg"
            alt="">
            <div slot="error"
              class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="detailsBtn(scope.row)"
            type="primary">编辑</el-button>
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
import { httpAdminPatient } from "@/api/admin/httpAdminPatient";
import {
  validateIdCard,
  validatePhone,
  parseTime,
  genderList,
  formatterElement,
} from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      genderList,
      FormRules: {
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        avatarUrl: [
          { required: true, message: "请上传用户头像", trigger: "blur" },
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        idCard: [
          { required: true, trigger: "blur", validator: validateIdCard },
        ],
        type: [{ required: true, message: "请选择职位", trigger: "blur" }],
        address: [
          { required: true, message: "请输入家庭地址", trigger: "blur" },
        ],
        doctorUserId: [
          { required: true, message: "请选择对应医师", trigger: "blur" },
        ],
      },
      searchForm: {
        name: "",
        phone: "",
        idCard: "",
        gender: "",
      },
      list: [],
      tableHeaderBig: [
        { prop: "phone", label: "手机号" },
        { prop: "idCard", label: "身份证号" },
        {
          prop: "birthday",
          label: "出生日期",
          formatter: (row) => {
            return parseTime(row.birthday).slice(0, 10);
          },
        },
        { prop: "age", label: "年龄" },
        {
          prop: "gender",
          label: "性别",
          formatter: (row) => {
            return this.genderFormatter(row);
          },
        },
        { prop: "address", label: "家庭住址" },
        { prop: "healthScore", label: "两慢指数" },
        { prop: "doctorUserName", label: "对应医师" },
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
  methods: {
    getList() {
      httpAdminPatient
        .getPatient({
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          idCard: this.searchForm.idCard,
          gender: this.searchForm.gender,
          doctorName: this.searchForm.doctorName,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
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
      this.$router.push({
        path: "/archivesManagement/details",
        query: { type: "add" },
      });
    },
    // 跳转详细资料
    detailsBtn(val) {
      this.$router.push({
        path: "/archivesManagement/details",
        query: { id: val.id, type: "edit" },
      });
    },
    /***** 表格格式化内容区域 *****/
    // 出生年月
    genderFormatter(row) {
      return formatterElement.gender[row.gender];
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
