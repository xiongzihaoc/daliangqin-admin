<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医师姓名">
          <el-input v-model="searchForm.doctorUserName"
            size="small"
            placeholder="请输入医师姓名"></el-input>
        </el-form-item>
        <el-form-item label="医师手机号">
          <el-input v-model="searchForm.doctorPhone"
            size="small"
            maxlength="11"
            placeholder="请输入医师手机号"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="searchForm.doctorType"
            size="small"
            placeholder="请选择职位">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
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
        <el-form-item label="随访方式">
          <el-select v-model="searchForm.type"
            size="small"
            placeholder="请选择随访方式">
            <el-option v-for="item in followTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="随访用户">
          <el-input v-model="searchForm.patientUserName"
            size="small"
            placeholder="请输入随访用户"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="searchForm.patientPhone"
            size="small"
            maxlength="11"
            placeholder="请输入用户手机号"></el-input>
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
        <el-form-item label="随访时间">
          <el-date-picker v-model="searchForm.followTime"
            type="daterange"
            align="right"
            size="small"
            unlink-panels
            value-format="timestamp"
            @change="selectFollowTime"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select size="small"
            v-model="searchForm.userStatus"
            placeholder="请选择用户状态">
            <el-option v-for="item in userStatusList"
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
  </div>
</template>
<script>
import EleTable from '@/components/Untable'
import { httpAdminFollow } from '@/api/admin/httpAdminFollow'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  doctorTypeList,
  followTypeList,
  followType,
  healthList,
  userStatusList,
  heartList,
  parseTime,
  formatterElement,
} from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      // 医师类型列表
      doctorTypeList,
      // 随访方式列表
      followTypeList,
      followType,
      healthList,
      userStatusList,
      heartList,
      // 搜索表单
      searchForm: {
        doctorUserName: '',
        doctorType: '',
        doctorPhone: '',
        hospitalName: '',
        patientUserName: '',
        patientPhone: '',
        type: '',
        highBloodStatus: '',
        diabetesStatus: '',
        heartRateStatus: '',
        startTime: '',
        endTime: '',
        userStatus: '',
      },
      // 医院列表
      hospitalList: [],
      // 列表数据
      list: [],
      // 增改表单
      editAddForm: {
        fromUserName: '',
        contract: '',
        address: '',
      },
      // 表格数据
      tableHeaderBig: [
        { type: 'index', label: '序号', width: 50 },
        { prop: 'doctorUserName', label: '医师姓名' },
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
          prop: 'type',
          label: '随访方式',
          formatter: (row) => {
            return this.typeFormatter(row)
          },
        },
        { prop: 'content', label: '随访备注', isTooltip: true },
        { prop: 'patientUserName', label: '随访用户' },
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
          prop: 'startTime',
          label: '随访开始时间',
          formatter: (row) => {
            return parseTime(row.startTime)
          },
        },
        {
          prop: 'endTime',
          label: '随访结束时间',
          formatter: (row) => {
            return parseTime(row.endTime)
          },
        },
        {
          prop: 'userStatus',
          label: '用户状态',
          formatter: (row) => {
            return this.userStatusFormatter(row)
          },
        },
        {
          prop: 'updateTime',
          label: '创建时间',
          formatter: (row) => {
            return parseTime(row.updateTime)
          },
        },
      ],
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
      httpAdminFollow
        .getFollow({
          page: this.pageNum,
          pageSize: this.pageSize,
          doctorName: this.searchForm.doctorUserName,
          doctorType: this.searchForm.doctorType,
          doctorPhone: this.searchForm.doctorPhone,
          patientName: this.searchForm.patientUserName,
          patientPhone: this.searchForm.patientPhone,
          hospitalId: this.searchForm.hospitalId,
          type: this.searchForm.type,
          diseaseType: this.searchForm.diseaseType,
          highBloodStatus: this.searchForm.highBloodStatus,
          diabetesStatus: this.searchForm.diabetesStatus,
          heartRateStatus: this.searchForm.heartRateStatus,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          userStatus: this.searchForm.userStatus,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospitalAll({ pageSize: -1 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 日期控件选择事件
    selectFollowTime(val) {
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    addBtn() {
      this.$router.push({
        path: '/hospitalManagement/work/followDetail',
      })
    },
    // 编辑
    editBtn(val) {
      this.$router.push({
        path:
          '/hospitalManagement/work/followDetail?id=' + val.id + '&type=edit',
      })
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
      httpAdminFollow.deleteFollow(id).then((res) => {
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
            httpAdminFollow.postFollow(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminFollow.putFollow(this.editAddForm).then((res) => {
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
     * 表格格式化
     */
    doctorTypeFormatter(row) {
      return formatterElement.doctorType[row.doctorType]
    },
    typeFormatter(row) {
      return formatterElement.followType[row.type]
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
    diseaseTypeFormatter(row) {
      return formatterElement.followTypeList[row.diseaseType]
    },
    userStatusFormatter(row) {
      // return formatterElement.userStatus[row.userStatus]
      switch (row.userStatus) {
        case 'HEALTH':
          return `<span class='HEALTH'>良好</span>`
        case 'SLIGHT':
          return `<span class='SLIGHT'>轻微</span>`
        case 'SERIOUS':
          return `<span class='SERIOUS'>严重</span>`
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

<style></style>
