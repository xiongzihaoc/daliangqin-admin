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
          prop="doctorUserName">
          <el-input v-model="searchForm.toDoctorUserName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <!-- 用户姓名 -->
        <el-form-item label="用户姓名"
          prop="patientUserName">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <!-- 随访方式 -->
        <el-form-item label="随访方式"
          prop="type">
          <el-select v-model="searchForm.type"
            placeholder="请选择随访方式">
            <el-option v-for="item in followTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 随访时间 -->
        <el-form-item label="随访时间"
          prop="chatTime">
          <el-date-picker v-model="searchForm.taskTime"
            size="small"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <!-- 加入方式 -->
        <el-form-item label="加入方式"
          prop="resource">
          <el-select v-model="searchForm.resource"
            placeholder="请选择加入方式">
            <el-option v-for="item in resourceTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态"
          prop="status">
          <el-select v-model="searchForm.status"
            placeholder="请选择状态">
            <el-option v-for="item in statusList"
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
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="选择医生"
          prop="doctorUserId">
          <el-select style="width:100%;"
            v-model.trim="editAddForm.doctorUserId"
            placeholder="请选择医生">
            <el-option v-for="item in doctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择用户"
          prop="patientUserId">
          <el-select style="width:100%;"
            v-model.trim="editAddForm.patientUserId"
            placeholder="请选择用户">
            <el-option v-for="item in patientList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随访方式"
          prop="type">
          <el-select style="width: 100%"
            v-model="editAddForm.type"
            placeholder="请选择随访方式">
            <el-option v-for="item in followTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随访内容"
          prop="content">
          <el-input v-model.trim="editAddForm.content"
            placeholder="请输入随访内容"></el-input>
        </el-form-item>
        <el-form-item label="随访时间"
          prop="taskTime">
          <el-date-picker style="width:100%;"
            v-model="editAddForm.taskTime"
            size="small"
            @change="selectTaskTime"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
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
import { httpAdminTransfer } from "@/api/admin/httpAdminTransfer";
import {
  followTypeList,
  parseTime,
  resourceTypeList,
  statusList,
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
      statusList,
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
        toDoctorUserName: "",
        patientUserName: "",
        type: "",
        startTime: "",
        endTime: "",
        status: "",
      },
      list: [],
      doctorList: [],
      patientList: [],
      editAddForm: {
        doctorUserId: "",
        patientUserId: "",
        type: "",
        startTime: "",
        taskTime: "",
        endTime: "",
        status: "",
      },
      tableHeaderBig: [
        { type: "index", label: "序号" },
        { prop: "fromDoctorUserName", label: "医生姓名" },
        {
          prop: "transferStartTime",
          label: "转诊开始时间",
        },
        {
          prop: "transferEndTime",
          label: "转诊结束时间",
        },
        { prop: "toDoctorUserName", label: "专家姓名" },
        { prop: "", label: "转诊医院" },
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
          prop: "confirmStartTime",
          label: "确认开始时间",
          formatter: (row) => {
            return parseTime(row.startTime)?.slice(6);
          },
        },
        {
          prop: "confirmEndTime",
          label: "确认结束时间",
          formatter: (row) => {
            return parseTime(row.endTime)?.slice(6);
          },
        },
        { prop: "cancelReason", label: "拒绝原因" },
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
  mounted() {},
  methods: {
    getList() {
      httpAdminTransfer
        .getTransfer({
          page: this.pageNum,
          pageSize: this.pageSize,
          doctorUserName: this.searchForm.doctorUserName,
          patientUserName: this.searchForm.patientUserName,
          type: this.searchForm.type,
          taskStatus: this.searchForm.status,
          resource: this.searchForm.resource,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    /***** 搜索区域 *****/
    // 选择时间
    selectTaskTime(val) {
      this.editAddForm.startTime = val[0];
      this.editAddForm.endTime = val[1];
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
      this.$set(this.editAddForm, "taskTime", [val.startTime, val.endTime]);
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
      httpAdminTransfer.deleteTransfer(id).then((res) => {
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
            httpAdminTransfer.postTransfer(this.editAddForm).then((res) => {
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
            httpAdminTransfer.putTransfer(this.editAddForm).then((res) => {
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
    /***** 表格格式化内容区域 *****/
    // 随访方式
    typeFormatter(row) {
      return formatterElement.followType[row.type];
    },
    // 高血压状态
    highBloodFormatter(row) {
      return formatterElement.highBlood[row.healthStatus];
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
      console.log(row);
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
