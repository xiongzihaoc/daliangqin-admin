<template>
  <div>
    <Echart :options="options"
      height="500px"></Echart>
  </div>
</template>

<script>
import Echart from './index.vue'
export default {
  data() {
    return {
      options: {},
    }
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
  watch: {
    cdata: {
      handler(newData) {
        this.options = newData
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>