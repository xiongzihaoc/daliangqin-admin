<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="状态"
          align="left"
          prop="state">
          <el-select v-model="searchForm.state"
            size="small"
            placeholder="请选择状态">
            <el-option label="上架"
              :value="true"></el-option>
            <el-option label="下架"
              :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-debounce="[searchBtn]"
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
    <!-- 表格上方操作按钮 -->
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
      @handleCurrentChange="handleCurrentChange">>
      <el-table-column align="center"
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column align="center"
        prop="name"
        label="音乐名称">
      </el-table-column>
      <el-table-column align="center"
        prop="url"
        label="播放">
        <template slot-scope="scope">
          <audio :src="scope.row.url"
            controls="controls">
            您的浏览器不支持 video 标签。
          </audio>
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="createTime"
        label="创建时间">
        <template slot-scope="scope">
          <span> {{parseTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state"
            @change="changeStatus(scope.row)"
            :active-value="true"
            :inactive-value="false"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        width="200">
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
        <el-form-item label="音乐名称"
          prop="name">
          <el-input maxlength="30"
            v-model.trim="editAddForm.name"
            placeholder="请输入音乐名称"></el-input>
        </el-form-item>
        <el-form-item label="上传音乐"
          prop="url">
          <single-upload v-model="editAddForm.url"
            fileType='.mp3'
            @uploadFinish="uploadFinish"
            @uploadProgress="uploadProgress"
            uploadType="MUSIC" />
          <el-progress style="margin-top:20px"
            :text-inside="true"
            :stroke-width="26"
            status="success"
            v-show="percentage > 0 && percentage < 100"
            :percentage="percentage"></el-progress>
        </el-form-item>
        <el-form-item label="状态"
          prop="state">
          <el-select class="w100"
            v-model="editAddForm.state"
            placeholder="请选择状态">
            <el-option label="上架"
              :value="true"></el-option>
            <el-option label="下架"
              :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          :disabled="percentage > 0 && percentage < 100"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import singleUpload from '@/components/UploadFile'
import { httpAdminMusic } from '@/api/admin/httpAdminMusic'
import { formatSeconds, parseTime } from '@/utils/index'
export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      parseTime,
      formatSeconds,
      // 表格数据
      list: [],
      tableHeaderBig: [],
      formRules: {
        name: [{ required: true, message: '请输入音乐名称', trigger: 'blur' }],
        state: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      // 搜索表单
      searchForm: {
        state: null,
      },
      // 新增编辑表单
      editAddForm: {
        name: '',
        url: '',
        state: null,
      },
      infoTitle: '',
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      percentage: 0, // 上传百分比
      //   弹框区域
      editDialogVisible: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminMusic
        .getMusic({
          state: this.searchForm.state,
          page: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 开关change事件
    changeStatus(val) {
      httpAdminMusic.postMusic(val).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('状态更改成功')
          this.getList()
        }
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
      httpAdminMusic.deleteMusic(id).then((res) => {
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
          // 发送请求
          httpAdminMusic
            .postMusic({ ...this.editAddForm, timeLength: 43 })
            .then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
        }
      })
    },
    uploadFinish(url) {
      this.editAddForm.url = url
    },
    uploadProgress(percentage) {
      this.percentage = percentage
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
