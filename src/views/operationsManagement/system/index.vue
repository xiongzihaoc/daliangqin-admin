<template>
  <div class="app-container">
    <el-button @click="add"
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
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            plain
            @click="examine(scope.row)">查看</el-button>
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
        <el-form-item label="key"
          prop="configKey">
          <el-input v-model="editAddForm.configKey"></el-input>
        </el-form-item>
        <el-form-item label="名称"
          prop="configName">
          <el-input v-model="editAddForm.configName"></el-input>
        </el-form-item>
        <el-form-item label="值"
          prop="configValue">
          <el-input type="textarea"
            :rows="5"
            v-model="editAddForm.configValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button :disabled="infoTitle === '查看'"
          type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Untable'
import { httpAdminSystem } from '@/api/admin/httpAdminSystem'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      formRules: {
        configKey: [{ required: true, message: '请输入key', trigger: 'blur' }],
        configName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        configValue: [
          { required: true, message: '请输入数值', trigger: 'blur' },
        ],
      },
      list: [],
      editAddForm: {
        configKey: '',
        configName: '',
        configValue: '',
      },
      tableHeaderBig: [
        { type: 'index', label: '序号',width:50 },
        { prop: 'configKey', label: 'key' },
        { prop: 'configName', label: '名称' },
        { prop: 'configValue', label: '数值', isTooltip: true },
      ],
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
  methods: {
    getList() {
      httpAdminSystem
        .getSystem({
          page: this.pageNum,
          pageSize: this.pageSize,
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
    /**
     * CRUD
     */
    // 新增
    add() {
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
    examine(val) {
      this.infoTitle = '查看'
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
      httpAdminSystem.deleteSystem(id).then((res) => {
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
            httpAdminSystem.postSystem(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminSystem.putSystem(this.editAddForm).then((res) => {
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
