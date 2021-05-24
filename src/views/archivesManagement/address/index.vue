<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="用户姓名"
          align="left"
          prop="patientName">
          <el-input v-model="searchForm.patientName"
            size="small"
            placeholder="请输入用户姓名"></el-input>
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
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="left"
        type="index"
        label="序号"
        width="50"></el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="patientName"
        label="用户姓名">
      </el-table-column>
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="收货地址"
        prop="addressInfos">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            plain
            @click="examineBtn(scope.row)">查看收货地址</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- <el-table-column align="center"
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
      </el-table-column> -->
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
        label-width="110px">
        <el-form-item label="姓名"
          prop="name">
          <el-input v-model="editAddForm.name"
            placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话"
          prop="contract">
          <el-input v-model="editAddForm.contract"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="省"
          prop="address">
          <el-input v-model="editAddForm.address"
            placeholder="请输入省"></el-input>
        </el-form-item>
        <el-form-item label="市"
          prop="address">
          <el-input v-model="editAddForm.address"
            placeholder="请输入市"></el-input>
        </el-form-item>
        <el-form-item label="区"
          prop="address">
          <el-input v-model="editAddForm.address"
            placeholder="请输入区"></el-input>
        </el-form-item>
        <el-form-item label="详细地址"
          prop="address">
          <el-input v-model="editAddForm.address"
            placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看收货地址弹框 -->
    <el-dialog title="收货地址"
      :visible.sync="examineDialogVisible"
      width="40%"
      v-dialogDrag>
      <EleTable :data="addressList.addressInfos"
        :header="addressListtableHeader">
        <!-- 需要formatter的列 -->
        <el-table-column align="center"
          slot="fixed"
          fixed="right"
          label="收货地址"
          prop="addressInfos">
          <template slot-scope="scope">
            {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.detail}}
          </template>
        </el-table-column>
        <el-table-column align="center"
          slot="fixed"
          fixed="right"
          prop="isDefault"
          label="是否默认">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isDefault"
              @change="statusChange(scope.row)"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center"
          slot="fixed"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
              type="primary"
              @click="editBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </EleTable>
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
import { httpAdminAddressPatient } from "@/api/admin/httpAdminAddressPatient";
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
        hospitalClass: [
          { required: true, message: "请选择医院等级", trigger: "blur" },
        ],
      },
      // 搜索表单
      searchForm: {
        name: "",
        type: "",
      },
      // 列表数据
      list: [],
      addressList: {},
      // 增改表单
      editAddForm: {
        name: "",
        contract: "",
        address: "",
        hospitalClass: "",
      },
      // 表格数据
      tableHeaderBig: [],
      addressListtableHeader: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
      examineDialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      httpAdminAddressPatient
        .getAddressPatient({
          page: this.pageNum,
          pageSize: this.pageSize,
          id: this.searchInput,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 是否默认
    statusChange(val) {
      console.log(val);
      httpAdminAddressPatient.putAddressPatient(val).then((res) => {
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
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {},
    // 重置
    searchReset() {
      this.searchForm = {};
    },
    // 查看收货地址按钮
    examineBtn(val) {
      console.log(val);
      this.examineDialogVisible = true;
      this.addressList = val;
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
      httpAdminAddressPatient.deleteAddressPatient(id).then((res) => {
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
    getData() {},
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === "新增") {
            // 发送请求
            httpAdminAddressPatient
              .postAddressPatient(this.editAddForm)
              .then((res) => {
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
            httpAdminAddressPatient
              .putAddressPatient(this.editAddForm)
              .then((res) => {
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
    // 收货地址弹框区域
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

<style lang="scss" scoped>
.examineBtn {
  color: blue;
}
</style>