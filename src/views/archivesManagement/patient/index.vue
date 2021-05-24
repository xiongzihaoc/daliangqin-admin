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
          <el-input v-model.trim="searchForm.name"
            size="small"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="phone">
          <el-input v-model.trim="searchForm.phone"
            size="small"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证"
          align="left"
          prop="idCard">
          <el-input v-model.trim="searchForm.idCard"
            size="small"
            placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="性别"
          align="left"
          prop="gender">
          <el-select v-model="searchForm.gender"
            size="small">
            <el-option label="男"
              value="MALE"></el-option>
            <el-option label="女"
              value="FEMALE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应医师"
          align="left"
          prop="doctorName">
          <el-input placeholder="请输入对应医师"
            v-model.trim="searchForm.doctorName"></el-input>
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
          <span v-if="scope.row.birthday">{{ parseTime(scope.row.birthday).slice(0,10)}}</span>
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
        prop="address"
        label="家庭住址">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="healthScore"
        label="两慢指数">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        prop="doctorInfoVO"
        label="对应医师">
        <template slot-scope="scope">{{scope.row.doctorInfoVO.name}}</template>
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
            plain>详细资料</el-button>
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
      @open="openBounced"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <!-- 用户姓名 -->
        <el-form-item label="用户姓名"
          prop="name">
          <el-input v-model="editAddForm.name"
            placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <!-- 用户头像 -->
        <el-form-item label="用户头像"
          prop="avatarUrl">
          <el-input v-model="editAddForm.avatarUrl"
            placeholder="请上传用户头像"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号"
          prop="phone">
          <el-input v-model="editAddForm.phone"
            placeholder="请输入该用户手机号"></el-input>
        </el-form-item>
        <!-- 身份证 -->
        <el-form-item label="身份证号"
          prop="idCard">
          <el-input v-model="editAddForm.idCard"
            placeholder="请输入该用户身份证号"></el-input>
        </el-form-item>
        <!-- 家庭住址 -->
        <el-form-item label="家庭住址"
          prop="address">
          <el-input v-model="editAddForm.address"
            placeholder="请输入家庭住址"></el-input>
        </el-form-item>
        <!-- 对应医师 -->
        <el-form-item label="对应医师"
          prop="doctorUserId">
          <el-select v-model="editAddForm.doctorUserId"
            filterable
            placeholder="请输入内容搜索"
            style="width: 100%">
            <el-option v-for="item in toDoctorList"
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
import { httpAdminPatient } from "@/api/admin/httpAdminPatient";
import { validateIdCard, validatePhone, parseTime } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      FormRules: {
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        avatarUrl: [
          { required: true, message: "请上传用户头像", trigger: "blur" },
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        idCard: [
          { required: true, trigger: "blur", validator: validateIdCard },
        ],
        type: [{ required: true, message: "请选择职位", trigger: "blur" }],
        address: [
          { required: true, message: "请输入家庭地址", trigger: "blur" },
        ],
        doctorUserId: [
          { required: true, message: "请选择对应医师", trigger: "blur" },
        ],
      },
      searchForm: {
        name: "",
        phone: "",
        idCard: "",
        gender: "",
        doctorInfoVO: "",
      },
      list: [],
      editAddForm: {
        name: "",
        avatarUrl: "",
        phone: "",
        idCard: "",
        address: "",
        doctorUserId: "",
      },
      // 医院列表
      hospitalList: [],
      // 医生类型列表
      doctorTypeList: [
        { id: 1, label: "医师", value: "PHYSICIAN" },
        { id: 2, label: "主治医师", value: "ATTENDING_PHYSICIAN" },
        { id: 3, label: "副主任医师", value: "ASSOCIATE_CHIEF_PHYSICIAN" },
        { id: 4, label: "主任医师", value: "CHIEF_PHYSICIAN" },
      ],
      // 转诊医生列表
      toDoctorList: [],
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
  mounted() {
    this.getTodoctorList();
  },
  methods: {
    getList() {
      httpAdminPatient
        .getPatient({
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          idCard: this.searchForm.idCard,
          gender: this.searchForm.gender,
          doctorName: this.searchForm.doctorName  ,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 获取转诊医生列表
    getTodoctorList() {
      httpAdminPatient.getPatientTransfer().then((res) => {
        console.log(res);
        this.toDoctorList = res.data.elements;
      });
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {};
      this.getList()
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
      httpAdminPatient.deleteDoctor(id).then((res) => {
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
    // 弹框开启
    openBounced() {},
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === "新增") {
            // 发送请求
            httpAdminPatient.postPatient(this.editAddForm).then((res) => {
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
            httpAdminPatient.putPatient(this.editAddForm).then((res) => {
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
