<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="app类型"
          align="left"
          prop="appType">
          <el-select placeholder="请选择app类型"
            v-model="searchForm.appType"
            size="small">
            <el-option v-for="item in appTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型"
          align="left"
          prop="deviceType">
          <el-select placeholder="请选择设备类型"
            v-model="searchForm.deviceType"
            size="small">
            <el-option v-for="item in deviceTypeList"
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
      <!-- 操作 -->
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
        <el-form-item v-if="this.infoTitle === '新增'"
          label="app类型"
          prop="appType">
          <el-select placeholder="请选择app类型"
            style="width: 100%"
            v-model="editAddForm.appType">
            <el-option v-for="item in appTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="this.infoTitle === '新增'"
          label="设备类型"
          prop="deviceType">
          <el-select style="width: 100%"
            placeholder="请选择设备类型"
            v-model="editAddForm.deviceType">
            <el-option v-for="item in deviceTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号"
          prop="versionString">
          <el-input v-model="editAddForm.versionString"></el-input>
        </el-form-item>
        <el-form-item label="版本code"
          prop="versionCode">
          <el-input v-model="editAddForm.versionCode"
            v-Int></el-input>
        </el-form-item>
        <el-form-item label="版本日志"
          prop="updateLog">
          <el-input v-model="editAddForm.updateLog"></el-input>
        </el-form-item>
        <el-form-item label="url"
          v-if="editAddForm.deviceType === 'IOS'"
          prop="url">
          <el-input v-model="editAddForm.url">
          </el-input>
        </el-form-item>
        <el-form-item label="上传apk"
          prop="upload"
          v-if="editAddForm.deviceType === 'ANDROID'">
          <single-upload v-model="editAddForm.url"
            @uploadFinish="uploadFinish"
            @uploadProgress="uploadProgress"
            uploadType="ANDROID" />
          <el-progress style="margin-top:20px"
            :text-inside="true"
            :stroke-width="26"
            status="success"
            v-show="percentage > 0 && percentage < 100"
            :percentage="percentage"></el-progress>
        </el-form-item>
        <el-form-item v-if="editAddForm.deviceType === 'ANDROID'">
          <div>
            <vue-qr :logo-src="logoSrc"
              :size="191"
              :margin="0"
              :auto-color="true"
              :dot-scale="1"
              :text="appSrc" />
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter"
          :disabled="percentage > 0 && percentage < 100">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 二维码
import VueQr from 'vue-qr'
import EleTable from '@/components/Untable'
import singleUpload from '@/components/UploadFile'
import { httpAdminUpdateVersion } from '@/api/admin/httpAdminUpdateVersion'
import {
  parseTime,
  deviceTypeList,
  appTypeList,
  formatterElement,
} from '@/utils/index'
export default {
  components: {
    EleTable,
    singleUpload,
    VueQr,
  },
  data() {
    return {
      parseTime,
      appTypeList,
      deviceTypeList,
      formRules: {
        appType: [
          { required: true, message: '请选择app类型', trigger: 'blur' },
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' },
        ],
        versionString: [
          { required: true, message: '请输入版本', trigger: 'blur' },
        ],
        versionCode: [
          { required: true, message: '请输入版本号', trigger: 'blur' },
        ],
        updateLog: [
          { required: true, message: '请选择更新日志  ', trigger: 'blur' },
        ],
        url: [{ required: true, message: '请输入url  ', trigger: 'blur' }],
      },
      searchForm: {
        appType: '',
        deviceType: '',
      },
      list: [],
      editAddForm: {
        appType: '',
        deviceType: '',
        versionString: '',
        versionCode: '',
        updateLog: '',
        url: '',
      },
      tableHeaderBig: [
        { type: 'index', label: '序号', width: 50 },
        {
          prop: 'appType',
          label: 'app类型',
          formatter: (row) => {
            return this.appTypeFormatter(row)
          },
        },
        {
          prop: 'deviceType',
          label: '设备类型',
          formatter: (row) => {
            return this.deviceTypeFormatter(row)
          },
        },
        { prop: 'versionString', label: '版本号' },
        { prop: 'versionCode', label: '版本code' },
        { prop: 'updateLog', label: '版本日志' },
        { prop: 'url', label: '链接' },
        {
          prop: 'updateTime',
          label: '更新时间',
          formatter: (row) => {
            return parseTime(row.updateTime)
          },
        },
      ],
      // 二维码参数
      logoSrc: '',
      appSrc: 'http://www.baidu.com',

      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      percentage: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: '',
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminUpdateVersion
        .getUpdateVersion({
          page: this.pageNum,
          pageSize: this.pageSize,
          appType: this.searchForm.appType,
          deviceType: this.searchForm.deviceType,
        })
        .then((res) => {
          console.log(res)
          this.list = res.data.elements
          this.total = res.data.totalSize
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
    uploadFinish(url) {
      this.editAddForm.url = url
    },
    uploadProgress(percentage) {
      this.percentage = percentage
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
      this.appSrc = val.url
      this.infoTitle = '编辑'
      this.editAddForm = JSON.parse(JSON.stringify(val))
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
      httpAdminUpdateVersion.deleteUpdateVersion(id).then((res) => {
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
            httpAdminUpdateVersion
              .postUpdateVersion(this.editAddForm)
              .then((res) => {
                if (res.code === 'OK') {
                  this.$message.success('新增成功')
                  this.getList()
                  this.editDialogVisible = false
                }
              })
          } else {
            // 发送请求
            httpAdminUpdateVersion
              .putUpdateVersion(this.editAddForm)
              .then((res) => {
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
    appTypeFormatter(row) {
      return formatterElement.appType[row.appType]
    },
    deviceTypeFormatter(row) {
      return formatterElement.deviceType[row.deviceType]
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
