
import * as Echarts from 'echarts'  // 5.x引用方式

// import _ from 'lodash'

export default {
  computed: {
    $_chartMixin_chartWrapperDom() {
      const dom = document.getElementById(this.thisDomId)
      return dom && Echarts.init(dom)
    },
    /** 图表resize节流，这里使用了lodash，也可以自己使用setTimout实现节流 */
    $_chartMixin_chartResize() {
      return setTimeout(function () {
        this.$_chartMixin_chartWrapperDom.resize()
      }, 400)
    }
  },
  methods: {
    /* 图表初始化 */
    $_chartMixin_initChart() {
      // this.$_chartMixin_chartWrapperDom.setOption()
    },
  },
  mounted() {
    // this.$_chartMixin_initChart()
    window.addEventListener('resize', this.$_chartMixin_chartResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.$_chartMixin_chartResize)
  }

}