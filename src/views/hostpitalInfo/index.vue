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
          <el-button
            size="mini"
            type="warning"
            @click="deleteBtn(scope.row)"
            >重置</el-button
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
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editAddForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="editAddForm.content"></el-input>
        </el-form-item>
        <el-form-item label="发送类型" prop="sendType">
          <el-select
            v-model="editAddForm.sendType"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="LOGIN" value="RESET_PASSWORD"></el-option>
            <el-option
              label="RESET_PASSWORD"
              value="RESET_PASSWORD"
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
import { list, add, edit, reset, query } from "@/api/hostpitalInfo";
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
        { prop: "devicId", label: "设备ID" },
        { prop: "deviceType", label: "设备类型" },
        { prop: "ip", label: "ip" },
        { prop: "name", label: "用户名" },
        { prop: "phone", label: "手机号" },
        { prop: "userAgent", label: "用户代理" },
        { prop: "createTime", label: "创建时间" },
        { prop: "updateTime", label: "更新时间" },


      ],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
      editAddForm: {
        phone: "",
        content: "",
        sendType: "",
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
          this.list = res.data
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
    deleteBtn(val) {
      // reset({ phone: phone }).then((res) => {
      //   console.log(res);
      //   this.$notify.success({
      //     title: "重置成功",
      //   });
      //   this.getList();
      // });
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
