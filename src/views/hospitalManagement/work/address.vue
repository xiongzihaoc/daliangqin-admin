<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="医生姓名"
          align="left"
          prop="doctorName">
          <el-input v-model="searchForm.doctorName"
            size="small"
            placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="医生手机号"
          align="left"
          prop="doctorPhone">
          <el-input v-model="searchForm.doctorPhone"
            v-Int
            size="small"
            maxlength="11"
            placeholder="请输入医生手机号"></el-input>
        </el-form-item>
        <el-form-item label="职位"
          align="left"
          prop="doctorType">
          <el-select v-model="searchForm.doctorType"
            size="small"
            placeholder="请选择职位">
            <el-option v-for="item in doctorTypeList"
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
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <!-- 需要formatter的列 -->
      <el-table-column align="center"
        slot="fixed"
        fixed="right"
        label="收货地址"
        prop="addressInfos">
        <template slot-scope="scope">
          <el-button size="mini"
            type="info"
            plain
            @click="examineBtn(scope.row)">查看收货地址</el-button>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 增改页面 -->
    <!-- 查看收货地址 -->
    <el-dialog title="收货地址"
      :visible.sync="examineDialogVisible"
      width="40%"
      v-dialogDrag>
      <!-- 表格 -->
      <el-table :data="addressList"
        style="width: 100%">
        <!-- 需要formatter的列 -->
        <el-table-column align="center"
          label="收货人姓名"
          prop="name">
        </el-table-column>
        <el-table-column align="center"
          label="收货人电话"
          prop="phone">
        </el-table-column>
        <el-table-column align="center"
          label="收货地址"
          show-overflow-tooltip
          :formatter="addressInfosFormatter"
          prop="addressInfos">
        </el-table-column>
        <el-table-column align="center"
          prop="isDefault"
          label="是否默认">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isDefault"
              @change="statusChange(scope.row)"
              :active-value="true"
              :disabled="scope.row.isDefault"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
              type="primary"
              @click="editBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="examineDialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="examineDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑收货地址 -->
    <el-dialog title="编辑"
      :visible.sync="editDialogVisible"
      width="40%"
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
          prop="phone">
          <el-input v-model="editAddForm.phone"
            v-Int
            placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="省市区"
          prop="address">
          <el-cascader style="width:100%"
            v-model="editAddForm.address"
            :options="addressJson"
            :props="cateListProps"
            @change="selectAddrssChange"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"
          prop="detail">
          <el-input v-model="editAddForm.detail"
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
  </div>
</template>
<script>
import EleTable from '@/components/Untable'
import addressJson from '@/utils/address.json'
import { httpAdminAddressDoctor } from '@/api/admin/httpAdminAddressDoctor'
import { validatePhone, doctorTypeList, formatterElement } from '@/utils/index'
export default {
  components: {
    EleTable,
  },
  data() {
    return {
      addressJson,
      doctorTypeList,
      // 表单验证规则
      FormRules: {
        name: [
          { required: true, message: '请输入收货人名字', trigger: 'blur' },
        ],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        address: [{ required: true, message: '请选择省市区', trigger: 'blur' }],
        detail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
      },
      // 搜索表单
      searchForm: {
        doctorName: '',
        doctorType: '',
        doctorPhone: '',
      },
      userId: '',
      // 列表数据
      list: [],
      addressList: [],
      // 级联配置
      cateListProps: {
        value: 'name', //匹配响应数据中的id
        label: 'name', //匹配响应数据中的name
        children: 'districts', //匹配响应数据中的children
      },
      // 增改表单
      editAddForm: {
        name: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        address: [],
        isDefault: false,
        detail: '',
        userId: '',
      },
      // 表格数据
      tableHeaderBig: [
        { type: 'index', label: '序号' },
        { prop: 'doctorName', label: '医生姓名' },
        { prop: 'doctorPhone', label: '医生手机号' },
        {
          prop: 'doctorType',
          label: '职位',
          formatter: (row) => {
            return this.doctorTypeFormatter(row)
          },
        },
      ],
      patientName: '',
      patientUserId: '',
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      examineDialogVisible: false,
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getTreeData(addressJson)
  },
  methods: {
    getList() {
      httpAdminAddressDoctor
        .getAddressDoctor({
          page: this.pageNum,
          pageSize: this.pageSize,
          doctorName: this.searchForm.doctorName,
          doctorType: this.searchForm.doctorType,
          doctorPhone: this.searchForm.doctorPhone,
        })
        .then((res) => {
          console.log(res)
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 获取第一个弹框的表格数据
    getEditList() {
      httpAdminAddressDoctor
        .getAddressDetail({ userId: this.userId })
        .then((res) => {
          console.log(res)
          this.addressList = res.data.elements
        })
    },
    // 是否默认
    statusChange(id) {
      httpAdminAddressDoctor.putAddressDefault(id).then((res) => {
        console.log(res)
        if (res.code === 'OK') {
          this.$message.success('操作成功')
          this.getEditList()
          this.getList()
        }
      })
    },
    selectAddrssChange(val) {
      console.log(val)
      this.editAddForm.province = val[0]
      this.editAddForm.city = val[1]
      this.editAddForm.area = val[2]
    },
    // 递归处理json文件的最后一级
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].districts.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].districts = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].districts)
        }
      }
      return data
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    // 重置
    searchReset() {
      this.pageNum = 1
      this.searchForm = {}
      this.getList()
    },
    /***** 增删改 *****/
    // 查看收货地址按钮
    examineBtn(val) {
      this.userId = val.doctorUserId
      this.getEditList()
      this.examineDialogVisible = true
    },
    // 编辑
    editBtn(val) {
      this.editAddForm = JSON.parse(JSON.stringify(val))
      this.editAddForm.address = [
        this.editAddForm.province,
        this.editAddForm.city,
        this.editAddForm.area,
      ]
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    // 编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 发送请求
          httpAdminAddressDoctor.putAddress(this.editAddForm).then((res) => {
            if (res.code === 'OK') {
              this.$message.success('编辑成功')
              this.getList()
              this.getEditList()
              this.editDialogVisible = false
            }
          })
        }
      })
    },
    /***** 表格格式化内容 *****/
    doctorTypeFormatter(row) {
      return formatterElement.doctorType[row.doctorType]
    },
    addressInfosFormatter(row) {
      return row.province + row.city + row.area + row.detail
    },
    /***** 分页 *****/
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
.examineBtn {
  color: blue;
}
</style>