<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <!-- 医生姓名 -->
        <el-form-item label="医生姓名"
          align="left"
          prop="fromDoctorUserName">
          <el-input v-model="searchForm.fromDoctorUserName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <!-- 专家姓名 -->
        <el-form-item label="专家姓名"
          align="left"
          prop="toDoctorUserName">
          <el-input v-model="searchForm.toDoctorUserName"
            size="small"
            placeholder="请输入专家姓名"></el-input>
        </el-form-item>
        <!-- 用户姓名 -->
        <el-form-item label="转诊用户"
          prop="patientUserName">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入转诊用户"></el-input>
        </el-form-item>
        <el-form-item label="转诊时间"
          prop="chatTime">
          <el-date-picker v-model="searchForm.transferTime"
            size="small"
            type="datetimerange"
            @change="selectTransferTime"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <!-- 加入方式 -->
        <el-form-item label="转诊状态"
          prop="transferStatus">
          <el-select v-model="searchForm.transferStatus"
            placeholder="请选择转诊状态">
            <el-option v-for="item in transferStatusList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="确认时间"
          prop="chatTime">
          <el-date-picker v-model="searchForm.confirmTime"
            size="small"
            type="datetimerange"
            @change="selectconfirmTime"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
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
          <el-button size="small"
            type="success"
            icon="el-icon-upload2">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
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
  </div>
</template>
<script>
import EleTable from "@/components/Table";
import { httpAdminTransfer } from "@/api/admin/httpAdminTransfer";
import {
  followTypeList,
  parseTime,
  resourceTypeList,
  transferStatusList,
  formatterElement,
} from "@/utils/index";

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      // 随访列表
      followTypeList,
      // 加入方式
      resourceTypeList,
      transferStatusList,
      FormRules: {
        doctorUserId: [
          { required: true, message: "请选择医生名称", trigger: "blur" },
        ],
        patientUserId: [
          { required: true, message: "请选择用户名称", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择随访方式", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        taskTime: [{ required: true, message: "请选择时间", trigger: "blur" }],
      },
      searchForm: {
        fromDoctorUserName: "",
        toDoctorUserName: "",
        patientUserName: "",
        confirmStartTime: "",
        confirmEndTime: "",
        transferStartTime: "",
        transferEndTime: "",
        transferStatus: "",
        transferTime: "",
        confirmTime: "",
      },
      list: [],
      tableHeaderBig: [
        { type: "index", label: "序号" },
        { prop: "fromDoctorUserName", label: "医生姓名" },
        {
          prop: "transferTime",
          label: "转诊时间",
          formatter: (row) => {
            return parseTime(row.transferTime);
          },
        },
        { prop: "toDoctorUserName", label: "专家姓名" },
        { prop: "hospitalName", label: "转诊医院" },
        { prop: "patientUserName", label: "转诊用户" },
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
          prop: "transferStatus",
          label: "转诊状态",
          formatter: (row) => {
            return this.transferStatusFormatter(row);
          },
        },

        {
          prop: "confirmTime",
          label: "确认时间",
          formatter: (row) => {
            return parseTime(row.confirmTime);
          },
        },
        { prop: "cancelReason", label: "拒绝原因" },
      ],
      // 分页区域
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
      httpAdminTransfer
        .getTransfer({
          page: this.pageNum,
          pageSize: this.pageSize,
          fromDoctorUserName: this.searchForm.fromDoctorUserName,
          toDoctorUserName: this.searchForm.toDoctorUserName,
          patientUserName: this.searchForm.patientUserName,
          transferStartTime: this.searchForm.transferStartTime,
          transferEndTime: this.searchForm.transferEndTime,
          confirmStartTime: this.searchForm.confirmStartTime,
          confirmEndTime: this.searchForm.confirmEndTime,
          transferStatus: this.searchForm.transferStatus,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    /***** 搜索区域 *****/
    // 选择转诊时间
    selectTransferTime(val) {
      console.log(val);
      this.searchForm.transferStartTime = val[0];
      this.searchForm.transferEndTime = val[1];
    },
    // 选择确认时间
    selectconfirmTime(val) {
      this.searchForm.confirmStartTime = val[0];
      this.searchForm.confirmEndTime = val[1];
    },
    // 搜索
    searchBtn() {
      this.getList();
    },
    // 重置
    searchReset() {
      this.searchForm = {};
      this.getList();
    },
    /***** 表格格式化内容区域 *****/
    // 随访方式
    typeFormatter(row) {
      return formatterElement.followType[row.type];
    },
    // 高血压状态
    highBloodFormatter(row) {
      return formatterElement.highBlood[row.highBloodStatus];
    },
    // 糖尿病状态
    diabetesFormatter(row) {
      return formatterElement.diabetes[row.diabetesStatus];
    },
    // 加入方式
    resourceFormatter(row) {
      return formatterElement.resource[row.resource];
    },
    // 状态
    transferStatusFormatter(row) {
      return formatterElement.transferStatus[row.transferStatus];
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
