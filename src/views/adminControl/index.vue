<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input @input="searchChange"
        v-model="searchInput"
        class="el-input-style"
        type="text"
        placeholder="搜索">
      </el-input>
      <el-button @click="add"
        class="el-button-style"
        type="primary"
        icon="el-icon-edit">新增</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
      <!-- 操作 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
          <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
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
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @open="getData"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="用户名"
          prop="name">
          <el-input v-model="editAddForm.name"
            placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"
          prop="phone">
          <el-input v-model="editAddForm.phone"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="用户类型"
          prop="userType">
          <el-select v-model="editAddForm.userType"
            placeholder="请选择用户类型"
            style="width: 100%">
            <el-option v-for="item in userTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from "../../components/Table";
import { list, add, edit, deleteE } from "@/api/adminControl";
export default {
  components: {
    EleTable,
  },
  data() {
    // 手机号格式验证
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!value) {
        return callback(new Error("请填写手机号码！"));
      } else if (!reg.test(value)) {
        return callback(new Error("请填写正确的手机号码！"));
      } else {
        callback();
      }
    };
    return {
      FormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "blur" },
        ],
      },
      searchInput: "",
      list: [],
      editAddForm: {
        phone: "",
        name: "",
        userType: "",
      },
      userTypeList: [
        { id: 1, label: "医生", value: "DOCTOR" },
        { id: 2, label: "医院管理员", value: "HOSPITAL_ADMIN" },
        { id: 3, label: "患者", value: "PATIENT" },
        { id: 4, label: "平台管理员", value: "PLATFORM_ADMIN" },
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
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      list({
        page: this.pageNum,
        pageSize: this.pageSize,
        id: this.searchInput,
      }).then((res) => {
        console.log(res);
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    // 搜索
    searchChange(val) {
      this.getList();
    },
    // 新增
    add() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    // 编辑
    editBtn(val) {
      let valObj = {
        phone: val.phone,
        name: val.name,
        userType: val.userType,
      };
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(valObj));
      this.editDialogVisible = true;
    },
    // 删除
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
      // 发送请求
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
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle == "新增") {
            // 发送请求
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
            // 发送请求
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
        }
      });
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
