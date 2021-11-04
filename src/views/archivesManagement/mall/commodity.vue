<template>
  <div class="app-container">
    <!-- <h1>积分商品</h1> -->
    <div class="search-box">
      <el-form class="searchForm" :inline="true">
        <el-form-item label="商品标题">
          <el-input placeholder="请输入商品标题" size="small"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.shop" size="small">
            <el-option label="规格" value="规格"> </el-option>
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
    <div>
      <el-button
        type="primary"
        size="small"
        plain
        class="tableAdd"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        >添加任务</el-button
      >
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
        label="商品名称"
        prop="name"
      ></el-table-column>
      <el-table-column align="center" label="商品图片" prop="goodsIcons">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.goodsIcons[0]" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="商品原价"
        prop="price"
      ></el-table-column>
      <el-table-column
        align="center"
        label="所需积分"
        prop="integral"
      ></el-table-column>
      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="SHOW"
            inactive-value="DELETE"
            @change="goodsState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <div>
            <!-- <el-button size="small" @click="sortGoods(scope.row)">排序</el-button> -->
            <el-button size="mini" type="primary" @click="editGoods(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger">删除</el-button>
            <el-button
              size="mini"
              plain
              icon="el-icon-top"
              @click="sortGoods(scope.row.id, 'UP')"
            ></el-button>
            <el-button
              size="mini"
              plain
              icon="el-icon-bottom"
              @click="sortGoods(scope.row.id, 'DOWN')"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="100px"
      >
        <el-form-item label="商品名称:" prop="name">
          <el-input
            v-model="goodsForm.name"
            placeholder="请输入商品名称"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input
            v-model="goodsForm.remark"
            placeholder="请输入商品描述"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品图片:" prop="icons">
          <div class="img flex-align">
            <img
              v-for="(item, idx) in goodsForm.icons"
              :key="idx"
              :src="item"
            />
            <Upload uploadType="BANNER" @input="getImg"></Upload>
          </div>
          <div class="flex-align" style="margin: 10px 0">
            <el-button size="small" type="danger" plain @click="deleteImg"
              >删 除</el-button
            >
            <el-button size="small" type="primary" plain>添 加</el-button>
          </div>
        </el-form-item>
        <el-form-item label="商品规格:">
          <el-input
            v-model="goodsForm.specification"
            placeholder="请输入商品规格"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品sku:">
          <div style="width: 20vw" class="flex-align">
            <el-input
              v-model="goodsForm.skus[0]"
              placeholder="请输入商品sku"
              maxlength="6"
            ></el-input>
            <div style="margin: 0 20px" class="flex-align">
              <el-button size="small" type="danger" plain @click="deleteSkus"
                >删 除</el-button
              >
              <el-button size="small" type="primary" plain @click="addSkus"
                >添 加</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品sku:" v-for="(item, idx) in skuArr" :key="idx">
          <div style="width: 12vw" class="flex-align">
            <el-input
              v-model="skuArr[idx]"
              placeholder="请输入商品sku"
              maxlength="6"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="商品原价:" prop="price">
          <el-input
            v-model="goodsForm.price"
            placeholder="请输入商品原价"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="所需积分:" prop="integral">
          <el-input
            v-model="goodsForm.integral"
            placeholder="请输入所需积分"
            maxlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="图文详情:">
          <el-input
            v-model="goodsForm.detail"
            rows="10"
            type="textarea"
            placeholder="请输入图文详情"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio v-model="goodsForm.status" label="SHOW">显示</el-radio>
          <el-radio v-model="goodsForm.status" label="DELETE">隐藏</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="affirmbtn('goodsForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'
import Upload from '@/components/Upload'
import { parseTime, AiTaskStatus, formatterElement } from '@/utils/index'
import { httpAdminGoods } from '@/api/admin/httpAdminGoods'

export default {
  components: {
    EleTable,
    Upload,
  },
  data() {
    return {
      parseTime,
      title: '添加商品',
      searchForm: {},
      goodsForm: {
        name: '',
        remark: '',
        icons: [],
        specification: '',
        skus: [],
        price: '',
        integral: '',
        detail: '',
      },
      skuArr: [],
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹出层
      dialogVisible: false,
      // 表单验证
      rules: {
        name: { required: true, message: '请输入商品名称', trigger: 'blur' },
        icons: { required: true, message: '请选择商品图片', trigger: 'blur' },
        price: { required: true, message: '请输入商品价格', trigger: 'blur' },
        integral: {
          required: true,
          message: '请输入商品所需积分',
          trigger: 'blur',
        },
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminGoods.getGoods(this.goodsForm).then((res) => {
        console.log(res)
        this.list = res.data.elements
        this.total = res.data.totalSize
      })
    },
    addGoods() {
      this.goodsForm.skus = this.goodsForm.skus.concat(this.skuArr)
      console.log(this.goodsForm)
      httpAdminGoods.postGoods(this.goodsForm).then((res) => {
        console.log(res)
        if (res.code === 'OK') {
          this.$message.success('添加成功')
        }
      })
    },
    sortGoods(id,status) {
      httpAdminGoods.putGoodsSort({id, status}).then((res) => {
        if(res.data.code === 'OK'){
          this.$message.success('操作成功')
        }
      })
    },
    /**
     * 添加商品 确认
     */
    affirmbtn(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addGoods()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * skus添加 删除
     */
    addSkus() {
      this.skuArr.push('')
    },
    deleteSkus() {
      this.skuArr.pop()
    },
    /**
     * 上传图片
     */
    getImg(val) {
      this.goodsForm.icons.push(val)
    },
    deleteImg() {
      this.goodsForm.icons.pop()
    },
    /**
     *  商品状态
     */
    goodsState(val) {
      console.log(val)
      httpAdminGoods
        .putGoodsStatus({ id: val.id, status: val.status })
        .then((res) => {
          console.log(res)
          if(res.data.code === 'OK'){
            this.$message.success('操作成功')
            this.getList()
          }
        })
    },
    /**
     * 编辑商品信息
     */
    editGoods(val) {
      this.dialogVisible = true
      this.title = '编辑商品'
      console.log(val);
    },
    /**
     * 搜索
     */
    searchBtn() {},
    searchReset() {},
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
.flex-align {
  display: flex;
  align-items: center;
}
img {
  height: 80px;
  margin: 0 10px;
}
</style>