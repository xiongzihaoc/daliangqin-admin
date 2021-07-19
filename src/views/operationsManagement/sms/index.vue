<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-input v-model="searchInput"
        class="el-input-style"
        type="text"
        size="small"
        v-Int
        placeholder="请输入手机号"
        @keyup.enter.native="searchBtn"></el-input>
      <el-button @click="searchBtn"
        type="primary"
        size="small"
        icon="el-icon-search">搜索</el-button>
      <el-button @click="searchReset"
        size="small"
        plain
        icon="el-icon-refresh">重置</el-button>
      <el-button size="small"
        type="warning"
        @click="resetBtn">短信重置</el-button>
    </div>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
    </EleTable>
    <!-- 分页 -->
    <el-pagination background @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="el-pagination-style"></el-pagination>
    <!-- 增改页面 -->
    <el-dialog title="短信重置"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item prop="phone"
          label="手机号">
          <el-input v-model="editAddForm.phone"
            v-Int></el-input>
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
import { httpAdminSms } from "@/api/admin/httpAdminSms";
import { validatePhone, parseTime } from "@/utils/index";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      parseTime,
      searchInput: "",
      editDialogVisible: false,
      // 列表数据
      list: [],
      tableHeaderBig: [
        { label: "序号", type: "index" },
        { prop: "phone", label: "手机号" },
        {
          prop: "content",
          label: "内容",
          // formatter: (row) => {
          //   return this.typeFormatter(row);
          // },
        },
        { prop: "howMany", label: "剩余次数" },
        {
          prop: "createTime",
          label: "发送时间",
          formatter: (row) => {
            return parseTime(row.createTime);
          },
        },
      ],
      FormRules: {
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
      },
      editAddForm: {
        phone: "",
      },
      // 分页数据
      pageSize: 10,
      pageNum: 1,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      httpAdminSms
        .getSms({
          page: this.pageNum,
          pageSize: this.pageSize,
          phone: this.searchInput,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data.elements;
          this.total = res.data.totalSize;
        });
    },
    // 搜索
    searchBtn(val) {
      this.getList();
    },
    // 搜索条件重置
    searchReset() {
      this.searchInput = "";
      this.getList();
    },
    // 短信重置
    resetBtn() {
      this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          httpAdminSms
            .postSmsReset({ phone: this.editAddForm.phone })
            .then((res) => {
              if (res.code === "OK") {
                this.$notify.success({
                  title: "重置成功",
                });
                this.getList();
                this.editDialogVisible = false;
              }
            });
        }
      });
    },
    /***** 表格格式化内容 *****/
    typeFormatter(row) {
      if (row.type === "LOGIN") {
        return "登录";
      } else {
        return "其他";
      }
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

<style scoped>
.search-box {
  margin-bottom: 10px;
}
.el-input-style {
  margin-right: 10px;
}
</style>
