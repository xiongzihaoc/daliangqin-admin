<template>
  <div>
    <div id="print">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Echarts/chart';
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
          text: '打印状态统计图 Top15',
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
          padding: 20,
        },
        legend: {
          show: true,
          textStyle: {
            color: '#000',
          },
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
            name: '已打印',
            data: [],
            type: 'bar',
            itemStyle: {
              color: '#5470C6',
            },
          },
          {
            name: '待打印',
            data: [],
            type: 'bar',
            smooth: false,
            itemStyle: {
              color: '#73DEB3',
            },
          },
        ],
      },
    };
  },
  components: {
    Chart,
  },
  // 监听父组件传过来的参数
  watch: {
    listData(newValue, oldValue) {
      const list = newValue.equipmentHeartRatePrintStatusStatisticalVOList;
      const xAxisData = list.map((item) => {
        return item.hospitalName;
      });
      const seriesData1 = list.map((item) => {
        return item.printed;
      });
      const seriesData2 = list.map((item) => {
        return item.notPrinted;
      });
      this.cdata.xAxis.data = xAxisData;
      this.cdata.series[0].data = seriesData1;
      this.cdata.series[1].data = seriesData2;
    },
  },
};
</script>

<style lang="scss" scoped>
$box-height: 500px;
#outbound {
  width: 800px;
  height: $box-height;
  border-radius: 10px;
}
</style>
