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
          <el-select v-model="searchForm.heartRateAdviceType"
            size="small"
            placeholder="请选择监测结果">
            <el-option v-for="item in heartRateAdviceTypeList"
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
            type="datetimerange"
            format="yyyy-MM-dd"
            value-format="timestamp"
            range-separator="至"
            @change="changeMonitorTime"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
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
        type="index"> </el-table-column>
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
      <el-table-column align="center"
        label="测量结果"
        prop="title"> </el-table-column>
      <el-table-column align="center"
        label="处置建议"
        prop="healthCareAdvice"
        show-overflow-tooltip> </el-table-column>
      <el-table-column align="center"
        label="心电分析结果"
        prop="ecgResult"
        show-overflow-tooltip></el-table-column>
      <el-table-column align="center"
        label="监测日期"
        prop="inspectionTime">
        <template slot-scope="scope">
          <span style="color: #F56C6C;font-weight:700">{{ parseTime(scope.row.inspectionTime) }}</span>
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
  heartRateAdviceTypeList,
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
      heartRateAdviceTypeList,
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
        heartRateAdviceType: '',
        // 监测时间
        monitorTime: [],
        startTime: '',
        endTime: '',
      },
      // 日期选择配置项
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
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
    let pageNum = JSON.parse(sessionStorage.getItem('pageNum'))
    if (pageNum) {
      this.pageNum = pageNum
    }
    this.getList()
  },
  mounted() {
    this.getHospitalList()
    this.getDoctorList()
  },
  //离开当前页面后执行
  destroyed() {
    localStorage.removeItem('hospitalId')
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
          heartRateAdviceType: this.searchForm.heartRateAdviceType,
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
      sessionStorage.removeItem('pageNum')
      this.pageNum = 1
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
      window.open(routeData.href, '_blank')
      sessionStorage.setItem('heartSearchForm', JSON.stringify(this.searchForm))
      sessionStorage.setItem('pageNum', JSON.stringify(this.pageNum))
      // this.$router.push(
      //   '/archivesManagement/record/heartDetail?id=' +
      //     val.id +
      //     '&name=' +
      //     val.patientUserName +
      //     '&hospitalName=' +
      //     val.hospitalName
      // )
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

    // 导出excel
    exportExcel() {
      this.downloadLoading = true
      import('@/utils/vendor/Export2Excel').then(async (excel) => {
        const headers = {
          姓名: 'username',
          手机号: 'mobile',
          入职日期: 'timeOfEntry',
          聘用形式: 'formOfEmployment',
          转正日期: 'correctionTime',
          工号: 'workNumber',
          部门: 'departmentName',
        }
        try {
          const { rows } = await getEmployees({ page: 1, size: this.total })
          const data = this.formatJson(headers, rows)
          const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
          const merges = ['A1:A2', 'B1:F1', 'G1:G2']
          excel.export_json_to_excel({
            header: Object.keys(headers),
            data,
            filename: '员工数据',
            multiHeader,
            merges,
          })
        } catch (err) {
          console.log(err)
        }
        this.downloadLoading = false
      })
    },
    formatJson(headers, rows) {
      // 将json数据转换成导出excel参数所需要的数组中包数组的格式
      return rows.map((v) => {
        // 先找到每条员工数据
        return Object.keys(headers).map((key) => {
          // 找到每个中文表头key，则headers[key]就是中文表头对应的英文
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            // 转换时间格式
            return formatDate(v[headers[key]])
          }
          if (headers[key] === 'formOfEmployment') {
            const obj = employeesConstant.hireType.find(
              (item) => item.id === v[headers[key]]
            )
            return obj ? obj.value : '未知'
          }
          return v[headers[key]]
        })
      })
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
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
.signature {
  width: 200px;
  height: 70px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}
</style>
