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
        @click="taskOperate"
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
      <el-table-column align="center" label="商品名称"></el-table-column>
      <el-table-column align="center" label="商品原件"></el-table-column>
      <el-table-column align="center" label="所需积分"></el-table-column>
      <el-table-column align="center" label="状态"></el-table-column>
      <el-table-column align="center" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作"></el-table-column>
    </EleTable>
    <!-- 弹框 -->
    <el-dialog title="任务操作" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="80px">
        <el-form-item label="商品名称:">
          <el-input v-model="taskForm.text" placeholder="请输入商品名称" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input v-model="taskForm.text" placeholder="请输入商品名称" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="商品图片:">
          <div class="flex-align">
            <el-upload
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
           </el-upload>
            <div style="margin: 0 20px">
              <el-button type="danger" >删 除</el-button>
              <el-button type="success" >添 加</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品规格:">
          <el-input v-model="taskForm.text" placeholder="请输入商品规格" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="商品sku:">
          <div style="width: 20vw;" class="flex-align">
            <el-input v-model="taskForm.text" placeholder="请输入商品规格" maxlength="6" ></el-input>
            <div style="margin: 0 20px" class="flex-align">
              <el-button type="danger" >删 除</el-button>
              <el-button type="success" >添 加</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品sku:">
          <div style="width: 12vw;" class="flex-align">
            <el-input v-model="taskForm.text" placeholder="请输入商品规格" maxlength="6" ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="商品原价:">
            <el-input v-model="taskForm.text" placeholder="请输入商品规格" maxlength="6" ></el-input>
        </el-form-item>
        <el-form-item label="所需积分:">
            <el-input v-model="taskForm.text" placeholder="请输入商品规格" maxlength="6" ></el-input>
        </el-form-item>
        <el-form-item label="图文详情:">
            <el-input v-model="taskForm.text" rows="10"  type="textarea" placeholder="请输入商品规格"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio v-model="taskForm.radio" label="1">显示</el-radio>
          <el-radio v-model="taskForm.radio" label="2">隐藏</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import EleTable from '@/components/Table'

export default {
  components: {
    EleTable,
  },
  data() {
    return {
      searchForm: {},
      taskForm: {
        radio: '1',
      },
      list: [],
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹出层
      dialogVisible: false  ,
    }
  },
  methods: {
    getList() {},
    /**
     * 任务操作
     */
    taskOperate() {
      console.log('object');
      this.dialogVisible = true
    },
    /** 
     * 上传图片
    */
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        // this.dialogImageUrl = file.url;
        // this.dialogVisible = true;
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
.flex-align{
  display: flex;
  align-items: center;
}
</style>