<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input v-model="searchInput"
        class="el-input-style"
        type="text"
        size="small"
        v-Int
        maxlength="11"
        placeholder="请输入手机号"
        @keyup.enter.native="searchBtn"></el-input>
      <el-button v-debounce="[searchBtn]"
        type="primary"
        size="small"
        icon="el-icon-search">搜索</el-button>
      <el-button @click="searchReset"
        size="small"
        plain
        icon="el-icon-refresh">重置</el-button>
      <el-button size="small"
        type="warning"
        @click="resetBtn">短信重置</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
    </EleTable>
    <!-- 增改页面 -->
    <el-dialog title="短信重置"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="formRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item prop="phone"
          label="手机号">
          <el-input v-model="editAddForm.phone"
            v-Int
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
  </div>
</template>
<script>
import EleTable from '@/components/Untable'
import { httpAdminSms } from '@/api/admin/httpAdminSms'
import { validatePhone, parseTime } from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      searchInput: '',
      editDialogVisible: false,
      // 列表数据
      list: [],
      tableHeaderBig: [
        { label: '序号', type: 'index' },
        { prop: 'phone', label: '手机号' },
        {
          prop: 'content',
          label: '内容',
          // formatter: (row) => {
          //   return this.typeFormatter(row);
          // },
        },
        { prop: 'howMany', label: '剩余次数' },
        {
          prop: 'createTime',
          label: '发送时间',
          formatter: (row) => {
            return parseTime(row.createTime)
          },
        },
      ],
      formRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
      },
      editAddForm: {
        phone: '',
      },
      // 分页数据
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminSms
        .getSms({
          page: this.pageNum,
          pageSize: this.pageSize,
          phone: this.searchInput,
        })
        .then((res) => {
          console.log(res)
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 搜索
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    // 搜索条件重置
    searchReset() {
      this.searchInput = ''
      this.getList()
    },
    // 短信重置
    resetBtn() {
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          httpAdminSms
            .postSmsReset({ phone: this.editAddForm.phone })
            .then((res) => {
              if (res.code === 'OK') {
                this.$message.success('重置成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
        }
      })
    },
        /**
     * 表格格式化
     */
    typeFormatter(row) {
      if (row.type === 'LOGIN') {
        return '登录'
      } else {
        return '其他'
      }
    },
    // 分页
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

<style scoped>
.search-box {
  margin-bottom: 10px;
}
.el-input-style {
  margin-right: 10px;
}
</style>
