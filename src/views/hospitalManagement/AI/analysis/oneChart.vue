<template>
  <div class="app-container">
    <div id="oneChart"
      :style="{width: '800px', height: '600px'}"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('oneChart'))
    let option = {
      legend: {
        orient: 'vertical',
        x: 'right', //可设定图例在左、右、居中
        y: 'center', //可设定图例在上、下、居中
        padding: [0, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
        data: ['直接访问', '微信'],
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {},
      series: [
        {
          name: '直接访问',
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25],
        },
        {
          name: '微信',
          type: 'bar',
          data: [26, 24, 18, 22, 23, 20, 27],
        },
      ],
    }
    myChart.setOption(option)

    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
    window.addEventListener('resize', function () {
      myChart.resize()
    })
  },
  methods: {},
}
</script>

<style>
</style>