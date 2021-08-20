<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form ref="searchFormRef"
        :model="searchForm"
        class="searchForm"
        :inline="true">
        <el-form-item label="标题"
          align="left"
          prop="title">
          <el-input v-model="searchForm.title"
            size="small"
            placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容类型"
          prop="contentType">
          <el-select v-model="searchForm.contentType"
            size="small"
            placeholder="请选择内容类型">
            <el-option v-for="item in newsTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态"
          prop="deletedStatus">
          <el-select style="width: 100%"
            v-model="searchForm.deletedStatus"
            size="small"
            placeholder="请选择状态">
            <el-option v-for="item in newsStatusList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-debounce="[searchBtn]"
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
    <el-button @click="addBtn"
      type="primary"
      class="tableAdd"
      size="small"
      plain
      icon="el-icon-plus">新增</el-button>
    <!-- 表格区域 -->
    <EleTable :data="list"
      :header="tableHeaderBig"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
      <el-table-column align="center"
        type="index"
        label="序号"></el-table-column>
      <el-table-column align="center"
        prop="title"
        label="标题"></el-table-column>
      <el-table-column align="center"
        :formatter="contentTypeFormatter"
        prop="contentType"
        label="内容类型"></el-table-column>
      <el-table-column align="center"
        prop="coverUrl"
        label="封面图">
        <template slot-scope="scope">
          <img class="tableImg"
            :src="scope.row.coverUrl" />
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="createTime"
        label="创建时间"
        :formatter="createTimeFormatter">
      </el-table-column>
      <el-table-column align="center"
        prop="userName"
        label="创建人">
      </el-table-column>
      <el-table-column align="center"
        prop="publishTime"
        label="发布时间"
        :formatter="publishTimeFormatter">
      </el-table-column>
      <el-table-column align="center"
        prop="appTypes"
        label="呈现位置">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.appTypes"
            :key="index">
            <span v-if="item === 'PATIENT'">用户端 </span>
            <span v-else>医生端 </span>
          </span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column align="center"
        prop="deletedStatus"
        label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.deletedStatus"
            @change="statusChange(scope.row)"
            active-value="SHOW"
            inactive-value="DELETE"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center"
        label="操作"
        width="320">
        <template slot-scope="scope">
          <el-button size="mini"
            type="primary"
            @click="editBtn(scope.row)">编辑</el-button>
          <el-button size="mini"
            type="danger"
            @click="deleteBtn(scope.row.id)">删除</el-button>
          <el-button size="mini"
            plain
            icon="el-icon-top"
            @click="sortTop(scope.row.id)"></el-button>
          <el-button size="mini"
            plain
            icon="el-icon-bottom"
            @click="sortBottom(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 增改页面 -->
    <el-dialog :title="infoTitle"
      :visible.sync="editDialogVisible"
      width="40%"
      @closed="editDialogClosed"
      v-dialogDrag>
      <el-form ref="FormRef"
        :rules="FormRules"
        :model="editAddForm"
        label-width="100px">
        <el-form-item label="内容类型"
          prop="contentType">
          <el-select style="width: 100%"
            v-model="editAddForm.contentType"
            placeholder="请选择内容类型">
            <el-option v-for="item in newsTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题"
          prop="title">
          <el-input v-model.trim="editAddForm.title"
            placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面图"
          prop="coverUrl">
          <single-upload v-model="editAddForm.coverUrl"
            uploadType="NEWS" />
        </el-form-item>
        <el-form-item label="类型"
          prop="type">
          <el-select style="width: 100%"
            v-model.trim="editAddForm.type"
            placeholder="请选择类型">
            <el-option label="富文本"
              value="LONG_TEXT"></el-option>
            <el-option label="url地址"
              value="URL"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="url地址"
          prop="content"
          v-if="editAddForm.type === 'URL'">
          <el-input v-model.trim="editAddForm.content"
            placeholder="请输入url地址"></el-input>
        </el-form-item>
        <el-form-item label="详情"
          prop="content"
          v-if="editAddForm.type === 'LONG_TEXT'">
          <quill-editor v-model="editAddForm.content"
            ref="myQuillEditor"
            class="ql-editor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="呈现位置"
          prop="appTypes">
          <el-select style="width: 100%"
            multiple
            v-model="editAddForm.appTypes"
            placeholder="请选择呈现位置">
            <el-option v-for="item in appTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布人"
          prop="author"
          v-if="editAddForm.type === 'LONG_TEXT'">
          <el-input v-model="editAddForm.author"
            placeholder="请输入发布人"></el-input>
        </el-form-item>
        <el-form-item label="发布人头像"
          prop="avatarUrl"
          v-if="editAddForm.type === 'LONG_TEXT'">
          <single-upload v-model="editAddForm.avatarUrl"
            uploadType="AVATAR" />
        </el-form-item>

        <el-form-item label="发布人职位"
          prop="position"
          v-if="editAddForm.type === 'LONG_TEXT'">
          <el-input v-model="editAddForm.position"
            placeholder="请输入发布职位"></el-input>
        </el-form-item>
        <!-- 问卷选择暂时搁置 -->
        <el-form-item label="发布时间"
          prop="publishTime">
          <el-date-picker v-model="editAddForm.publishTime"
            style="width: 100%"
            type="date"
            placeholder="选择日期时间"
            value-format="timestamp"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="权重"
          prop="zOrder">
          <el-input v-Int
            v-model.trim="editAddForm.zOrder"
            placeholder="请输入权重"></el-input>
        </el-form-item>
        <el-form-item label="状态"
          prop="deletedStatus">
          <el-select style="width: 100%"
            v-model="editAddForm.deletedStatus"
            placeholder="请选择状态">
            <el-option v-for="item in newsStatusList"
              :key="item.id"
              :label="item.label"
              :value="item.value"></el-option>
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
import EleTable from '@/components/Table'
import singleUpload from '@/components/Upload'
import { httpAdminNews } from '@/api/admin/httpAdminNews'
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import * as Quill from 'quill' //引入编辑器
import resizeImage from 'quill-image-resize-module' // 图片缩放组件。
import { ImageDrop } from 'quill-image-drop-module' // 图片拖动组件。
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/resizeImage ', resizeImage)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
import {
  parseTime,
  formatterElement,
  newsTypeList,
  newsStatusList,
  appTypeList,
} from '@/utils/index'
export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      parseTime,
      newsTypeList,
      newsStatusList,
      appTypeList,
      FormRules: {
        contentType: [
          { required: true, message: '请选择内容类型', trigger: 'blur' },
        ],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        coverUrl: [
          { required: true, message: '请上传封面图', trigger: 'blur' },
        ],
        avatarUrl: [{ required: true, message: '请上传头像', trigger: 'blur' }],
        appTypes: [
          { required: true, message: '请选择呈现位置', trigger: 'blur' },
        ],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],

        publishTime: [
          { required: true, message: '请选择发布时间', trigger: 'blur' },
        ],
        position: [
          { required: true, message: '请输入发布人', trigger: 'blur' },
        ],
        zOrder: [{ required: true, message: '请输入权重', trigger: 'blur' }],
        deletedStatus: [
          { required: true, message: '请选择状态', trigger: 'blur' },
        ],
      },
      searchForm: {
        title: '',
        contentType: '',
        deletedStatus: '',
      },
      list: [],
      editAddForm: {
        contentType: '',
        title: '',
        type: '',
        coverUrl: '',
        content: '',
        appTypes: [],
        author: '',
        avatarUrl: '',
        position: '',
        publishTime: '',
        zOrder: '',
        deletedStatus: '',
      },
      tableHeaderBig: [],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      //   弹框区域
      editDialogVisible: false,
      infoTitle: '',
      editorOption: {
        placeholder: '请在这里输入',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
            // ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            // [{ list: "ordered" }, { list: "bullet" }], //列表
            // [{ script: "sub" }, { script: "super" }], // 上下标
            // [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{ direction: "rtl" }], // 文本方向
            [{ size: ['12px', false, '18px', '22px', '26px', '32px', '36px'] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            // [{ font: ['Helvetica Neue', 'Helvetica', 'Arial'] }], //字体
            // [{ align: [] }], //对齐方式
            ['clean'], //清除字体样式
            ['image', 'video'], //上传图片、上传视频
          ],
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },
        },
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminNews
        .getNews({
          page: this.pageNum,
          pageSize: this.pageSize,
          title: this.searchForm.title,
          contentType: this.searchForm.contentType,
          deletedStatus: this.searchForm.deletedStatus,
        })
        .then((res) => {
          console.log(res)
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 开关change事件
    statusChange(val) {
      httpAdminNews.putNews(val).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('状态更改成功')
          this.getList()
        }
      })
    },
    /***** 搜索区域 *****/
    // 搜索
    searchBtn() {
      this.getList()
    },
    // 重置
    searchReset() {
      this.searchForm = {}
      this.getList()
    },
    /***** 增删改 *****/
    // 新增
    addBtn() {
      this.infoTitle = '新增'
      this.editAddForm = {}
      this.editDialogVisible = true
    },
    // 编辑
    editBtn(val) {
      console.log(val)
      this.infoTitle = '编辑'
      this.editAddForm = JSON.parse(JSON.stringify(val))
      this.editDialogVisible = true
    },
    // 删除
    async deleteBtn(id) {
      const confirmResult = await this.$confirm(
        '你确定要执行此操作, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => console.log(err))
      if (confirmResult != 'confirm') {
        return this.$message.info('取消删除')
      }
      // 发送请求
      httpAdminNews.deleteNews(id).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
    editDialogClosed() {
      this.$refs.FormRef.resetFields()
    },
    // 新增编辑确定
    editPageEnter() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          if (this.infoTitle === '新增') {
            // 发送请求
            httpAdminNews.postNews(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('新增成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          } else {
            // 发送请求
            httpAdminNews.putNews(this.editAddForm).then((res) => {
              if (res.code === 'OK') {
                this.$message.success('编辑成功')
                this.getList()
                this.editDialogVisible = false
              }
            })
          }
        }
      })
    },
    // 排序
    sortTop(id) {
      httpAdminNews.postNewsSort({ id: id, status: 'UP' }).then((res) => {
        if (res.code === 'OK') {
          this.getList()
          return this.$message.success(res.message)
        }
      })
    },
    sortBottom(id) {
      httpAdminNews.postNewsSort({ id: id, status: 'DOWN' }).then((res) => {
        if (res.code === 'OK') {
          this.getList()
          return this.$message.success(res.message)
        }
      })
    },
    // 富文本
    onEditorReady(editor) {
      // 准备编辑器
    },
    // 失去焦点事件
    onEditorBlur(e) {
      console.log(e)
    },
    // 获得焦点事件
    onEditorFocus() {},
    // 内容改变事件
    onEditorChange() {},
    /***** 表格格式化内容 *****/
    contentTypeFormatter(row) {
      return formatterElement.contentType[row.contentType]
    },
    coverUrlFormatter(row) {
      return `<div>3333</div>`
    },
    /***** 格式化表格 *****/
    createTimeFormatter(row) {
      return parseTime(row.createTime).slice(0, 10)
    },
    publishTimeFormatter(row) {
      return parseTime(row.publishTime).slice(0, 10)
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
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
  },
}
</script>


<style>
/* 富文本汉化 */
.quill-editor {
  padding: 0;
}
.ql-container {
  height: 270px;
}
.ql-toolbar.ql-snow {
  background-color: #f5f5f5;
}
.ql-snow .ql-tooltip {
  z-index: 999;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}
.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  z-index: 999;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}
.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}
.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>
