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
        </template>
      </el-table-column>
    </EleTable>
    <!-- 增改页面 -->
    <el-dialog
      :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @open="getData"
      @closed="editDialogClosed"
      v-dialogDrag
    >
      <!-- :rules="loginRules" -->
      <el-form ref="FormRef" :model="editAddForm" label-width="100px">
        <el-form-item label="版本号" prop="versionString">
          <el-input v-model="editAddForm.versionString"></el-input>
        </el-form-item>
        <el-form-item label="更新日志" prop="updateLog">
          <el-input v-model="editAddForm.updateLog"></el-input>
        </el-form-item>
        <el-form-item label="安装包地址" prop="url">
          <el-input v-model="editAddForm.url"></el-input>
        </el-form-item>
        <el-form-item label="app类型" prop="appType">
          <el-select
            v-model="editAddForm.appType"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in appTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceType">
          <el-select
            v-model="editAddForm.deviceType"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in deviceTypeList"
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
import { list, add, edit, deleteE } from "@/api/appVersionControl";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      loginRules: [],
      searchInput: "",
      list: [],
      // app类型
      appTypeList: [
        { id: 1, label: "DOCTOR", value: "DOCTOR" },
        { id: 2, label: "PATIENT", value: "PATIENT" },
      ],
      // 设备类型
      deviceTypeList: [
        { id: 1, label: "ANDROID", value: "ANDROID" },
        { id: 2, label: "IOS", value: "IOS" },
        { id: 3, label: "H5", value: "H5" },
        { id: 4, label: "PC_WEB", value: "PC_WEB" },
      ],
      // 表头数据
      tableHeaderBig: [
        // { prop: "id", label: "id" },
        { prop: "appType", label: "app类型" },
        { prop: "deviceType", label: "设备类型" },
        { prop: "forceUpdateAppId", label: "强制更新版本" },
        { prop: "newestUpdateAppId", label: "最新版本" },
        { prop: "recommendUpdateAppId", label: "推荐更新版本" },
        { prop: "updateTime", label: "更新时间" },
      ],
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
      editAddForm: {
        appType: "",
        deviceType: "",
        forceUpdateAppId: "",
        newestUpdateAppId: "",
        recommendUpdateAppId: "",
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      list().then((res) => {
        console.log(res);
        this.list = res.data;
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
    editBtn(val) {
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
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
  },
};
</script>

<style>
</style>
