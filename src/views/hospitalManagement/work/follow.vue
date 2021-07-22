<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医生姓名"
          prop="doctorUserName">
          <el-input v-model="searchForm.doctorUserName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          prop="doctorType">
          <el-select v-model="searchForm.doctorType"
            size="small"
            placeholder="请选择职位">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称"
          prop="doctorType">
          <el-input placeholder="请输入医院名称"
            v-model="searchForm.hoslitalName"></el-input>
        </el-form-item>
        <el-form-item label="随访方式"
          prop="type">
          <el-select v-model="searchForm.type"
            size="small"
            placeholder="请选择随访方式">
            <el-option v-for="item in followTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随访用户"
          prop="patientUserName">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入随访用户"></el-input>
        </el-form-item>
        <el-form-item label="随访类型"
          prop="diseaseType">
          <el-select v-model="searchForm.diseaseType"
            size="small"
            placeholder="请选择随访类型">
            <el-option v-for="item in followType"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="高血压"
          prop="highBloodStatus">
          <el-select v-model="searchForm.highBloodStatus"
            size="small"
            placeholder="请选择">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="糖尿病"
          prop="diabetesStatus">
          <el-select v-model="searchForm.diabetesStatus"
            size="small"
            placeholder="请选择">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随访时间"
          prop="chatTime">
          <el-date-picker v-model="searchForm.followTime"
            size="small"
            @change="selectFollowTime"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户状态"
          prop="userStatus">
          <el-select size="small"
            v-model="searchForm.userStatus"
            placeholder="请选择用户状态">
            <el-option v-for="item in userStatusList"
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
          <el-button size="small"
            type="success"
            icon="el-icon-upload2">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      <el-table-column align="center"
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column align="center"
        label="医生姓名"
        prop="doctorUserName">
      </el-table-column>
      <el-table-column align="center"
        label="职位"
        :formatter="doctorTypeFormatter"
        prop="doctorType">
      </el-table-column>
      <el-table-column align="center"
        label="医院名称"
        prop="hospitalName">
      </el-table-column>
      <el-table-column align="center"
        label="随访方式"
        :formatter="typeFormatter"
        prop="type">
      </el-table-column>
      <el-table-column align="center"
        label="随访备注"
        prop="content">
      </el-table-column>
      <el-table-column align="center"
        label="随访用户"
        prop="patientUserName">
      </el-table-column>
      <el-table-column align="center"
        label="随访类型"
        :formatter="diseaseTypeFormatter"
        prop="diseaseType">
      </el-table-column>
      <el-table-column align="center"
        label="高血压"
        :formatter="highBloodStatusFormatter"
        prop="highBloodStatus">
      </el-table-column>
      <el-table-column align="center"
        :formatter="diabetesStatusFormatter"
        label="糖尿病"
        prop="diabetesStatus">
      </el-table-column>
      <el-table-column align="center"
        :formatter="heartRateStatus"
        label="心率"
        prop="heartRateStatus">
      </el-table-column>
      <el-table-column align="center"
        label="随访开始时间"
        :formatter="(row)=>{return parseTime(row.startTime)}"
        prop="startTime">
      </el-table-column>
      <el-table-column align="center"
        label="随访结束时间"
        :formatter="(row)=>{return parseTime(row.endTime)}"
        prop="endTime">
      </el-table-column>
      <el-table-column align="center"
        label="用户状态"
        :formatter="userStatusFormatter"
        prop="userStatus">
      </el-table-column>
      <el-table-column align="center"
        label="操作时间"
        :formatter="(row)=>{return parseTime(row.updateTime)}"
        prop="updateTime">
      </el-table-column>
      <el-table-column align="center"
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
  </div>
</template>
<script>
import EleTable from "@/components/Table";
import { httpAdminFollow } from "@/api/admin/httpAdminFollow";
import {
  doctorTypeList,
  followTypeList,
  followType,
  healthList,
  userStatusList,
  parseTime,
  formatterElement,
} from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      // 医生类型列表
      doctorTypeList,
      // 随访方式列表
      followTypeList,
      followType,
      healthList,
      userStatusList,
      // 搜索表单
      searchForm: {
        doctorUserName: "",
        doctorType: "",
        hospitalName: "",
        patientUserName: "",
        diseaseType: "",
        type: "",
        highBloodStatus: "",
        diabetesStatus: "",
        startTime: "",
        endTime: "",
        userStatus: "",
      },
      // 列表数据
      list: [],
      // 增改表单
      editAddForm: {
        fromUserName: "",
        contract: "",
        address: "",
      },
      // 表格数据
      tableHeaderBig: [],
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
      httpAdminFollow
        .getFollow({
          page: this.pageNum,
          pageSize: this.pageSize,
          doctorName: this.searchForm.doctorUserName,
          doctorType: this.searchForm.doctorType,
          patientName: this.searchForm.patientUserName,
          hospitalName: this.searchForm.hospitalName,
          type: this.searchForm.type,
          diseaseType: this.searchForm.diseaseType,
          highBloodStatus: this.searchForm.highBloodStatus,
          diabetesStatus: this.searchForm.diabetesStatus,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          userStatus: this.searchForm.userStatus,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 日期控件选择事件
    selectFollowTime(val) {
      this.searchForm.startTime = val[0];
      this.searchForm.endTime = val[1];
      console.log(this.searchForm);
    },
    addBtn() {
      this.$router.push({
        path: "/hospitalManagement/work/followDetail",
      });
    },
    // 编辑
    editBtn(val) {
      this.$router.push({
        path: "/hospitalManagement/work/followDetail?id=" + val.id + '&type=edit',
      });
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
      httpAdminFollow.deleteFollow(id).then((res) => {
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
            httpAdminFollow.postFollow(this.editAddForm).then((res) => {
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
            httpAdminFollow.putFollow(this.editAddForm).then((res) => {
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
    /***** 表格格式化内容 *****/
    doctorTypeFormatter(row) {
      return formatterElement.doctorType[row.doctorType];
    },
    typeFormatter(row) {
      return formatterElement.followType[row.type];
    },
    highBloodStatusFormatter(row) {
      return formatterElement.highBlood[row.highBloodStatus];
    },
    diabetesStatusFormatter(row) {
      return formatterElement.diabetes[row.diabetesStatus];
    },
    diseaseTypeFormatter(row) {
      return formatterElement.followTypeList[row.diseaseType];
    },
    heartRateStatus(row) {
      return formatterElement.heart[row.heartRateStatus];
    },
    userStatusFormatter(row) {
      return formatterElement.userStatus[row.userStatus];
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