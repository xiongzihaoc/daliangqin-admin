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
          align="left">
          <el-input v-model="searchForm.doctorUserName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生手机号"
          align="left">
          <el-input v-model="searchForm.doctorUserPhone"
            size="small"
            maxlength="11"
            placeholder="请输入医生手机号"></el-input>
        </el-form-item>
        <el-form-item label="医院名称"
          align="left">
          <el-select v-model="searchForm.hospitalId"
            size="small"
            filterable
            placeholder="请选择医院">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 随访方式 -->
        <el-form-item label="随访方式"
          prop="type">
          <el-select v-model="searchForm.type"
            placeholder="请选择随访方式"
            size="small">
            <el-option v-for="item in followTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户姓名 -->
        <el-form-item label="随访用户">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入随访用户"></el-input>
        </el-form-item>
        <!-- 随访时间 -->
        <el-form-item label="随访时间">
          <el-date-picker v-model="searchForm.taskTime"
            type="daterange"
            align="right"
            size="small"
            unlink-panels
            value-format='timestamp'
            @change="searchTaskTimeChange"
            :default-time="defaultTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <!-- 加入方式 -->
        <el-form-item label="加入方式">
          <el-select v-model="searchForm.resource"
            placeholder="请选择加入方式"
            size="small">
            <el-option v-for="item in resourceTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-select v-model="searchForm.status"
            placeholder="请选择状态"
            size="small">
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
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="formRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="选择医院"
          prop="hospitalId">
          <el-select style="width:100%;"
            filterable
            clearable
            :disabled="this.infoTitle === '编辑'?true:false"
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
            :disabled="this.infoTitle === '编辑'?true:false"
            @change="selectDoctor"
            v-model="editAddForm.doctorUserId"
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
            filterable
            clearable
            :disabled="this.infoTitle === '编辑'?true:false"
            @change="selectPatient"
            v-model="editAddForm.patientUserId"
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
            type="textarea"
            :rows="5"
            placeholder="请输入随访内容"></el-input>
        </el-form-item>
        <el-form-item label="随访时间"
          prop="taskTime">
          <el-date-picker class="w100"
            v-model="editAddForm.taskTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format='timestamp'
            @change="selectTaskTime"
            :default-time="defaultTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
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
import EleTable from '@/components/Untable'
import { httpAdminTask } from '@/api/admin/httpAdminTask'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  followTypeList,
  parseTime,
  resourceTypeList,
  statusList,
  formatterElement,
} from '@/utils/index'

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
      formRules: {
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        doctorUserId: [
          { required: true, message: '请选择医生', trigger: 'blur' },
        ],
        patientUserId: [
          { required: true, message: '请选择用户', trigger: 'blur' },
        ],
        type: [{ required: true, message: '请选择随访方式', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        taskTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
      },
      searchForm: {
        doctorUserName: '',
        doctorUserPhone: '',
        patientUserName: '',
        patientPhone: '',
        hospitalId: '',
        type: '',
        startTime: '',
        endTime: '',
        status: '',
      },
      list: [],
      hospitalList: [],
      doctorList: [],
      patientList: [],
      editAddForm: {
        hospitalId: '',
        doctorUserId: '',
        patientUserId: '',
        type: '',
        startTime: '',
        taskTime: '',
        endTime: '',
        status: '',
      },
      tableHeaderBig: [
        { type: 'index', label: '序号' },
        { prop: 'doctorUserName', label: '医生姓名' },
        { prop: 'doctorUserPhone', label: '医生手机号' },
        { prop: 'hospitalName', label: '医院名称' },
        {
          prop: 'type',
          label: '随访方式',
          formatter: (row) => {
            return this.typeFormatter(row)
          },
        },
        { prop: 'content', label: '随访内容', isTooltip: true },
        { prop: 'patientUserName', label: '随访用户' },
        { prop: 'patientPhone', label: '用户手机号' },
        {
          prop: 'highBloodStatus',
          label: '高血压',
          formatter: (row) => {
            return this.highBloodFormatter(row)
          },
        },
        {
          prop: 'diabetesStatus',
          label: '糖尿病',
          formatter: (row) => {
            return this.diabetesFormatter(row)
          },
        },
        {
          prop: 'heartRateStatus',
          label: '心率',
          formatter: (row) => {
            return this.heartRateFormatter(row)
          },
        },
        {
          prop: 'startTime',
          label: '预计开始时间',
          formatter: (row) => {
            return parseTime(row.startTime)
          },
        },
        {
          prop: 'endTime',
          label: '预计结束时间',
          formatter: (row) => {
            return parseTime(row.endTime)
          },
        },
        {
          prop: 'createTime',
          label: '创建时间',
          formatter: (row) => {
            return parseTime(row.createTime)
          },
        },
        {
          prop: 'resource',
          label: '加入方式',
          formatter: (row) => {
            return this.resourceFormatter(row)
          },
        },
        {
          prop: 'status',
          label: '状态',
          formatter: (row) => {
            return this.statusFormatter(row)
          },
        },
        {
          prop: 'cancelTime',
          label: '取消时间',
          formatter: (row) => {
            return parseTime(row.cancelTime)
          },
        },
        { prop: 'cancelReason', label: '取消原因' },
      ],
      defaultTime: ['00:00:00', '23:59:59'],
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const start = new Date(new Date().toLocaleDateString()).getTime()
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const start =
                new Date(new Date().toLocaleDateString()).getTime() -
                3600 * 1000 * 24 * 6
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const start =
                new Date(new Date().toLocaleDateString()).getTime() -
                3600 * 1000 * 24 * 30
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
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
      httpAdminTask
        .getTask({
          page: this.pageNum,
          pageSize: this.pageSize,
          doctorUserName: this.searchForm.doctorUserName,
          doctorUserPhone: this.searchForm.doctorUserPhone,
          patientUserName: this.searchForm.patientUserName,
          patientPhone: this.searchForm.patientPhone,
          hospitalId: this.searchForm.hospitalId,
          type: this.searchForm.type,
          taskStatus: this.searchForm.status,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          resourceType: this.searchForm.resource,
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
    /**
     * 搜索
     */
    // 搜索选择时间
    searchTaskTimeChange(val) {
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
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
    // 选择时间
    selectTaskTime(val) {
      this.editAddForm.startTime = val[0]
      this.editAddForm.endTime = val[1]
    },
    // 新增
    addBtn() {
      this.infoTitle = '新增'
      this.editAddForm = {}
      this.doctorList = []
      this.patientList = []
      this.editDialogVisible = true
    },
    // 编辑
    editBtn(val) {
      this.getDoctorList(val.hospitalId)
      this.getPatientList(val.doctorUserId)
      this.infoTitle = '编辑'
      this.editAddForm = JSON.parse(JSON.stringify(val))
      this.$set(this.editAddForm, 'taskTime', [val.startTime, val.endTime])
      this.editDialogVisible = true
    },
    // 删除
    async deleteBtn(id) {
      const confirmResult = await this.$confirm(
        '你确定要执行此操作, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => console.log(err))
      if (confirmResult != 'confirm') {
        return this.$message.info('取消删除')
      }
      // 发送请求
      httpAdminTask.deleteTask(id).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('删除成功')
          this.getList()
        }
      })
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
            httpAdminTask.postTask(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminTask.putTask(this.editAddForm).then((res) => {
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
    /***** 表格格式化内容区域 *****/
    // 随访方式
    typeFormatter(row) {
      return formatterElement.followType[row.type]
    },
    // 高血压状态
    highBloodFormatter(row) {
      switch (row.highBloodStatus) {
        case 'HEALTH':
          return `<span class='HEALTH'>健康</span>`
        case 'SLIGHT':
          return `<span class='SLIGHT'>轻度</span>`
        case 'MEDIUM':
          return `<span class='MEDIUM'>中度</span>`
        case 'SERIOUS':
          return `<span class='SERIOUS'>重度</span>`
      }
    },
    // 糖尿病状态
    diabetesFormatter(row) {
      switch (row.diabetesStatus) {
        case 'HEALTH':
          return `<span class='HEALTH'>健康</span>`
        case 'SLIGHT':
          return `<span class='SLIGHT'>轻度</span>`
        case 'MEDIUM':
          return `<span class='MEDIUM'>中度</span>`
        case 'SERIOUS':
          return `<span class='SERIOUS'>重度</span>`
      }
    },
    // 心率状态
    heartRateFormatter(row) {
      switch (row.heartRateStatus) {
        case 'NORMAL':
          return `<span class='HEALTH'>正常</span>`
        case 'SLOW':
          return `<span class='MEDIUM'>稍慢</span>`
        case 'FAST':
          return `<span class='SERIOUS'>稍快</span>`
      }
    },
    // 加入方式
    resourceFormatter(row) {
      return formatterElement.resource[row.resource]
    },
    // 状态
    statusFormatter(row) {
      return formatterElement.status[row.status]
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
