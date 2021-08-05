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
          prop="userName">
          <el-input v-model="searchForm.userName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生手机号"
          align="left"
          prop="userPhone">
          <el-input v-model="searchForm.userPhone"
            size="small"
            v-Int
            maxlength="11"
            placeholder="请输入医生手机号"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          prop="type">
          <el-select v-model="searchForm.type"
            size="small"
            placeholder="请选择职位">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.hospitalName"
            size="small"
            placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="发布时间"
          prop="status">
          <el-date-picker v-model="searchForm.noteTime"
            size="small"
            type="datetimerange"
            @change="selectNoteTime"
            format="yyyy-MM-dd HH:mm"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
        label="序号"
        type="index">
      </el-table-column>
      <el-table-column align="center"
        label="医生姓名"
        prop="userName">
      </el-table-column>
      <el-table-column align="center"
        label="医生手机号"
        prop="userPhone">
      </el-table-column>
      <el-table-column align="center"
        label="医院名称"
        prop="hospitalName">
      </el-table-column>
      <el-table-column align="center"
        label="职位"
        prop="type"
        :formatter="typeFormatter">
      </el-table-column>
      <el-table-column align="center"
        label="笔记标题"
        prop="title">
      </el-table-column>
      <el-table-column align="center"
        label="笔记内容"
        show-overflow-tooltip
        prop="content">
      </el-table-column>
      <el-table-column align="center"
        label="笔记图集">
        <template slot-scope="scope">
          <div v-if="scope.row.imageUrlList.length > 0">
            <img class="tableImg"
              v-for="(item, index) in scope.row.imageUrlList"
              :src="item"
              :key="index" />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="发布时间"
        :formatter="(row)=>{return parseTime(row.createTime)}"
        prop="createTime">
      </el-table-column>
    </EleTable>
  </div>
</template>
<script>
import EleTable from "@/components/Table"
import { httpAdminNote } from "@/api/admin/httpAdminNote"
import { parseTime, doctorTypeList, formatterElement } from "@/utils/index"
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      doctorTypeList,
      searchForm: {
        userName: "",
        userPhone: "",
        type: "",
        hospitalName: "",
        startTime: "",
        endTime: "",
      },
      list: [],
      editAddForm: {
        userName: "",
        imageUrl: "",
        linkUrl: "",
        type: "",
        status: "",
      },
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminNote
        .getNotes({
          page: this.pageNum,
          pageSize: this.pageSize,
          userName: this.searchForm.userName,
          userPhone: this.searchForm.userPhone,
          hospitalName: this.searchForm.hospitalName,
          type: this.searchForm.type,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
        })
        .then((res) => {
          console.log(res)
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 日期选择事件
    selectNoteTime(val) {
      this.searchForm.startTime = val[0]
      this.searchForm.endTime = val[1]
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {}
      this.getList()
    },
    /***** 表格格式化内容 *****/
    typeFormatter(row) {
      return formatterElement.doctorType[row.type]
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