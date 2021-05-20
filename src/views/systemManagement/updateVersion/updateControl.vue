<template>
  <div class="app-container">
    <!-- 表格区域 -->
    <EleTable :data="list" :header="tableHeaderBig">
      <!-- 需要formatter的列 -->
      <el-table-column
        align="center"
        slot="fixed"
        fixed="right"
        label="app类型"
        prop="appType"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.appType === 'DOCTOR'">医生端</span>
          <span v-else>用户端</span>
        </template>
      </el-table-column>
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
      @closed="editDialogClosed"
      v-dialogDrag
    >
      <el-form
        ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px"
      >
        <el-form-item label="推荐更新版本">
          <el-input v-model="editAddForm.recommendUpdateAppId"></el-input>
        </el-form-item>
        <el-form-item label="强制更新版本">
          <el-input v-model="editAddForm.forceUpdateAppId"></el-input>
        </el-form-item>
        <el-form-item label="最新版本">
          <el-input v-model="editAddForm.newestUpdateAppId"></el-input>
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
import EleTable from "@/components/Table";
import { httpUpdateControl } from "@/api/admin/httpUpdateControl";
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      FormRules: {
        name: [{ required: true, message: "请输入医生姓名", trigger: "blur" }],
      },
      list: [],
      editAddForm: {
        recommendUpdateAppId: "",
        forceUpdateAppId: "",
        newestUpdateAppId: "",
      },
      tableHeaderBig: [
        { prop: "newestVersionString", label: "最新版本" },
        { prop: "recommendVersionString", label: "推荐更新版本" },
        { prop: "forceVersionString", label: "强制更新版本" },
      ],
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      httpUpdateControl
        .list({
          page: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data;
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
    // 编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 发送请求
          httpUpdateControl.edit(this.editAddForm).then((res) => {
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
