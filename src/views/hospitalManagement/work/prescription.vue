<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        :inline="true"
        class="searchForm">
        <el-form-item label="医师姓名"
          align="left">
          <el-input v-model="searchForm.doctorName"
            size="small"
            placeholder="请输入医师姓名"></el-input>
        </el-form-item>
        <el-form-item label="医师手机号"
          align="left">
          <el-input v-model="searchForm.doctorPhone"
            v-Int
            maxlength="11"
            size="small"
            placeholder="请输入医师手机号"></el-input>
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
        <el-form-item label="职位"
          align="left"
          prop="type">
          <el-select v-model="searchForm.doctorType"
            placeholder="请选择职位"
            size="small">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名"
          align="left">
          <el-input v-model="searchForm.patientName"
            size="small"
            placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号"
          align="left">
          <el-input v-model="searchForm.patientPhone"
            v-Int
            maxlength="11"
            size="small"
            placeholder="请输入医师手机号"></el-input>
        </el-form-item>
        <el-form-item label="高血压">
          <el-select v-model="searchForm.highBloodStatus"
            size="small"
            placeholder="请选择">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="糖尿病">
          <el-select v-model="searchForm.diabetesStatus"
            size="small"
            placeholder="请选择">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="心率">
          <el-select v-model="searchForm.heartRateStatus"
            size="small"
            placeholder="请选择">
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
          <el-button size="small"
            type="success"
            icon="el-icon-download">导入</el-button>
          <el-button size="small"
            type="success"
            @click="templateSet"
            icon="el-icon-setting">模板配置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格操作按钮 -->
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
        <el-form-item label="医院名称"
          prop="doctorUserId">
          <el-select v-model="editAddForm.hospitalId"
            @change="selectHospital"
            :disabled="this.infoTitle == '编辑' ? true : false"
            style="width: 100%">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医师姓名"
          prop="doctorUserId">
          <el-select v-model="editAddForm.doctorUserId"
            @change="selectDoctor"
            :disabled="this.infoTitle == '编辑' ? true : false"
            style="width: 100%">
            <el-option v-for="item in doctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名"
          prop="patientUserId">
          <el-select v-model="editAddForm.patientUserId"
            clearable
            filterable
            :filter-method="filterPatient"
            @clear="clearSelectPatient"
            @change="selectPatient"
            :disabled="this.infoTitle == '编辑' ? true : false"
            style="width: 100%">
            <el-option v-for="item in patientList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择模板"
          prop="templates">
          <el-select multiple
            clearable
            class="w100"
            @change="selectTemplate"
            value-key="id"
            v-model="editAddForm.templates">
            <el-option v-for="item in templateList"
              :key="item.id"
              :label="item.name"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <div v-for="(item,index) in editAddForm.templates"
          :key="index">
          <div style="margin: 0 0 20px 30px;color:#1890FF"
            class="fw">处方内容{{index + 1}}</div>
          <el-form-item label="标题"
            prop="templateContent">
            <el-input disabled
              v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item label="内容"
            prop="templateContent">
            <el-input type="textarea"
              :rows="5"
              v-model="item.content"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 模板配置页面 -->
    <el-dialog title="模板配置"
      :visible.sync="templateDialogVisible"
      width="60%"
      ref="templateDialogRef"
      v-dialogDrag>
      <div>
        <el-button @click="templateAdd"
          type="primary"
          class="tableAdd"
          size="small"
          plain
          icon="el-icon-plus">新增</el-button>
      </div>
      <el-table :data="templateList"
        style="width: 100%">
        <el-table-column align="center"
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column align="center"
          label="模板标题"
          prop="name">
        </el-table-column>
        <el-table-column align="center"
          label="模板内容"
          prop="content"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center"
          label="创建人"
          prop="userName">
        </el-table-column>
        <el-table-column align="center"
          label="创建时间"
          :formatter="(row)=>{ return parseTime(row.createTime)}"
          prop="createTime">
        </el-table-column>
        <el-table-column align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
              type="primary"
              @click="editTemplateBtn(scope.row)">编辑</el-button>
            <el-button size="mini"
              type="danger"
              @click="deleteTemplateBtn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 模板配置分页 -->
      <el-pagination background
        @size-change="templateSizeChange"
        @current-change="templateCurrentChange"
        :current-page="templatePageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="templatePageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="templateTotal"
        class="el-pagination-style"></el-pagination>
    </el-dialog>
    <el-dialog :title="templateSetTitle"
      :visible.sync="templateSetDialogVisible"
      width="40%"
      @closed="templateSetDialogClosed"
      v-dialogDrag>
      <el-form ref="templateFormRef"
        :rules="templateformRules"
        :model="templateForm"
        label-width="100px">
        <el-form-item label="模板标题"
          prop="name">
          <el-input v-model="templateForm.name"
            placeholder="请输入模板标题"></el-input>
        </el-form-item>
        <el-form-item label="处方内容"
          prop="content">
          <el-input v-model="templateForm.content"
            type="textarea"
            :rows="10"
            placeholder="请输入模处方内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="templateSetDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="templateSetDialogEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Untable'
