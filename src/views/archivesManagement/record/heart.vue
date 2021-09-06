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
          <el-select v-model="searchForm.detectType"
            size="small"
            placeholder="请选择监测模式">
            <el-option label="24小时监测"
              value="TWENTY_FOUR_HOURS"></el-option>
            <el-option label="日常监测"
              value="DAILY"></el-option>
          </el-select>
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
          prop="doctorUserName">
          <el-input v-model="searchForm.doctorUserName"
            size="small"
            placeholder="请输入医师姓名"></el-input>
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
          <span class="skipStyle"
            @click="skipPatient(scope.row)">{{scope.row.patientUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="手机号"
        prop="patientUserPhone">
      </el-table-column>
      <el-table-column align="center"
        label="身份证号"
        prop="idCard">
      </el-table-column>
      <el-table-column align="center"
        label="年龄"
        prop="age">
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
        prop="detectType">
        <template slot-scope="scope">
          <span v-if="scope.row.detectType === 'DAILY'">日常监测</span>
          <span v-else>24小时监测</span>
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
        label="监测时长"
        prop="length"
        :formatter="lengthFormatter">
      </el-table-column>
      <el-table-column align="center"
        label="测量结果"
        prop="title">
      </el-table-column>
      <el-table-column align="center"
        label="监测日期"
        prop="inspectionTime">
        <template slot-scope="scope">
          {{parseTime(scope.row.inspectionTime)}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="审核状态"
        prop="auditStatus"
        :formatter="auditStatusFormatter">
      </el-table-column>
      <el-table-column align="center"
        label="审核时间"
        prop="auditTime">
        <template slot-scope="scope">
          {{parseTime(scope.row.auditTime)}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="审核人"
        prop="auditorName">
      </el-table-column>
      <el-table-column align="center"
        label="医师姓名"
        prop="doctorUserName">
      </el-table-column>
      <el-table-column align="center"
        label="医院名称"
        prop="hospitalName">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="examineReport(scope.row)"
            type="primary">查看报告</el-button>
          <el-button size="mini"
            @click="examineElectrocardiograph(scope.row)"
            plain>查看心电图</el-button>
            <el-button size="mini"
              type="danger"
              v-if="scope.row.auditStatus === 'INVALID'"
              @click="cancelCancellation(scope.row)">取消作废</el-button>
            <el-button size="mini"
              type="danger"
              v-else
              @click="onCancellation(scope.row)">作废</el-button>
        </template>
      </el-table-column>
    </EleTable>
    <el-dialog title="提示"
      :visible.sync="hospitalDialogVisible"
      width="30%"
      v-dialogDrag>
      <el-form ref="hospitalFormRef"
        :model="hospitalForm"
        label-width="120px">
        <el-form-item label="启用签名">
          <el-radio-group v-model="hospitalForm.isSignature">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="签名图"
          v-if="hospitalForm.isSignature === '1'">
          <img :src="hospitalForm.signUrl"
            class="signature">
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="hospitalDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="skipReportDetail">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminHeartRate } from '@/api/admin/httpAdminHeartRate'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminAudit } from '@/api/admin/httpAdminAudit'
import {
  parseTime,
  formatSeconds,
  resultStatus,
  auditStatus,
  formatterElement,
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
      formatterElement,
      searchForm: {
        patientUserName: '',
        patientUserPhone: '',
        detectType: '',
        auditStatus: '',
        doctorUserName: '',
        hospitalId: '',
        resultStatus: 'NORMAL',
      },
      hospitalList: [],
      doctorList: [],
      patientList: [],
      list: [],
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
    let hospitalId = localStorage.getItem('hospitalId')
    if (hospitalId) {
      this.searchForm.hospitalId = hospitalId
    }
    this.getList()
  },
  mounted() {
    this.getHospitalList()
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
          doctorUserName: this.searchForm.doctorUserName,
          hospitalId: this.searchForm.hospitalId,
          resultStatus: this.searchForm.resultStatus,
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
    // 作废
    onCancellation(val) {
      let formData = {
        id: val.id,
        ecgAuditStatus: 'INVALID',
      }
      httpAdminAudit.postAudit(formData).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('已作废')
          this.getList()
        }
      })
    },
    // 取消作废
    cancelCancellation(val) {
      let formData = {
        id: val.id,
        ecgAuditStatus: 'TO_AUDIT',
      }
      httpAdminAudit.postAudit(formData).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('取消作废')
          this.getList()
        }
      })
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
      this.searchForm = {
        resultStatus: 'NORMAL',
      }
      this.getList()
    },
    /**
     * CRUD
     */
    // 查看报告
    examineReport(val) {
      if (val.signUrl != '') {
        this.hospitalForm.hospitalName = val.hospitalName
        this.hospitalForm.name = val.patientUserName
        this.hospitalForm.signUrl = val.signUrl
        this.hospitalForm.recordId = val.id
        this.hospitalDialogVisible = true
      } else {
        this.$router.push(
          '/archivesManagement/record/heartDetail?id=' +
            val.id +
            '&name=' +
            val.patientUserName +
            '&hospitalName=' +
            val.hospitalName
        )
      }
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
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    lengthFormatter(row) {
      if (row.reportResult != '') {
        return formatSeconds(JSON.parse(row.reportResult).body.data.length)
      }
    },
    /**
     * 表格格式化
     */
    auditStatusFormatter(row) {
      return formatterElement.auditStatus[row.auditStatus]
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
