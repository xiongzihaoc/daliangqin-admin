<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef" :model="searchForm" :inline="true" class="searchForm">
        <el-form-item label="姓名" align="left" prop="name">
          <el-input v-model.trim="searchForm.name" size="small" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" align="left" prop="idCard">
          <el-input
            v-model.trim="searchForm.idCard"
            maxlength="18"
            size="small"
            placeholder="请输入身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" align="left" prop="gender">
          <el-select v-model="searchForm.gender" size="small">
            <el-option
              v-for="item in genderList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="年龄"
          align="left"
          prop="age">
          <el-input-number v-model="searchForm.beginAge"
            @change="selectBeginAgeChange"
            :min="1"
            :max="120"
            size="small"></el-input-number> —
          <el-input-number v-model="searchForm.endAge"
            @change="selectEndAgeChange"
            :min="1"
            :max="120"
            size="small"></el-input-number>
        </el-form-item>-->
        <el-form-item label="本人电话" align="left" prop="phone">
          <el-input
            v-model.trim="searchForm.phone"
            size="small"
            v-Int
            maxlength="11"
            placeholder="请输入本人电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="高血压" align="left" prop="highBloodStatus">
          <el-select v-model="searchForm.highBloodStatus" size="small" placeholder="请选择状态">
            <el-option
              v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="糖尿病" align="left" prop="diabetesStatus">
          <el-select v-model="searchForm.diabetesStatus" size="small" placeholder="请选择状态">
            <el-option
              v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="心率" align="left" prop="heartRateStatus">
          <el-select v-model="searchForm.heartRateStatus" size="small" placeholder="请选择状态">
            <el-option
              v-for="item in heartList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应医师" align="left" prop="doctorUserName">
          <el-input placeholder="请输入对应医师" v-model.trim="searchForm.doctorUserName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="医师手机号" align="left" prop="doctorUserPhone">
          <el-input
            placeholder="请输入医师手机号"
            v-Int
            maxlength="11"
            size="small"
            v-model.trim="searchForm.doctorUserPhone"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBtn" type="primary" size="small" icon="el-icon-search">搜索</el-button>
          <el-button @click="searchReset" size="small" plain icon="el-icon-refresh">重置</el-button>
          <el-button size="small" type="success" icon="el-icon-download">导入</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格操作按钮 -->
    <div>
      <el-button
        @click="addBtn"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-plus"
      >新增</el-button>
      <el-button
        @click="transferUser"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-sort"
        :disabled="transferBtn"
      >转移用户</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable
      :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @select="selectCheckbox"
      @select-all="selectAll"
      v-loading="loading"
    >
      <!-- 操作 -->
      <el-table-column slot="fixed" fixed="left" type="selection"></el-table-column>
      <el-table-column align="center" slot="fixed" fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="detailsBtn(scope.row)" type="primary">详细资料</el-button>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 转移用户  -->
    <el-dialog title="转移用户" :visible.sync="transferDialogVisible" width="40%">
      <el-form :model="transferForm" label-width="100px">
        <el-form-item label="选择医院" v-model.trim="transferForm.hospitalId">
          <el-select
            v-model="transfer.hospitalId"
            filterable
            style="width:100%;"
            placeholder="请选择医院"
            @change="selectHospital"
          >
            <el-option
              v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医师">
          <el-select
            v-model="transfer.doctorName"
            filterable
            style="width:100%;"
            placeholder="请选择医师"
            @change="selectDoctor"
          >
            <el-option
              v-for="item in doctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="color: #c5051c; padding: 0 32px;">注意：转移用户是指将所选择的用户转移至选择的医师名下，请谨慎操作</div>
      <div slot="footer">
        <el-button @click="transferDialogVisible = false">取 消</el-button>
        <el-button @click="transferAffirm" type="primary" :disabled="affirmBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Untable'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminArchives } from '@/api/admin/httpAdminArchives'


