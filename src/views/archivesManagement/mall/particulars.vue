<template>
  <div class="app-container">
    <div class="search-box">
      <el-form class="searchForm" :inline="true">
        <el-form-item label="医院名称">
          <el-select v-model="searchForm.hospitalName" size="small">
            <el-option
              v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医师姓名">
          <el-input
            v-model="searchForm.doctorName"
            placeholder="请输入医师姓名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input
            v-model="searchForm.userName"
            placeholder="请输入用户姓名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input
            v-model="searchForm.phone"
            placeholder="请输入用户手机号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="spending != 'primary'" label="任务名称">
          <el-input
            v-model="searchForm.taskNames"
            size="small"
            placeholder="请输入任务名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="searchBtn"
            type="primary"
            size="small"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            @click="searchReset"
            size="small"
            plain
            icon="el-icon-refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button-group style="margin-bottom: 15px">
        <el-button size="small" :type="income" @click="checkBtn('income')"
          >积分收入</el-button
        >
        <el-button size="small" :type="spending" @click="checkBtn('spending')"
          >积分兑换</el-button
        >
      </el-button-group>
    </div>
    <!-- 表格 -->
    <EleTable
      :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医院名称"
        prop="hospitalName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医师姓名"
        prop="doctorName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户姓名"
        prop="userName"
      ></el-table-column>
      <el-table-column align="center" label="年龄" prop="age"></el-table-column>
      <el-table-column
        align="center"
        label="用户手机号"
        prop="phone"
      ></el-table-column>
      <el-table-column
        align="center"
        label="积分数"
        prop="integral"
      ></el-table-column>
      <el-table-column
        align="center"
        label="当前积分"
        prop="total"
      ></el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime">
        <template slot-scope="scope">
          <span> {{ parseTime(scope.row.createTime) }} </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="spending == 'primary'"
        align="center"
        label="商品名称"
        prop=""
      ></el-table-column>
      <el-table-column
        v-if="spending == 'primary'"
        align="center"
        label="商品图片"
        prop="image"
      ></el-table-column>
      <el-table-column
        v-if="spending == 'primary'"
        align="center"
        label="商品规格"
        prop="sku"
      ></el-table-column>
      <el-table-column
        v-if="spending != 'primary'"
        align="center"
        label="任务名称"
        prop="targeName"
      ></el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { parseTime } from '@/utils/index'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminIntegralRecord } from '@/api/admin/httpAdminIntegralRecord'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      income: 'primary',
      spending: '',
      searchForm: {
        type: 'INCOME',
        hospitalName: '',
        doctorName: '',
        userName: '',
        phone: '',
        taskNames: '',
      },
      list: [],
      tableHeaderBig: [],
      hospitalList: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    let hospitalName = sessionStorage.getItem('hospitalNameAccount')
    let userName = sessionStorage.getItem('userNameAccount')
    let doctorName = sessionStorage.getItem('doctorNameAccount')
    let phone = sessionStorage.getItem('phoneAccount')
    this.searchForm.hospitalName = hospitalName
    this.searchForm.userName = userName
    this.searchForm.doctorName = doctorName
    this.searchForm.phone = phone
    this.getList()
  },
  mounted() {
    this.getHospitalList()
  },
  beforeDestroy() {
    this.removeItem()
  },
  methods: {
    getList() {
      let data = Object.assign(this.searchForm, {
        page: this.pageNum,
        pageSize: this.pageSize,
      })
      httpAdminIntegralRecord.getIntegralRecord(data).then((res) => {
        console.log(res)
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    // 获取医院列表
    getHospitalList(hospitalId) {
      httpAdminHospital
        .getHospital({ pageSize: -1, hospitalId })
        .then((res) => {
          this.hospitalList = res.data.elements
        })
    },
    /**
     * 移除缓存
     */
    removeItem() {
      sessionStorage.removeItem('hospitalNameAccount')
      sessionStorage.removeItem('userNameAccount')
      sessionStorage.removeItem('doctorNameAccount')
      sessionStorage.removeItem('phoneAccount')
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.getList()
    },
    searchReset() {
      this.spending = ''
      this.income = 'primary'
      this.searchForm = { type: 'INCOME' }
      this.removeItem()
      this.getList()
    },
    /**
     * 积分切换列表
     */
    checkBtn(val) {
      if (val === 'spending') {
        this.spending = 'primary'
        this.income = ''
        this.searchForm = {}
        this.searchForm.type = 'SPENDING'
      } else {
        this.spending = ''
        this.income = 'primary'
        this.searchForm = {}
        this.searchForm.type = 'INCOME'
      }
      this.getList()
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
</style>