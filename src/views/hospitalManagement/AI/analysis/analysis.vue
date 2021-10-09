<template>
  <div class="app-container">
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
export default {
  components: {Outbound},
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