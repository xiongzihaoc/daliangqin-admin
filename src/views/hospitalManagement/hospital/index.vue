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
            <el-option v-for="item in hospitalClassList"
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

        <el-form-item label="省"
          prop="province">
          <el-select style="width:100%;"
            v-model="editAddForm.province"
            @change="selectProvince"
            placeholder="请选择省">
            <el-option v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市"
          prop="city">
          <el-select style="width:100%;"
            v-model="editAddForm.city"
            @change="selectCity"
            placeholder="请选择市">
            <el-option v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区"
          prop="area">
          <el-select style="width:100%;"
            v-model="editAddForm.area"
            placeholder="请选择区">
            <el-option v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址"
          prop="detail">
          <el-input v-model="editAddForm.detail"
            placeholder="请输入医院地址"></el-input>
        </el-form-item>
        <el-form-item label="医院等级"
          prop="hospitalType">
          <el-select v-model="editAddForm.hospitalType"
            placeholder="请选择医院等级"
            style="width: 100%">
            <el-option v-for="item in hospitalClassList"
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
import { httpAdminHospital } from "@/api/admin/httpAdminHospital";
import { httpPublicDistrictProvince } from "@/api/public/httpPublicDistrictProvince";
import {
  validatePhone,
  hospitalClassList,
  formatterElement,
} from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      hospitalClassList,
      // 表单验证规则
      FormRules: {
        adminPhone: [
          { required: true, trigger: "blur", validator: validatePhone },
        ],
        name: [{ required: true, message: "请输入医院名称", trigger: "blur" }],
        contract: [
          { required: true, message: "请输入医院电话", trigger: "blur" },
        ],
        province: [{ required: true, message: "请选择省", trigger: "blur" }],
        city: [{ required: true, message: "请选择市", trigger: "blur" }],
        area: [{ required: true, message: "请选择区", trigger: "blur" }],
        detail: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
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
      // 省市区列表
      provinceList: [],
      cityList: [],
      areaList: [],
      // 增改表单
      editAddForm: {
        name: "",
        contract: "",
        hospitalType: "",
        provinceAdCode: "",
        cityAdCode: "",
        areaAdCode: "",
        detail: "",
      },
      // 表格数据
      tableHeaderBig: [
        { type: "index", label: "序号" },
        { prop: "name", label: "医院名称" },
        { prop: "avatarUrl", label: "医院头像" },
        { prop: "contract", label: "医院电话" },
        {
          prop: "address",
          label: "医院地址",
          formatter: (row) => {
            return this.addressFormatter(row);
          },
        },
        {
          prop: "hospitalType",
          label: "医院等级",
          formatter: (row) => {
            return this.hospitalTypeFormatter(row);
          },
        },
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
  mounted() {
    this.getProvinceList();
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
    // 获取省列表
    getProvinceList() {
      httpPublicDistrictProvince.getProvince().then((res) => {
        this.provinceList = res.data;
      });
    },
    // 获取市列表
    getCityList(id) {
      httpPublicDistrictProvince.getArea({ id: id }).then((res) => {
        this.cityList = res.data;
      });
    },
    // 获取区列表
    getAreaList(id) {
      httpPublicDistrictProvince.getArea({ id: id }).then((res) => {
        this.areaList = res.data;
      });
    },
    // 选择省加载下一级数据
    selectProvince(id) {
      this.editAddForm.city = "";
      this.editAddForm.area = "";
      this.areaList = [];
      this.getCityList(id);
    },
    selectCity(id) {
      this.editAddForm.area = "";
      this.getAreaList(id);
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
        if (res.code === "OK") {
          this.$notify.success({
            title: "删除成功",
          });
          this.getList();
        }
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
              if (res.code === "OK") {
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
    hospitalTypeFormatter(row) {
      return formatterElement.hospitalType[row.hospitalType];
    },
    addressFormatter(row) {
      return row.province + row.area + row.city + row.detail;
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