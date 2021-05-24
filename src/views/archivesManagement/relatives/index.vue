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
          prop="userName">
          <el-input v-model="searchForm.userName"
            size="small"
            placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="亲属姓名"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.name"
            size="small"
            placeholder="请输入亲属姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份"
          prop="relationship">
          <el-select style="width: 100%"
            size="small"
            v-model="searchForm.relationship"
            placeholder="请选择身份">
            <el-option v-for="item in relationshipList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号"
          align="left"
          prop="userName">
          <el-input v-model="searchForm.phone"
            size="small"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            placeholder="请输入手机号"></el-input>
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
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        prop="relationship"
        label="身份">
        <template slot-scope="scope">
          <span v-if="scope.row.relationship === 'RELATIVE'">亲戚</span>
          <span v-if="scope.row.relationship === 'FRIENDS'">朋友</span>
          <span v-else>家属</span>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
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
          <el-input v-model="editAddForm.phone"></el-input>
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
import { httpAdminRelatives } from "@/api/admin/httpAdminRelatives";
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
        { prop: "userName", label: "用户姓名" },
        { prop: "name", label: "亲属姓名" },
        { prop: "phone", label: "手机号" },
      ],
      FormRules: {
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
      },
      editAddForm: {
        userName: "",
        name: "",
        phone: "",
        relationship: "",
      },
      // 关系列表
      relationshipList: [
        { id: 1, label: "家人", value: "FAMILY" },
        { id: 2, label: "朋友", value: "FRIENDS" },
        { id: 3, label: "亲戚", value: "RELATIVE" },
      ],
      // 搜索区域
      searchForm: {
        userName: "",
        name: "",
        phone: "",
        relationship: "",
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
      httpAdminRelatives
        .getRelatives({
          page: this.pageNum,
          pageSize: this.pageSize,
          userName: this.searchForm.userName,
          name: this.searchForm.name,
          phone: this.searchForm.phone,
          relationship: this.searchForm.relationship,
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
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          httpAdminRelatives
            .postSmsReset({ phone: this.editAddForm.phone })
            .then((res) => {
              console.log(res);
              this.$notify.success({
                title: "重置成功",
              });
              this.getList();
              this.editDialogVisible = false;
            });
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

<style scoped>
.search-box {
  margin-bottom: 10px;
}
.el-input-style {
  margin-right: 10px;
}
</style>
