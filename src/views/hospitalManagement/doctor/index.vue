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
            v-Int
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
        <el-form-item label="医院名称"
          align="left"
          prop="hospitalName">
          <el-input v-model="searchForm.hospitalName"
            size="small"
            placeholder="请输入医院名称"></el-input>
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
      <el-button @click="addBtn"
        type="primary"
        class="tableAdd"
        size="small"
        plain
        icon="el-icon-plus">新增</el-button>
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
        slot="fixed"
        fixed="left"
        type="index"
        label="序号"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        label="医生姓名"
        prop="name"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        label="医生头像"
        prop="avatarUrl">
        <template slot-scope="scope">
          <img class="tableImg"
            :src="scope.row.avatarUrl" />
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="用户数量"
        prop="patientCount">
        <template slot-scope="scope">
          <span @click="skipPatient(scope.row)"
            style="color: #1890ff; text-decoration: underline">{{ scope.row.patientCount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="toDoctorInfo"
        label="对应转诊医生">
        <template slot-scope="scope">
          <div v-if="scope.row.toDoctorInfo[0]">
            <span v-for="item in scope.row.toDoctorInfo"
              :key="item.id">{{
              item.name + "  "
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="创建人"
        prop="createUserName"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="创建时间"
        prop="createTime">
        <template slot-scope="scope">
          {{ parseTime(scope.row.createTime) }}
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
          <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </EleTable>
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
          <el-input :disabled="this.infoTitle === '编辑' ? true : false"
            v-model="editAddForm.name"
            placeholder="请输入医生真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生头像"
          prop="avatarUrl">
          <single-upload v-model="editAddForm.avatarUrl"
            uploadType="AVATAR" />
        </el-form-item>
        <!-- 编辑阻止修改医生手机号-->
        <el-form-item label="手机号"
          prop="phone">
          <el-input :disabled="this.infoTitle === '编辑' ? true : false"
            v-model="editAddForm.phone"
            v-Int
            placeholder="请输入该医生手机号"></el-input>
        </el-form-item>
        <!-- 编辑阻止修改医生身份证号 -->
        <el-form-item label="身份证号"
          prop="idCard">
          <el-input v-model="editAddForm.idCard"
            :disabled="this.infoTitle === '编辑' ? true : false"
            placeholder="请输入该医生身份证号"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          prop="type">
          <el-select :disabled="this.infoTitle === '编辑' ? true : false"
            v-model="editAddForm.type"
            placeholder="请选择职位"
            style="width: 100%">
            <el-option v-for="item in doctorTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称"
          prop="hospitalId">
          <el-select v-model="editAddForm.hospitalId"
            placeholder="请选择医院"
            style="width: 100%">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :value="item.id"
              :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <!-- PHYSICIAN 医师的枚举值 只有职位选中医师 才能选择转诊医生 -->
        <el-form-item v-if="editAddForm.type === 'PHYSICIAN'"
          label="转诊医生"
          prop="toDoctorUserId">
          <el-select v-model="editAddForm.toDoctorUserId"
            placeholder="请选择转诊医生"
            style="width: 100%">
            <el-option v-for="item in toDoctorList"
              :key="item.id"
              :value="item.id"
              :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介"
          prop="introduction">
          <el-input type="textarea"
            v-model="editAddForm.introduction"
            :rows="5"
            placeholder="请输入个人简介"></el-input>
        </el-form-item>
        <el-form-item label="医生擅长"
          prop="goodAt">
          <el-input type="textarea"
            :rows="5"
            v-model="editAddForm.goodAt"
            placeholder="请输入医生擅长"></el-input>
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
import { httpAdminDoctor } from "@/api/admin/httpAdminDoctor";
import { httpAdminHospital } from "@/api/admin/httpAdminHospital";
import {
  validateIdCard,
  validatePhone,
  parseTime,
  doctorTypeList,
  genderList,
  formatterElement,
} from "@/utils/index";
import addressJson from "@/utils/address.json";
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
        hospitalName: "",
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
        { prop: "phone", label: "手机号" },
        { prop: "idCard", label: "身份证号" },
        {
          prop: "birthday",
          label: "出生日期",
          formatter: (row) => {
            return Boolean(row.birthday)
              ? parseTime(row.birthday).slice(0, 10)
              : "";
          },
        },
        { prop: "age", label: "年龄" },
        {
          prop: "gender",
          label: "性别",
          formatter: (row) => {
            return this.genderFormatter(row);
          },
        },
        {
          prop: "type",
          label: "职位",
          formatter: (row) => {
            return this.typeFormatter(row);
          },
        },
        { prop: "hospitalName", label: "医院名称" },
      ],
      // 医院列表
      hospitalList: [],
      // 医院跳转医生携带医院id
      hospitalId: "",
      // 医生类型列表
      editVal: {},
      // 转诊医生列表
      toDoctorList: [],
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
    this.hospitalId = localStorage.getItem("hospitalId");
    this.getList();
  },
  mounted() {
    // 获取医院  转诊医生列表
    this.getHospitalList();
    this.getToDoctorList();
  },
  //离开当前页面后执行
  destroyed() {
    localStorage.removeItem("hospitalId");
  },
  methods: {
    getList() {
      httpAdminDoctor
        .getDoctor({
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          idCard: this.searchForm.idCard,
          genderType: this.searchForm.gender,
          type: this.searchForm.type,
          hospitalName: this.searchForm.hospitalName,
          hospitalId: this.hospitalId,
        })
        .then((res) => {
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    getToDoctorList() {
      httpAdminDoctor.getDoctoTransfer().then((res) => {
        this.toDoctorList = res.data.elements;
      });
    },
    getHospitalList() {
      httpAdminHospital.getHospital().then((res) => {
        console.log(res);
        this.hospitalList = res.data.elements;
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
    // 点击用户跳转
    skipPatient(val) {
      this.$router.push("/archivesManagement/patient");
      localStorage.setItem("doctorId", val.id);
    },
    // 递归处理json文件的最后一级
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].districts.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].districts = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].districts);
        }
      }
      return data;
    },
    /***** 增删改 *****/
    // 新增
    addBtn() {
      this.infoTitle = "新增";
      this.editAddForm = {};
      this.editDialogVisible = true;
    },
    // 编辑
    editBtn(val) {
      console.log(val);
      this.editVal = val;
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
      httpAdminDoctor.deleteDoctor(id).then((res) => {
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
            httpAdminDoctor.postDoctor(this.editAddForm).then((res) => {
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
            httpAdminDoctor.putDoctor(this.editAddForm).then((res) => {
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
    genderFormatter(row) {
      return formatterElement.gender[row.gender];
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
