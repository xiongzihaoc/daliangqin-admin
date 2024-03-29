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
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="phone">
          <el-input v-model="searchForm.phone"
            v-Int
            size="small"
            maxlength="11"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份"
          align="left"
          prop="adminRoleType">
          <el-select style="width: 100%"
            placeholder="请选择身份"
            v-model="searchForm.adminRoleType"
            size="small">
            <el-option v-for="item in adminRoleTypeList"
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
    <el-button @click="addBtn"
      type="primary"
      class="tableAdd"
      size="small"
      plain
      icon="el-icon-plus">新增</el-button>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="二维码">
        <template slot-scope="scope">
          <div @click="getQRcode(scope.row.wxAuthorizationUrl)">
            <vue-qr :size="24"
              :margin="0"
              :auto-color="true"
              :dot-scale="1"
              :text="scope.row.wxAuthorizationUrl" />
          </div>
        </template>
      </el-table-column>
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
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="formRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="选择身份"
          prop="adminRoleType">
          <el-select style="width: 100%"
            placeholder="请选择身份"
            v-model="editAddForm.adminRoleType">
            <el-option v-for="item in adminRoleTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称"
          align="left"
          v-if="this.editAddForm.adminRoleType === 'HOSPITAL_ECG_DOCTOR'"
          prop="hospitalId">
          <el-select class="w100"
            v-model="editAddForm.hospitalId"
            size="small"
            filterable
            placeholder="请选择医院">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名"
          prop="name">
          <el-input v-model="editAddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="phone"
          v-if="this.infoTitle === '新增'">
          <el-input v-Int
            v-model="editAddForm.phone"
            maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 二维码放大页面 -->
    <el-dialog title="二维码"
      :visible.sync="QRDialogVisible"
      width="30%"
      v-dialogDrag>
      <div class="openQRcode">
        <vue-qr :size="288"
          :margin="0"
          :auto-color="true"
          :dot-scale="1"
          :text="openWxAuthorizationUrl" />
        <span>微信扫一扫</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import VueQr from 'vue-qr'
import EleTable from '@/components/Untable'
import { httpAdminRole } from '@/api/admin/httpAdminRole'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  parseTime,
  validatePhone,
  adminRoleTypeList,
  deviceTypeList,
} from '@/utils/index'
export default {
  components: {
    EleTable,
    VueQr,
  },
  data() {
    return {
      parseTime,
      adminRoleTypeList,
      deviceTypeList,
      formRules: {
        adminRoleType: [
          { required: true, message: '请选择身份', trigger: 'blur' },
        ],
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, validator: validatePhone }],
      },
      searchForm: {
        adminRoleType: '',
        name: '',
        phone: '',
      },
      hospitalList: [],
      list: [],
      editAddForm: {
        adminRoleType: '',
        deviceType: '',
        name: '',
        phone: '',
        hospitalId: '',
      },
      tableHeaderBig: [
        { label: '序号', type: 'index', width: 50 },
        { prop: 'name', label: '姓名' },
        { prop: 'phone', label: '手机号' },
        { prop: 'roleName', label: '身份' },
        {
          prop: 'createTime',
          label: '创建时间',
          formatter: (row) => {
            return parseTime(row.createTime)
          },
        },
        {
          prop: 'loginTime',
          label: '最后登录时间',
          formatter: (row) => {
            return parseTime(row.loginTime)
          },
        },
      ],
      openWxAuthorizationUrl: '',
      QRDialogVisible: false,
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
      httpAdminRole
        .getAdminRole({
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          adminRoleType: this.searchForm.adminRoleType,
        })
        .then((res) => {
          console.log(res)
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
    // 新增
    addBtn() {
      this.infoTitle = '新增'
      this.editAddForm = {}
      this.editDialogVisible = true
    },
    // 编辑
    editBtn(val) {
      this.infoTitle = '编辑'
      this.editAddForm = JSON.parse(JSON.stringify(val))
      this.editDialogVisible = true
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
      httpAdminRole.deleteAdminRole(id).then((res) => {
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
            httpAdminRole.postAdminRole(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminRole.putAdminRole(this.editAddForm).then((res) => {
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
    // 二维码放大
    getQRcode(val) {
      this.QRDialogVisible = true
      this.openWxAuthorizationUrl = val
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
.openQRcode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    display: inline-block;
    margin-top: 30px;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
