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
          prop="heartRateStatus">
          <el-select class="w100"
            v-model="searchForm.heartRateStatus">
            <el-option v-for="item in heartList"
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
        label="检测模式"
        prop="detectType">
        <template slot-scope="scope">
          <span v-if="scope.row.detectType === 'DAILY'">日常检测</span>
          <span v-else>24小时检测</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="心率值(bpm)"
        prop="heartRateScore">
        <template slot-scope="scope">
          <span class="fw">{{scope.row.heartRateScore}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="录入方式"
        prop="name">
        <template slot-scope="scope">
          <span v-if="scope.row.equipmentResourceType === 'MANUAL'">手动录入</span>
          <span v-else>设备检测</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="检测结果"
        prop="diseaseStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.heartRateStatus === 'FAST'"
            class="SERIOUS">稍快</span>
          <span v-if="scope.row.heartRateStatus === 'NORMAL'"
            class="HEALTH">正常</span>
          <span v-if="scope.row.heartRateStatus === 'SLOW'"
            class="MEDIUM">稍慢</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="测量结果"
        prop="title">
      </el-table-column>
      <el-table-column align="center"
        label="检测日期"
        prop="inspectionTime">
        <template slot-scope="scope">
          {{parseTime(scope.row.inspectionTime)}}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="editBtn(scope.row)"
            type="primary"
            v-if="scope.row.equipmentResourceType === 'MANUAL'">编辑</el-button>
          <el-button size="mini"
            @click="examineBtn(scope.row)"
            type="primary"
            plain
            v-else>查看</el-button>
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
        :rules="FormRules"
        :model="editAddForm"
        label-width="120px">
        <el-form-item label="选择医院"
          prop="hospitalId">
          <el-select style="width:100%;"
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
          <el-select style="width:100%;"
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
        <el-form-item label="心率"
          prop="heartRateScore">
          <el-input maxlength="3"
            v-model="editAddForm.heartRateScore"
            v-Int
            oninput="if (value > 200) value = 200"
            placeholder="请输入心率"><i slot="suffix"
              style="font-style:normal;margin-right: 10px;">bpm</i></el-input>
        </el-form-item>
        <el-form-item label="检测模式"
          prop="detectType">
          <el-select class="w100"
            @change="selectPatient"
            v-model="editAddForm.detectType">
            <el-option label="日常检测"
              value="DAILY"></el-option>
            <el-option label="24小时检测"
              value="TWENTY_FOUR_HOURS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测日期"
          prop="inspectionTime">
          <el-date-picker v-model="editAddForm.inspectionTime"
            style="width:100%"
            format="yyyy-MM-dd HH:mm"
            type="datetime"
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
    <el-dialog title="提示"
      :visible.sync="hospitalDialogVisible"
      width="30%"
      v-dialogDrag>
      <el-form ref="hospitalFormRef"
        :rules="hospitalFormRules"
        :model="hospitalForm"
        label-width="120px">
        <el-form-item label="医院名称"
          prop="hospitalName">
          <el-input v-model.trim="hospitalForm.hospitalName"
            placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="姓名"
          prop="name">
          <el-input v-model.trim="hospitalForm.name"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="hospitalDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="edithospitalNameEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminHeartRate } from '@/api/admin/httpAdminHeartRate'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  parseTime,
  validateTime,
  equipmentResourceTypeList,
  heartList,
} from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      equipmentResourceTypeList,
      heartList,
      FormRules: {
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        doctorUserId: [
          { required: true, message: '请选择医生', trigger: 'blur' },
        ],
        userId: [{ required: true, message: '请选择用户', trigger: 'blur' }],
        inspectionTime: [
          { required: true, trigger: 'blur', validator: validateTime },
        ],
        glucoseScore: [
          { required: true, message: '请输入心率', trigger: 'blur' },
        ],
        detectType: [
          { required: true, message: '请选择检测模式', trigger: 'blur' },
        ],
      },
      hospitalFormRules: {
        hospitalName: [
          { required: true, message: '请输入医院名称', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      },
      searchForm: {
        patientUserName: '',
        patientUserPhone: '',
        equipmentResourceType: '',
        heartRateStatus: '',
      },
      hospitalList: [],
      doctorList: [],
      patientList: [],
      list: [],
      editAddForm: {
        name: '',
        userId: '',
        hospitalId: '',
        inspectionTime: '',
        heartRateScore: '',
        detectType: '',
      },
      hospitalForm: {
        recordId: '',
        hospitalName: '',
        name: '',
      },
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      hospitalDialogVisible: false,
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
      httpAdminHeartRate
        .getHeartRate({
          page: this.pageNum,
          pageSize: this.pageSize,
          patientUserName: this.searchForm.patientUserName,
          patientUserPhone: this.searchForm.patientUserPhone,
          equipmentResourceType: this.searchForm.equipmentResourceType,
          heartRateStatus: this.searchForm.heartRateStatus,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital().then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 获取医生列表
    getDoctorList(val) {
      httpAdminDoctor.getDoctor({ hospitalId: val }).then((res) => {
        this.doctorList = res.data.elements
      })
    },
    // 获取用户列表
    getPatientList(id) {
      httpAdminPatient.getPatient({ doctorUserId: id }).then((res) => {
        this.patientList = res.data.elements
      })
    },
    selecthospital(val) {
      this.getDoctorList(val)
      this.editAddForm.doctorUserId = ''
      this.editAddForm.patientUserId = ''
    },
    selectDoctor(val) {
      this.$forceUpdate()
      this.getPatientList(val)
      this.editAddForm.patientUserId = ''
    },
    selectPatient() {
      this.$forceUpdate()
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {}
      this.getList()
    },
    /***** 增删改 *****/
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
    // 查看
    examineBtn(val) {
      console.log(val)
      this.hospitalForm.hospitalName = val.hospitalName
      this.hospitalForm.name = val.patientUserName
      this.hospitalForm.recordId = val.id
      this.hospitalDialogVisible = true
    },
    // 修改医院名称
    edithospitalNameEnter() {
      this.$refs.hospitalFormRef.validate((valid) => {
        if (valid) {
          httpAdminHeartRate.putHospitalName(this.hospitalForm).then((res) => {
            this.hospitalDialogVisible = false
            this.getList()
            this.$router.push(
              '/archivesManagement/record/heartDetail?id=' +
                this.hospitalForm.recordId +
                '&name=' +
                this.hospitalForm.name
            )
          })
        }
      })
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === '新增') {
            // 发送请求
            httpAdminHeartRate.postHeartRate(this.editAddForm).then((res) => {
              if (res.code !== 'OK') {
                return
              } else {
                this.$notify.success({
                  title: '新增成功',
                })
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminHeartRate.putHeartRate(this.editAddForm).then((res) => {
              if (res.code !== 'OK') {
                return
              } else {
                this.$notify.success({
                  title: '编辑成功',
                })
                this.getList()
                this.editDialogVisible = false
              }
            })
          }
        }
      })
    },
    /***** 分页 *****/
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
