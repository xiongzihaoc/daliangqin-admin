<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        :inline="true"
        class="searchForm">
        <el-form-item label="姓名"
          align="left"
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证"
          align="left"
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="性别"
          align="left"
          prop="name">
          <el-select v-model="searchForm.name"
            size="small">
            <!-- <el-option label="家医"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="职位"
          align="left"
          prop="name">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请选择职位"></el-input>
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
          <el-button size="small"
            type="success"
            icon="el-icon-download">导入</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格操作按钮 -->
    <div>
      <el-button @click="add"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-plus">新增</el-button>
      <el-button @click="deleteMultiple"
        type="danger"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-delete">删除</el-button>
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
        label="姓名">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="avatarUrl"
        label="头像">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="idCard"
        label="身份证号">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="birthday"
        label="出生日期">
        <template slot-scope="scope">
          {{ scope.row.birthday.slice(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="gender"
        label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.gender === 'MALE'">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="type"
        label="职位">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 'PROFESSIONAL_DOCTOR'">专家</span>
          <span v-else>家医</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="hospitalName"
        label="医院名称">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="type"
        label="对应转诊医生">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
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
          <!-- <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button> -->
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
        <el-form-item label="医生姓名"
          prop="name">
          <el-input v-model="editAddForm.name"
            placeholder="请输入医生真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生头像"
          prop="avatarUrl">
          <el-input v-model="editAddForm.avatarUrl"
            placeholder="请上传医生头像"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="phone">
          <el-input v-model="editAddForm.phone"
            placeholder="请输入该医生手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号"
          prop="idCard">
          <el-input v-model="editAddForm.idCard"
            placeholder="请输入该医生身份证号"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          prop="type">
          <el-select v-model="editAddForm.type"
            placeholder="请选择职位"
            @change="toDoctorChange"
            style="width: 100%">
            <el-option label="家医"
              value="FAMILY_DOCTOR"></el-option>
            <el-option label="专家"
              value="_DOCTOR"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称"
          prop="hospitalName">
          <el-select v-model="editAddForm.hospitalName"
            placeholder="请选择医院"
            style="width: 100%">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :value="item.id"
              :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转诊医生"
          prop="toDoctor">
          <el-select v-model="editAddForm.toDoctor"
            placeholder="请选择转诊医生"
            style="width: 100%">
            <el-option v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.name"></el-option>
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
import EleTable from "@/components/Table";
import { list, hospitalList, add } from "@/api/admin/doctor";
import { validateIdCard, validatePhone } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      FormRules: {
        name: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
        avatarUrl: [{ required: true, message: "请上传头像", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        idCard: [
          { required: true, trigger: "blur", validator: validateIdCard },
        ],
        type: [{ required: true, message: "请选择职位", trigger: "blur" }],
        hospitalName: [
          { required: true, message: "请选择医院", trigger: "blur" },
        ],
        toDoctor: [
          { required: true, message: "请选择转诊医生  ", trigger: "blur" },
        ],
      },
      searchForm: {
        name: "",
        type: "",
      },
      list: [],
      editAddForm: {
        name: "",
        avatarUrl: "",
        phone: "",
        idCard: "",
        hospitalName: "",
        type: "",
      },
      hospitalList: [],
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
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      list({
        page: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        console.log(res);
        this.list = res.data.elements;
        this.total = res.data.totalSize;
      });
    },
    toDoctorChange(val) {
      // console.log(val);
      // list({
      //   page: this.pageNum,
      //   pageSize: this.pageSize,
      // });
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {},
    // 重置
    searchReset() {
      this.searchForm = {};
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
      deleteE(id).then((res) => {
        console.log(res);
        this.$notify.success({
          title: "删除成功",
        });
        this.getList();
      });
    },
    // 弹框开启
    getData() {
      hospitalList({ pageSize: 20, pageNum: 1 }).then((res) => {
        console.log(res);
        this.hospitalList = res.data.elements;
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
    /***** 分页 *****/
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
