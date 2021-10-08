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
        <!-- <el-form-item label="监测模式"
          align="left">
          <el-select v-model="searchForm.detectType"
            size="small"
            placeholder="请选择监测模式">
            <el-option label="24小时监测"
              value="TWENTY_FOUR_HOURS"></el-option>
            <el-option label="日常监测"
              value="DAILY"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="审核状态"
          align="left">
          <el-select v-model="searchForm.auditStatus"
            size="small"
            placeholder="请选择审核状态">
            <el-option v-for="item in auditStatus"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医师姓名"
          align="left"
          prop="doctorUserId">
          <el-select v-model="searchForm.doctorUserId"
            size="small"
            filterable
            placeholder="请选择医生">
            <el-option v-for="item in doctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
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
        <el-form-item label="监测结果"
          align="left">
          <el-select v-model="searchForm.resultStatus"
            size="small"
            placeholder="请选择监测结果">
            <el-option v-for="item in resultStatus"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处置建议"
          align="left">
          <el-select v-model="searchForm.suggestion"
            size="small"
            placeholder="请选择监测结果">
            <el-option v-for="item in suggestionList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="心电分析结果"
          align="left">
          <el-input v-model="searchForm.ecgResult"
            size="small"
            placeholder="请输入心电分析结果"></el-input>
        </el-form-item>
        <el-form-item label="监测日期">
          <el-date-picker v-model="searchForm.monitorTime"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            value-format="timestamp"
            @change="changeMonitorTime"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
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
            icon="el-icon-upload2"
            @click="exportExcel">导出excel</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        type="index"></el-table-column>
      <el-table-column align="center"
        label="医院名称"
        prop="hospitalName">
      </el-table-column>
      <el-table-column align="center"
        label="医师姓名"
        prop="doctorUserName">
      </el-table-column>
      <el-table-column align="center"
        label="姓名"
        prop="patientUserName">
        <template slot-scope="scope">
          <span class="skipStyle"
            @click="skipPatient(scope.row)">{{
            scope.row.patientUserName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="手机号"
        prop="patientUserPhone">
      </el-table-column>
      <el-table-column align="center"
        label="身份证号"
        prop="idCard"> </el-table-column>
      <!-- <el-table-column align="center" label="年龄" prop="age"> </el-table-column> -->
      <!-- <el-table-column align="center" label="设备名称" prop="name"> </el-table-column> -->
      <el-table-column align="center"
        label="设备号"
        prop="serialNumber">
      </el-table-column>
      <!-- <el-table-column align="center" label="监测模式" prop="detectType">
        <template slot-scope="scope">
          <span v-if="scope.row.detectType === 'DAILY'">日常监测</span>
          <span v-else>24小时监测</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="心率值(bpm)" prop="heartRateScore">
        <template slot-scope="scope">
          <span class="fw">{{ scope.row.heartRateScore }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center"
        label="监测时长"
        prop="length"
        :formatter="lengthFormatter">
      </el-table-column>
      <!-- <el-table-column align="center" label="测量结果" prop="title"> </el-table-column> -->
      <el-table-column align="center"
        label="处置建议"
        prop="suggestion"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center"
        label="心电分析结果"
        prop="ecgResult"
        show-overflow-tooltip></el-table-column>
      <el-table-column align="center"
        label="监测日期"
        prop="inspectionTime">
        <template slot-scope="scope">
          <span style="color: #f56c6c; font-weight: 700">{{
            parseTime(scope.row.inspectionTime)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="审核状态"
        prop="auditStatus">
        <template slot-scope="scope">
          <span class="MEDIUM"
            v-if="scope.row.auditStatus === 'TO_AUDIT'">待公司审核</span>
          <span class="HEALTH"
            v-if="scope.row.auditStatus === 'PLATFORM_COMPLETE_AUDIT'">公司已审核</span>
          <span class="MEDIUM"
            v-if="scope.row.auditStatus === 'TO_HOSPITAL_AUDIT'">待医院审核</span>
          <span class="HEALTH"
            v-if="scope.row.auditStatus === 'HOSPITAL_COMPLETE_AUDIT'">医院已审核</span>
          <span class="SERIOUS"
            v-if="scope.row.auditStatus === 'INVALID'">已作废</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="审核时间"
        prop="auditTime">
        <template slot-scope="scope">
          <span class="HEALTH"> {{ parseTime(scope.row.auditTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="审核人"
        prop="auditorName">
      </el-table-column>
      <el-table-column align="center"
        label="已打印次数"
        prop="printNumber">
        <template slot-scope="scope">
          <span v-if="scope.row.printNumber > 0"
            style="color: red">
            {{ scope.row.printNumber }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isAnalysisIng === false"
            size="mini"
            @click="examineReport(scope.row)"
            type="primary">查看报告</el-button>
          <!-- 正在分析中 -->
          <el-button v-else
            size="mini"
            disabled
            plain>正在分析中</el-button>
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminHeartRate } from '@/api/admin/httpAdminHeartRate'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import {
  parseTime,
  formatSeconds,
  resultStatus,
  auditStatus,
  formatterElement,
  suggestionList,
} from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      formatSeconds,
      resultStatus,
      auditStatus,
      suggestionList,
      formatterElement,
      // 搜索表单
      searchForm: {
        patientUserName: '',
        patientUserPhone: '',
        detectType: '',
        auditStatus: '',
        doctorUserId: '',
        hospitalId: '',
        resultStatus: '',
        ecgResult: '',
        suggestion: '',
        // 监测时间
        monitorTime: [],
        startTime: '',
        endTime: '',
      },
      hospitalList: [],
      doctorList: [],
      patientList: [],
      list: [],
      // 跳转携带参数
      hospitalForm: {
        recordId: '',
        hospitalName: '',
        name: '',
        signUrl: '',
        isSignature: '1',
      },
      tableHeaderBig: [],
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
      hospitalDialogVisible: false,
    }
  },
  created() {
    let heartSearchForm = JSON.parse(sessionStorage.getItem('heartSearchForm'))
    if (heartSearchForm) {
      this.searchForm = heartSearchForm
    }
    // 缓存pageNum pageSize
    let pageNum = sessionStorage.getItem('heartPageNum')
    let pageSize = sessionStorage.getItem('heartPageSize')
    if (pageNum) {
      this.pageNum = Number(pageNum)
    }
    if (pageSize) {
      this.pageSize = Number(pageSize)
    }
    // 医院监测统计跳转本页面携带参数
    let monitoringStartTime = sessionStorage.getItem('monitoringStartTime')
    let monitoringEndTime = sessionStorage.getItem('monitoringEndTime')
    let monitoringHospitalId = sessionStorage.getItem('monitoringHospitalId')
    let monitoringAuditStatus = sessionStorage.getItem('monitoringAuditStatus')
    if (monitoringStartTime && monitoringEndTime) {
      this.searchForm.monitorTime = [monitoringStartTime, monitoringEndTime]
    }
    this.searchForm.startTime = monitoringStartTime
    this.searchForm.endTime = monitoringEndTime
    this.searchForm.hospitalId = monitoringHospitalId
    this.searchForm.auditStatus = monitoringAuditStatus
    this.getList()
  },

  beforeDestroy() {
    sessionStorage.removeItem('monitoringHospitalId')
    sessionStorage.removeItem('monitoringStartTime')
    sessionStorage.removeItem('monitoringEndTime')
    sessionStorage.removeItem('monitoringAuditStatus')
  },
  mounted() {
    this.getHospitalList()
    this.getDoctorList()
  },
  methods: {
    getList() {
      httpAdminHeartRate
        .getHeartRate({
          page: this.pageNum,
          pageSize: this.pageSize,
          patientUserName: this.searchForm.patientUserName,
          patientUserPhone: this.searchForm.patientUserPhone,
          detectType: this.searchForm.detectType,
          auditStatus: this.searchForm.auditStatus,
          doctorUserId: this.searchForm.doctorUserId,
          hospitalId: this.searchForm.hospitalId,
          resultStatus: this.searchForm.resultStatus,
          ecgResult: this.searchForm.ecgResult,
          heartRateAdviceType: this.searchForm.suggestion,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
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
    getDoctorList() {
      httpAdminDoctor.getDoctor({ pageSize: 10000 }).then((res) => {
        this.doctorList = res.data.elements
      })
    },
    // 选择监测日期
    changeMonitorTime(val) {
      console.log(val)
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    // 重置
    searchReset() {
      sessionStorage.removeItem('heartSearchForm')
      sessionStorage.removeItem('heartPageNum')
      sessionStorage.removeItem('heartPageSize')
      sessionStorage.removeItem('monitoringHospitalId')
      sessionStorage.removeItem('monitoringStartTime')
      sessionStorage.removeItem('monitoringEndTime')
      sessionStorage.removeItem('monitoringAuditStatus')
      this.pageNum = 1
      this.pageSize = 10
      this.searchForm = {}
      this.getList()
    },
    /**
     * CRUD
     */
    // 查看报告
    examineReport(val) {
      const routeData = this.$router.resolve({
        path: '/archivesManagement/record/heartDetail',
        query: {
          id: val.id,
          name: val.patientUserName,
          hospitalName: val.hospitalName,
        },
      })
      // 新窗口打开心率详情页面
      let windowObj = window.open(routeData.href, '_blank')
      // 新窗口关闭刷新心率列表页面
      let getList = this.getList
      let loop = setInterval(function () {
        if (windowObj != null && windowObj.closed) {
          clearInterval(loop)
          getList()
        }
      }, 1000)
      sessionStorage.setItem('heartSearchForm', JSON.stringify(this.searchForm))
      sessionStorage.setItem('pageNum', JSON.stringify(this.pageNum))
    },
    // 查看心电图
    examineElectrocardiograph(val) {
      let deskUrl = JSON.parse(val.reportResult).body.data.deskUrl
      let ecgUrl = JSON.parse(val.reportResult).body.data.ecgUrl
      if (deskUrl) {
        window.open(deskUrl)
      } else {
        window.open(ecgUrl.replace('vertical', 'one_ecg'))
      }
    },
    // 跳转报告详情
    skipReportDetail() {
      this.hospitalDialogVisible = false
      this.$router.push(
        '/archivesManagement/record/heartDetail?id=' +
          this.hospitalForm.recordId +
          '&name=' +
          this.hospitalForm.name +
          '&hospitalName=' +
          this.hospitalForm.hospitalName +
          '&isSignature=' +
          this.hospitalForm.isSignature
      )
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
    exportExcel() {
      // this.DefaultData.exportExcelMax限制一下导出的总条数
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
            '</strong>条数据，数据量过大，不能一次导出！<br/>建议分时间段导出所需数据。',
          '提示',
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
          }
        )
          .then(() => {})
          .catch(() => {})
      }
    },

    /**
     * 对导出数据格式处理
     */
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },

    /**
     * 导出的列表数据
     */
    getExpportData() {
      const loading = this.$loading({
        lock: true,
        text: '正在导出，请稍等......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      // 请求参数
      let searchForm = {
        page: 1,
        pageSize: 3000,
        patientUserName: this.searchForm.patientUserName,
        patientUserPhone: this.searchForm.patientUserPhone,
        detectType: this.searchForm.detectType,
        auditStatus: this.searchForm.auditStatus,
        doctorUserId: this.searchForm.doctorUserId,
        hospitalId: this.searchForm.hospitalId,
        resultStatus: this.searchForm.resultStatus,
        ecgResult: this.searchForm.ecgResult,
        heartRateAdviceType: this.searchForm.suggestion,
        startTime: this.searchForm.startTime,
        endTime: this.searchForm.endTime,
      }
      httpAdminHeartRate.getHeartRate(searchForm).then(
        (res) => {
          let handleDataList = res.data.elements
          handleDataList.forEach((item) => {
            if (item.length) {
              item.length = formatSeconds(
                JSON.parse(item.reportResult).body.data.length
              )
            }
            if (item.inspectionTime) {
              item.inspectionTime = parseTime(item.inspectionTime)
            }
            if (item.auditTime) {
              item.auditTime = parseTime(item.auditTime)
            }
            if (item.auditStatus === 'TO_AUDIT') {
              item.auditStatus = '待公司审核'
            } else if (item.auditStatus === 'PLATFORM_COMPLETE_AUDIT') {
              item.auditStatus = '公司已审核'
            } else if (item.auditStatus === 'TO_HOSPITAL_AUDIT') {
              item.auditStatus = '待医院审核'
            } else if (item.auditStatus === 'HOSPITAL_COMPLETE_AUDIT') {
              item.auditStatus = '医院已审核'
            } else {
              item.auditStatus = '已作废'
            }
          })
          if (handleDataList.length > 0) {
            require.ensure([], () => {
              const {
                export_json_to_excel,
              } = require('@/utils/vendor/Export2Excel')
              // 导出的表头
              const tHeader = [
                '医院名称',
                '医师姓名',
                '姓名',
                '手机号',
                '身份证号',
                '设备号',
                '监测时长',
                '测量结果',
                '处置建议',
                '心电分析结果',
                '监测日期',
                '审核状态',
                '审核时间',
                '审核人',
              ]
              // 导出表头要对应的数据
              const filterVal = [
                'hospitalName',
                'doctorUserName',
                'patientUserName',
                'patientUserPhone',
                'idCard',
                'serialNumber',
                'length',
                'title',
                'suggestion',
                'ecgResult',
                'inspectionTime',
                'auditStatus',
                'auditTime',
                'auditorName',
              ]
              const data = this.formatJson(filterVal, handleDataList)
              export_json_to_excel(tHeader, data, '心率列表')
            })
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
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    lengthFormatter(row) {
      if (row.reportResult != '') {
        return formatSeconds(JSON.parse(row.reportResult).body.data.length)
      }
    },
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize
      sessionStorage.setItem('heartPageSize', newSize)
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      sessionStorage.setItem('heartPageNum', newPage)
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
