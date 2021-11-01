<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        :inline="true"
        class="searchForm">
        <el-form-item label="姓名"
          align="left"
          prop="name">
          <el-input v-model.trim="searchForm.name"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号"
          align="left"
          prop="idCard">
          <el-input v-model.trim="searchForm.idCard"
            maxlength="18"
            size="small"
            placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="性别"
          align="left"
          prop="gender">
          <el-select v-model="searchForm.gender"
            size="small">
            <el-option v-for="item in genderList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
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
        <el-form-item label="本人电话"
          align="left"
          prop="phone">
          <el-input v-model.trim="searchForm.phone"
            size="small"
            v-Int
            maxlength="11"
            placeholder="请输入本人电话"></el-input>
        </el-form-item>
        <el-form-item label="高血压"
          align="left"
          prop="highBloodStatus">
          <el-select v-model="searchForm.highBloodStatus"
            size="small"
            placeholder="请选择状态">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="糖尿病"
          align="left"
          prop="diabetesStatus">
          <el-select v-model="searchForm.diabetesStatus"
            size="small"
            placeholder="请选择状态">
            <el-option v-for="item in healthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="心率"
          align="left"
          prop="heartRateStatus">
          <el-select v-model="searchForm.heartRateStatus"
            size="small"
            placeholder="请选择状态">
            <el-option v-for="item in heartList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称">
          <el-select v-model="searchForm.hospitalIds"
            multiple
            collapse-tags
            size="small"
            filterable>
            <el-option v-for="(item, index) in hospitalList"
              :key="index"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应医师"
          align="left"
          prop="doctorUserName">
          <el-input placeholder="请输入对应医师"
            v-model.trim="searchForm.doctorUserName"
            size="small"></el-input>
        </el-form-item>
        <el-form-item label="医师手机号"
          align="left"
          prop="doctorUserPhone">
          <el-input placeholder="请输入医师手机号"
            v-Int
            maxlength="11"
            size="small"
            v-model.trim="searchForm.doctorUserPhone"></el-input>
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
          <el-button @click="excelVisible = true"
            size="small"
            type="success"
            icon="el-icon-upload2">导出Excel</el-button>
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
      <el-button @click="transferUser"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-sort"
        :disabled="transferBtn">转移用户</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @select="selectCheckbox"
      @select-all="selectAll"
      v-loading="loading">
      <!-- 操作 -->
      <el-table-column slot="fixed"
        fixed="left"
        type="selection"
        :selectable="selectable"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <div>
            <el-button size="mini"
              @click="detailsBtn(scope.row)"
              type="primary">详细资料</el-button>
            <el-button size="mini"
              plain
              @click="unlockBtn(scope.row)"
              :disabled="unlockFn(scope.row)">解锁</el-button>
          </div>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 转移用户  -->
    <el-dialog title="转移用户"
      :visible.sync="transferDialogVisible"
      width="40%">
      <el-form :model="transferForm"
        label-width="100px">
        <el-form-item label="选择医院"
          v-model.trim="transferForm.hospitalId">
          <el-select v-model="transfer.hospitalId"
            filterable
            style="width: 100%"
            placeholder="请选择医院"
            @change="selectHospital">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医师">
          <el-select v-model="transfer.doctorName"
            filterable
            style="width: 100%"
            placeholder="请选择医师"
            @change="selectDoctor">
            <el-option v-for="item in doctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="color: #c5051c; padding: 0 32px">
        注意：转移用户是指将所选择的用户转移至选择的医师名下，请谨慎操作
      </div>
      <div slot="footer">
        <el-button @click="transferCancel">取 消</el-button>
        <el-button @click="transferAffirm"
          type="primary"
          :disabled="affirmBtn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 导出excel -->
    <el-dialog title="选择导出内容"
      :visible.sync="excelVisible"
      width="30%">
      <div>
        <el-checkbox-group style="line-height: 30px"
          v-model="checkExcelList">
          <el-checkbox label="姓名"></el-checkbox>
          <el-checkbox label="身份证号"></el-checkbox>
          <el-checkbox label="性别"></el-checkbox>
          <el-checkbox label="出生日期"></el-checkbox>
          <el-checkbox label="年龄"></el-checkbox>
          <el-checkbox label="本人电话"></el-checkbox>
          <el-checkbox label="高血压"></el-checkbox>
          <el-checkbox label="糖尿病"></el-checkbox>
          <el-checkbox label="心率"></el-checkbox>
          <el-checkbox label="两慢指数"></el-checkbox>
          <el-checkbox label="对应医师"></el-checkbox>
          <el-checkbox label="医师手机号"></el-checkbox>
          <el-checkbox label="创建时间"></el-checkbox>
          <el-checkbox label="创建人"></el-checkbox>
        </el-checkbox-group>
        <p style="color: #c5051c">
          注意：导出需先勾选需要导出的内容，一次最多可导出3000条
        </p>
      </div>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="excelVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="exportExcel">确 定</el-button>
      </span>
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
        hospitalId: '',
      },
      searchForm: {
        name: '',
        phone: '',
        idCard: '',
        gender: '',
        highBloodStatus: '',
        diabetesStatus: '',
        heartRateStatus: '',
        hospitalIds: [],
        beginAge: 1,
        endAge: 120,
      },
      transfer: {
        name: '',
      },
      list: [],
      doctorList: [],
      hospitalList: [],
      checkboxList: [], //转移用户数据
      checkExcelList: [],
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
        { prop: 'hospitalName', label: '医院名称' },
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
      excelVisible: false,
      infoTitle: '',
    }
  },
  created() {
    this.doctorId = localStorage.getItem('doctorId')
    this.collectionDoctorUserId = localStorage.getItem('collectionDoctorUserId')
    let pageNum = localStorage.getItem('patientNum')
    this.searchForm.hospitalIds = sessionStorage.getItem('skipHospitalId')
      ? JSON.parse(sessionStorage.getItem('skipHospitalId'))
      : ''
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
    sessionStorage.removeItem('skipHospitalId')
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
          hospitalIds: this.searchForm.hospitalIds,
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
        if (res.code === 'OK') {
          this.$message.success(res.message)
          this.transfer = {}
        } else {
          this.$message.error(res.message)
        }
        this.transferDialogVisible = false
        this.getList()
      })
    },
    selectBeginAgeChange(val) {},
    selectEndAgeChange(val) {},
    /**
     * 搜索
     */
    // 搜索
    searchBtn() {
      this.$set(this, 'checkExcelList', [])
      this.pageNum = 1
      this.getList()
    },
    // 重置
    searchReset() {
      this.$set(this, 'checkExcelList', [])
      sessionStorage.removeItem('skipHospitalId')
      this.pageNum = 1
      this.searchForm = {}
      this.transferBtn = true
      this.transferCancel()
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
      } else {
        this.affirmBtn = false
      }
    },
    // 转移 医生选择
    selectDoctor() {
      const all = (arr, fn = Boolean) => arr.every(fn)
      let doctorIdJudge = all(
        this.checkboxList,
        (x) => x.doctorUserId === this.transfer.doctorName
      )
      if (doctorIdJudge === true) {
        this.affirmBtn = true
        this.$message.error('当前用户的医师未发生改变，请核对')
        return
      }
      if (
        this.checkboxList.length <= 0 ||
        this.transfer.doctorName === undefined
      ) {
        this.affirmBtn = true
      } else {
        this.affirmBtn = false
      }
      this.$forceUpdate()
    },
    // 是否建档
    selectable(row, index) {
      return row.isArchives
    },
    // 转诊确认
    transferAffirm() {
      let arr = []
      this.checkboxList.forEach((val, idx) => {
        if (val.isArchives) {
          arr.push(val.id)
        }
      })
      // 获取到医生id
      if (arr.length <= 0 || this.transfer.doctorName === undefined) return
      this.putArchivesDoctor({
        patientUserIds: arr,
        doctorUserId: this.transfer.doctorName,
      })
    },
    // 转诊取消
    transferCancel() {
      this.transferDialogVisible = false
      this.transfer = {}
    },
    // 跳转详细资料
    detailsBtn(val) {
      this.$router.push({
        path: '/archivesManagement/details',
        query: { id: val.id, type: 'edit', isArchives: val.isArchives },
      })
      localStorage.setItem('patientNum', this.pageNum)
    },
    /**
     * 解锁
     */
    unlockBtn(val) {
      let phone = val.phone
      httpAdminPatient.putUserUnLock({ phone }).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('解锁成功')
        }
        this.getList()
      })
    },
    unlockFn(val) {
      if (val.phone === '' || val.phone === undefined) {
        return true
      } else {
        return false
      }
    },
    /**
     *  导出excel
     */
    titleExcel() {
      let titleExcel = [] // 表头
      this.checkExcelList.forEach((item) => {
        switch (item) {
          case '姓名':
            titleExcel.push('name')
            break
          case '身份证号':
            titleExcel.push('idCard')
            break
          case '性别':
            titleExcel.push('gender')
            break
          case '出生日期':
            titleExcel.push('birthday')
            break
          case '年龄':
            titleExcel.push('age')
            break
          case '本人电话':
            titleExcel.push('phone')
            break
          case '高血压':
            titleExcel.push('highBloodStatus')
            break
          case '糖尿病':
            titleExcel.push('diabetesStatus')
            break
          case '心率':
            titleExcel.push('heartRateStatus')
            break
          case '两慢指数':
            titleExcel.push('healthScore')
            break
          case '对应医师':
            titleExcel.push('doctorUserName')
            break
          case '医师手机号':
            titleExcel.push('doctorUserPhone')
            break
          case '创建时间':
            titleExcel.push('createTime')
            break
          case '创建人':
            titleExcel.push('createUserName')
            break
        }
      })
      return titleExcel
    },
    exportExcel() {
      if(this.checkboxList.length > 0){
      if (this.checkExcelList.length <= 0) {
        this.$message.warning('请选择要导出的内容')
        return
      }
      if (this.checkboxList.length <= 3000) {
        this.$confirm(
          '确定要导出当前<strong>' + this.checkboxList.length + '</strong>条数据？',
          '提示',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }
        )
          .then(() => {
            this.getExpportData()
          })
          .catch(() => {})
      } else {
        this.$confirm(
          '当前要导出的<strong>' +
            this.checkboxList.length +
            '</strong>条数据，数据量过大，不能一次导出！<br/>建议分段导出所需数据。',
          '提示',
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
          }
        )
          .then(() => {})
          .catch(() => {})
      }
    }else{
      if (this.total <= 3000) {
        this.$confirm(
          '确定要导出当前<strong>' + this.total + '</strong>条数据？',
          '提示',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }
        )
          .then(() => {
            this.getExpportData()
          })
          .catch(() => {})
      } else {
        this.$confirm(
          '当前要导出的<strong>' +
            this.total +
            '</strong>条数据，数据量过大，不能一次导出！<br/>建议分段导出所需数据。',
          '提示',
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
          }
        )
          .then(() => {})
          .catch(() => {})
      }
    }
    },
    // 对导出数据格式处理
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    // 导出的列表数据
    getExpportData() {
      let titleExcel = this.titleExcel()
      const loading = this.$loading({
        lock: true,
        text: '正在导出，请稍等......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if(this.checkboxList.length > 0){
         let handleDataList = this.checkboxList
             handleDataList.forEach((item) => {
            if (item.gender) {
              item.gender = this.genderFormatter(item)
            }
            if (item.birthday) {
              item.birthday = parseTime(item.birthday)?.slice(0, 10)
            }
            if (item.highBloodStatus) {
              item.highBloodStatus = this.diseaseState(item, 'highBloodStatus')
            }
            if (item.diabetesStatus) {
              item.diabetesStatus = this.diseaseState(item, 'diabetesStatus')
            }
            if (item.heartRateStatus) {
              item.heartRateStatus = this.getHeart(item)
            }
            // 创建时间
            if (item.archivesMongo?.createTime) {
              item.createTime = parseTime(item.archivesMongo?.createTime)
            }
            if (item.archivesMongo?.createUserName) {
              item.createUserName = item.archivesMongo?.createUserName
            }
          })
          if (handleDataList.length > 0) {
            require.ensure([], () => {
              const {
                export_json_to_excel,
              } = require('@/utils/vendor/Export2Excel')
              // 导出的表头
              const tHeader = this.checkExcelList
              // 导出表头要对应的数据
              const filterVal = titleExcel
              const data = this.formatJson(filterVal, handleDataList)
              export_json_to_excel(tHeader, data, '档案管理列表')
            })
            this.excelVisible = false
          } else {
            this.$message({
              message: '数据出錯，请稍后重试',
              duration: 2000,
              type: 'warning',
            })
          }
          loading.close()
      }else{
      // 请求参数
      let searchForm = {
        page: 1,
        pageSize: 3000,
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
        hospitalIds: this.searchForm.hospitalIds,
      }
      httpAdminPatient.getPatient(searchForm).then(
        (res) => {
          let handleDataList = res.data.elements
          handleDataList.forEach((item) => {
            if (item.gender) {
              item.gender = this.genderFormatter(item)
            }
            if (item.birthday) {
              item.birthday = parseTime(item.birthday)?.slice(0, 10)
            }
            if (item.highBloodStatus) {
              item.highBloodStatus = this.diseaseState(item, 'highBloodStatus')
            }
            if (item.diabetesStatus) {
              item.diabetesStatus = this.diseaseState(item, 'diabetesStatus')
            }
            if (item.heartRateStatus) {
              item.heartRateStatus = this.getHeart(item)
            }
            // 创建时间
            if (item.archivesMongo?.createTime) {
              item.createTime = parseTime(item.archivesMongo?.createTime)
            }
            if (item.archivesMongo?.createUserName) {
              item.createUserName = item.archivesMongo?.createUserName
            }
          })
          if (handleDataList.length > 0) {
            require.ensure([], () => {
              const {
                export_json_to_excel,
              } = require('@/utils/vendor/Export2Excel')
              // 导出的表头
              const tHeader = this.checkExcelList
              // 导出表头要对应的数据
              const filterVal = titleExcel
              const data = this.formatJson(filterVal, handleDataList)
              export_json_to_excel(tHeader, data, '档案管理列表')
            })
            this.excelVisible = false
          } else {
            this.$message({
              message: '数据出錯，请稍后重试',
              duration: 2000,
              type: 'warning',
            })
          }
          loading.close()
        },
        (error) => {
          console.log(error)
          loading.close()
        }
      )
      }
    },
    /***** 表格格式化内容区域 *****/
    // 出生年月
    genderFormatter(row) {
      return formatterElement.gender[row.gender]
    },
    diseaseState(row, state) {
      if (state === 'highBloodStatus') {
        return formatterElement.highBlood[row.highBloodStatus]
      } else {
        return formatterElement.diabetes[row.diabetesStatus]
      }
    },
    getHeart(row) {
      return formatterElement.heart[row.heartRateStatus]
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
