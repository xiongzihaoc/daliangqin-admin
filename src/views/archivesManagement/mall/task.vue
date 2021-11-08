<template>
  <div class="app-container">
    <!-- <h1>积分商品</h1> -->
    <div class="search-box">
      <el-form class="searchForm" :inline="true">
        <el-form-item label="商品标题">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入商品标题"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" size="small">
            <el-option
              v-for="(item, idx) in goodsStatus"
              :key="idx"
              :label="item.lab"
              :value="item.val"
            >
            </el-option>
          </el-select>
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
      <el-button
        type="primary"
        size="small"
        plain
        class="tableAdd"
        icon="el-icon-plus"
        @click="taskOperate"
        >添加任务</el-button
      >
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
        label="任务名称"
        prop="name"
      ></el-table-column>
      <el-table-column
        align="center"
        label="可得积分"
        prop="integral"
      ></el-table-column>
      <el-table-column
        align="center"
        label="每人每日可完成次数"
        prop="completeDayNum"
      ></el-table-column>
      <el-table-column
        align="center"
        label="平台每日发放积分次数"
        prop="dayLimitNum"
      ></el-table-column>
      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="SHOW"
            inactive-value="DELETE"
            @change="goodsState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="primary" @click="editTask(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              plain
              icon="el-icon-top"
              @click="sortMall(scope.row.id, 'UP')"
            ></el-button>
            <el-button
              size="mini"
              plain
              icon="el-icon-bottom"
              @click="sortMall(scope.row.id, 'DOWN')"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 弹框 -->
    <el-dialog :title="taskTitle" :visible.sync="dialogVisible" width="40%">
      <el-form
        :model="mallTaskForm"
        :rules="rules"
        ref="mallTaskForm"
        label-width="170px"
        label-position="left"
      >
        <el-form-item label="任务名称:" prop="name">
          <el-input
            v-model="mallTaskForm.name"
            placeholder="请输入任务名称"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务描述:">
          <el-input
            v-model="mallTaskForm.remark"
            placeholder="请输入任务描述"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="可得积分:" prop="integral">
          <el-input
            v-model="mallTaskForm.integral"
            placeholder="请输入可得积分"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="每人每日可完成次数:" prop="completeDayNum">
          <el-input
            v-model="mallTaskForm.completeDayNum"
            placeholder="请输入每人每日可完成次数"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="跳转地址:">
          <el-input
            v-model="mallTaskForm.jumpUrl"
            placeholder="请输入跳转地址"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="平台每日发放积分次数:" prop="dayLimitNum">
          <el-input
            v-model="mallTaskForm.dayLimitNum"
            placeholder="请输入平台每日发放积分次数"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-radio v-model="mallTaskForm.status" label="SHOW">显示</el-radio>
          <el-radio v-model="mallTaskForm.status" label="DELETE">隐藏</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="affirBtn('mallTaskForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { httpAdminMallTask } from '@/api/admin/httpAdminMallTask'
import { parseTime, AiTaskStatus, formatterElement } from '@/utils/index'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      taskTitle: '添加任务',
      searchForm: {},
      mallTaskForm: {
        name: '',
        remark: '',
        integral: '',
        completeDayNum: '',
        jumpUrl: '',
        dayLimitNum: '', // 平台每日发放积分次数
        status: 'SHOW',
      },
      goodsStatus: [
        { val: 'DELETE', lab: '隐藏' },
        { val: 'SHOW', lab: '显示' },
      ],
      list: [],
      tableHeaderBig: [],
      //表单验证
      rules: {
        name: {
          required: true,
          message: '请输入积分任务名称',
          trigger: 'blur',
        },
        integral: {
          required: true,
          message: '请输入可得积分',
          trigger: 'blur',
        },
        completeDayNum: {
          required: true,
          message: '请输入每日可完成次数',
          trigger: 'blur',
        },
        dayLimitNum: {
          required: true,
          message: '请输入平台每日发放积分次数',
          trigger: 'blur',
        },
        status: { required: true, message: '请选择状态', trigger: 'blur' },
      },
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹出层
      dialogVisible: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let data = Object.assign(this.searchForm, {
        page: this.pageNum,
        pageSize: this.pageSize,
      })
      httpAdminMallTask.getMallTask(data).then((res) => {
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    addMallTask() {
      httpAdminMallTask.postAddMallTask(this.mallTaskForm).then((res) => {
        if (res.code === 'OK') {
          this.dialogVisible = false
          this.$message.success('添加成功')
          this.getList()
        }
      })
    },
    editMall() {
      httpAdminMallTask.putMall(this.mallTaskForm).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('编辑成功')
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    /**
     * 任务操作
     */
    taskOperate() {
      this.mallTaskForm = { status: 'SHOW' }
      this.taskTitle = '添加任务'
      this.dialogVisible = true
    },
    editTask(data) {
      this.taskTitle = '编辑任务'
      this.mallTaskForm = {}
      this.mallTaskForm = data
      this.dialogVisible = true
    },
    sortMall(id, status){
      httpAdminMallTask.putMallSort({ id, status }).then((res)=>{
        if(res.code === 'OK'){
          this.$message.success('操作成功')
          this.getList()
        }
      })
    },
    /**
     * 添加任务 表单验证
     */
    affirBtn(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.taskTitle == '编辑任务') {
            this.editMall()
          } else {
            this.addMallTask()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     *  修改 积分任务状态
     */
    goodsState(val) {
      httpAdminMallTask
        .putMallStatus({ id: val.id, status: val.status })
        .then((res) => {
          if (res.data.code === 'OK') {
            this.$message.success('操作成功')
            this.getList()
          }
        })
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.getList()
    },
    searchReset() {
      this.$set(this, 'searchForm', {})
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