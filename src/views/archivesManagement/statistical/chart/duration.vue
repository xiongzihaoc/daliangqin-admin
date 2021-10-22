<template>
  <div>
    <div id="duration">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Echarts/chart';
// 颜色集合
const colors = [
  '#C32B33',
  '#A65A78',
  '#C1C5D8',
  '#42A87F',
  '#5470C6',
  '#E5C5B7',
  '#AB8783',
  '#E0B3AE',
  '#E3886B',
];
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
          text: '监测时长统计图 Top15',
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
            name: '<1h',
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
            name: '1h~3h',
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
            name: '3h~6h',
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
            name: '6h~9h',
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
            name: '9h~12h',
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
            name: '12h~15h',
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
            name: '15h~18h',
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
            name: '18h~21h',
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
          {
            name: '21h~24h',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series',
            },
            itemStyle: {
              color: colors[8],
            },
            data: [],
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
      const list = newValue.equipmentHeartRateTakeTimeStatisticalVOList;
      const xAxisData = list.map((item) => {
        return item.hospitalName;
      });
      // <1h
      const oneHour = list.map((item) => {
        return item.oneHour;
      });
      // 1~3h
      const oneThreeHour = list.map((item) => {
        return item.oneThreeHour;
      });
      // 3~6h
      const threeSixHour = list.map((item) => {
        return item.threeSixHour;
      });
      // 6~9h
      const sixNineHour = list.map((item) => {
        return item.sixNineHour;
      });
      // 9~12h
      const nineTwelveHour = list.map((item) => {
        return item.nineTwelveHour;
      });
      // 12~15h
      const twelveFifteenHour = list.map((item) => {
        return item.twelveFifteenHour;
      });
      // 15~18h
      const fifteenEighteenHour = list.map((item) => {
        return item.fifteenEighteenHour;
      });
      // 18~21h
      const eighteenTwentyOneHour = list.map((item) => {
        return item.eighteenTwentyOneHour;
      });
      // 21~24h
      const twentyOneTwentyFourHour = list.map((item) => {
        return item.twentyOneTwentyFourHour;
      });
      this.cdata.xAxis.data = xAxisData;
      this.cdata.series[0].data = oneHour;
      this.cdata.series[1].data = oneThreeHour;
      this.cdata.series[2].data = threeSixHour;
      this.cdata.series[3].data = sixNineHour;
      this.cdata.series[4].data = nineTwelveHour;
      this.cdata.series[5].data = twelveFifteenHour;
      this.cdata.series[6].data = fifteenEighteenHour;
      this.cdata.series[6].data = eighteenTwentyOneHour;
      this.cdata.series[6].data = twentyOneTwentyFourHour;
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
