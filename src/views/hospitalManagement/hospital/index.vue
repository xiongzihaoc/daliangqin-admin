<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医院名称"
          align="left"
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="医院等级"
          prop="hospitalType">
          <el-select v-model="searchForm.hospitalType"
            size="small"
            placeholder="请选择医院等级">
            <el-option v-for="item in hospitalClass"
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
    <!-- 表格上方CRUD按钮 -->
    <div>
      <el-button @click="add"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-plus">新增</el-button>
      <!-- <el-button @click="deleteMultiple"
      type="danger"
      class="tableAdd"
      size="small"
      plain
      icon="el-icon-delete">删除</el-button> -->
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="selection"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="index"
        label="序号"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="name"
        label="医院名称">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="avatarUrl"
        label="医院头像">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="contract"
        label="医院电话">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="address"
        label="医院地址">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="hospitalType"
        :formatter="hosLevelFormatter"
        label="医院等级">
      </el-table-column>
      <!-- <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="adminPhone"
        label="管理员手机号">
      </el-table-column> -->
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
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="110px">
        <el-form-item label="医院名称"
          prop="name">
          <el-input v-model="editAddForm.name"
            placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="医院头像"
          prop="name">
          <el-input v-model="editAddForm.avatarUrl"
            placeholder="请上传医院头像"></el-input>
        </el-form-item>

        <el-form-item label="医院电话"
          prop="contract">
          <el-input v-model="editAddForm.contract"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入医院电话"></el-input>
        </el-form-item>
        <el-form-item label="医院地址"
          prop="address">
          <el-input v-model="editAddForm.address"
            placeholder="请输入医院地址"></el-input>
        </el-form-item>
        <el-form-item label="医院等级"
          prop="hospitalType">
          <el-select v-model="editAddForm.hospitalType"
            placeholder="请选择医院等级"
            style="width: 100%">
            <el-option v-for="item in hospitalClass"
              :key="item.id"
              :value="item.value"
              :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员手机号"
          v-if="this.infoTitle === '新增'"
          prop="adminPhone">
          <el-input v-model="editAddForm.adminPhone"
            placeholder="请输入管理员手机号"></el-input>
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
import EleTable from "@/components/Table";
import { validatePhone } from "@/utils/index";
import { httpAdminHospital } from "@/api/admin/httpAdminHospital";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      // 表单验证规则
      FormRules: {
        adminPhone: [
          { required: true, trigger: "blur", validator: validatePhone },
        ],
        name: [{ required: true, message: "请输入医院名称", trigger: "blur" }],
        contract: [
          { required: true, message: "请输入医院电话", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入医院地址", trigger: "blur" },
        ],
        hospitalType: [
          { required: true, message: "请选择医院等级", trigger: "blur" },
        ],
      },
      // 搜索表单
      searchForm: {
        name: "",
        hospitalType: "",
      },
      // 列表数据
      list: [],
      // 增改表单
      editAddForm: {
        name: "",
        contract: "",
        address: "",
        hospitalType: "",
      },
      // 医院级别列表
      hospitalClass: [
        { id: 1, label: "三甲", value: "CLASS_3_A" },
        { id: 2, label: "三乙", value: "CLASS_3_B" },
        { id: 3, label: "二甲", value: "CLASS_2_A" },
        { id: 4, label: "二乙", value: "CLASS_2_B" },
        { id: 5, label: "一级", value: "CLASS_1_A" },
      ],
      // 表格数据
      tableHeaderBig: [],
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
  methods: {
    getList() {
      httpAdminHospital
        .getHospital({
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchForm.name,
          hospitalType: this.searchForm.hospitalType,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    /***** 搜索区域 *****/
    searchBtn() {
      this.getList();
    },
    // 重置
    searchReset() {
      this.searchForm = {};
      this.getList();
    },
    /***** CRUD *****/
    // 新增
    add() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    // 编辑
    editBtn(val) {
      console.log(val);
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
    },
    // 删除多个
    deleteMultiple() {},
    // 删除单个
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
      httpAdminHospital.deleteHospital(id).then((res) => {
        if (res.code != "OK") {
          return;
        } else {
          this.$notify.success({
            title: "删除成功",
          });
        }
        this.getList();
      });
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === "新增") {
            // 发送请求
            httpAdminHospital.postHospital(this.editAddForm).then((res) => {
              if (res.code != "OK") {
                return;
              } else {
                this.$notify.success({
                  title: "新增成功",
                });
                this.getList();
                this.editDialogVisible = false;
              }
            });
          } else {
            // 发送请求
            httpAdminHospital.putHospital(this.editAddForm).then((res) => {
              if (res.code != "OK") {
                return;
              } else {
                this.$notify.success({
                  title: "编辑成功",
                });
                this.getList();
                this.editDialogVisible = false;
              }
            });
          }
        }
      });
    },
    // Formatter表格数据
    hosLevelFormatter(coloumn) {
      switch (coloumn.hospitalType) {
        case "CLASS_3_A":
          return "三甲";
          break;
        case "CLASS_3_B":
          return "三乙";
          break;
        case "CLASS_2_A":
          return "二甲";
          break;
        case "CLASS_2_B":
          return "二乙";
          break;
        case "CLASS_1_A":
          return "一级";
          break;
      }
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