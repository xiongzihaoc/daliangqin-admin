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
          <el-select multiple
            clearable
             collapse-tags
            v-model="searchForm.hospitalId"
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
        <el-form-item label="是否打印"
          align="left">
          <el-select class="w100"
            v-model="searchForm.printStatus"
            size="small"
            placeholder="请选择是否打印">
            <el-option v-for="item in printStatusList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
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
            :picker-options="pickerOptions"></el-date-picker>
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
            @click="exportExcel">导出Excel</el-button>
          <!-- <el-button size="small"
            type="success"
            icon="el-icon-folder-checked"
          @click="bulkPrint">批量打印</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div style="text-align: right; margin-bottom: 10px">
      <el-tooltip class="item"
        effect="dark"
        content="注意：重置次数是指将筛选后的列表打印次数重置为0"
        placement="top-start">
        <el-button plain
          @click="resetPrintCount"
          size="small">重置打印次数</el-button>
      </el-tooltip>
    </div>
    <EleTable :data="list"
      :header="tableHeaderBig"
      @cell-dblclick="cellDblClick"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        fixed="left"
        label="序号"
        type="index"></el-table-column>
      <el-table-column align="center"
        fixed="left"
        label="医院名称"
        prop="hospitalName"></el-table-column>
      <el-table-column align="center"
        fixed="left"
        label="医师姓名"
        prop="doctorUserName"></el-table-column>
      <el-table-column align="center"
        fixed="left"
        label="姓名"
        prop="patientUserName">
        <template slot-scope="scope">
          <span class="skipStyle"
            @click="skipPatient(scope.row)">
            {{ scope.row.patientUserName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="手机号"
        prop="patientUserPhone"></el-table-column>
      <el-table-column align="center"
        label="身份证号"
        prop="idCard"></el-table-column>
      <!-- <el-table-column align="center" label="年龄" prop="age"> </el-table-column> -->
      <!-- <el-table-column align="center" label="设备名称" prop="name"> </el-table-column> -->
      <el-table-column align="center"
        label="设备号"
        prop="serialNumber"></el-table-column>
      <!-- <el-table-column align="center" label="监测模式" prop="detectType">
        <template slot-scope="scope">
          <span v-if="scope.row.detectType === 'DAILY'">日常监测</span>
          <span v-else>24小时监测</span>
        </template>
      </el-table-column>-->
      <!-- <el-table-column align="center" label="心率值(bpm)" prop="heartRateScore">
        <template slot-scope="scope">
          <span class="fw">{{ scope.row.heartRateScore }}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center"
        label="监测时长"
        prop="length"
        :formatter="lengthFormatter"></el-table-column>
      <!-- <el-table-column align="center" label="测量结果" prop="title"> </el-table-column> -->
      <el-table-column align="center"
        label="处置建议"
        prop="suggestion"
        show-overflow-tooltip></el-table-column>
      <el-table-column align="center"
        label="心电分析结果"
        prop="ecgResult"
        show-overflow-tooltip></el-table-column>
      <el-table-column align="center"
        label="监测日期"
        prop="inspectionTime">
        <template slot-scope="scope">
          <span style="color: #f56c6c; font-weight: 700">
            {{ parseTime(scope.row.inspectionTime) }}
          </span>
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
          <span class="HEALTH">{{ parseTime(scope.row.auditTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="审核人"
        prop="auditorName"></el-table-column>
      <el-table-column align="center"
        label="已打印次数"
        prop="printNumber">
        <template slot-scope="scope">
          <span v-if="scope.row.printNumber > 0"> {{ scope.row.printNumber }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        fixed="right"
        width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.isAnalysisIng === false">
            <el-button size="mini"
              @click="examineReport(scope.row)"
              type="primary">查看报告</el-button>
            <!-- 打印按钮 只有审核完毕才能打印 -->
            <el-button plain
              size="mini"
              @click="openPrintDialog(scope.row)"
              :disabled="
                scope.row.auditStatus === 'TO_AUDIT' ||
                scope.row.auditStatus === 'TO_HOSPITAL_AUDIT' ||
                scope.row.auditStatus === 'INVALID'
              ">打印</el-button>
          </div>
          <div v-else>
            <el-button size="mini"
              disabled
              plain>正在分析中</el-button>
          </div>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 打印弹框 -->
    <el-dialog title="打印页面"
      :visible.sync="printDialogVisible"
      width="35%"
      @close="closePrintDialog"
      v-dialogDrag>
      <div class="print-container">
        <div class="container"
          id="printMe">
          <h3 class="fz18">院外便携式心电监测</h3>
          <!-- 监测医院 时间 -->
          <div class="userInfo top">
            <div class="hospital">
              <span class="title fw">监测医院：</span>
              <span class="content minWidth">{{ userInfo.hospitalName }}</span>
            </div>
            <div class="hospital">
              <span class="title fw">监测时间：</span>
              <span class="content">{{ parseTime(userInfo.inspectionTime) }}</span>
            </div>
          </div>
          <!-- 个人详细信息 -->
          <div class="userInfo">
            <div class="userName flex margin">
              <div class="box">
                <span class="fw txt-r">姓名</span>：
                <span contenteditable="true"
                  class="minWidth"
                  v-html="userInfo.patientUserName"></span>
              </div>
              <div class="box">
                <span class="fw txt-r">年龄</span>：
                <span>{{ userInfo.age }}</span>
              </div>
              <div class="box">
                <span class="fw txt-r">身份证号</span>：
                <span>{{ userInfo.idCard }}</span>
              </div>
            </div>
            <div class="userName flex margin">
              <div class="box">
                <span class="fw txt-r">手机号码</span>：
                <span>{{ userInfo.patientUserPhone }}</span>
              </div>
              <div class="box">
                <span class="fw txt-r">监测设备</span>：
                <span>{{ userInfo.name }}</span>
              </div>
              <div class="box">
                <span class="fw txt-r">监测模式</span>：
                <span v-if="userInfo.detectType === 'DAILY'">日常监测</span>
                <span v-else>24小时监测</span>
              </div>
            </div>
            <div class="userName flex">
              <div class="box">
                <span class="fw txt-r">监测时长</span>：
                <span>{{ formatSeconds(heartDetail.length) }}</span>
              </div>
              <div class="over box">
                <span class="fw txt-r">测量结果</span>：
                <span ref="title"
                  class="minWidth"
                  style="
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                  "
                  v-html="heartDetail.title"></span>
              </div>
              <!-- 占位符 -->
              <div class="over box"><span class="fw"></span></div>
            </div>
          </div>
          <div class="analyse">
            <img class="analyse-img"
              v-if="heartDetail.fileImagePath && heartDetail.fileImagePath != ''"
              :src="heartDetail.fileImagePath" />
            <div class="fz14 analyse-title">心率分析：</div>
            <div class="flex margin resultWidth">
              <div>
                <span class="fw">平均心率：</span>
                <span class="fw fz16"
                  v-html="heartDetail.avg"></span>
                <span class="fw">bpm</span>
              </div>
              <div>
                <span class="fw">最高心率：</span>
                <span class="fw fz16"
                  v-html="heartDetail.max"></span>
                <span class="fw">bpm</span>
              </div>
              <div>
                <span class="fw">最低心率：</span>
                <span class="fw fz16"
                  v-html="heartDetail.min"></span>
                <span class="fw">bpm</span>
              </div>
            </div>
            <div class="flex resultWidth">
              <div>
                <span class="fw">正常心率：</span>
                <span class="fw fz16"
                  v-html="heartDetail.normalRate"></span>
                <span class="fw">%</span>
              </div>
              <div>
                <span class="fw">心率偏快：</span>
                <span class="fw fz16"
                  v-html="heartDetail.heartbeatRate"></span>
                <span class="fw">%</span>
              </div>
              <div>
                <span class="fw">心率偏慢：</span>
                <span class="fw fz16"
                  v-html="heartDetail.slowRate"></span>
                <span class="fw">%</span>
              </div>
            </div>
          </div>
          <div class="impression">
            <div class="fz14 impression-title">心电分析印象：</div>
            <div class="ecgResultTz"
              v-html="heartDetail.ecgResultTz"></div>
          </div>
          <div class="result">
            <div class="fz14">心电分析结果：</div>
            <div class="fz11 result-text"
              v-html="heartDetail.ecgResult"></div>
            <div class="result-option">
              <div class="fw result-title">处置建议：</div>
              <div class="content"
                v-html="heartDetail.suggestion"></div>
            </div>
            <div class="result-option middle">
              <div class="fw result-title">原因分析：</div>
              <div class="content"
                v-html="heartDetail.abnorAnalysis"></div>
            </div>
            <div class="result-option">
              <div class="fw result-title">保健建议：</div>
              <div class="content"
                v-html="heartDetail.healthCareAdvice"></div>
            </div>
          </div>
          <!-- 底部 -->
          <div class="footer">
            <div class="left"></div>
            <div class="right">
              <span class="fz14">医生签名：</span>
            </div>
          </div>
        </div>
      </div>
      <el-button type="primary"
        @click="onPrint"
        v-print="printObj"
        style="display: block; width: 50%; margin: 20px auto">打印</el-button>
    </el-dialog>
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
  printStatusList,
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
      printStatusList,
      // 搜索表单
      searchForm: {
        patientUserName: '',
        patientUserPhone: '',
        detectType: '',
        auditStatus: '',
        doctorUserId: '',
        hospitalId: [],
        resultStatus: '',
        ecgResult: '',
        suggestion: '',
        monitorTime: [], // 监测时间
        startTime: '',
        endTime: '',
        printStatus: '', // 打印状态
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
      printDialogVisible: false, // 打印弹框
      printObj: {
        // 打印配置
        id: 'printMe',
        popTitle: '',
        extraCss: '',
        extraHead: '',
      },
      printId: '', // 打印某条记录的Id
      userInfo: {}, // 个人信息
      heartDetail: {}, // 心率建议信息
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
    this.searchForm.hospitalId = JSON.parse(monitoringHospitalId)
    this.searchForm.auditStatus = monitoringAuditStatus
    this.getList()
  },
  beforeDestroy() {
    sessionStorage.removeItem('heartSearchForm')
    sessionStorage.removeItem('heartPageNum')
    sessionStorage.removeItem('heartPageSize')
    sessionStorage.removeItem('monitoringHospitalId')
    sessionStorage.removeItem('monitoringStartTime')
    sessionStorage.removeItem('monitoringEndTime')
    sessionStorage.removeItem('monitoringAuditStatus')
  },
  mounted() {
    this.getHospitalList()
    this.getDoctorList()
  },
  watch: {},
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
          hospitalIdList: JSON.stringify(this.searchForm.hospitalId),
          resultStatus: this.searchForm.resultStatus,
          ecgResult: this.searchForm.ecgResult,
          heartRateAdviceType: this.searchForm.suggestion,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          printStatus: this.searchForm.printStatus,
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
      this.pageNum = 1
      this.searchForm = {}
      this.getList()
    },
    /**
     * CRUD
     */
    // 查看报告
    examineReport(val) {
      // 跳转心率详情新窗口打开
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
    },
    // 查看心电图
    examineElectrocardiograph(val) {
      let deskUrl = JSON.parse(val.reportResult).body.data.deskUrl1
      let ecgUrl = JSON.parse(val.reportResult).body.data.ecgUrl
      if (deskUrl) {
        window.open(deskUrl)
      } else {
        window.open(ecgUrl.replace('vertical', 'one_ecg'))
      }
    },
    // 跳转报告详情
    skipReportDetail() {
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
    /**
     * 导出excel
     */
    exportExcel() {
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
    //  对导出数据格式处理
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },

    // 导出的列表数据
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
    /**
     * 打印
     * 批量打印
     */
    openPrintDialog(val) {
      this.printDialogVisible = true
      this.printId = val.id
      // 个人信息
      this.userInfo = val
      // 心率建议信息
      this.heartDetail = JSON.parse(val.reportResult)?.body?.data
    },
    // 打印弹框关闭刷新列表
    closePrintDialog() {
      this.getList()
    },
    // 记录打印次数
    onPrint() {
      httpAdminHeartRate
        .putHeartRatePrint({ recordId: this.printId })
        .then((res) => {})
    },
    // 重置打印次数
    resetPrintCount() {
      httpAdminHeartRate.putHeartRateClearBatch(this.searchForm).then((res) => {
        if (res.code === 'OK') {
          this.getList()
          this.$message.success('操作成功')
        }
      })
    },
    // 批量打印
    bulkPrint() {},
    // 双击自定义打印次数
    cellDblClick(row, column, cell, event) {
      let that = this
      if (column.label === '已打印次数') {
        // 取出单元格的值
        let beforeVal = event.target.textContent
        // 置空单元格容器内元素
        event.target.innerHTML = ''
        // 替换成el-input
        let str = `<div class='cell'>
            <div class='el-input'>
              <input type='text' placeholder='请输入' class='el-input__inner'>
            </div>
        </div>`
        cell.innerHTML = str
        console.log(str)
        //  获取双击后生成的input  根据层级嵌套会有所变化
        let cellInput = cell.children[0].children[0].children[0]
        cellInput.value = beforeVal
        cellInput.focus() // input自动聚焦
        // 失去焦点后  将input移除
        cellInput.onblur = function () {
          cellInput.value = cellInput.value.replace(/[^0-9]/g, '')
          // 调用接口保存输入内容
          httpAdminHeartRate
            .putHeartRatePrint({
              recordId: row.id,
              printNumber: Number(cellInput.value),
            })
            .then((res) => {
              console.log(res)
              if (res.code === 'OK') {
                let onblurCont = `<div class='cell'>${cellInput.value}</div>`
                cell.innerHTML = onblurCont // 换成原有的显示内容
                that.getList()
                that.$message.success('操作成功')
              }
            })
        }
      }
    },
    /**
     * 表格格式化
     */
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

<style>
.el-step__title {
  font-size: 14px !important;
}
</style>
<style lang="scss" scoped>
@page {
  size: auto; /* auto is the initial value */
  margin: 3mm; /* this affects the margin in the printer settings */
}

html {
  background-color: #ffffff;
  margin: 0; /* this affects the margin on the html before sending to printer */
}

body {
  border: solid 1px blue;
  margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
}
[contenteditable]:focus {
  outline: 0px solid transparent;
  caret-color: red;
}
.print-container {
  width: 100%;
  margin: 0 auto;
}
.container {
  width: 90%;
  margin: 0 auto;
  font-size: 11px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  h3 {
    text-align: center;
  }
  .userInfo {
    padding: 10px 10px;
    box-sizing: border-box;
    border-top: 2px solid #000;
    .userName {
      display: flex;
      justify-content: space-around;
      .box {
        display: flex;
        align-items: center;
        width: 33.33%;
        .txt-r {
          display: inline-block;
          word-break: keep-all;
          white-space: nowrap;
          width: 70px;
          text-align-last: justify;
        }
      }
    }
  }
  .top {
    display: flex;
    align-items: center;
    border-bottom: none;
    justify-content: space-between;
  }
  .analyse {
    padding: 0 10px 10px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    .analyse-img {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 120px;
    }
    .analyse-title {
      margin: 5px 0;
    }
  }
  .impression {
    padding: 8px 10px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    .impression-title {
      margin-bottom: 5px;
    }
  }
  .result {
    padding: 8px 10px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    .result-text {
      margin: 10px 0;
    }
    .middle {
      margin: 10px 0;
    }
    .result-option {
      display: flex;
      .result-title {
        word-break: keep-all;
        white-space: nowrap;
        line-height: 1.5;
        min-width: 60px;
      }
      .content {
        min-width: 200px;
        line-height: 1.5;
        text-align-last: left;
        text-align: justify;
        text-justify: distribute-all-lines;
      }
    }
  }
  .variation-box {
    padding: 8px 10px;
    box-sizing: border-box;
    .variation {
      margin: 5px 0;
    }
    .variation-text {
      line-height: 18px;
      text-align-last: left;
      text-align: justify;
      text-justify: distribute-all-lines;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding: 8px 10px;
    .left,
    .right {
      flex: 1;
    }
    .left {
      display: flex;
      span {
        flex: 1;
        flex-wrap: nowrap;
      }
      .date {
        min-width: 120px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      span {
        min-width: 80px;
      }
      .signature {
        vertical-align: bottom;
        width: 200px;
        height: 70px;
        margin-left: -20px;
      }
    }
  }
  .resultWidth div {
    min-width: 110px;
  }
}
.rightSignature {
  margin-left: 30px;
  img {
    width: 260px;
    height: 70px;
    border-radius: 5px;
  }
}
.printBtn {
  margin-top: 10px;
}
.ecgResultTz {
  line-height: 1.5;
}
.advice {
  font-size: 11px;
}
.remark {
  text-align: center;
  margin: 30px 0;
  font-size: 12px;
  color: #ccc;
}
.tooltip {
  display: inline-block;
  font-size: 10px;
  color: #ccc;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.over {
  visibility: hidden;
}
.fz11 {
  font-size: 11px;
  font-weight: 700;
}

.fz14 {
  font-size: 14px;
  font-weight: 700;
}
.fz18 {
  font-size: 18px;
  font-weight: 700;
}
.fw {
  font-weight: 700;
}
.minWidth {
  display: inline-block;
  min-width: 10px;
}
.margin {
  margin: 10px 0;
}
.removeScroll {
  overflow: hidden;
  overflow-y: auto;
}
/*滚动条样式*/
.removeScroll::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}
.removeScroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0);
}
.removeScroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}
</style>
