<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form class="searchForm"
        ref="searchFormRef"
        :model="searchForm"
        :inline="true">
        <el-form-item label="医院名称">
          <el-select v-model="searchForm.hospitalId"
            size="small"
            filterable
            placeholder="请选择医院">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 任务 -->
        <el-form-item label="任务">
          <el-select v-model="getSearchForm.getTaskStage"
            size="small"
            filterable
            value-key="name"
            placeholder="请选择任务与期数"
            @change="selectTaskStage">
            <el-option v-for="item in taskStage"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
          <el-select v-model="getSearchForm.selectTaskStage"
            size="small"
            filterable
            value-key="text"
            placeholder="请选择任务与期数名称"
            @change="getTaskStage">
            <el-option v-for="item in aiTaskList"
              :key="item.text"
              :label="item.text"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 任务状态 -->
        <el-form-item label="任务状态">
          <el-select v-model="searchForm.status"
            size="small"
            filterable>
            <el-option v-for="item in AiTaskStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 完成时间 -->
        <el-form-item label="完成时间">
          <el-date-picker v-model="searchForm.completeStartTime"
            type="datetimerange"
            value-format="timestamp"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"></el-date-picker>
        </el-form-item>
        <!-- 创建时间 -->
        <el-form-item label="创建时间">
          <el-date-picker v-model="searchForm.creationTime"
            type="datetimerange"
            value-format="timestamp"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"></el-date-picker>
        </el-form-item>
        <!-- 按钮 -->
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
    <div>
      <el-button @click="addTask"
        type="primary"
        size="small"
        plain
        class="tableAdd"
        icon="el-icon-plus">添加任务</el-button>
    </div>
    <!-- 表格 -->
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
        label="医院名称"
        prop="hospitalName"></el-table-column>
      <el-table-column align="center"
        label="任务名称"
        prop="aiName"></el-table-column>
      <el-table-column align="center"
        label="期名"
        prop="taskStage"></el-table-column>
      <el-table-column align="center"
        label="BOT名称"
        prop="dialogFlowName"></el-table-column>
      <el-table-column align="center"
        label="任务状态"
        prop="status"
        :formatter="statusFormatter"></el-table-column>
      <el-table-column align="center"
        label="总外呼人数"
        prop="taskTotalNumber">
        <template slot-scope="scope">
          <span class="skipStyle"
            @click="skipRouter('addcall', scope.row.robotCallJobId)">{{ scope.row.taskTotalNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="已呼人数"
        prop="alreadyNumber">
        <template slot-scope="scope">
          <span class="skipStyle"
            @click="skipRouter('fulfillcall', scope.row.robotCallJobId)">{{ scope.row.alreadyNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="未呼人数"
        prop="notNumber">
        <template slot-scope="scope">
          <span class="skipStyle"
            @click="skipRouter('notcall', scope.row.robotCallJobId)">{{ scope.row.notNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="已接听人数"
        prop="alreadyPeopleNumber">
        <template slot-scope="scope">
          <span class="skipStyle"
            @click="
              skipRouter('fulfillcall', scope.row.robotCallJobId, 'ANSWERED')
            ">{{ scope.row.alreadyPeopleNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="未接听人数"
        prop="notPeopleNumber">
        <template slot-scope="scope">
          <span class="skipStyle">{{ scope.row.notPeopleNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="并发数量"
        prop="concurrentQuantity"></el-table-column>
      <el-table-column width="150px"
        align="center"
        label="启动时间"
        prop="startTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px"
        align="center"
        label="完成时间"
        prop="completeTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.completeTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="创建人"
        prop="createName"></el-table-column>
      <el-table-column width="150px"
        align="center"
        label="创建时间"
        prop="createTime"></el-table-column>
      <el-table-column align="center"
        label="操作"
        width="150"
        fixed="right">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary"
              size="mini">
              更多菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-show="moreMenus(scope.row.status, 'edit')"
                @click.native="compile(scope.row, 'edit')">编辑</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, 'copy')"
                @click.native="compile(scope.row, 'copy')">复制</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, 'delete')"
                @click.native="compile(scope.row, 'delete')">删除</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, 'startTask')"
                @click.native="compile(scope.row, 'startTask')">开始任务</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, '暂停任务')"
                @click.native="compile(scope.row)">暂停任务</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, '中止任务')"
                @click.native="compile(scope.row)">中止任务</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, '运营概况')"
                @click.native="compile(scope.row)">运营概况</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, 'issueStatistics')"
                @click.native="compile(scope.row, 'issueStatistics')">问题统计</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 弹出区域 -->
    <el-dialog :title="title"
      :visible.sync="userVisible"
      width="40%">
      <el-form :rules="formRules"
        :model="addUserFrom"
        label-width="100px">
        <!-- 选择医院 -->
        <el-form-item label="选择医院:"
          prop="hospitalId">
          <el-select v-model="addUserFrom.hospitalId"
            filterable
            clearable
            style="width: 100%"
            placeholder="请选择医院"
            @change="getHospitalName">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 任务名称 -->
        <el-form-item label="任务名称:"
          prop="name">
          <el-input v-model="addUserFrom.name"
            placeholder="请输入任务名称和"></el-input>
        </el-form-item>
        <!-- BOT名称 -->
        <el-form-item label="BOT名称:"
          prop="dialogFlowId">
          <el-select v-model="addUserFrom.dialogFlowId"
            filterable
            style="width: 100%"
            placeholder="请选择BOT名称">
            <el-option v-for="item in aiSpeechList"
              :label="item.name"
              :value="item.dialogFlowId"
              :key="item.dialogFlowId"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="并发数量" prop="concurrencyQuota">
                    <el-input placeholder="请输入并发数量"></el-input>
                </el-form-item>-->
        <!-- 时间设置 -->
        <el-form-item label="时间设置:">
          <el-input @focus="userSetTime"
            v-model="addUserFrom.setTime"></el-input>
        </el-form-item>
        <!-- 上传excel -->
        <el-form-item label="导入用户:">
          <div class="skipStyle">
            <!-- 上传组件 -->
            <single-upload v-model="addUserFrom.fileName"
              @uploadFinish="uploadFinish"
              uploadType="BANNER"></single-upload>
            <div slot="tip"
              class="el-upload__tip">
              仅支持上传Excel格式的文件，且不超过10万条。
              <span class="skipStyle"
                @click="getAiDownload">下载模板</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="judgeBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EleTable from '@/components/Table'
import singleUpload from '@/components/UploadExcel'
import { httpAdminAiCall } from '@/api/admin/httpAdminAiCall'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminAiHistory } from '@/api/admin/httpAdminAiHistory'
import { parseTime, AiTaskStatus, formatterElement } from '@/utils/index'

