<template>
  <div class="app-container">
    <div class="chart-box">
      <div class="chart">
        <OneChart />
      </div>
      <div class="chart">
        <TwoChart />
      </div>
      <div class="chart">
        <ThreeChart />
      </div>
      <div class="chart">
        <FourChart />
      </div>
      <div class="chart">
        <FiveChart />
      </div>
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
    width: 800px;
    height: 800px;
  }
}
</style>