import {
  parseTime,
  genderList,
  healthList,
  heartList,
  formatterElement,
} from '@/utils/index'
import { list } from '@/api/public/httpPublicBanner'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      genderList,
      healthList,
      heartList,
      // 禁用按钮
      transferBtn: true,
      affirmBtn: true,
      transferForm: {
        hospitalId: ''
      },
      searchForm: {
        name: '',
        phone: '',
        idCard: '',
        gender: '',
        highBloodStatus: '',
        diabetesStatus: '',
        heartRateStatus: '',
        beginAge: 1,
        endAge: 120,
      },
      transfer: {
        name: ''
      },
      list: [],
      doctorList: [],
      hospitalList: [],
      checkboxList: [], //转移用户数据
      tableHeaderBig: [
        { type: 'index', label: '序号' },
        { prop: 'name', label: '姓名' },
        { prop: 'avatarUrl', label: '照片', isImg: true },
        { prop: 'idCard', label: '身份证号' },
        {
          prop: 'gender',
          label: '性别',
          formatter: (row) => {
            return this.genderFormatter(row)
          },
        },
        {
          prop: 'birthday',
          label: '出生日期',
          formatter: (row) => {
            return parseTime(row.birthday)?.slice(0, 10)
          },
        },
        { prop: 'age', label: '年龄' },
        { prop: 'phone', label: '本人电话' },
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
        { prop: 'healthScore', label: '两慢指数' },
        { prop: 'doctorUserName', label: '对应医师' },
        { prop: 'doctorUserPhone', label: '医师手机号' },
        {
          label: '创建时间',
          formatter: (row) => {
            return parseTime(row.archivesMongo?.createTime)
          },
        },
        {
          label: '创建人',
          formatter: (row) => {
            return row.archivesMongo?.createUserName
          },
        },
      ],
      loading: true,
      // 医生列表跳转用户列表携带参数
      doctorId: '',
      collectionDoctorUserId: '',
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      transferDialogVisible: false,
      infoTitle: '',
    }
  },
  created() {
    this.doctorId = localStorage.getItem('doctorId')
    this.collectionDoctorUserId = localStorage.getItem('collectionDoctorUserId')
    let pageNum = localStorage.getItem('patientNum')
    if (pageNum) {
      this.pageNum = pageNum
    }
    this.getList()
  },
  mounted() {
    this.getHospitalList()
  },
  destroyed() {
    localStorage.removeItem('doctorId')
    localStorage.removeItem('collectionDoctorUserId')
    localStorage.removeItem('patientNum')
  },
  methods: {
    getList() {
      httpAdminPatient
        .getPatient({
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          idCard: this.searchForm.idCard,
          gender: this.searchForm.gender,
          highBloodStatus: this.searchForm.highBloodStatus,
          diabetesStatus: this.searchForm.diabetesStatus,
          heartRateStatus: this.searchForm.heartRateStatus,
          doctorUserName: this.searchForm.doctorUserName,
          doctorUserId: this.doctorId,
          collectionDoctorUserId: this.collectionDoctorUserId,
          doctorUserPhone: this.searchForm.doctorUserPhone,
          // beginAge: this.searchForm.beginAge,
          // endAge: this.searchForm.endAge,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
          this.loading = false
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 获取医生列表
    getDoctor(hospitalId) {
      httpAdminDoctor.getDoctor({ hospitalId, pageSize: 10000 }).then((res) => {
        this.doctorList = res.data.elements
      })
    },
    // 更换签约
    putArchivesDoctor(archivesDoctorDTO) {
      httpAdminArchives.putArchivesDoctor(archivesDoctorDTO).then((res) => {
        this.transferDialogVisible = false
        if(res.codeNumber === 1000){
          this.$message.success(res.message)
        }else{
          this.$message.error(res.message)
        }
        this.getList()
      })
    },
    selectBeginAgeChange(val) { },
    selectEndAgeChange(val) { },
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
      this.$router.push({
        path: '/archivesManagement/details',
        query: { type: 'add' },
      })
    },
    // 转移用户
    transferUser() {
      this.transferDialogVisible = true
    },
    // 列表选择
    selectCheckbox(selection, row) {
      this.checkboxList = selection
      if (selection.length > 0) {
        this.transferBtn = false
      } else {
        this.transferBtn = true
      }
    },
    // 列表全选
    selectAll(selection) {
      this.selectCheckbox(selection)
    },
    // 转移 选择医院
    selectHospital(hospitalId) {
      this.getDoctor(hospitalId)
      this.transfer.doctorName = ''
      if (this.checkboxList.length <= 0 || this.transfer.doctorName === '') {
        this.affirmBtn = true
      }else{
        this.affirmBtn = false
      }
    },
    selectDoctor() {
       if (this.checkboxList.length <= 0 || this.transfer.doctorName === undefined) {
        this.affirmBtn = true
      }else{
        this.affirmBtn = false
      }
      this.$forceUpdate()
    },
    // 转诊确认
    transferAffirm() {
      let arr = []
      this.checkboxList.forEach((val, idx) => {
        arr.push(val.id)
      })
      // 获取到医生id
      if (arr.length <= 0 || this.transfer.doctorName === undefined)return
      this.putArchivesDoctor({ patientUserIds: arr, doctorUserId: this.transfer.doctorName })
    },
    // 跳转详细资料
    detailsBtn(val) {
      this.$router.push({
        path: '/archivesManagement/details',
        query: { id: val.id, type: 'edit', isArchives: val.isArchives },
      })
      localStorage.setItem('patientNum', this.pageNum)
    },
    /***** 表格格式化内容区域 *****/
    // 出生年月
    genderFormatter(row) {
      return formatterElement.gender[row.gender]
    },
    highBloodStatusFormatter(row) {
      // return formatterElement.highBlood[row.highBloodStatus]
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
      // return formatterElement.diabetes[row.diabetesStatus]
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
      // return formatterElement.heart[row.heartRateStatus]
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
  },
}
</script>

<style>
</style>
