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
            v-model="searchForm.equipmentResourceType"
            size="small">
            <el-option v-for="item in equipmentResourceTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监测结果"
          align="left"
          prop="highBloodStatus">
          <el-select class="w100"
            v-model="searchForm.highBloodStatus"
            size="small">
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
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        label="序号" width="50"
        type="index">
      </el-table-column>
      <el-table-column align="center"
        label="姓名"
        prop="patientUserName">
        <template slot-scope="scope">
          <span style="color: #1890ff; text-decoration: underline"
            @click="skipPatient(scope.row)">{{scope.row.patientUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="手机号"
        prop="patientUserPhone">
      </el-table-column>
      <el-table-column align="center"
        label="设备名称"
        prop="name">
      </el-table-column>
      <el-table-column align="center"
        label="设备号"
        prop="serialNumber">
      </el-table-column>
      <el-table-column align="center"
        label="监测类型"
        prop="diseaseType">
        <template slot-scope="scope">
          <span v-if="scope.row.diseaseType === 'HIGH_BLOOD'">血压</span>
          <span v-if="scope.row.diseaseType === 'DIABIETS'">血糖</span>
          <span v-if="scope.row.diseaseType === 'HEART_RATE'">心率</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="收缩压(mmHg)"
        prop="shrinkHighPressure">
        <template slot-scope="scope">
          {{scope.row.shrinkHighPressure}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="舒张压(mmHg)"
        prop="diastoleLowPressure">
        <template slot-scope="scope">
          {{scope.row.diastoleLowPressure}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="录入方式"
        prop="name">
        <template slot-scope="scope">
          <span v-if="scope.row.equipmentResourceType === 'MANUAL'">手动录入</span>
          <span v-else>设备监测</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="监测结果"
        prop="diseaseStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.highBloodStatus === 'HEALTH'"
            class="HEALTH">健康</span>
          <span v-if="scope.row.highBloodStatus === 'SLIGHT'"
            class="SLIGHT">轻度</span>
          <span v-if="scope.row.highBloodStatus === 'MEDIUM'"
            class="MEDIUM">中度</span>
          <span v-if="scope.row.highBloodStatus === 'SERIOUS'"
            class="SERIOUS">重度</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="监测日期"
        prop="inspectionTime">
        <template slot-scope="scope">
          {{parseTime(scope.row.inspectionTime)}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="formRules"
        :model="editAddForm"
        label-width="120px">
        <el-form-item label="选择医院"
          prop="hospitalId">
          <el-select class="w100"
            filterable
            clearable
            @change="selecthospital"
            :disabled="this.infoTitle === '编辑'?true:false"
            v-model.trim="editAddForm.hospitalId"
            placeholder="请选择医院">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医师"
          prop="doctorUserId">
          <el-select class="w100"
            filterable
            clearable
            @change="selectDoctor"
            :disabled="this.infoTitle === '编辑'?true:false"
            v-model="editAddForm.doctorUserId"
            placeholder="请选择医师">
            <el-option v-for="item in doctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户 -->
        <el-form-item label="选择用户"
          prop="userId">
          <el-select class="w100"
            filterable
            @change="selectPatient"
            :disabled="this.infoTitle === '编辑'?true:false"
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
            oninput="if (value > 300) value = 300"
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
            oninput="if (value > 200) value = 200"
            placeholder="请输入舒张压"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
        </el-form-item>
        <el-form-item label="监测日期"
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
import EleTable from '@/components/Table'
import { httpAdminBloodPressure } from '@/api/admin/httpAdminBloodPressure'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  parseTime,
  validateTime,
  equipmentResourceTypeList,
  healthList,
} from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      equipmentResourceTypeList,
      healthList,
      formRules: {
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        doctorUserId: [
          { required: true, message: '请选择医师', trigger: 'blur' },
        ],
        userId: [{ required: true, message: '请选择用户', trigger: 'blur' }],
        inspectionTime: [
          { required: true, trigger: 'blur', validator: validateTime },
        ],
        shrinkHighPressure: [
          { required: true, message: '请输入收缩压', trigger: 'blur' },
        ],
        diastoleLowPressure: [
          { required: true, message: '请输入舒张压', trigger: 'blur' },
        ],
      },
      searchForm: {
        patientUserName: '',
        patientUserPhone: '',
        equipmentResourceType: '',
        highBloodStatus: '',
      },
      list: [],
      hospitalList: [],
      doctorList: [],
      patientList: [],
      editAddForm: {
        name: '',
        userId: '',
        hospitalId: '',
        doctorUserId: '',
        inspectionTime: '',
        shrinkHighPressure: '',
        diastoleLowPressure: '',
      },
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: '',
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getHospitalList()
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
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 获取医师列表
    getDoctorList(val) {
      httpAdminDoctor
        .getDoctor({ hospitalId: val, pageSize: 10000 })
        .then((res) => {
          this.doctorList = res.data.elements
        })
    },
    // 获取用户列表
    getPatientList(id) {
      httpAdminPatient
        .getPatient({ doctorUserId: id, pageSize: 10000 })
        .then((res) => {
          this.patientList = res.data.elements
        })
    },
    selecthospital(val) {
      this.getDoctorList(val)
      this.editAddForm.doctorUserId = ''
      this.editAddForm.userId = ''
    },
    selectDoctor(val) {
      this.$forceUpdate()
      this.getPatientList(val)
      this.editAddForm.userId = ''
    },
    selectPatient() {
      this.$forceUpdate()
    },
    /**
     * 搜索
     */
    // 搜索
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    // 重置
    searchReset() {
      this.pageNum = 1
      this.searchForm = {}
      this.getList()
    },
    /**
     * CRUD
     */
    // 新增
    addBtn() {
      this.infoTitle = '新增'
      this.doctorList = []
      this.patientList = []
      this.editAddForm = {}
      this.editDialogVisible = true
    },
    // 编辑
    editBtn(val) {
      console.log(val)
      this.getDoctorList(val.hospitalId)
      this.getPatientList(val.doctorUserId)
      this.infoTitle = '编辑'
      this.editAddForm = JSON.parse(JSON.stringify(val))
      this.editAddForm.userId = val.patientUserId
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    // 新增编辑
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === '新增') {
            // 发送请求
            httpAdminBloodPressure
              .postBloodPressure(this.editAddForm)
              .then((res) => {
                if (res.code === 'OK') {
                  this.$message.success('新增成功')
                  this.getList()
                  this.editDialogVisible = false
                }
              })
          } else {
            // 发送请求
            httpAdminBloodPressure
              .putBloodPressurer(this.editAddForm)
              .then((res) => {
                if (res.code === 'OK') {
                  this.$message.success('编辑成功')
                  this.getList()
                  this.editDialogVisible = false
                }
              })
          }
        }
      })
    },
    // 跳转用户档案
    skipPatient(val) {
      this.$router.push(
        '/archivesManagement/details?id=' +
          val.patientUserId +
          '&type=edit' +
          '&isArchives=true'
      )
    },
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getList()
    },
  },
}
</script>

<style>
</style>
