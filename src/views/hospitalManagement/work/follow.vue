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
            placeholder="请选择职位">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户"
          prop="patientUserName">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入用户"></el-input>
        </el-form-item>
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
        <el-form-item label="高血压"
          prop="highBlood">
          <el-select v-model="searchForm.highBlood"
            placeholder="请选择">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="糖尿病"
          prop="diabetes">
          <el-select v-model="searchForm.diabetes"
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
          <el-select v-model="searchForm.userStatus"
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
            icon="el-icon-download">导出</el-button>
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
        type="selection"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="index"
        label="序号"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="doctorUserName"
        label="医生姓名">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="doctorType"
        label="职位">
        <template slot-scope="scope">
          <span v-if="scope.row.doctorType === 'PHYSICIAN'">医师</span>
          <span v-else-if="scope.row.doctorType === 'ATTENDING_PHYSICIAN'">主治医师</span>
          <span v-else-if="scope.row.doctorType === 'ASSOCIATE_CHIEF_PHYSICIAN'">副主任医师</span>
          <span v-else>主任医师</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="type"
        label="随访方式">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 'CLINIC'">诊间随访</span>
          <span v-else-if="scope.row.type === 'DOOR'">上门随访</span>
          <span v-else-if="scope.row.type === 'VIDEO'">视频随访</span>
          <!-- VOICE -->
          <span v-else>语音随访</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="content"
        label="随访内容">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="patientUserName"
        label="随访用户">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="highBlood"
        label="高血压">
        <template slot-scope="scope">
          <span v-if="scope.row.highBlood === 'HEALTH'">健康</span>
          <span v-else-if="scope.row.highBlood === 'SLIGHT'">轻度</span>
          <span v-else-if="scope.row.highBlood === 'MEDIUM'">中度</span>
          <span v-else>重度</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="diabetes"
        label="糖尿病">
        <template slot-scope="scope">
          <span v-if="scope.row.diabetes === ''">健康</span>
          <span v-else-if="scope.row.diabetes === 'SLIGHT'">轻度</span>
          <span v-else-if="scope.row.diabetes === 'MEDIUM'">中度</span>
          <span v-else>重度</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="startTime"
        label="随访开始时间">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime">{{ parseTime(scope.row.startTime).slice(6) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="endTime"
        label="随访结束时间">
        <template slot-scope="scope">
          <span v-if="scope.row.endTime">{{ parseTime(scope.row.endTime).slice(6) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="userStatus"
        label="用户状态">
        <template slot-scope="scope">
          <span v-if="scope.row.userStatus === 'HEALTH'">良好</span>
          <span v-else-if="scope.row.userStatus === 'SLIGHT'">轻微</span>
          <span v-else>严重</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="updateTime"
        label="操作时间">
        <template slot-scope="scope">
          <span>{{parseTime(scope.row.updateTime)}}</span>
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
import { validatePhone } from "@/utils/index";
import { httpHospitalFollow } from "@/api/hospital/httpHospitalFollow";
import { parseTime } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      // 表单验证规则
      FormRules: {
        adminPhone: [
          { required: true, trigger: "blur", validator: validatePhone },
        ],
      },
      // 搜索表单
      searchForm: {
        doctorUserName: "",
        doctorType: "",
        patientUserName: "",
        type: "",
        highBlood: "",
        diabetes: "",
        startTime: "",
        endTime: "",
        userStatus: "",
      },
      // 列表数据
      list: [],
      // 随访方式列表
      followTypeList: [
        { id: 1, label: "诊间随访", value: "CLINIC" },
        { id: 2, label: "上门随访", value: "DOOR" },
        { id: 3, label: "视频随访", value: "VIDEO" },
        { id: 4, label: "语音随访", value: "VOICE" },
      ],
      healthList: [
        { id: 1, label: "健康", value: "HEALTH" },
        { id: 2, label: "轻微", value: "SLIGHT  " },
        { id: 3, label: "中度", value: "MEDIUM" },
        { id: 4, label: "重度", value: "SERIOUS" },
      ],
      userStatusList: [
        { id: 1, label: "良好", value: "HEALTH" },
        { id: 2, label: "轻微", value: "SLIGHT  " },
        { id: 3, label: "严重", value: "SERIOUS" },
      ],
      doctorTypeList: [
        { id: 1, label: "医师", value: "PHYSICIAN" },
        { id: 2, label: "主治医师", value: "ATTENDING_PHYSICIAN" },
        { id: 3, label: "副主任医师", value: "ASSOCIATE_CHIEF_PHYSICIAN" },
        { id: 4, label: "主任医师", value: "CHIEF_PHYSICIAN" },
      ],
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
      httpHospitalFollow
        .getFollowList({
          page: this.pageNum,
          pageSize: this.pageSize,
          doctorUserName: this.searchForm.doctorUserName,
          doctorType: this.searchForm.doctorType,
          patientUserName: this.searchForm.patientUserName,
          type: this.searchForm.type,
          highBlood: this.searchForm.highBlood,
          diabetes: this.searchForm.diabetes,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          userStatus: this.searchForm.userStatus,
        })
        .then((res) => {
          console.log(res);
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
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {};
      this.getList()
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