<template>
  <div>
    <div id="monitoringNumber">
      <Chart :cdata="cdata" />
    </div>
  </div>
</template>
<script>
import { httpAdminEquipmentHeartStatistical } from '@/api/admin/httpAdminEquipmentHeartStatistical';
import Chart from '@/components/Echarts/chart';
export default {
  props: { equipmentDimensionType: String },
  data() {
    return {
      list: [],
      cdata: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
        },
        title: {
          text: '已监测数量统计图 Top15',
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
          padding: 20,
        },
        legend: {
          show: true,
          
        },
        grid: {
          left: '15%',
        },
        xAxis: {
          axisLine: false,
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
          },
          data: [
            '夏家',
            '杨墩',
            '塘北',
            '洛舍镇',
            '戈亭',
            '石泉',
            '光辉',
            '雷甸',
            '城东',
            '辖东港',
          ],
        },
        yAxis: {
          axisLine: false,
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '人数',
            data: [
              8800, 10000, 10500, 11500, 12000, 13500, 14000, 14500, 15000,
              16000,
            ],
            type: 'bar',
            itemStyle: {
              color: '#5470C6',
            },
          },
          {
            name: '次数',
            data: [
              8800, 10000, 10500, 11500, 12000, 13500, 14000, 14500, 15000,
              16000,
            ],
            type: 'line',
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
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      httpAdminEquipmentHeartStatistical
        .getEquipmentHeartStatistical({
          equipmentDimensionType: 'HOSPITAL',
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.equipmentHeartRateMonitorStatisticalVOList;
        });
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
