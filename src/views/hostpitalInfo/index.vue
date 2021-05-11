<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input @input="searchChange"
        v-model="searchInput"
        class="el-input-style"
        type="text"
        placeholder="search"></el-input>
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
          <!-- <el-button size="mini" type="primary" @click="editBtn(scope.row)"
            >编辑</el-button
          > -->
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
        <el-form-item label="医院名称"
          prop="hospitalName">
          <el-input v-model.trim="editAddForm.hospitalName"
            placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"
          prop="contract">
          <el-input v-model.trim="editAddForm.contract"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="地理位置"
          prop="address">
          <el-input v-model.trim="editAddForm.address"
            placeholder="请输入地理位置"></el-input>
        </el-form-item>
        <el-form-item label="医院等级"
          prop="hospitalClass">
          <el-select v-model.trim="editAddForm.hospitalClass"
            placeholder="请选择医院等级"
            style="width: 100%">
            <el-option v-for="item in hospitalClassList"
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
import { list, add, deleteE } from "@/api/hostpitalInfo";
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
        hospitalName: [
          { required: true, message: "请输入医院名称", trigger: "blur" },
        ],
        contract: [
          { required: true, trigger: "blur", validator: validatePhone },
        ],
        address: [
          { required: true, message: "请选择地理位置", trigger: "blur" },
        ],
        hospitalClass: [
          { required: true, message: "请选择医院等级", trigger: "blur" },
        ],
      },
      searchInput: "",
      // 列表数据
      list: [],
      hospitalClassList: [
        { id: 1, label: "一级甲等", value: "CLASS_1_A" },
        { id: 2, label: "一级乙等", value: "CLASS_1_B" },
        { id: 3, label: "二级甲等", value: "CLASS_2_A" },
        { id: 4, label: "二级乙等", value: "CLASS_2_B" },
        { id: 5, label: "三级甲等", value: "CLASS_3_A" },
        { id: 6, label: "三级乙等", value: "CLASS_3_B" },
      ],
      // appTypeList: [],
      // 表头
      tableHeaderBig: [
        // { prop: "id", label: "id" },
        { prop: "hospitalName", label: "医院名称" },
        { prop: "contract", label: "联系方式" },
        { prop: "address", label: "地理位置" },
        { prop: "hospitalClass", label: "医院等级" },
      ],
      // 分页区域
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
        hospitalName: "",
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      // 获取列表数据
      list({ page: this.pageNum, pageSize: this.pageSize }).then((res) => {
        console.log(res);
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    // 搜索
    searchChange(val) {},
    // 新增
    add() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    // 编辑
    editBtn(val) {
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
    },
    // 删除
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
      // 发送请求
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
        } else {
          return;
        }
      });
    },
    // 分页
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
