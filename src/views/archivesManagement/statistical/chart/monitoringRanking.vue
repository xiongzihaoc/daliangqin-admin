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
          text: '医师监测人数排行 Top15',
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
            show: false,
          },
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#B8BBC2',
            },
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          type: 'category',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ccc',
            },
          },
          data: [],
        },
        series: [
          {
            data: [],
            label: { show: true, position: 'right', color: '#5470C6' },
            type: 'bar',
            itemStyle: {
              color: '#5470C6',
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
      const list = newValue.equipmentHeartRateDoctorTopStatisticalVOList;
      console.log(list);
      const xAxisData = list.map((item) => {
        return item.doctorUserName;
      });
      const seriesData1 = list.map((item) => {
        return item.monitorNumber;
      });
      this.cdata.xAxis.data = xAxisData;
      this.cdata.series[0].data = seriesData1;
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
