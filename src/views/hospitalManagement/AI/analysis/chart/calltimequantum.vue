<template>
  <div>
    <div id="userAge">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Echarts/chart'
import { parseTime } from '@/utils/index'
const colors = [
  '#73A0FA',
  '#7EF4C4',
  '#E86452',
  '#FF9845',
  '#1E9493',
]
export default {
  props: {
    listData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      parseTime,
      cdata: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
        },
        title: {
          text: '通话时间段统计图',
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
        },
        legend: {
          show: true,
          textStyle: {
            color: '#000',
          },
          padding: [30, 0, 0, 0],
        },
        grid: {
          left: '15%',
        },
        xAxis: {
          axisLine: {
            show: true,
          },
          type: 'category',
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#ccc',
            },
          },
          data: [],
        },
        yAxis: {
          axisLine: {
            show: true,
          },
          type: 'value',
          minInterval: 1,
          axisLabel: {
            formatter: '{value}s',
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '<10秒',
            type: 'bar',
            barWidth: 30,
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[0],
            },
            data: [],
          },
          {
            name: '10秒~1分',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[1],
            },
            data: [],
          },
          {
            name: '1分~2分',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[2],
            },
            data: [],
          },
          {
            name: '2分~3分',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[3],
            },
            data: [],
          },
          {
            name: '>3分',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[4],
            },
            data: [],
          },
        ],
      },
    }
  },
  components: {
    Chart,
  },
  // 监听父组件传过来的参数
  watch: {
    listData(newValue, oldValue) {
      const list = newValue.aiHistoryChatDurationDateStatusStatisticalVOList
      const xAxisData = list.map((item) => {
        return parseTime(item.callStartTime).substring(0,10)
      })
      // <10s
      const tenSeconds = list.map((item) => {
        return item.tenSeconds
      })
      // 10-1min
      const oneMinute = list.map((item) => {
        return item.oneMinute
      })
      // 1min-2min
      const twoMinute = list.map((item) => {
        return item.twoMinute
      })
      // 2min-3min
      const threeMinute = list.map((item) => {
        return item.threeMinute
      })
      // >3min
      const greatThreeMinute = list.map((item) => {
        return item.greatThreeMinute
      })
      this.cdata.xAxis.data = xAxisData
      this.cdata.series[0].data = tenSeconds
      this.cdata.series[1].data = oneMinute
      this.cdata.series[2].data = twoMinute
      this.cdata.series[3].data = threeMinute
      this.cdata.series[4].data = greatThreeMinute
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
