<template>
  <div>
    <div id="print">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Echarts/chart'
import { parseTime } from '@/utils/index'

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
          text: '通话时长统计图',
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
            // interval: 0,
            // rotate: 10,
            textStyle: {
              color: '#ccc',
            },
          },
          data: [],
        },
        yAxis: [
          {
            type: 'value',
            minInterval:1,
            axisLabel: {
              show: true,
              formatter: '{value}s',
              textStyle: {
                color: '#B8BBC2',
              },
            },
          },
        ],
        series: [
          {
            name: '总通话时长(s)',
            data: [],
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              color: '#5470C6',
            },
          },
          {
            name: '平均通话时长(s)',
            data: [],
            type: 'bar',
            barWidth: 30,
            smooth: false,
            itemStyle: {
              color: '#73DEB3',
            },
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
      const list = newValue.aiHistoryChatDurationStatusStatisticalVOList
      const xAxisData = list.map((item) => {
        return parseTime(item.callStartTime).substring(0,10)
      })
      const seriesData1 = list.map((item) => {
        return item.sumTalkTime
      })
      const seriesData2 = list.map((item) => {
        return item.avgTalkTime
      })
      this.cdata.xAxis.data = xAxisData
      this.cdata.series[0].data = seriesData1
      this.cdata.series[1].data = seriesData2
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
