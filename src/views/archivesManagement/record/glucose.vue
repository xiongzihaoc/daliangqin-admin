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
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="检测类型"
        prop="diseaseType">
        <template slot-scope="scope">
          <span v-if="scope.row.diseaseType === 'HIGH_BLOOD'">高血压</span>
          <span v-if="scope.row.diseaseType === 'DIABETES'">糖尿病</span>
          <span v-if="scope.row.diseaseType === 'HEART_RATE'">心率</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="血糖值"
        prop="glucoseScore">
           <template slot-scope="scope">
             {{scope.row.glucoseScore + 'mmol/L'}}
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
          <span v-if="scope.row.diseaseStatus === 'SERIOUS'">重度</span>
          <span v-if="scope.row.diseaseStatus === 'HEALTH'">健康</span>
          <span v-if="scope.row.diseaseStatus === 'SLIGHT'">轻度</span>
          <span v-if="scope.row.diseaseStatus === 'MEDIUM'">中度</span>
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
        <!-- 用户 -->
        <el-form-item label="选择用户"
          prop="patientId">
          <el-input v-model.trim="editAddForm.patientId"
            placeholder="请输入内容搜索"></el-input>
        </el-form-item>
        <!-- 设备 -->
        <el-form-item label="设备"
          prop="deviceId">
          <el-input v-model.trim="editAddForm.deviceId"
            placeholder="请选择设备"></el-input>
        </el-form-item>
        <!-- 病症 -->
        <el-form-item label="病症"
          prop="diseaseType">
          <el-select style="width: 100%"
            v-model="editAddForm.diseaseType"
            placeholder="请选择病症">
            <el-option v-for="item in diseaseList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 血压 -->
        <!-- 高压 -->
        <el-form-item v-if="this.editAddForm.diseaseType === 'HIGH_BLOOD'"
          label="收缩压 / 高压"
          prop="shrinkHighPressure">
          <el-input v-model="editAddForm.shrinkHighPressure"
            placeholder="请输入收缩压 / 高压"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
        </el-form-item>
        <!-- 低压 -->
        <el-form-item v-if="this.editAddForm.diseaseType === 'HIGH_BLOOD'"
          label="舒张压 / 低压"
          prop="diastoleLowPressure">
          <el-input v-model="editAddForm.diastoleLowPressure"
            placeholder="请输入舒张压 / 低压"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
        </el-form-item>
        <!-- 血糖 -->
        <el-form-item v-if="this.editAddForm.diseaseType === 'DIABETES'"
          label="空腹血糖"
          prop="diastoleLowPressure">
          <el-input v-model="editAddForm.diastoleLowPressure"
            placeholder="请输入空腹血糖"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
        </el-form-item>
        <!-- 心率 -->
        <el-form-item v-if="this.editAddForm.diseaseType === 'HEART_RATE'"
          label="心率"
          prop="diastoleLowPressure">
          <el-input v-model="editAddForm.diastoleLowPressure"
            placeholder="请输入心率"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">bpm</i></el-input>
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
import { httpAdminGlucose } from "@/api/admin/httpAdminGlucose";
import { parseTime } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      FormRules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
        ],
      },
      searchForm: {
        patientUserName: "",
        diseaseType: "",
        resource: "",
        resultType: "",
      },
      list: [],
      // 检测结果列表
      diseaseTypeList: [
        { id: 1, label: "健康", value: "HEALTH" },
        { id: 2, label: "轻微", value: "SLIGHT" },
        { id: 3, label: "中度", value: "MEDIUM" },
        { id: 4, label: "重度", value: "SERIOUS" },
        { id: 5, label: "正常", value: "NORMAL" },
        { id: 6, label: "稍慢", value: "SLOW" },
        { id: 7, label: "稍快", value: "FAST" },
      ],
      diseaseList: [
        { id: 1, label: "高血压", value: "HIGH_BLOOD" },
        { id: 2, label: "糖尿病", value: "DIABETES" },
        { id: 3, label: "心率", value: "HEART_RATE" },
      ],
      editAddForm: {
        patientId: "",
        deviceId: "",
        diseaseType: "",
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
  methods: {
    getList() {
      httpAdminGlucose
        .getGlucose({
          page: this.pageNum,
          pageSize: this.pageSize,
          title: this.searchForm.title,
          type: this.searchForm.type,
          status: this.searchForm.status,
        })
        .then((res) => {
          console.log(res);
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
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === "新增") {
            // 发送请求
            httpDetectRecord.postDetectRecord(this.editAddForm).then((res) => {
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
            httpDetectRecord.putDetectRecord(this.editAddForm).then((res) => {
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
