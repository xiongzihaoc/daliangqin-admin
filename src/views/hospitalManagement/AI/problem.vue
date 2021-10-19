<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-button-group>
        <el-button size="medium"
          type="primary">按日期查看</el-button>
        <el-button size="medium"
          type="primary">按期名查看</el-button>
      </el-button-group>
      <el-form :model="searchForm"
        class="searchForm"
        :inline="true">
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
        <el-form-item label="任务">
          <el-input placeholder="请输入内容"
            v-model="searchForm.taskContent"
            class="input-with-select"
            size="small">
            <el-select v-model="searchForm.task"
              slot="prepend"
              placeholder="请选择"
              style="width: 100px">
              <el-option label="任务名称"
                value="aiName"></el-option>
              <el-option label="期名"
                value="taskStage"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="统计日期">
          <el-date-picker v-model="searchForm.statistics"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"></el-date-picker>
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
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      show-summary
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        label="序号"
        type="index"></el-table-column>
      <el-table-column align="center"
        label="日期"></el-table-column>
      <el-table-column align="center"
        label="医院名称"></el-table-column>
      <el-table-column align="center"
        label="任务名称"></el-table-column>
      <el-table-column align="center"
        label="期名"></el-table-column>
      <el-table-column align="center"
        label="外呼总量(位)"></el-table-column>
      <el-table-column align="center"
        label="接听总量(位)"></el-table-column>
      <el-table-column align="center"
        label="挂机总量(位)"></el-table-column>
      <el-table-column align="center"
        label="总接听率(%)"></el-table-column>
      <el-table-column align="center"
        label="总挂机率(%)"></el-table-column>
      <el-table-column align="center"
        label="对话总轮次"></el-table-column>
      <el-table-column align="center"
        label="总通话时长(s)"></el-table-column>
      <el-table-column align="center"
        label="平均通话时长(s)"></el-table-column>
    </EleTable>
  </div>
</template>

<script>
import EleTable from '@/components/Table'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {},
      list: [],
      tableHeaderBig: [],
      hospitalList: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getHospitalList()
  },
  methods: {
    /* 获取医院列表 */
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    getList() {},
    /**
     * 搜索
     */
    searchBtn() {
      if (this.searchForm.task === 'aiName') {
        this.searchForm.aiName = this.searchForm.taskContent
      } else {
        this.searchForm.taskStage = this.searchForm.taskContent
      }
    },
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

<style>
</style>