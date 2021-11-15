<template>
  <div>
    <div>
      <Chart id="audit"
        :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Echarts/chart'

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
          text: '审核状态统计图 Top15',
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
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              formatter: '{value}次',
              textStyle: {
                color: '#B8BBC2',
              },
            },
          },
        ],
        series: [
          {
            name: '已审核',
            data: [],
            type: 'bar',
            itemStyle: {
              color: '#5470C6',
            },
          },
          {
            name: '待审核',
            data: [],
            type: 'bar',
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
      const list = newValue.equipmentHeartRateAuditStatusStatisticalVOList
      const xAxisData = list.map((item) => {
        return item.hospitalName
      })
      const seriesData1 = list.map((item) => {
        return item.audited
      })
      const seriesData2 = list.map((item) => {
        return item.pendingReview
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
