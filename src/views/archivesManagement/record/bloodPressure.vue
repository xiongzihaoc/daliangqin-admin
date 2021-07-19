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
          prop="patientUserName">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="patientUserPhone">
          <el-input v-model="searchForm.patientUserPhone"
            size="small"
            maxlength="11"
            v-Int
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="录入方式"
          align="left"
          prop="equipmentResourceType">
          <el-select class="w100"
            v-model="searchForm.equipmentResourceType">
            <el-option v-for="item in equipmentResourceTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测结果"
          align="left"
          prop="highBloodStatus">
          <el-select class="w100"
            v-model="searchForm.highBloodStatus">
            <el-option v-for="item in healthList"
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
    <el-button @click="addBtn"
      type="primary"
      class="tableAdd"
      size="small"
      plain
      icon="el-icon-plus">新增</el-button>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="检测类型"
        prop="diseaseType">
        <template slot-scope="scope">
          <span v-if="scope.row.diseaseType === 'HIGH_BLOOD'">血压</span>
          <span v-if="scope.row.diseaseType === 'DIABIETS'">血糖</span>
          <span v-if="scope.row.diseaseType === 'HEART_RATE'">心率</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="收缩压"
        prop="shrinkHighPressure">
        <template slot-scope="scope">
          {{scope.row.shrinkHighPressure + 'mmHg'}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="舒张压"
        prop="diastoleLowPressure">
        <template slot-scope="scope">
          {{scope.row.diastoleLowPressure + 'mmHg'}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="录入方式"
        prop="name">
        <template slot-scope="scope">
          <span v-if="scope.row.equipmentResourceType === 'MANUAL'">手动录入</span>
          <span v-else>设备检测</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="检测结果"
        prop="diseaseStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.highBloodStatus === 'SERIOUS'">重度</span>
          <span v-if="scope.row.highBloodStatus === 'HEALTH'">健康</span>
          <span v-if="scope.row.highBloodStatus === 'SLIGHT'">轻度</span>
          <span v-if="scope.row.highBloodStatus === 'MEDIUM'">中度</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="检测日期"
        prop="inspectionTime">
        <template slot-scope="scope">
          {{parseTime(scope.row.inspectionTime)}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
          <!-- <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button> -->
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
        label-width="120px">
        <!-- 用户 -->
        <el-form-item label="选择用户"
          prop="userId">
          <el-select class="w100"
            filterable
            @change="selectPatient"
            v-model="editAddForm.userId">
            <el-option v-for="item in patientList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备"
          prop="name">
          <el-input v-model.trim="editAddForm.name"
            placeholder="请输入设备"></el-input>
        </el-form-item>
        <!-- 高压 -->
        <el-form-item label="收缩压"
          prop="shrinkHighPressure">
          <el-input maxlength="3"
            v-model="editAddForm.shrinkHighPressure"
            v-Int
            placeholder="请输入收缩压"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
        </el-form-item>
        <!-- 低压 -->
        <el-form-item label="舒张压"
          prop="diastoleLowPressure">
          <el-input maxlength="3"
            v-model="editAddForm.diastoleLowPressure"
            v-Int
            placeholder="请输入舒张压"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
        </el-form-item>
        <el-form-item label="检测日期"
          prop="inspectionTime">
          <el-date-picker v-model="editAddForm.inspectionTime"
            style="width:100%"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="timestamp"
            placeholder="选择日期">
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
import { httpAdminBloodPressure } from "@/api/admin/httpAdminBloodPressure";
import { httpAdminPatient } from "@/api/admin/httpAdminPatient";
import { parseTime, validateTime,equipmentResourceTypeList,healthList } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      equipmentResourceTypeList,
      healthList,
      FormRules: {
        userId: [{ required: true, message: "请选择用户", trigger: "blur" }],
        inspectionTime: [
          { required: true, trigger: "blur", validator: validateTime },
        ],
        shrinkHighPressure: [
          { required: true, message: "请输入收缩压", trigger: "blur" },
        ],
        diastoleLowPressure: [
          { required: true, message: "请输入舒张压", trigger: "blur" },
        ],
      },
      searchForm: {
        patientUserName: "",
        patientUserPhone: "",
        equipmentResourceType: "",
        highBloodStatus: "",
      },
      list: [],
      patientList: [],
      editAddForm: {
        userId: "",
        name: "",
        inspectionTime: "",
        shrinkHighPressure: "",
        diastoleLowPressure: "",
      },
      tableHeaderBig: [
        { label: "序号", type: "index" },
        { label: "姓名", prop: "patientUserName" },
        { label: "手机号", prop: "patientUserPhone" },
        { label: "设备名称", prop: "name" },
        { label: "设备号", prop: "serialNumber" },
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
    this.getPatientList();
  },
  methods: {
    getList() {
      httpAdminBloodPressure
        .getBloodPressure({
          page: this.pageNum,
          pageSize: this.pageSize,
          patientUserName: this.searchForm.patientUserName,
          patientUserPhone: this.searchForm.patientUserPhone,
          equipmentResourceType: this.searchForm.equipmentResourceType,
          highBloodStatus: this.searchForm.highBloodStatus,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    getPatientList() {
      httpAdminPatient
        .getPatient({
          page: 1,
          pageSize: 100,
        })
        .then((res) => {
          console.log(res);
          this.patientList = res.data.elements;
        });
    },
    selectPatient() {
      this.$forceUpdate();
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
    addBtn() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    // 编辑
    editBtn(val) {
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editAddForm.userId = val.patientUserId;
      this.editDialogVisible = true;
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
            httpAdminBloodPressure
              .postBloodPressure(this.editAddForm)
              .then((res) => {
                if (res.code !== "OK") {
                  return;
                } else {
                  this.$notify.success({
                    title: "新增成功",
                  });
                  this.getList();
                  this.editDialogVisible = false;
                }
              });
          } else {
            // 发送请求
            httpAdminBloodPressure
              .putBloodPressurer(this.editAddForm)
              .then((res) => {
                if (res.code !== "OK") {
                  return;
                } else {
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
