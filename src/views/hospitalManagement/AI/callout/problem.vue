<template>
  <div class="app-container">
    <!-- 表格 -->
    <EleTable
      :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      show-summary
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        label="问题名称"
        prop="problem"
      ></el-table-column>
      <el-table-column align="center" label="是" prop="yesIntent">
        <template slot-scope="scope">
          <span
            :class="[scope.row.yesIntent == 0 ? '' : 'skipStyle']"
            @click="skipRouter(scope.row)"
            >{{ scope.row.yesIntent }}人</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="否" prop="noIntent">
        <template slot-scope="scope">
          <span
            :class="[scope.row.noIntent == 0 ? '' : 'skipStyle']"
            @click="skipRouter(scope.row)"
            >{{ scope.row.noIntent }}人</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="不知道" prop="unknownIntent">
        <template slot-scope="scope">
          <span
            :class="[scope.row.unknownIntent == 0 ? '' : 'skipStyle']"
            @click="skipRouter(scope.row)"
            >{{ scope.row.unknownIntent }}人</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="不明确" prop="unrecognizedIntent">
        <template slot-scope="scope">
          <span
            :class="[scope.row.unknownIntent == 0 ? '' : 'unrecognizedIntent']"
            @click="skipRouter(scope.row)"
            >{{ scope.row.unrecognizedIntent }}人</span
          >
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from '@/components/Table';
import { httpAdminAiProblem } from '@/api/admin/httpAdminAiProblem';

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {
        hospitalId: '',
        robotCallJobId: '',
      },
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    let taskHospitalId = sessionStorage.getItem('taskHospitalId');
    this.searchForm.robotCallJobId = this.$route.params.id;
    this.searchForm.hospitalId = taskHospitalId;
    this.getList();
  },
  beforeDestroy() {
    sessionStorage.removeItem('taskHospitalId');
  },
  methods: {
    getList() {
      let objList = Object.assign(this.searchForm, {
        pageSize: this.pageSize,
        page: this.pageNum,
      });
      httpAdminAiProblem.getAiProblemList(objList).then((res) => {
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    /**
     * 路由跳转
     */
    skipRouter(val) {
      this.$router.push({
        name: 'fulfillcall',
        query: { robotCallJobId: this.searchForm.robotCallJobId },
      });
    },
    /**
     * 分页
     */
    handleSizeChange(newSize) {
      this.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>