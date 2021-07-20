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
        <el-form-item label="身份证号"
          align="left"
          prop="idCard">
          <el-input v-model.trim="searchForm.idCard"
            maxlength="18"
            size="small"
            placeholder="请输入身份证号"></el-input>
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
        <!-- <el-form-item label="年龄"
          align="left"
          prop="age">
          <el-input-number v-model="searchForm.beginAge"
            @change="selectBeginAgeChange"
            :min="1"
            :max="120"
            size="small"></el-input-number> —
          <el-input-number v-model="searchForm.endAge"
            @change="selectEndAgeChange"
            :min="1"
            :max="120"
            size="small"></el-input-number>
        </el-form-item> -->
        <el-form-item label="本人电话"
          align="left"
          prop="phone">
          <el-input v-model.trim="searchForm.phone"
            size="small"
            v-Int
            placeholder="请输入本人电话"></el-input>
        </el-form-item>
        <el-form-item label="高血压"
          align="left"
          prop="highBloodStatus">
          <el-select v-model="searchForm.highBloodStatus"
            size="small"
            placeholder="请选择状态">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="糖尿病"
          align="left"
          prop="diabetesStatus">
          <el-select v-model="searchForm.diabetesStatus"
            size="small"
            placeholder="请选择状态">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="心率"
          align="left"
          prop="heartRateStatus">
          <el-select v-model="searchForm.heartRateStatus"
            size="small"
            placeholder="请选择状态">
            <el-option v-for="item in heartList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应医师"
          align="left"
          prop="doctorUserName">
          <el-input placeholder="请输入对应医师"
            v-model.trim="searchForm.doctorUserName"></el-input>
        </el-form-item>
        <el-form-item label="医师手机号"
          align="left"
          prop="doctorUserPhone">
          <el-input placeholder="请输入医师手机号"
            v-Int
            maxlength="11"
            v-model.trim="searchForm.doctorUserPhone"></el-input>
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
      <el-button @click="addBtn"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-plus">新增</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">

      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="detailsBtn(scope.row)"
            type="primary">详细资料</el-button>
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from "@/components/Untable";
import { httpAdminPatient } from "@/api/admin/httpAdminPatient";
import {
  validateIdCard,
  validatePhone,
  parseTime,
  genderList,
  healthList,
  heartList,
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
      healthList,
      heartList,
      searchForm: {
        name: "",
        phone: "",
        idCard: "",
        gender: "",
        highBloodStatus: "",
        diabetesStatus: "",
        heartRateStatus: "",
        beginAge: 1,
        endAge: 120,
      },
      list: [],
      tableHeaderBig: [
        { type: "index", label: "序号" },
        { prop: "name", label: "姓名" },
        { prop: "avatarUrl", label: "照片", isImg: true },
        { prop: "idCard", label: "身份证号" },
        {
          prop: "gender",
          label: "性别",
          formatter: (row) => {
            return this.genderFormatter(row);
          },
        },
        {
          prop: "birthday",
          label: "出生日期",
          formatter: (row) => {
            return parseTime(row.birthday)?.slice(0, 10);
          },
        },
        { prop: "age", label: "年龄" },
        { prop: "phone", label: "本人电话" },
        {
          prop: "highBloodStatus",
          label: "高血压",
          formatter: (row) => {
            return this.highBloodFormatter(row);
          },
        },
        {
          prop: "diabetesStatus",
          label: "糖尿病",
          formatter: (row) => {
            return this.diabetesFormatter(row);
          },
        },
        {
          prop: "heartRateStatus",
          label: "心率",
          formatter: (row) => {
            return this.heartRateFormatter(row);
          },
        },
        { prop: "healthScore", label: "两慢指数" },
        { prop: "doctorUserName", label: "对应医师" },
        { prop: "doctorUserPhone", label: "医师手机号" },
        {
          prop: "archivesMongo.createTime",
          label: "创建时间",
          formatter: (row) => {
            return parseTime(row.archivesMongo?.createTime);
          },
        },
        { prop: "archivesMongo.createUserName", label: "创建人" },
      ],
      loading: true,
      // 医生列表跳转用户列表携带参数
      doctorId: "",
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
    this.doctorId = localStorage.getItem("doctorId");
    let pageNum = localStorage.getItem("patientNum");
    if (pageNum) {
      this.pageNum = pageNum;
    }
    this.getList();
  },
  destroyed() {
    localStorage.removeItem("doctorId");
    localStorage.removeItem("patientNum");
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
          highBloodStatus: this.searchForm.highBloodStatus,
          diabetesStatus: this.searchForm.diabetesStatus,
          heartRateStatus: this.searchForm.heartRateStatus,
          doctorUserName: this.searchForm.doctorUserName,
          doctorUserId: this.doctorId,
          doctorUserPhone: this.searchForm.doctorUserPhone,
          // beginAge: this.searchForm.beginAge,
          // endAge: this.searchForm.endAge,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
          this.loading = false;
        });
    },
    selectBeginAgeChange(val) {},
    selectEndAgeChange(val) {},
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
    addBtn() {
      this.$router.push({
        path: "/archivesManagement/details",
        query: { type: "add" },
      });
    },
    // 跳转详细资料
    detailsBtn(val) {
      this.$router.push({
        path: "/archivesManagement/details",
        query: { id: val.id, type: "edit", isArchives: val.isArchives },
      });
      localStorage.setItem("patientNum", this.pageNum);
    },
    /***** 表格格式化内容区域 *****/
    // 出生年月
    genderFormatter(row) {
      return formatterElement.gender[row.gender];
    },
    // 高血压状态
    highBloodFormatter(row) {
      return formatterElement.highBlood[row.highBloodStatus];
    },
    // 糖尿病状态
    diabetesFormatter(row) {
      return formatterElement.diabetes[row.diabetesStatus];
    },
    // 心率状态
    heartRateFormatter(row) {
      return formatterElement.heart[row.heartRateStatus];
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
