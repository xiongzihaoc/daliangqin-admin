<template>
  <div class="app-container">
    <div class="search-box">
      <el-form class="searchForm" :inline="true">
        <el-form-item label="医院名称">
          <el-select v-model="searchForm.shop" size="small">
            <el-option
              v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生姓名">
          <el-input placeholder="请输入医生姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input placeholder="请输入用户手机号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input placeholder="请输入订单编号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" size="small">
            <el-option
              v-for="item in ordeStatus"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="searchBtn"
            type="primary"
            size="small"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            @click="searchReset"
            size="small"
            plain
            icon="el-icon-refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <EleTable
      :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医院名称"
        prop="hospitalName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="医师姓名"
        prop="doctorName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户姓名"
        prop="userName"
      ></el-table-column>
      <el-table-column align="center" label="年龄" prop="age"></el-table-column>
      <el-table-column
        align="center"
        label="用户手机号"
        prop="phone"
      ></el-table-column>
      <el-table-column
        align="center"
        label="订单编号"
        prop="tradeNo"
        width="150"
      ></el-table-column>
      <el-table-column
        align="center"
        label="收获地址"
        prop="userAddress"
      ></el-table-column>
      <el-table-column
        align="center"
        label="商品名称"
        prop="goodsName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="商品图片"
        prop="goodsIcon"
        width="150"
      >
        <template slot-scope="scope">
          <img class="goodsIcon" :src="scope.row.goodsIcon" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="商品规格"
        prop="goodsSku"
      ></el-table-column>
      <el-table-column
        align="center"
        label="积分数"
        prop="integral"
      ></el-table-column>
      <el-table-column
        align="center"
        label="订单状态"
        prop="status"
        :formatter="statusFormatter"
      ></el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货时间" prop="deliveryTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deliveryTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发货备注"
        prop="deliveryRemark"
      ></el-table-column>
      <el-table-column align="center" label="收货时间" prop="confirmTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.confirmTimes) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="deliveryBtn(scope.row)"
              >发货</el-button
            >
            <el-button size="mini" @click="ordeRemark(scope.row)"
              >订单备注</el-button
            >
          </div>
        </template>
      </el-table-column>
    </EleTable>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form
        label-width="100px"
        :model="deliveryForm"
        :rules="rules"
        ref="deliveryForm"
      >
        <el-form-item label="备注:" prop="remark">
          <el-input
            v-model="deliveryForm.remark"
            type="textarea"
            rows="3"
            maxlength="120"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrder()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import { ordeStatus, parseTime, formatterElement } from '@/utils/index'
import { httpAdminOrder } from '@/api/admin/httpAdminOrder'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      ordeStatus,
      parseTime,
      title: '发货备注',
      searchForm: {},
      deliveryForm: {
        id: '', // 商品id
        remark: '',
      },
      list: [],
      hospitalList: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹窗
      dialogVisible: false,
      // 表单验证
      rules: {
        remark: { required: true, message: '请输入备注', trigger: 'blur' },
      },
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getHospitalList()
  },
  methods: {
    getList() {
      httpAdminOrder.getOrder().then((res) => {
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    // 发货备注
    orderDelivery() {
      console.log(this.deliveryForm)
      httpAdminOrder.postOrderDelivery(this.deliveryForm).then((res) => {
        if (res.code == 'OK') {
          this.$message.success('操作成功')
          this.getList()
        }
      })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: -1 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 订单备注
    putOrderRemark() {
      console.log('订单备注', this.deliveryForm)
      httpAdminOrder.putOrder(this.deliveryForm).then((res) => {
        if (res.code == 'OK') {
          this.$message.success('操作成功')
          this.dialogVisible = false
        }
      })
    },
    addOrder() {
      if (this.title === '发货备注') {
        this.orderDelivery()
      } else {
        this.putOrderRemark()
      }
    },
    /**
     * 列表操作
     */
    deliveryBtn(val) {
      this.title = '发货备注'
      this.rules = {
        remark: { required: true, message: '请输入备注', trigger: 'change' },
      }
      this.deliveryForm.id = val.id
      this.dialogVisible = true
    },
    ordeRemark(val) {
      this.title = '订单备注'
      this.rules = {}
      this.deliveryForm.id = val.id
      this.dialogVisible = true
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.getList()
    },
    searchReset() {
      this.searchForm = {}
      this.getList()
    },
    /**
     * 表格格式化
     */
    statusFormatter(row) {
      return formatterElement.goodsOrde[row.status]
    },
    /**
     * 分页
     */
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
.goodsIcon {
  width: 80px;
}
</style>
