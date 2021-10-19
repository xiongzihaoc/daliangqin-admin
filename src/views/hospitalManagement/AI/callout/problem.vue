<template>
  <div class="app-container">
    <!-- 表格 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        type="index"
        label="序号"></el-table-column>
      <el-table-column align="center"
        label="问题名称"></el-table-column>
      <el-table-column align="center"
        label="是"></el-table-column>
      <el-table-column align="center"
        label="否"></el-table-column>
      <el-table-column align="center"
        label="不知道"></el-table-column>
      <el-table-column align="center"
        label="不明确"></el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
// import { httpAdminAiProblem } from '@/api/admin/httpAdminAiProblem'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    // console.log(this.$route.params)
  },
  methods: {
    /**
     * 接口
     */
    // getAiProblemList() {
    //   httpAdminAiProblem.getAiProblemList().then((res) => {})
    // },
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
    },
  },
}
</script>

<style lang="scss" scoped>
</style>