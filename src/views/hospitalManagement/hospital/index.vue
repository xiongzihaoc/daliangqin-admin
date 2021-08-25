<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医院名称"
          align="left"
          prop="hospitalName">
          <el-input v-model="searchForm.hospitalName"
            size="small"
            class="w100">
          </el-input>
        </el-form-item>
        <el-form-item label="医院等级"
          prop="hospitalType">
          <el-select v-model="searchForm.hospitalType"
            size="small"
            placeholder="请选择医院等级">
            <el-option v-for="item in hospitalClassList"
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
    <!-- 表格上方按钮 -->
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
        label="序号"></el-table-column>
      <el-table-column align="center"
        prop="name"
        label="医院名称"></el-table-column>
      <el-table-column align="center"
        prop="avatarUrl"
        label="医院头像">
        <template slot-scope="scope">
          <img class="tableImg"
            :src="scope.row.avatarUrl" />
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="contract"
        label="医院电话"></el-table-column>
      <el-table-column align="center"
        prop="address"
        label="医院地址"
        :formatter="addressFormatter"></el-table-column>
      <el-table-column align="center"
        prop="hospitalType"
        label="医院等级"
        :formatter="hospitalTypeFormatter"></el-table-column>
      <el-table-column align="center"
        prop="doctorCount"
        label="医生数量">
        <template slot-scope="scope">
          <span @click="skipDoctor(scope.row)"
            style="color: #1890ff; text-decoration: underline">{{ scope.row.doctorCount }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
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
        :rules="FormRules"
        :model="editAddForm"
        label-width="110px">
        <el-form-item label="医院名称"
          prop="name">
          <el-input v-model="editAddForm.name"
            placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="医院头像"
          prop="avatarUrl">
          <single-upload v-model="editAddForm.avatarUrl"
            uploadType="AVATAR" />
        </el-form-item>
        <el-form-item label="医院电话"
          prop="contract">
          <el-input v-model="editAddForm.contract"
            v-Int
            maxlength="11"
            placeholder="请输入医院电话"></el-input>
        </el-form-item>
        <el-form-item label="省市区"
          prop="address">
          <el-cascader style="width: 100%"
            v-model="editAddForm.address"
            :options="addressJson"
            :props="cateListProps"
            @change="selectAddrssChange"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"
          prop="detail">
          <el-input v-model="editAddForm.detail"
            placeholder="请输入医院地址"></el-input>
        </el-form-item>
        <el-form-item label="医院等级"
          prop="hospitalType">
          <el-select v-model="editAddForm.hospitalType"
            placeholder="请选择医院等级"
            style="width: 100%">
            <el-option v-for="item in hospitalClassList"
              :key="item.id"
              :value="item.value"
              :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员姓名"
          v-if="this.infoTitle === '新增'"
          prop="adminName">
          <el-input v-model="editAddForm.adminName"
            placeholder="请输入管理员姓名"></el-input>
        </el-form-item>
        <el-form-item label="管理员手机号"
          v-if="this.infoTitle === '新增'"
          prop="adminPhone">
          <el-input v-model="editAddForm.adminPhone"
            v-Int
            maxlength="11"
            placeholder="请输入管理员手机号"></el-input>
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
import addressJson from '@/utils/address.json'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
  validatePhone,
  hospitalClassList,
  formatterElement,
} from '@/utils/index'
export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      addressJson,
      hospitalClassList,
      // 表单验证规则
      FormRules: {
        adminPhone: [
          { required: true, trigger: 'blur', validator: validatePhone },
        ],
        adminName: [
          { required: true, message: '请输入管理员姓名', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
        address: [{ required: true, message: '请选择省市区', trigger: 'blur' }],
        contract: [
          {
            required: true,
            message: '请输入医院电话',
            trigger: 'blur',
            validator: validatePhone,
          },
        ],
        detail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        hospitalType: [
          { required: true, message: '请选择医院等级', trigger: 'blur' },
        ],
      },
      // 搜索表单
      searchForm: {
        hospitalName: '',
        hospitalType: '',
      },
      // 列表数据
      list: [],
      cateListProps: {
        value: 'name', //匹配响应数据中的id
        label: 'name', //匹配响应数据中的name
        children: 'districts', //匹配响应数据中的children
      },
      // 增改表单
      editAddForm: {
        name: '',
        contract: '',
        hospitalType: '',
        avatarUrl: '',
        province: '',
        city: '',
        area: '',
        address: [],
        detail: '',
        adminName: '',
      },
      // 表格数据
      tableHeaderBig: [],
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
    this.getTreeData(addressJson)
  },
  methods: {
    getList() {
      httpAdminHospital
        .getHospital({
          page: this.pageNum,
          pageSize: this.pageSize,
          hospitalName: this.searchForm.hospitalName,
          hospitalType: this.searchForm.hospitalType,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    selectAddrssChange(val) {
      this.editAddForm.province = val[0]
      this.editAddForm.city = val[1]
      this.editAddForm.area = val[2]
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
    /***** 搜索区域 *****/
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
    // 跳转医生列表
    skipDoctor(val) {
      console.log(val)
      this.$router.push('/hospitalManagement/doctor')
      localStorage.setItem('hospitalId', val.id)
    },
    /***** 增删改 *****/
    // 新增
    addBtn() {
      this.infoTitle = '新增'
      this.editAddForm = {}
      // 添加默认医院头像
      this.$set(
        this.editAddForm,
        'avatarUrl',
        'http://cdn.daliangqing.com/hospital/%E6%BE%B6%E6%9D%91%E5%84%9A3.png'
      )
      this.editDialogVisible = true
    },
    // 编辑
    editBtn(val) {
      this.infoTitle = '编辑'
      this.editAddForm = JSON.parse(JSON.stringify(val))
      this.editAddForm.address = [
        this.editAddForm.province,
        this.editAddForm.city,
        this.editAddForm.area,
      ]
      this.editDialogVisible = true
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
      httpAdminHospital.deleteHospital(id).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === '新增') {
            // 发送请求
            httpAdminHospital.postHospital(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminHospital.putHospital(this.editAddForm).then((res) => {
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
    /***** 表格格式化内容 *****/
    hospitalTypeFormatter(row) {
      return formatterElement.hospitalType[row.hospitalType]
    },
    addressFormatter(row) {
      return row.province + row.city + row.area + row.detail
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

<style scope>
</style>