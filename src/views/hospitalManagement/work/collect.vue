<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医生姓名"
          align="left"
          prop="doctorName">
          <el-input v-model="searchForm.doctorName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生手机号"
          align="left"
          prop="doctorPhone">
          <el-input v-model="searchForm.doctorPhone"
            v-Int
            size="small"
            placeholder="请输入医生手机号"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          align="left"
          prop="doctorType">
          <el-select v-model="searchForm.doctorType"
            size="small"
            placeholder="请选择职位">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBtn"
            type="primary"
            size="small"
            icon="el-icon-search">搜索</el-button>
          <el-button @click="searchReset"
            size="small"
            plain
            icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column align="center"
        label="医生姓名"
        prop="doctorName">
      </el-table-column>
      <el-table-column align="center"
        label="医生手机号"
        prop="doctorPhone">
      </el-table-column>
      <el-table-column align="center"
        label="职位"
        :formatter="doctorTypeFormatter"
        prop="doctorType">
      </el-table-column>
      <el-table-column align="center"
        label="收藏人数"
        prop="collectionCount">
        <template slot-scope="scope">
          <span style="color: #1890ff; text-decoration: underline"
            @click="skiPatient(scope.row)">{{scope.row.collectionCount}}</span>
        </template>
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from "@/components/Table"
import { httpAdminCollection } from "@/api/admin/httpAdminCollection"
import { formatterElement, doctorTypeList } from "@/utils/index"
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      formatterElement,
      doctorTypeList,
      editDialogVisible: false,
      // 搜索表单
      searchForm: {
        doctorName: "",
        doctorType: "",
        doctorPhone: "",
        userId: "",
      },
      // 列表数据
      list: [],
      tableHeaderBig: [],
      // 分页数据
      pageSize: 10,
      pageNum: 1,
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminCollection
        .getCollection({
          page: this.pageNum,
          pageSize: this.pageSize,
          doctorName: this.searchForm.doctorName,
          doctorType: this.searchForm.doctorType,
          doctorPhone: this.searchForm.doctorPhone,
        })
        .then((res) => {
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 搜索
    searchBtn(val) {
      this.getList()
    },
    // 搜索条件重置
    searchReset() {
      this.searchForm = {}
      this.getList()
    },
    // 跳转用户列表
    skiPatient(val) {
      console.log(val)
      this.$router.push("/archivesManagement/patient")
      localStorage.setItem("collectionDoctorUserId", val.doctorUserId)
    },
    // 格式化表格
    doctorTypeFormatter(row) {
      return formatterElement.doctorType[row.doctorType]
    },
    // 分页
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

<style scoped>
.search-box {
  margin-bottom: 10px;
}
.el-input-style {
  margin-right: 10px;
}
</style>
