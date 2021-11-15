<template>
  <div>
    <div>
      <Chart :cdata="cdata" id="userAge" />
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
  '#E0B3AE',
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
      cdata: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
        },
        title: {
          text: '已监测用户年龄统计图 Top15',
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
            name: '<=30岁',
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
            name: '31-40岁',
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
            name: '41-50岁',
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
            name: '51-60岁',
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
            name: '61-70岁',
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
            name: '71-80岁',
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
            name: '81-90岁',
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
          {
            name: '>=91岁',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[7],
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
      const list = newValue.equipmentHeartRateAgeStatisticalVOList
      const xAxisData = list.map((item) => {
        return item.hospitalName
      })
      // <=30岁
      const thirty = list.map((item) => {
        return item.thirty
      })
      // 31-40岁
      const forty = list.map((item) => {
        return item.forty
      })
      // 41-50岁
      const fifty = list.map((item) => {
        return item.fifty
      })
      // 51-60岁
      const sixty = list.map((item) => {
        return item.sixty
      })
      // 61-70岁
      const seventy = list.map((item) => {
        return item.seventy
      })
      // 71-80岁
      const eighty = list.map((item) => {
        return item.eighty
      })
      // 81-90岁
      const ninety = list.map((item) => {
        return item.ninety
      })
      // >=91岁
      const hundred = list.map((item) => {
        return item.hundred
      })
      this.cdata.xAxis.data = xAxisData
      this.cdata.series[0].data = thirty
      this.cdata.series[1].data = forty
      this.cdata.series[2].data = fifty
      this.cdata.series[3].data = sixty
      this.cdata.series[4].data = seventy
      this.cdata.series[5].data = eighty
      this.cdata.series[6].data = ninety
      this.cdata.series[7].data = hundred
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
