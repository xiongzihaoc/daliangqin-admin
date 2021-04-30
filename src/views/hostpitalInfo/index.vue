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
          <el-button size="mini" type="danger" @click="deleteBtn(scope.row.id)"
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
        <el-form-item label="地理位置" prop="address">
          <el-input v-model="editAddForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contract">
          <el-input v-model="editAddForm.contract"></el-input>
        </el-form-item>
        <el-form-item label="医院等级" prop="hospitalClass">
          <el-select
            v-model="editAddForm.hospitalClass"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="一级甲等" value="CLASS-1"></el-option>
            <el-option label="一级乙等" value="CLASS-2"></el-option>
            <el-option label="二级甲等" value="CLASS-1"></el-option>
            <el-option label="二级乙等" value="CLASS-2"></el-option>
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
import { list, add, edit, deleteE, query } from "@/api/hostpitalInfo";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      loginRules: [],
      searchInput: "",
      list: [],
      appTypeList:[
        
      ],
      tableHeaderBig: [
        // { prop: "id", label: "id" },
        { prop: "address", label: "地理位置" },
        { prop: "contract", label: "联系方式" },
        { prop: "hospitalClass", label: "医院等级" },
        { prop: "name", label: "用户名" },
        { prop: "phone", label: "手机号" },
      ],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
      editAddForm: {
        address: "",
        contract: "",
        hospitalClass: "",
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      console.log(this.pageNum);
      console.log(this.pageSize);
      var value = {
        page: this.pageNum,
        pageSize: this.pageSize,
      };
      list(value).then((res) => {
        console.log(res);
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    // 搜索
    searchChange(val) {
      query(val).then((res) => {
        if (res.code != "OK") {
          return;
        } else {
          this.$notify.success({
            title: "新增成功",
          });
          this.list = res.data;
        }
      });
    },
    // 新增
    add() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    editBtn(val) {
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
    },
    async deleteBtn(val) {
      const confirmResult = await this.$confirm(
        "你确定要执行此操作, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => console.log(err));
      if (confirmResult != "confirm") {
        return this.$message.info("取消删除");
      }
      deleteE(val).then((res) => {
        console.log(res);
        this.$notify.success({
          title: "删除成功",
        });
        this.getList();
      });
    },
    // 弹框关闭
    getData() {},
    editDialogClosed() {},
    // 新增编辑确定
    editPageEnter() {
      if (this.infoTitle == "新增") {
        add(this.editAddForm).then((res) => {
          if (res.code != "OK") {
            return;
          } else {
            this.$notify.success({
              title: "新增成功",
            });
            this.getList();
          }
        });
      } else {
        edit(this.editAddForm).then((res) => {
          if (res.code != "OK") {
            return;
          } else {
            this.$notify.success({
              title: "编辑成功",
            });
            this.getList();
          }
        });
      }
      this.editDialogVisible = false;
    },
    // 分页
    handleSizeChange(newSize) {
      console.log(newSize);
      this.pageSize = newSize;
      this.getList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.page = newPage;
      this.getList();
    },
  },
};
</script>

<style>
</style>
