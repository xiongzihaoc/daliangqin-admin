<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input
        @input="searchChange"
        v-model="searchInput"
        class="el-input-style"
        type="text"
        placeholder="search"
      ></el-input>
      <el-button
        @click="add"
        class="el-button-style"
        type="primary"
        icon="el-icon-edit"
        >新增</el-button
      >
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list" :header="tableHeaderBig">
      <!-- 操作 -->
      <el-table-column
        align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editBtn(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="success" @click="sendBtn(scope.row)"
            >发布</el-button
          >
          <el-button size="mini" type="danger" @click="deleteBtn(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </EleTable>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="el-pagination-style"
    ></el-pagination>
    <!-- 增改页面 -->
    <el-dialog
      :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @open="getData"
      v-dialogDrag
    >
      <!-- :rules="loginRules" -->
      <el-form
        ref="FormRef"
        :model="editAddForm"
        label-width="100px"
        @closed="editDialogClosed"
      >
        <el-form-item label="安装包地址" prop="userName">
          <el-input v-model="editAddForm.url"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="phone">
          <el-select
            v-model="editAddForm.updateAppType"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="安卓" value="ANDROID"></el-option>
            <el-option label="苹果" value="IOS"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from "../../components/Table";
import { list, add, edit, deleteE } from "@/api/appVersion";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      loginRules: [],
      searchInput: "",
      list: [],
      tableHeaderBig: [
        // { prop: "id", label: "id" },
        { prop: "updateLog", label: "更新日志" },
        { prop: "versionString", label: "版本号" },
        { prop: "url", label: "安装包地址" },
        { prop: "updateAppType", label: "设备类型" },
      ],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
      editAddForm: {
        url: "",
        updateAppType: "",
      },
    };
  },
  created() {
    var value = {
      page: this.pageNum,
      pageSize: this.pageSize,
      updateAppType: "ANDROID",
    };
    list(value).then((res) => {
      this.list = res.data.elements;
    });
  },
  mounted() {},
  methods: {
    // 搜索
    searchChange(val) {},
    // 新增
    add() {
      this.infoTitle = "新增";
      this.editDialogVisible = true;
    },
    editBtn(val) {
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
      //   this.$notify.success({
      //     title: "编辑成功",
      //   });
    },
    sendBtn() {
      this.$notify.success({
        title: "发布成功",
      });
    },
    deleteBtn() {
      this.$notify.success({
        title: "删除成功",
      });
    },
    // 弹框关闭
    getData() {},
    editDialogClosed() {},
    editPageEnter() {
      this.editDialogVisible = false;
      if (this.infoTitle == "新增") {
          add().then(res=>{
              console.log(res);
          })
      } else {
        //   edit()
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style>
</style>
