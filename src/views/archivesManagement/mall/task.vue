<template>
  <div class="app-container">
    <!-- <h1>积分商品</h1> -->
    <div class="search-box">
      <el-form class="searchForm" :inline="true">
        <el-form-item label="商品标题">
          <el-input placeholder="请输入商品标题" size="small"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.shop" size="small">
            <el-option label="规格" value="规格"> </el-option>
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
          <el-button
            @click="searchBtn"
            type="primary"
            size="small"
            icon="el-icon-search"
            >积分规则</el-button
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
      <el-table-column align="center" label="任务名称"></el-table-column>
      <el-table-column align="center" label="可得积分"></el-table-column>
      <el-table-column align="center" label="每人每日可完成次数"></el-table-column>
      <el-table-column align="center" label="平台每日发放积分次数"></el-table-column>
      <el-table-column align="center" label="状态"></el-table-column>
      <el-table-column align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作"></el-table-column>
    </EleTable>
    <!-- 弹框 -->
    <el-dialog title="任务操作" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="160px" label-position="left">
        <el-form-item label="任务名称:">
          <el-input v-model="taskForm.text" placeholder="请输入任务名称" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="任务描述:">
          <el-input v-model="taskForm.text" placeholder="请输入任务描述" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="可得积分:">
          <el-input v-model="taskForm.text" placeholder="请输入可得积分" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="每人每日可完成次数:">
          <el-input v-model="taskForm.text" placeholder="请输入每人每日可完成次数" maxlength="6" ></el-input>
        </el-form-item>
        <el-form-item label="跳转地址:">
          <el-input v-model="taskForm.text" placeholder="请输入跳转地址" maxlength="6" ></el-input>
        </el-form-item>
        <el-form-item label="平台每日发放积分次数:">
            <el-input v-model="taskForm.text" placeholder="请输入平台每日发放积分次数" maxlength="6" ></el-input>
        </el-form-item>
        <el-form-item label="积分规则:">
            <el-input v-model="taskForm.text" rows="10"  type="textarea" placeholder="请输入商品规格"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio v-model="taskForm.radio" label="1">显示</el-radio>
          <el-radio v-model="taskForm.radio" label="2">隐藏</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {},
      taskForm: {
        radio: '1',
      },
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹出层
      dialogVisible: false,
    }
  },
  methods: {
    getList() {},
    /**
     * 任务操作
     */
    taskOperate() {
      console.log('object');
      this.dialogVisible = true
    },
    /**
     * 搜索
     */
    searchBtn() {},
    searchReset() {},
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