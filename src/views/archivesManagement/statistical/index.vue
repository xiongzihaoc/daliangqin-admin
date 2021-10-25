<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
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
        <el-form-item label="日期"
          align="left">
          <el-date-picker v-model="searchForm.statisticalTime"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            value-format="timestamp"
            @change="changeStatisticalTime"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="维度"
          align="left">
          <el-select class="w100"
            v-model="searchForm.equipmentDimensionType"
            size="small">
            <el-option label="医院维度"
              value="HOSPITAL"></el-option>
            <el-option label="日期维度"
              value="DATE"></el-option>
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
    <div class="show-card">
      <el-card class="box-card">
        <div class="title">
          <div>医院总数</div>
        </div>
        <div class="title">9位</div>
      </el-card>
      <el-card class="box-card">
        <div class="title">
          <div>医师总数</div>
        </div>
        <div class="title">9位</div>
      </el-card>
      <el-card class="box-card">
        <div class="title">
          <div>已监测总人数</div>
        </div>
        <div class="title">9位</div>
      </el-card>
      <el-card class="box-card">
        <div class="title">
          <div>已监测总次数</div>
          <div></div>
        </div>
        <div class="title">9位</div>
      </el-card>
    </div>
    <div class="chart">
      <div>
        <MonitoringNumber :listData="listData" />
      </div>
      <div>
        <UserAge :listData="listData" />
      </div>
      <div>
        <Advice :listData="listData" />
      </div>
      <div>
        <Duration :listData="listData" />
      </div>
      <div>
        <Print :listData="listData" />
      </div>
      <div>
        <Audit :listData="listData" />
      </div>
      <div>
        <Equipment :listData="listData" />
      </div>
      <div>
        <Gender :listData="listData" />
      </div>
      <div>
        <MonitoringRanking :listData="listData" />
      </div>
    </div>
  </div>
</template>
<script>
import { httpAdminEquipmentHeartStatistical } from '@/api/admin/httpAdminEquipmentHeartStatistical'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import MonitoringNumber from './chart/monitoringNumber'
import UserAge from './chart/userAge'
import Advice from './chart/advice'
import Duration from './chart/duration'
import Print from './chart/print'
import Audit from './chart/audit'
import Equipment from './chart/equipment'
import Gender from './chart/gender'
import MonitoringRanking from './chart/monitoringRanking'
export default {
  components: {
    MonitoringNumber,
    UserAge,
    Advice,
    Duration,
    Print,
    Audit,
    Equipment,
    Gender,
    MonitoringRanking,
  },
  data() {
    return {
      listData: {}, // 图表数据
      cardData: {}, // 卡片数据
      tableHeaderBig: [],
      hospitalList: [],
      searchForm: {
        hospitalId: '',
        statisticalTime: '',
        equipmentDimensionType: 'HOSPITAL',
        endTime: '',
        startTime: '',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const start = new Date(new Date().toLocaleDateString()).getTime()
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const start =
                new Date(new Date().toLocaleDateString()).getTime() -
                3600 * 1000 * 24 * 6
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const start =
                new Date(new Date().toLocaleDateString()).getTime() -
                3600 * 1000 * 24 * 30
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getHospitalList()
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminEquipmentHeartStatistical
        .getEquipmentHeartStatistical({
          equipmentDimensionType: this.searchForm.equipmentDimensionType,
        })
        .then((res) => {
          this.listData = res.data // 图表数据
          this.cardData = res.data.equipmentHeartRateStatisticalVO // 卡片数据
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    changeStatisticalTime() {},
    changeEquipmentDimensionType(val) {},
    /**
     * 搜索
     */
    searchBtn() {
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {}
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
.show-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}
.chart {
  div {
    margin-bottom: 20px;
  }
}
</style>
