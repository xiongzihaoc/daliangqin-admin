<template>
  <div class="app-container">
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        label="序号"
        type="index">
      </el-table-column>
      <el-table-column align="center"
        label="设备名称"
        prop="name">
      </el-table-column>
      <el-table-column align="center"
        label="型号"
        prop="serialNumber">
      </el-table-column>
      <el-table-column align="center"
        label="设备图片"
        prop="equipmentImageUrl">
        <template slot-scope="scope">
          <img :src="scope.row.equipmentImageUrl"
            class="tableImg">
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="支持监测的类型"
        :formatter="diseaseTypeFormatter"
        prop="diseaseType">
      </el-table-column>
      <el-table-column align="center"
        label="厂商logo"
        prop="brandLogo">
        <template slot-scope="scope">
          <img :src="scope.row.brandLogo"
            class="tableImg">
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="品牌名"
        prop="brandName">
      </el-table-column>
      <el-table-column align="center"
        label="厂商地址"
        prop="detail">
        <template slot-scope="scope">
          {{scope.row.province + scope.row.city + scope.row.area + scope.row.detail}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="官网"
        prop="brandUrl">
      </el-table-column>
      <el-table-column align="center"
        label="监测人数"
        prop="countPeople">
      </el-table-column>
      <el-table-column align="center"
        label="监测次数"
        prop="countNumber">
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from "@/components/Table"
import { httpAdminEquipmentFirm } from "@/api/admin/httpAdminEquipmentFirm"
import { parseTime, formatterElement } from "@/utils/index"
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
    }
  },
  created() {
    this.getList()
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
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 格式化表格
    diseaseTypeFormatter(row) {
      return formatterElement.diseaseType[row.diseaseType]
    },
    /***** 分页 *****/
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getList()
    },
  },
}
</script>

<style>
</style>
