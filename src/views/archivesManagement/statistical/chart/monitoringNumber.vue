<template>
  <div>
    <div id="monitoringNumber">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import Chart from "@/components/Echarts/chart";
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
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
        },
        title: {
          text: "已监测数量统计图 Top15",
          textStyle: {
            color: "#000",
            fontSize: 14,
          },
        },
        legend: {
          show: true,
          textStyle: {
            color: "#000",
          },
          padding: [30, 0, 0, 0],
        },
        grid: {
          left: "15%",
        },
        xAxis: {
          axisLine: {
            show: true,
          },
          type: "category",
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 20,
            textStyle: {
              color: "#ccc",
            },
          },
          data: [],
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              formatter: "{value}人",
              textStyle: {
                color: "#B8BBC2",
              },
            },
          },
          {
            type: "value",
            axisLabel: {
              show: true,
              formatter: "{value}次",
              textStyle: {
                color: "#B8BBC2",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "人数",
            data: [],
            type: "bar",
            itemStyle: {
              color: "#5470C6",
            },
          },
          {
            name: "次数",
            data: [],
            type: "line",
            smooth: false,
            itemStyle: {
              color: "#73DEB3",
            },
            yAxisIndex: "1",
          },
        ],
      },
    };
  },
  components: {
    Chart,
  },
  created() {},
  mounted() {},
  methods: {},
  // 监听父组件传过来的参数
  watch: {
    listData(newValue, oldValue) {
      const list = newValue.equipmentHeartRateMonitorStatisticalVOList;
      const xAxisData = list.map((item) => {
        return item.hospitalName;
      });
      const seriesData1 = list.map((item) => {
        return item.hospitalPeopleCount;
      });
      const seriesData2 = list.map((item) => {
        return item.heartRateCount;
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
