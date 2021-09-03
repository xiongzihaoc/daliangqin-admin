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
        <el-form-item label="监测模式"
          align="left">
          <el-select class="w100"
            v-model="searchForm.detectType"
            size="small">
            <el-option v-for="item in glucoseDetectType"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
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
          prop="diabetesStatus"
          size="small">
          <el-select class="w100"
            v-model="searchForm.diabetesStatus">
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
        label="序号"
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
        label="监测模式"
        prop="detectType"
        :formatter="detectTypeFormatter">
      </el-table-column>
      <el-table-column align="center"
        label="血糖值(mmol/L)"
        prop="glucoseScore">
        <template slot-scope="scope">
          <span class="fw">{{fomatFloat(scope.row.glucoseScore,1)}}</span>
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
        prop="diabetesStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.diabetesStatus === 'HEALTH'"
            class="HEALTH">健康</span>
          <span v-if="scope.row.diabetesStatus === 'SLIGHT'"
            class="SLIGHT">轻度</span>
          <span v-if="scope.row.diabetesStatus === 'MEDIUM'"
            class="MEDIUM">中度</span>
          <span v-if="scope.row.diabetesStatus === 'SERIOUS'"
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
            :disabled="this.infoTitle === '编辑'?true:false"
            filterable
            clearable
            @change="selecthospital"
            v-model.trim="editAddForm.hospitalId"
            placeholder="请选择医院">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生"
          prop="doctorUserId">
          <el-select class="w100"
            :disabled="this.infoTitle === '编辑'?true:false"
            filterable
            clearable
            @change="selectDoctor"
            v-model="editAddForm.doctorUserId"
            placeholder="请选择医生">
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
            :disabled="this.infoTitle === '编辑'?true:false"
            @change="selectPatient"
            filterable
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
        <el-form-item label="血糖"
          prop="glucoseScore">
          <el-input maxlength="4"
            v-model="editAddForm.glucoseScore"
            v-on:input="glucoseScoreOniput"
            placeholder="请输入血糖"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
        </el-form-item>
        <el-form-item label="监测模式"
          prop="detectType">
          <el-select class="w100"
            v-model="editAddForm.detectType">
            <el-option v-for="item in glucoseDetectType"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监测日期"
          prop="inspectionTime">
          <el-date-picker v-model="editAddForm.inspectionTime"
            class="w100"
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
import { httpAdminGlucose } from '@/api/admin/httpAdminGlucose'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  parseTime,
  validateTime,
  validateGlucoseScore,
  equipmentResourceTypeList,
  healthList,
  fomatFloat,
  glucoseDetectType,
  formatterElement,
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
      glucoseDetectType,
      formatterElement,
      fomatFloat,
      formRules: {
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        doctorUserId: [
          { required: true, message: '请选择医生', trigger: 'blur' },
        ],
        detectType: [
          { required: true, message: '请选择监测模式', trigger: 'blur' },
        ],
        userId: [{ required: true, message: '请选择用户', trigger: 'blur' }],
        inspectionTime: [
          { required: true, trigger: 'blur', validator: validateTime },
        ],
        glucoseScore: [{ required: true, trigger: 'blur' }],
      },
      searchForm: {
        patientUserName: '',
        patientUserPhone: '',
        equipmentResourceType: '',
        diabetesStatus: '',
        detectType: '',
      },
      hospitalList: [],
      doctorList: [],
      patientList: [],
      list: [],
      editAddForm: {
        name: '',
        userId: '',
        hospitalId: '',
        doctorUserId: '',
        inspectionTime: '',
        glucoseScore: '',
        detectType: '',
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
      httpAdminGlucose
        .getGlucose({
          page: this.pageNum,
          pageSize: this.pageSize,
          patientUserName: this.searchForm.patientUserName,
          patientUserPhone: this.searchForm.patientUserPhone,
          equipmentResourceType: this.searchForm.equipmentResourceType,
          diabetesStatus: this.searchForm.diabetesStatus,
          detectType: this.searchForm.detectType,
        })
        .then((res) => {
          console.log(res)
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
    // 获取医生列表
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
      this.getPatientList(val)
      this.$forceUpdate()
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
            httpAdminGlucose.postGlucose(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminGlucose.putGlucose(this.editAddForm).then((res) => {
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
    glucoseScoreOniput(e) {
      // 先把非数字的都替换掉，除了数字和.
      this.editAddForm.glucoseScore = this.editAddForm.glucoseScore.replace(
        /[^\d.]/g,
        ''
      )
      // 必须保证第一个为数字而不是.
      this.editAddForm.glucoseScore = this.editAddForm.glucoseScore.replace(
        /^\./g,
        ''
      )
      // 保证只有出现一个.而没有多个.
      this.editAddForm.glucoseScore = this.editAddForm.glucoseScore.replace(
        /\.{2,}/g,
        ''
      )
      // 保证.只出现一次，而不能出现两次以上
      this.editAddForm.glucoseScore = this.editAddForm.glucoseScore
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      let index = -1
      for (let i in this.editAddForm.glucoseScore) {
        if (this.editAddForm.glucoseScore[i] === '.') {
          index = i
        }
        if (index !== -1) {
          if (i - index > 1) {
            this.editAddForm.glucoseScore =
              this.editAddForm.glucoseScore.substring(
                0,
                this.editAddForm.glucoseScore.length - 1
              )
          }
        }
      }
      if (e > 36) {
        this.editAddForm.glucoseScore = 36
      }
    },
    /***** 表格格式化内容区域 *****/
    // 出生年月
    detectTypeFormatter(row) {
      return formatterElement.glucoseDetectType[row.detectType]
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