import { httpAdminUserTemplate } from '@/api/admin/httpAdminUserTemplate'
import { httpAdminTemplate } from '@/api/admin/httpAdminTemplate'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import {
  parseTime,
  doctorTypeList,
  genderList,
  healthList,
  heartList,
  formatterElement,
} from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      doctorTypeList,
      healthList,
      heartList,
      genderList,
      formRules: {
        doctorUserId: [
          { required: true, message: '请选择医师', trigger: 'blur' },
        ],
        patientUserId: [
          { required: true, message: '请选择用户', trigger: 'blur' },
        ],
        templates: [{ required: true, message: '请选择模板', trigger: 'blur' }],
      },
      searchForm: {
        doctorName: '',
        doctorPhone: '',
        doctorType: '',
        hospitalId: '',
        hospitalId: '',
        patientPhone: '',
        highBloodStatus: '',
        diabetesStatus: '',
        heartRateStatus: '',
      },
      list: [],
      templateList: [],
      hospitalList: [],
      doctorList: [],
      patientList: [],
      userId: '',
      editAddForm: {
        hospitalId: '',
        doctorUserId: '',
        patientUserId: '',
        templates: [],
        content: '',
      },
      selectDoctorId: '', // 选择医师的id
      selectPatientUserName: '', // 搜索用户的姓名
      tableHeaderBig: [
        { type: 'index', label: '序号', width: 50 },
        { prop: 'doctorName', label: '医师姓名' },
        { prop: 'doctorPhone', label: '医师手机号' },
        { prop: 'hospitalName', label: '医院名称' },
        {
          prop: 'doctorType',
          label: '职位',
          formatter: (row) => {
            return this.doctorTypeFormatter(row)
          },
        },
        {
          prop: 'createTime',
          label: '开具时间',
          formatter: (row) => {
            return parseTime(row.createTime)
          },
        },
        { prop: 'templateNames', label: '选用模板', isTooltip: true },
        { prop: 'templateContents', label: '处方内容', isTooltip: true },
        { prop: 'patientName', label: '用户姓名' },
        { prop: 'patientPhone', label: '用户手机号' },
        {
          prop: 'highBloodStatus',
          label: '高血压',
          formatter: (row) => {
            return this.highBloodStatusFormatter(row)
          },
        },
        {
          prop: 'diabetesStatus',
          label: '糖尿病',

          formatter: (row) => {
            return this.diabetesStatusFormatter(row)
          },
        },
        {
          prop: 'heartRateStatus',
          label: '心率',

          formatter: (row) => {
            return this.heartRateStatusFormatter(row)
          },
        },
        {
          prop: 'updateTime',
          label: '最近修改时间',
          formatter: (row) => {
            return parseTime(row.updateTime)
          },
        },
      ],
      templateformRules: {
        name: [{ required: true, message: '请输入模板标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入处方内容', trigger: 'blur' },
        ],
      },
      templateForm: {
        name: '',
        content: '',
      },
      templateSetTitle: '',
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      templatePageSize: 10,
      templatePageNum: 1,
      templateTotal: 0,
      // 弹框区域
      editDialogVisible: false,
      infoTitle: '',
      templateDialogVisible: false,
      templateSetDialogVisible: false,
    }
  },
  created() {
    this.userId = window.localStorage.getItem('userId')
    this.getList()
  },
  mounted() {
    this.getTemplateList()
    this.getHospitalList()
  },
  methods: {
    getList() {
      httpAdminUserTemplate
        .getUserTemplate({
          page: this.pageNum,
          pageSize: this.pageSize,
          highBloodStatus: this.searchForm.highBloodStatus,
          diabetesStatus: this.searchForm.diabetesStatus,
          heartRateStatus: this.searchForm.heartRateStatus,
          doctorName: this.searchForm.doctorName,
          doctorPhone: this.searchForm.doctorPhone,
          doctorType: this.searchForm.doctorType,
          hospitalId: this.searchForm.hospitalId,
          patientName: this.searchForm.patientName,
          patientPhone: this.searchForm.patientPhone,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 获取模板列表
    getTemplateList() {
      httpAdminTemplate
        .getTemplate({
          page: this.templatePageNum,
          pageSize: this.templatePageSize,
        })
        .then((res) => {
          this.templateList = res.data.elements
          this.templateTotal = res.data.totalSize
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospitalAll({ pageSize: -1 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 获取医师列表
    getDoctorList(val) {
      httpAdminDoctor
        .getDoctor({ hospitalId: val, pageSize: -1 })
        .then((res) => {
          this.doctorList = res.data.elements
        })
    },
    // 获取用户列表
    getPatientList() {
      httpAdminPatient
        .getPatient({
          doctorUserId: this.selectDoctorId,
          name: this.selectPatientUserName,
        })
        .then((res) => {
          this.patientList = res.data.elements
        })
    },
    // 远程搜索用户
    filterPatient(val) {
      if (val) {
        this.selectPatientUserName = val
        this.getPatientList()
      }
    },
    // 清空搜索用户重置列表
    clearSelectPatient() {
      this.selectPatientUserName = ''
      this.getPatientList()
    },
    // 选择模板
    selectTemplate(val) {
      this.editAddForm.templates = val
      this.$set(
        this.editAddForm,
        'content',
        JSON.stringify(this.editAddForm.templates)
      )
    },
    selectHospital(val) {
      this.getDoctorList(val)
      this.editAddForm.doctorUserId = ''
      this.editAddForm.patientUserId = ''
    },
    async selectDoctor(val) {
      this.$forceUpdate()
      this.selectDoctorId = val
      await this.getPatientList()
      this.editAddForm.patientUserId = ''
    },
    selectPatient() {
      this.$forceUpdate()
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
      console.log(val)
      this.doctorList = [{ id: val.doctorUserId, name: val.doctorName }]
      this.patientList = [{ id: val.patientUserId, name: val.patientName }]
      this.infoTitle = '编辑'
      this.editAddForm = val
      this.editDialogVisible = true
    },
    // 删除单个
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
      httpAdminUserTemplate.deleteUserTemplate(id).then((res) => {
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
            httpAdminUserTemplate
              .postUserTemplate(this.editAddForm)
              .then((res) => {
                if (res.code === 'OK') {
                  this.$message.success('新增成功')
                  this.getList()
                  this.editDialogVisible = false
                }
              })
          } else {
            // 发送请求
            httpAdminUserTemplate
              .putUserTemplate(this.editAddForm)
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
    // 模板设置
    templateSet() {
      this.templateDialogVisible = true
    },
    templateAdd() {
      this.templateSetTitle = '新增'
      this.templateForm = {}
      this.templateSetDialogVisible = true
    },
    // 修改
    editTemplateBtn(val) {
      this.templateSetTitle = '编辑'
      this.templateSetDialogVisible = true
      this.templateForm = JSON.parse(JSON.stringify(val))
    },
    async deleteTemplateBtn(id) {
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
      httpAdminTemplate.deleteTemplate(id).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('删除成功')
          this.getTemplateList()
          this.templateSetDialogVisible = false
        }
      })
    },
    templateSetDialogClosed() {
      this.$refs.templateFormRef.resetFields()
    },
    templateSetDialogEnter() {
      this.templateForm.userId = this.userId
      this.$refs.templateFormRef.validate((valid) => {
        if (valid) {
          if (this.templateSetTitle === '新增') {
            // 发送请求
            httpAdminTemplate.postTemplate(this.templateForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getTemplateList()
                this.templateSetDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminTemplate.putTemplate(this.templateForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('编辑成功')
                this.getTemplateList()
                this.templateSetDialogVisible = false
              }
            })
          }
        }
      })
    },

    /**
     * 表格格式化
     */
    doctorTypeFormatter(row) {
      return formatterElement.doctorType[row.doctorType]
    },
    highBloodStatusFormatter(row) {
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
    diabetesStatusFormatter(row) {
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
    heartRateStatusFormatter(row) {
      switch (row.heartRateStatus) {
        case 'NORMAL':
          return `<span class='HEALTH'>正常</span>`
        case 'SLOW':
          return `<span class='MEDIUM'>稍慢</span>`
        case 'FAST':
          return `<span class='SERIOUS'>稍快</span>`
      }
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
    // 模板配置分页
    templateSizeChange(newSize) {
      this.templatePageSize = newSize
      this.getTemplateList()
    },
    templateCurrentChange(newPage) {
      this.templatePageNum = newPage
      this.getTemplateList()
    },
  },
}
</script>

<style>
</style>