export default {
  components: {
    EleTable,
    singleUpload,
  },
  data() {
    return {
      parseTime,
      AiTaskStatus,
      formatterElement,
      title: '添加',
      formRules: {
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'change' },
        ],
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        dialogFlowId: [
          { required: true, message: '请输入BOT名称', trigger: 'change' },
        ],
        concurrencyQuota: [
          { required: true, message: '请输入并发数', trigger: 'blur' },
        ],
        notCallTime: [
          { required: true, message: '请选择可拨打时间段', trigger: 'change' },
        ],
      },
      // 搜索表单
      searchForm: {},
      addUserFrom: {},
      // 任务与期数
      getSearchForm: {
        getTaskStage: '',
        selectTaskStage: '',
        callDuration: '',
      },
      list: [],
      tableHeaderBig: [],
      hospitalList: [],
      aiSpeechList: [], //BOT名称
      // 任务与期数
      aiTaskList: [],
      taskStage: [
        { id: 'robotCallJobId', name: '任务名称' },
        { id: 'taskStage', name: '期数' },
      ],
      // 分页区域
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 弹框区域
      userVisible: false,
      timeVisible: false,
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getHospitalList()
    this.getAiSpeech()
  },
  methods: {
    getList() {
      httpAdminAiCall
        .getAiCallList({
          page: this.pageNum,
          pageSize: this.pageSize,
          hospitalId: this.searchForm.hospitalId,
          // status: this.searchForm.status,
          // aiName: this.searchForm.aiName,
          // taskStage: this.searchForm.taskStage,
          // completeStartTime,
          // completeEndTime,
          // createStartTime,
          // createEndTime,
        })
        .then((res) => {
          console.log('ai列表', res)
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    getHospitalList(hospitalId) {
      httpAdminHospital
        .getHospital({ pageSize: 10000, hospitalId })
        .then((res) => {
          this.hospitalList = res.data.elements
        })
    },
    /**
     * 接口 获取话术名称
     */
    getAiSpeech() {
      httpAdminAiCall.getAiSpeech().then((res) => {
        this.aiSpeechList = res.data.elements
      })
    },
    /**
     * 接口 获取任务与期数
     */
    getAiStageList() {
      httpAdminAiHistory.getAiStageList().then((res) => {
        this.aiTaskList = []
        res.data.forEach((val) => {
          this.aiTaskList.push({ text: val.taskStage })
        })
      })
    },
    getAiTaskNameList() {
      httpAdminAiHistory.getAiTaskNameList().then((res) => {
        this.aiTaskList = []
        res.data.forEach((val) => {
          this.aiTaskList.push({
            text: val.aiName,
            robotCallJobId: val.robotCallJobId,
          })
        })
      })
    },
    /**
     * 接口 开始任务
     */
    getInformationStart(robotCallJobId) {
      httpAdminAiCall.getInformationStart({ robotCallJobId }).then((res) => {})
    },
    /**
     * 接口 复制任务
     */
    getCopy(val) {
      let [aiName, hospitalId, robotCallJobId] = [
        val.aiName,
        val.hospitalId,
        val.robotCallJobId,
      ]
      if (
        aiName &&
        aiName !== '' &&
        hospitalId &&
        hospitalId !== '' &&
        robotCallJobId &&
        robotCallJobId !== ''
      ) {
        httpAdminAiCall
          .getInformationCopy({ aiName, hospitalId, robotCallJobId })
          .then((res) => {
            this.getList()
          })
      }
    },
    /**
     * 任务与期数选择
     */
    selectTaskStage(val) {
      this.$set(this.getSearchForm, 'selectTaskStage', '')
      if (val === 'robotCallJobId') {
        this.getAiTaskNameList()
      } else {
        this.getAiStageList()
      }
    },
    getTaskStage(val) {
      if (this.getSearchForm.getTaskStage === 'robotCallJobId') {
        this.$set(this.searchForm, 'taskStage', '')
        this.searchForm.aiName = val.text
      } else {
        this.$set(this.searchForm, 'aiName', '')
        this.searchForm.taskStage = val.text
      }
    },
    /**
     * 操作
     */
    // 点击操作
    compile(val, name) {
      switch (name) {
        case 'edit':
          // this.userVisible = true;
          this.showTaskdetail(val)
          break
        case 'issueStatistics':
          this.$router.push({ name: 'problemstatistics', params: val })
          break
        case 'delete':
          this.deleteInformation(val)
          break
        case 'startTask':
          this.getInformationStart(val.robotCallJobId)
          break
        case 'copy':
          this.getCopy(val)
          break
      }
    },
    moreMenus(val, state) {
      switch (state) {
        case 'edit':
          if (val === 'IN_PROCESS' || val === 'COMPLETED') {
            return false
          } else {
            return true
          }
          break
        case 'copy':
          return true
          break
        case 'delete':
          if (val === 'NOT_STARTED') {
            return false
          } else {
            return true
          }
          break
        case 'startTask':
          if (val === 'IN_PROCESS' || val === 'COMPLETED') {
            return false
          } else {
            return true
          }
          break
        case '暂停任务':
          return true
          break
        case '终止任务':
          return true
          break
        case '运营概况':
          return true
          break
        case 'issueStatistics':
          return true
          break
      }
    },
    /**
     * 添加任务
     */
    addTask() {
      this.addUserFrom = {}
      this.title = '添加'
      this.timeTitle = '时间添加'
      this.userVisible = true
    },
    // 选择医院触发函数
    getHospitalName(val) {
      console.log('选择医院触发函数', val)
    },
    // excel 下载
    getAiDownload() {
      window.open(
        'http://test-api.daliangqing.com/admin/ai/information/download'
      )
    },
    // 上传excel 阿里
    uploadFinish(val) {
      this.searchForm.fileUrl = val.value
      this.searchForm.fileName = val.name
    },
    /**
     * ai时间添加
     */
    // 时间设置 弹窗
    userSetTime() {
      // this.timeVisible = true;
    },
    /**
     * 添加编辑任务
     */
    judgeBtn() {},
    /**
     * 路由跳转
     */
    skipRouter(name, robotCallJobId, state) {
      if (state !== undefined) {
        sessionStorage.setItem('taskPhoneState', state)
      }
      this.$router.push({ name, query: { robotCallJobId } })
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getList()
    },
    searchReset() {
      this.getList()
    },
    /**
     * 表格格式化
     */
    statusFormatter(row) {
      return formatterElement.transitionStatus[row.status]
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
</style>