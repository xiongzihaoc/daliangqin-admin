<template>
  <div class="app-container">
    <!-- 表格区域 -->
    <EleTable :data="list" :header="tableHeaderBig">
      <!-- 需要formatter的列 -->
      <el-table-column
        align="center"
        slot="fixed"
        fixed="right"
        prop="name"
        label="添加时间"
      ></el-table-column>
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
      title="编辑"
      :visible.sync="editDialogVisible"
      width="40%"
      @open="getData"
      @closed="editDialogClosed"
      v-dialogDrag
    >
      <el-form
        ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px"
      >
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPageEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from "@/components/Table";
import { list, edit } from "@/api/admin/adminRole";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      FormRules: {
        name: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
        avatarUrl: [{ required: true, message: "请上传头像", trigger: "blur" }],
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
      tableHeaderBig: [
        { prop: "name", label: "姓名" },
        { prop: "phone", label: "手机号" },
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
    /***** CRUD *****/
    // 编辑
    editBtn(val) {
      console.log(val);
      this.infoTitle = "编辑";
      this.editAddForm = JSON.parse(JSON.stringify(val));
      this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields();
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
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

          this.editDialogVisible = false;
        }
      });
    },
  },
};
</script>

<style>
</style>
