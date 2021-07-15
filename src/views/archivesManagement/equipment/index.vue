<template>
  <div class="app-container">
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
      <el-table-column align="center"
        slot="fixed"
        label="序号"
        fixed="left"
        type="index">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="设备名称"
        fixed="left"
        prop="name">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="型号"
        fixed="left"
        prop="serialNumber">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="设备图片"
        fixed="left"
        prop="equipmentImageUrl">
        <template slot-scope="scope">
          <img :src="scope.row.equipmentImageUrl"
            class="tableImg">
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="支持检测的类型"
        fixed="left"
        :formatter="diseaseTypeFormatter"
        prop="diseaseType">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="厂商logo"
        fixed="left"
        prop="brandLogo">
        <template slot-scope="scope">
          <img :src="scope.row.brandLogo"
            class="tableImg">
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="品牌名"
        fixed="left"
        prop="brandName">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="厂商地址"
        fixed="left"
        prop="index">
        <template slot-scope="scope">
          {{scope.row.province + scope.row.city + scope.row.area + scope.row.detail}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="官网"
        fixed="left"
        prop="brandUrl">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="检测人数"
        fixed="left"
        prop="countPeople">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        label="检测次数"
        fixed="left"
        prop="countNumber">
      </el-table-column>
    </EleTable>
    <!-- 分页 -->
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="el-pagination-style"></el-pagination>
  </div>
</template>
<script>
import EleTable from "@/components/Table";
import { httpAdminEquipmentFirm } from "@/api/admin/httpAdminEquipmentFirm";
import { parseTime, formatterElement } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      formatterElement,
      list: [],
      editAddForm: {
        name: "",
        userId: "",
        inspectionTime: "",
        heartRateScore: "",
        detectType: "",
      },
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      httpAdminEquipmentFirm
        .getEquipmentFirm({
          page: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 格式化表格
    diseaseTypeFormatter(row) {
      return formatterElement.diseaseType[row.diseaseType];
    },
    /***** 分页 *****/
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getList();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.getList();
    },
  },
};
</script>

<style>
</style>
