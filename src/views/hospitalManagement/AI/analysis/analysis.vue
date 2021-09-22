<template>
  <div class="app-container">
    <div class="chart-box">
      <!-- 外呼数据 -->
      <div class="chart">
        <OneChart />
      </div>
      <!-- 通话状态 -->
      <div class="chart">
        <TwoChart />
      </div>
      <!-- 通话时长(s) -->
      <div class="chart">
        <ThreeChart />
      </div>
      <!-- 通话时长(用户数量) -->
      <div class="chart">
        <FourChart />
      </div>
      <!-- 对话轮次 -->
      <div class="chart">
        <FiveChart />
      </div>
      <!-- 接听率 -->
      <div class="chart">
        <SixChart />
      </div>
    </div>
  </div>
</template>

<script>
import OneChart from './oneChart'
import TwoChart from './twoChart'
import ThreeChart from './threeChart'
import FourChart from './fourChart'
import FiveChart from './fiveChart'
import SixChart from './sixChart'
export default {
  components: {
    OneChart,
    TwoChart,
    ThreeChart,
    FourChart,
    FiveChart,
    SixChart,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
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