<template>
  <div class="app-container">
    <el-button type="primary"
      @click="onPrint()">直接打印多任务</el-button>
  </div>
</template>

<script>
import { getLodop } from '@/utils/lodop/LodopFuncs.js'
export default {
  methods: {
    data() {
      return {
        getLodop,
      }
    },
    onPrint() {
      var LODOP = getLodop()
      var wenben = ['一号文本', '二号文本', '三号文本', '四号文本']
      //   for (i = 0; i < wenben.length; i++) {
      //     LODOP.PRINT_INIT('') //初始化在循环中
      //     LODOP.SET_PRINT_PAGESIZE(1, 300, 500, '')
      //     LODOP.ADD_PRINT_TEXT(75, 6, 100, 20, wenben[i])
      //     LODOP.PRINT()
      //   }
       LODOP.PRINT()
    },
  },
}
</script>

<style>
</style>