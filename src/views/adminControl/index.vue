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
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editAddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="editAddForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType	">
          <el-select
            v-model="editAddForm.userType"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in usetTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
import { list, add, edit, deleteE, query } from "@/api/adminControl";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      loginRules: [],
      searchInput: "",
      list: [],
      usetTypeList: [
        { id: 1, label: "DOCTOR", value: "DOCTOR" },
        { id: 2, label: "HOSPITAL_ADMIN", value: "HOSPITAL_ADMIN" },
        { id: 3, label: "PATIENT", value: "PATIENT" },
        { id: 4, label: "PLATFORM_ADMIN", value: "PLATFORM_ADMIN" },
      ],
      tableHeaderBig: [
        // { prop: "id", label: "id" },
        // { prop: "deviceId", label: "设备ID" },
        // { prop: "deviceType", label: "设备类型" },
        // { prop: "ip", label: "ip" },
        { prop: "name", label: "用户名" },
        { prop: "phone", label: "联系方式" },
        // { prop: "userAgent", label: "用户代理" },
        { prop: "createTime", label: "创建时间" },
        // { prop: "updateTime", label: "更新时间" },
      ],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
      editAddForm: {
        phone: "",
        name: "",
        userType: "",
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
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
      console.log(val);
      let valObj = {
        phone: val.phone,
        name: val.name,
        userType: val.userType,
      };
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(valObj));
      this.editDialogVisible = true;
    },
    async deleteBtn(id) {
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
      deleteE(id).then((res) => {
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
      this.pageNum = newPage;
      this.getList();
    },
  },
};
</script>

<style>
</style>
