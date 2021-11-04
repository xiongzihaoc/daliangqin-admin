<template>
  <div>
    <div id="audience">
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
          text: '接听率',
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
          // max: 100,
          axisLabel: {
            formatter: '{value}%',
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '接听率',
            type: 'line',
            itemStyle: {
              color: colors[0],
            },
            data: [],
            smooth: false,
          },
          {
            name: '未接听率',
            type: 'line',
            itemStyle: {
              color: colors[1],
            },
            data: [],
            smooth: false,

          },
          // {
          //   name: '挂断率',
          //   type: 'line',
          //   itemStyle: {
          //     color: colors[2],
          //   },
          //   data: [],
          //   smooth: false,
          // },
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
      const list = newValue.aiHistoryAnswerRateStatisticalVOList
      const xAxisData = list.map((item) => {
        return parseTime(item.callStartTime).substring(0, 10)
      })
      // 已接听率
      const answerRate = list.map((item) => {
        return item.answerRate
      })
      // 未接听率
      const noAnswerRate = list.map((item) => {
        return item.noAnswerRate
      })
      // 挂断率
      const hangupRate = list.map((item) => {
        return item.hangupRate
      })
      this.cdata.xAxis.data = xAxisData
      this.cdata.series[0].data = answerRate
      this.cdata.series[1].data = noAnswerRate
      // this.cdata.series[2].data = hangupRate
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
