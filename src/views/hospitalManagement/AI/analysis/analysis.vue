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
          prop="title">
          <el-select class="w100"
            size="small"
            v-model="searchForm.hospitalId">
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
        </el-form-item>
      </el-form>
    </div>
    <!-- 数字展示 -->
    <div class="show-card">
      <el-card class="box-card"
        v-for="(item,index) in 5"
        :key="index">
        <div class="title">
          <span>总外呼人数</span>

        </div>
        <div class="title">9位</div>
      </el-card>
    </div>
    <!-- 图表区域 -->
    <div class="chart-box">
      <!-- 外呼数据 -->
      <div class="chart">
        <Outbound />
      </div>
      <!-- 通话状态 -->
      <div class="chart">
        <Outbound />
      </div>
      <!-- 通话时长(s) -->
      <div class="chart">
        <Outbound />
      </div>
      <!-- 通话时长(用户数量) -->
      <div class="chart">
        <Outbound />
      </div>
      <!-- 对话轮次 -->
      <div class="chart">
        <Outbound />
      </div>
      <!-- 接听率 -->
      <div class="chart">
        <Outbound />
      </div>
    </div>
  </div>
</template>

<script>
import Outbound from './outbound'
import { httpAdminAiAnalysis } from '@/api/admin/httpAdminAiAnalysis'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
export default {
  components: { Outbound },
  data() {
    return {
      hospitalList: [], // 医院列表
      chartList: [], // 图表数据
      searchForm: {
        hospitalId: '',
        infoObj: {}, // 单个医院具体信息
      },
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getHospitalList()
    this.getJobStats()
  },
  methods: {
    // 获取列表
    getList() {
      httpAdminAiAnalysis.getAnalysisList().then((res) => {
        this.infoObj = res.data.elements[0]
        console.log(this.infoObj)
      })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 获取图表数据
    getJobStats() {
      httpAdminAiAnalysis
        .getJobStats({ robotCallJobId: 491276 })
        .then((res) => {
          console.log(JSON.parse(res.data?.thirdJson).data)
        })
    },
    /**
     * 搜索
     */
    searchBtn() {},
    // 重置
    searchReset() {},
  },
}
</script>

<style lang="scss" scoped>
.show-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.chart-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  .chart {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>