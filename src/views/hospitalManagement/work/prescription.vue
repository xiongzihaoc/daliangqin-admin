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
          prop="phone">
          <el-input v-model="searchForm.phone"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            size="small"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证"
          align="left"
          prop="idCard">
          <el-input v-model="searchForm.idCard"
            size="small"
            placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="性别"
          align="left"
          prop="gender">
          <el-select v-model="searchForm.gender"
            size="small">
            <el-option v-for="item in genderList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位"
          align="left"
          prop="type">
          <el-select v-model="searchForm.type"
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
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="selection"></el-table-column>
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
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="医生姓名"
          prop="name">
          <!-- 编辑阻止修改医生姓名 -->
          <el-input v-if="this.infoTitle === '新增'"
            v-model="editAddForm.name"
            placeholder="请输入医生真实姓名"></el-input>
          <el-input v-else
            disabled
            v-model="editAddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="医生头像"
          prop="avatarUrl">
          <single-upload v-model="editAddForm.avatarUrl"
            uploadType="AVATAR" />
        </el-form-item>
        <!-- 编辑阻止修改医生手机号-->
        <el-form-item label="手机号"
          prop="phone">
          <el-input v-if="this.infoTitle === '新增'"
            v-model="editAddForm.phone"
            placeholder="请输入该医生手机号"></el-input>
          <el-input v-else
            disabled
            v-model="editAddForm.phone"
            placeholder="请输入该医生手机号"></el-input>
        </el-form-item>
        <!-- 编辑阻止修改医生身份证号 -->
        <el-form-item label="身份证号"
          prop="idCard">
          <el-input v-model="editAddForm.idCard"
            placeholder="请输入该医生身份证号"
            v-if="this.infoTitle === '新增'"></el-input>
          <el-input v-else
            disabled
            v-model="editAddForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          prop="type">
          <el-select v-if="this.infoTitle === '新增'"
            v-model="editAddForm.type"
            placeholder="请选择职位"
            style="width: 100%">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
          <el-select v-else
            disabled
            v-model="editAddForm.type"
            placeholder="请选择职位"
            style="width: 100%">
            <el-option v-for="item in doctorTypeList"
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
import EleTable from "@/components/Table";
import singleUpload from "@/components/Upload";
import { httpHospitalUserTemplate } from "@/api/hospital/httpHospitalUserTemplate";
import {
  validateIdCard,
  validatePhone,
  parseTime,
  doctorTypeList,
  genderList,
  formatterElement,
} from "@/utils/index";
export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      parseTime,
      doctorTypeList,
      genderList,
      FormRules: {
        name: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
        avatarUrl: [{ required: true, message: "请上传头像", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        idCard: [
          { required: true, trigger: "blur", validator: validateIdCard },
        ],
        type: [{ required: true, message: "请选择职位", trigger: "blur" }],
        hospitalId: [
          { required: true, message: "请选择医院", trigger: "blur" },
        ],
        toDoctorUserId: [
          { required: true, message: "请选择转诊医生  ", trigger: "blur" },
        ],
      },
      searchForm: {
        name: "",
        phone: "",
        idCard: "",
        gender: "",
        type: "",
      },
      list: [],
      editAddForm: {
        name: "",
        avatarUrl: "",
        phone: "",
        idCard: "",
        hospitalId: "",
        toDoctorUserId: "",
        type: "",
        introduction: "",
        goodAt: "",
      },
      tableHeaderBig: [
        { prop: "doctorName", label: "医生姓名" },
        {
          prop: "doctorType",
          label: "职位",
          formatter: (row) => {
            return this.doctorTypeFormatter(row);
          },
        },

        { prop: "age", label: "选用模板" },
        { prop: "type", label: "处方内容" },
        { prop: "patientName", label: "用户姓名" },
        { prop: "highBloodStatus", label: "高血压" },
        { prop: "diabeteStatus", label: "糖尿病" },
        { prop: "diabeteStatus", label: "最近修改时间" },
      ],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹框区域
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
      httpHospitalUserTemplate
        .getUserTemplate({
          page: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList();
    },
    // 重置
    searchReset() {
      this.searchForm = {};
      this.getList();
    },
    /***** 增删改 *****/
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
      httpHospitalUserTemplate.deleteUserTemplate(id).then((res) => {
        if (res.code === "OK") {
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
            httpHospitalUserTemplate
              .postUserTemplate(this.editAddForm)
              .then((res) => {
                if (res.code === "OK") {
                  this.$notify.success({
                    title: "新增成功",
                  });
                  this.getList();
                  this.getToDoctorList();
                  this.editDialogVisible = false;
                }
              });
          } else {
            // 发送请求
            httpHospitalUserTemplate
              .putUserTemplate(this.editAddForm)
              .then((res) => {
                if (res.code === "OK") {
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
    /***** 表格格式化内容 *****/
    doctorTypeFormatter(row) {
      return formatterElement.doctorType[row.doctorType];
    },
    typeFormatter(row) {
      return formatterElement.doctorType[row.type];
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
