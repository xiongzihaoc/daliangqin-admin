<template>
  <div class="app-container">
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig">
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
    <!-- 增改页面 -->
    <el-dialog title="编辑"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="推荐更新版本">
          <el-select style="width:100%;"
            v-model="editAddForm.recommendUpdateAppId">
            <el-option v-for="item in versionList"
              :key="item.id"
              :label="item.versionString"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="强制更新版本">
          <el-select style="width:100%;"
            v-model="editAddForm.forceUpdateAppId">
            <el-option v-for="item in versionList"
              :key="item.id"
              :label="item.versionString"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最新版本">
          <el-select style="width:100%;"
            v-model="editAddForm.newestUpdateAppId">
            <el-option v-for="item in versionList"
              :key="item.id"
              :label="item.versionString"
              :value="item.id"></el-option>
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
import { httpAdminUpdateControl } from "@/api/admin/httpAdminUpdateControl";
import { httpAdminUpdateVersion } from "@/api/admin/httpAdminUpdateVersion";
import { formatterElement } from "@/utils/index";
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
      versionList: [],
      editAddForm: {
        recommendUpdateAppId: "",
        forceUpdateAppId: "",
        newestUpdateAppId: "",
      },
      tableHeaderBig: [
        { prop: "newestVersionString", label: "最新版本" },
        { prop: "recommendVersionString", label: "推荐更新版本" },
        { prop: "forceVersionString", label: "强制更新版本" },
        {
          prop: "appType",
          label: "app类型",
          formatter: (row) => {
            return this.appTypeFormatter(row);
          },
        },
        {
          prop: "deviceType",
          label: "设备类型",
          formatter: (row) => {
            return this.deviceTypeFormatter(row);
          },
        },
      ],
      //   弹框区域
      editDialogVisible: false,
      infoTitle: "",
    };
  },
  created() {
    this.getList();
    this.getVersionList();
  },
  methods: {
    getList() {
      httpAdminUpdateControl
        .getUpdateControl({
          page: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.list = res.data;
        });
    },
    // 弹框开启事件 获取版本列表
    getVersionList() {
      httpAdminUpdateVersion
        .getUpdateVersion({
          page: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.versionList = res.data.elements;
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
          httpAdminUpdateControl
            .putUpdateControl(this.editAddForm)
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
      });
    },
    /***** 表格格式化内容 *****/
    appTypeFormatter(row) {
      return formatterElement.appType[row.appType];
    },
    deviceTypeFormatter(row) {
      return formatterElement.deviceType[row.deviceType];
    },
  },
};
</script>

<style>
</style>
