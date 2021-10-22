<template>
  <div>
    <Echart id="chart"
      :options="options"
      height="500px"></Echart>
  </div>
</template>

<script>
import Echart from './index.vue';
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    const chart = this.$echarts.init(document.getElementById('chart'));
    window.onresize = function () {
      setTimeout(function () {
        chart.resize();
      }, 300);
    };
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = newData;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>