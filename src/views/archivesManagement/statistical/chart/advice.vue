<template>
  <div>
    <div id="advice">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Echarts/chart'
const colors = [
  '#C32B33',
  '#A65A78',
  '#C1C5D8',
  '#42A87F',
  '#5470C6',
  '#E5C5B7',
  '#AB8783',
]
window.onresize = function () {
  console.log(333)
}
export default {
  props: {
    listData: {
      type: Object,
      default: () => {},
    },
  },
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
          text: '处置建议统计图 Top15',
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
          axisLabel: {
            formatter: '{value}人',
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '重新测量',
            type: 'bar',
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
            name: '定期复查',
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
            name: '治疗后复查',
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
            name: '进一步检查治疗',
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
            name: '转诊治疗',
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
            name: '转院治疗',
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
          {
            name: '未知',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[6],
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
      const list = newValue.equipmentHeartRateSuggestionStatisticalVOList
      const xAxisData = list.map((item) => {
        return item.hospitalName
      })
      // 重新测量
      const remeasure = list.map((item) => {
        return item.remeasure
      })
      // 定期复查
      const regularReview = list.map((item) => {
        return item.regularReview
      })
      // 治疗后复查
      const reviewAfterTreatment = list.map((item) => {
        return item.reviewAfterTreatment
      })
      // 进一步检查治疗
      const furtherTreatment = list.map((item) => {
        return item.furtherTreatment
      })
      // 转诊治疗
      const referralTreatment = list.map((item) => {
        return item.referralTreatment
      })
      // 转院治疗
      const transferTreatment = list.map((item) => {
        return item.transferTreatment
      })
      // 未知
      const unknown = list.map((item) => {
        return item.unknown
      })
      this.cdata.xAxis.data = xAxisData
      this.cdata.series[0].data = remeasure
      this.cdata.series[1].data = regularReview
      this.cdata.series[2].data = reviewAfterTreatment
      this.cdata.series[3].data = furtherTreatment
      this.cdata.series[4].data = referralTreatment
      this.cdata.series[5].data = transferTreatment
      this.cdata.series[6].data = unknown
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
