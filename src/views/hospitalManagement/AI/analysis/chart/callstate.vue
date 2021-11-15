<template>
  <div>
    <div id="callstate">
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
  '#F6BD16',
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
          text: '通话状态统计图',
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
            formatter: '{value}人',
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '已接听',
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
            name: '无应答',
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
            name: '拒接',
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
            name: '关机',
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
            name: '停机',
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
          {
            name: '空号',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[5],
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
      const list = newValue.aiHistoryResultStatusStatisticalVOList
      const xAxisData = list.map((item) => {
        return parseTime(item.callStartTime).substring(0,10)
      })
      // 接听
      const answerNumber = list.map((item) => {
        return item.answerNumber
      })
      // 未接听
      const noAnswerNumber = list.map((item) => {
        return item.noAnswerNumber
      })
      // 拒接
      const refusedNumber = list.map((item) => {
        return item.refusedNumber
      })
      // 关机
      const powerOffNumber = list.map((item) => {
        return item.powerOffNumber
      })
      // 停机
      const outOfServiceNumber = list.map((item) => {
        return item.outOfServiceNumber
      })
      // 空号
      const vacantNumber = list.map((item) => {
        return item.vacantNumber
      })

      this.cdata.xAxis.data = xAxisData
      this.cdata.series[0].data = answerNumber
      this.cdata.series[1].data = noAnswerNumber
      this.cdata.series[2].data = refusedNumber
      this.cdata.series[3].data = powerOffNumber
      this.cdata.series[4].data = outOfServiceNumber
      this.cdata.series[5].data = vacantNumber
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
