<template>
  <div>
    <div id="outbound">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Echarts/chart'
export default {
  data() {
    return {
      cdata: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
        },
        title: {
          text: '糖尿病TOP10人群区域分布',
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
          padding: 20,
        },
        grid: {
          left: '15%',
        },
        xAxis: {
          axisLine: false,
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          axisLine: false,
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
          },
          data: [
            '夏家',
            '杨墩',
            '塘北',
            '洛舍镇',
            '戈亭',
            '石泉',
            '光辉',
            '雷甸',
            '城东',
            '辖东港',
          ],
        },
        series: [
          {
            data: [
              8800, 10000, 10500, 11500, 12000, 13500, 14000, 14500, 15000,
              16000,
            ],
            type: 'bar',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#B5CA19' },
                { offset: 1, color: '#333' },
              ]),
            },
          },
        ],
      },
    }
  },
  components: {
    Chart,
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
$box-height: 500px;
#outbound {
  width: 800px;
  height: $box-height;
  border-radius: 10px;
}
</style>
