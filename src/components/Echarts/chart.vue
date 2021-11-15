<template>
  <div>
    <Echart :id="id"
      :options="options"
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
    id: {
      type: String,
      default: 'chart',
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