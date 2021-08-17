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
        <!-- <el-form-item label="检测模式"
          align="left"
          prop="detectType">
          <el-select v-model="searchForm.detectType"
            size="small"
            placeholder="请选择检测模式">
            <el-option label="24小时检测"
              value="TWENTY_FOUR_HOURS"></el-option>
            <el-option label="日常检测"
              value="DAILY"></el-option>
          </el-select>
        </el-form-item> -->
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
        label="检测时长"
        prop="length"
        :formatter="lengthFormatter">
      </el-table-column>
      <el-table-column align="center"
        label="心率值(bpm)"
        prop="heartRateScore">
        <template slot-scope="scope">
          <span class="fw">{{scope.row.heartRateScore}}</span>
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
        width="120">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="examineBtn(scope.row)"
            type="primary">查看</el-button>
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
          @click="edithospitalNameEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminHeartRate } from '@/api/admin/httpAdminHeartRate'
import { parseTime, formatSeconds } from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      formatSeconds,
      searchForm: {
        patientUserName: '',
        patientUserPhone: '',
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
        inspectionTime: '',
        heartRateScore: '',
        detectType: '',
      },
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
    this.getList()
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
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
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
    // 查看
    examineBtn(val) {
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
    // 修改医院名称
    edithospitalNameEnter() {
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
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    lengthFormatter(row) {
      if (row.reportResult != '') {
        return formatSeconds(JSON.parse(row.reportResult).body.data.length)
      }
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

<style lang="scss" scoped>
.signature {
  width: 200px;
  height: 70px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}
</style>
