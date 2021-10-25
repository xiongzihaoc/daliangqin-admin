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
          text: '对话轮次统计图',
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
            rotate: 20,
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
            formatter: '{value}次',
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '0 - 3',
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
            name: '4 - 6',
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
            name: '7 - 9',
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
            name: '> 10',
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
      const list = newValue.aiHistoryChatRoundStatusStatisticalVOList
      const xAxisData = list.map((item) => {
        return parseTime(item.callStartTime).substring(0,10)
      })
      // 0 - 3
      const greatThreeRound = list.map((item) => {
        return item.greatThreeRound
      })
      // 4 - 6
      const greatFourRound = list.map((item) => {
        return item.greatFourRound
      })
      // 7 - 9
      const greatSevenRound = list.map((item) => {
        return item.greatSevenRound
      })
      // > 10
      const greatTenRound = list.map((item) => {
        return item.greatTenRound
      })
    
      this.cdata.xAxis.data = xAxisData
      this.cdata.series[0].data = greatThreeRound
      this.cdata.series[1].data = greatFourRound
      this.cdata.series[2].data = greatSevenRound
      this.cdata.series[3].data = greatTenRound
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
