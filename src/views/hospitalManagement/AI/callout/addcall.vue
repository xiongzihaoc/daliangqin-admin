<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form
        class="searchForm"
        ref="searchFormRef"
        :model="searchForm"
        :inline="true"
      >
        <el-form-item label="用户姓名">
          <el-input
            v-model="searchForm.customerPersonName"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input
            v-model="searchForm.calledPhoneNumber"
            size="small"
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
          <el-button @click="searchAddBtn" type="primary" size="small"
            >单个导入</el-button
          >
        </el-form-item>
      </el-form>
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
        label="用户名"
        prop="customerPersonName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户手机号"
        prop="calledPhoneNumber"
      ></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editBtn(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="deleteBtn(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </EleTable>
    <!-- 弹出层 -->
    <el-dialog :title="title" :visible.sync="importVisible" width="40%">
      <el-form
        label-width="100px"
        :rules="formRules"
        ref="importForm"
        :model="importForm"
        label-position="left"
      >
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="importForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" prop="phoneNumber">
          <el-input v-model="importForm.phoneNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInformation('importForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EleTable from '@/components/Table'
import { httpAdminAiCall } from '@/api/admin/httpAdminAiCall'
import { validatePhone } from '@/utils/index'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      validatePhone,
      title: '导入单个用户',
      formRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: validatePhone,
            message: '手机号格式不对',
            trigger: 'blur',
          },
        ],
      },
      searchForm: {
        customerPersonName: '',
        calledPhoneNumber: '',
        robotCallJobId: '',
      },
      importForm: {
        name: '',
        phoneNumber: '',
        robotCallJobId: '',
      },
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹窗区域
      importVisible: false,
    }
  },
  created() {
    this.importForm.robotCallJobId = this.$route.query.robotCallJobId
    this.searchForm.robotCallJobId = this.$route.query.robotCallJobId
    this.getList()
  },
  methods: {
    /**
     * 获取外呼接口数据
     */
    getList() {
      let robotCallJobId = this.$route.query.robotCallJobId
      let data = Object.assign(this.searchForm, {
        page: this.pageNum,
        pageSize: this.pageSize,
      })
      httpAdminAiCall.getStatisticsList(data).then((res) => {
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    postAiStatistics() {
      console.log(this.importForm)
      httpAdminAiCall.postAiStatistics(this.importForm).then((res) => {
        if (res.code === 'OK') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
        this.getList()
        this.importVisible = false
      })
    },
    // 编辑用户信息
    putInformationUser() {
      let data = {
        id: this.importForm.id,
        name: this.importForm.name,
        phoneNumber: this.importForm.phoneNumber,
        robotCallJobId: this.importForm.robotCallJobId,
      }
      httpAdminAiCall.putInformationUser(data).then((res) => {
        console.log('编辑', res)
        if (res.code === 'OK') {
          this.$message.success('编辑成功')
        }
        this.getList()
        this.importVisible = false
      })
    },
    postInformation(importForm) {
      this.$refs[importForm].validate((valid) => {
        if (this.title != '编辑用户') {
          if (valid) {
            this.postAiStatistics()
          }
        } else {
          if (valid) {
            this.putInformationUser()
          }
        }
      })
    },
    /**
     * 按钮
     */
    searchAddBtn() {
      this.title = '导入单个用户'
      delete this.importForm.name
      delete this.importForm.phoneNumber
      delete this.importForm.id
      console.log(this.importForm)
      this.importVisible = true
    },
    /**
     * 操作
     */
    editBtn(val) {
      this.importVisible = true
      this.title = '编辑用户'
      this.importForm.name = val.customerPersonName
      this.importForm.phoneNumber = val.calledPhoneNumber
      this.importForm.id = val.id
    },
    deleteBtn(val) {
      let [calledPhoneNumber, robotCallJobId] = [
        val.calledPhoneNumber,
        val.robotCallJobId,
      ]
      httpAdminAiCall
        .getInformationUser({ calledPhoneNumber, robotCallJobId })
        .then((res) => {
          if (res.code === 'OK') {
            this.$message.success('删除成功')
          }
          this.getList()
        })
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    searchReset() {
      this.searchForm.customerPersonName = ''
      this.searchForm.calledPhoneNumber = ''
    },
    importFormReset() {
      this.importForm.name = ''
      this.importForm.phoneNumber = ''
    },
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getAiCallList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getAiCallList()
    },
  },
}
</script>

<style lang="scss" scoped></style>
