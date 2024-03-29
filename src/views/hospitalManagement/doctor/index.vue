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
        <el-form-item label="身份证号"
          align="left"
          prop="idCard">
          <el-input v-model="searchForm.idCard"
            size="small"
            placeholder="请输入身份证号"
            maxlength="18"></el-input>
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
        <el-form-item label="职位"
          align="left"
          prop="type">
          <el-select v-model="searchForm.type"
            placeholder="请选择职位"
            size="small">
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
        type="index"
        label="序号" width="50"></el-table-column>
      <el-table-column align="center"
        label="姓名"
        prop="name"></el-table-column>
      <el-table-column align="center"
        label="头像"
        prop="avatarUrl">
        <template slot-scope="scope">
          <img class="tableImg"
            :src="scope.row.avatarUrl" />
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="手机号"
        prop="phone"></el-table-column>
      <el-table-column align="center"
        label="身份证号"
        prop="idCard"></el-table-column>
      <el-table-column align="center"
        label="出生日期"
        prop="birthday"
        :formatter="birthdayFormatter"></el-table-column>
      <el-table-column align="center"
        label="年龄"
        prop="age"></el-table-column>
      <el-table-column align="center"
        label="性别"
        prop="gender"
        :formatter="genderFormatter"></el-table-column>
      <el-table-column align="center"
        label="职位"
        prop="type"
        :formatter="typeFormatter"></el-table-column>
      <el-table-column align="center"
        label="医院名称"
        prop="hospitalName"></el-table-column>
      <el-table-column align="center"
        label="用户数量"
        prop="patientCount">
        <template slot-scope="scope">
          <span @click="skipPatient(scope.row)"
            style="color: #1890ff; text-decoration: underline">{{ scope.row.patientCount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="创建人"
        prop="createUserName"></el-table-column>
      <el-table-column align="center"
        label="创建时间"
        prop="createTime">
        <template slot-scope="scope">{{
          parseTime(scope.row.createTime)
        }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            plain
            :disabled="unlockFn(scope.row)"
            @click="unlockBtn(scope.row)">解锁</el-button>
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
        <el-form-item label="医师姓名"
          prop="name">
          <!-- 编辑阻止修改医师姓名 -->
          <el-input :disabled="this.infoTitle === '编辑' ? true : false"
            v-model="editAddForm.name"
            placeholder="请输入医师真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="医师头像"
          prop="avatarUrl">
          <single-upload v-model="editAddForm.avatarUrl"
            uploadType="AVATAR" />
        </el-form-item>
        <!-- 编辑阻止修改医师手机号-->
        <el-form-item label="手机号"
          prop="phone">
          <el-input :disabled="this.infoTitle === '编辑' ? true : false"
            v-model="editAddForm.phone"
            v-Int
            maxlength="11"
            placeholder="请输入该医师手机号"></el-input>
        </el-form-item>
        <!-- 编辑阻止修改医师身份证号 -->
        <el-form-item label="身份证号">
          <el-input v-model="editAddForm.idCard"
            maxlength="18"
            :disabled="idCardIsDisabled"
            placeholder="请输入该医师身份证号"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          prop="type">
          <el-select :disabled="this.infoTitle === '编辑' ? true : false"
            v-model="editAddForm.type"
            placeholder="请选择职位"
            style="width: 100%">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称"
          prop="hospitalId">
          <el-select v-model="editAddForm.hospitalId"
            :disabled="editAddForm.patientCount > 0 ? true : false"
            placeholder="请选择医院"
            style="width: 100%">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :value="item.id"
              :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介"
          prop="introduction">
          <el-input type="textarea"
            v-model="editAddForm.introduction"
            :rows="5"
            maxlength="140"
            placeholder="请输入个人简介"></el-input>
        </el-form-item>
        <el-form-item label="医师擅长"
          prop="goodAt">
          <el-input type="textarea"
            :rows="5"
            v-model="editAddForm.goodAt"
            maxlength="140"
            placeholder="请输入医师擅长"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import singleUpload from '@/components/Upload'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  validatePhone,
  parseTime,
  doctorTypeList,
  genderList,
  formatterElement,
} from '@/utils/index'
export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      parseTime,
      doctorTypeList,
      genderList,
      formRules: {
        name: [{ required: true, message: '请输入医师姓名', trigger: 'blur' }],
        avatarUrl: [{ required: true, message: '请上传头像', trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        // idCard: [
        //   { required: true, trigger: 'blur', validator: validateIdCard },
        // ],
        type: [{ required: true, message: '请选择职位', trigger: 'blur' }],
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
      },
      searchForm: {
        name: '',
        phone: '',
        idCard: '',
        gender: '',
        type: '',
        hospitalName: '',
        hospitalId: '',
      },
      // 搜索医院列表
      searchHospitalList: [],
      list: [],
      editAddForm: {
        name: '',
        avatarUrl: '',
        phone: '',
        idCard: '',
        hospitalId: '',
        type: '',
        introduction: '',
        goodAt: '',
      },
      tableHeaderBig: [],
      // 身份证是否禁止输入
      idCardIsDisabled: false,
      // 医院列表
      hospitalList: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹框区域
      editDialogVisible: false,
      infoTitle: '',
    }
  },
  created() {
    this.searchForm.hospitalId = localStorage.getItem('hospitalId')
    this.getList()
  },
  mounted() {
    // 获取医院  转诊医师列表
    this.getHospitalList()
  },
  //离开当前页面后执行
  destroyed() {
    localStorage.removeItem('hospitalId')
  },
  methods: {
    getList() {
      httpAdminDoctor
        .getDoctor({
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          idCard: this.searchForm.idCard,
          genderType: this.searchForm.gender,
          type: this.searchForm.type,
          hospitalName: this.searchForm.hospitalName,
          hospitalId: this.searchForm.hospitalId,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    getHospitalList() {
      httpAdminHospital.getHospitalAll({ pageSize: -1 }).then((res) => {
        this.hospitalList = res.data.elements
        this.searchHospitalList = res.data.elements
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
      this.searchForm = {}
      this.getList()
    },
    // 点击用户跳转
    skipPatient(val) {
      this.$router.push('/archivesManagement/patient')
      localStorage.setItem('doctorId', val.id)
    },
    // 递归处理json文件的最后一级
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].districts.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].districts = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].districts)
        }
      }
      return data
    },
    /**
     * CRUD
     */
    // 新增
    addBtn() {
      this.infoTitle = '新增'
      this.editAddForm = {}
      // 添加默认医师头像
      this.$set(
        this.editAddForm,
        'avatarUrl',
        'http://cdn.daliangqing.com/doctor/%E6%BE%B6%E6%9D%91%E5%84%9A1%403x.png'
      )
      this.editDialogVisible = true
    },
    // 编辑
    editBtn(val) {
      this.infoTitle = '编辑'
      this.editAddForm = JSON.parse(JSON.stringify(val))
      if (val.idCard) {
        this.idCardIsDisabled = true
      } else {
        this.idCardIsDisabled = false
      }
      this.editDialogVisible = true
    },
    // 解锁
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
    // 删除多个
    deleteMultiple() {},
    // 删除单个
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
      httpAdminDoctor.deleteDoctor(id).then((res) => {
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
            httpAdminDoctor.postDoctor(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminDoctor.putDoctor(this.editAddForm).then((res) => {
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
    /**
     * 表格格式化
     */
    genderFormatter(row) {
      return formatterElement.gender[row.gender]
    },
    typeFormatter(row) {
      return formatterElement.doctorType[row.type]
    },
    birthdayFormatter(row) {
      return Boolean(row.birthday) ? parseTime(row.birthday).slice(0, 10) : ''
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
