<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-box">
      <el-form
        class="searchForm"
        ref="searchFormRef"
        :model="searchForm"
        :inline="true"
      >
        <el-form-item label="医院名称">
          <el-select
            v-model="searchForm.hospitalId"
            size="small"
            filterable
            placeholder="请选择医院"
          >
            <el-option
              v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务">
          <el-input
            placeholder="请输入内容"
            v-model="taskForm.taskContent"
            class="input-with-select"
            size="small"
          >
            <el-select
              v-model="taskForm.task"
              slot="prepend"
              placeholder="请选择"
              style="width: 100px"
              @change="selectTask"
            >
              <el-option label="任务名称" value="aiName"></el-option>
              <el-option label="期名" value="taskStage"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="searchForm.status" size="small" filterable>
            <el-option
              v-for="item in AiTaskStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker
            v-model="searchForm.completeStartTime"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="searchForm.creationTime"
            type="datetimerange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          ></el-date-picker>
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
        @click="addTask"
        type="primary"
        size="small"
        plain
        class="tableAdd"
        icon="el-icon-plus"
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
        label="医院名称"
        prop="hospitalName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="任务名称"
        prop="aiName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="期名"
        prop="taskStage"
      ></el-table-column>
      <el-table-column
        align="center"
        label="BOT名称"
        prop="dialogFlowName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="任务状态"
        prop="status"
        :formatter="statusFormatter"
      ></el-table-column>
      <el-table-column align="center" label="总外呼人数" prop="taskTotalNumber">
        <template slot-scope="scope">
          <span
            class="skipStyle"
            @click="skipRouter('addcall', scope.row.robotCallJobId)"
            >{{ scope.row.taskTotalNumber }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="已呼人数" prop="alreadyNumber">
        <template slot-scope="scope">
          <span
            class="skipStyle"
            @click="skipRouter('fulfillcall', scope.row.robotCallJobId)"
            >{{ scope.row.alreadyNumber }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="未呼人数" prop="notNumber">
        <template slot-scope="scope">
          <span
            class="skipStyle"
            @click="skipRouter('notcall', scope.row.robotCallJobId)"
            >{{ scope.row.notNumber }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="已接听人数"
        prop="alreadyPeopleNumber"
      >
        <template slot-scope="scope">
          <span
            class="skipStyle"
            @click="
              skipRouter('fulfillcall', scope.row.robotCallJobId, 'ANSWERED')
            "
            >{{ scope.row.alreadyPeopleNumber }}</span
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="未接听人数" prop="notPeopleNumber">
        <template slot-scope="scope">
          <span class="skipStyle">{{ scope.row.notPeopleNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="并发数量"
        prop="concurrentQuantity"
      ></el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="启动时间"
        prop="startTime"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="完成时间"
        prop="completeTime"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.completeTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建人"
        prop="createName"
      ></el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="创建时间"
        prop="createTime"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary" size="mini">
              更多菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="compile(scope.row, 'edit')"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item @click.native="compile(scope.row, 'copy')"
                >复制</el-dropdown-item
              >
              <el-dropdown-item @click.native="compile(scope.row, 'delete')"
                >删除</el-dropdown-item
              >
              <el-dropdown-item @click.native="compile(scope.row, 'startTask')"
                >开始任务</el-dropdown-item
              >
              <el-dropdown-item @click.native="compile(scope.row)"
                >暂停任务</el-dropdown-item
              >
              <el-dropdown-item @click.native="compile(scope.row)"
                >中止任务</el-dropdown-item
              >
              <el-dropdown-item @click.native="compile(scope.row)"
                >运营概况</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="compile(scope.row, 'issueStatistics')"
                >问题统计</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </EleTable>
    <!-- 弹出区域 -->
    <el-dialog :title="title" :visible.sync="userVisible" width="40%">
      <el-form :rules="formRules" :model="addUserFrom" label-width="100px">
        <el-form-item label="选择医院:" prop="hospitalId">
          <el-select
            v-model="addUserFrom.hospitalId"
            filterable
            clearable
            style="width: 100%"
            placeholder="请选择医院"
            @change="gethospitalName"
          >
            <el-option
              v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称:" prop="name">
          <el-input
            v-model="addUserFrom.name"
            placeholder="请输入任务名称和"
          ></el-input>
        </el-form-item>
        <el-form-item label="BOT名称:" prop="dialogFlowId">
          <el-select
            v-model="addUserFrom.dialogFlowId"
            filterable
            style="width: 100%"
            placeholder="请选择BOT名称"
          >
            <el-option
              v-for="item in aiSpeechList"
              :label="item.name"
              :value="item.dialogFlowId"
              :key="item.dialogFlowId"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="并发数量" prop="concurrencyQuota">
                    <el-input placeholder="请输入并发数量"></el-input>
                </el-form-item>-->
        <el-form-item label="时间设置:">
          <el-input
            @focus="userSetTime"
            v-model="searchForm.setTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="导入用户:">
          <div class="skipStyle">
            <!-- 上传组件 -->
            <single-upload
              v-model="addUserFrom.fileName"
              @uploadFinish="uploadFinish"
              uploadType="BANNER"
            ></single-upload>
            <div slot="tip" class="el-upload__tip">
              仅支持上传Excel格式的文件，且不超过10万条。
              <span class="skipStyle" @click="getAiDownload">下载模板</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary" @click="judgeBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ai时间段 -->
    <el-dialog
      :title="timeTitle"
      :visible.sync="timeVisible"
      :model="dialForm"
      width="40%"
    >
      <el-form
        label-width="120px"
        label-position="left"
        :rules="formRules"
        :model="dialForm"
      >
        <el-form-item label="可拨打时间段" prop="notCallTime">
          <el-time-picker
            is-range
            format="HH:mm"
            value-format="HH:mm"
            v-model="searchForm.daily"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="getDialable"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="不可拨打时间段">
          <div style="display: flex">
            <el-time-picker
              is-range
              format="HH:mm"
              value-format="HH:mm"
              v-model="dialForm.notCallTime"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @change="notDialable"
            ></el-time-picker>
            <el-button
              type="primary"
              style="margin-left: 15px"
              @click="notDialTime('time')"
              >按时间顺序添加</el-button
            >
          </div>
        </el-form-item>
        <el-form-item v-for="(item, index) in notDialTimeArr" :key="item.id">
          <el-time-picker
            is-range
            format="HH:mm"
            value-format="HH:mm"
            v-model="item.callTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="notDialable"
          ></el-time-picker>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteNotCall('time', index)"
            circle
            style="margin-left: 15px"
          ></el-button>
        </el-form-item>
        <el-form-item label="重复周期">
          <el-checkbox-group
            v-model="timeForm.checkListPeriod"
            @change="getPeriod"
            :min="1"
          >
            <el-checkbox label="MONDAY">周一</el-checkbox>
            <el-checkbox label="TUESDAY">周二</el-checkbox>
            <el-checkbox label="WEDNESDAY">周三</el-checkbox>
            <el-checkbox label="THURSDAY">周四</el-checkbox>
            <el-checkbox label="FRIDAY">周五</el-checkbox>
            <el-checkbox label="SATURDAY">周六</el-checkbox>
            <el-checkbox label="SUNDAY">周日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="不可拨打日期">
          <div style="display: flex">
            <el-date-picker
              v-model="timeForm.notDial"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="notDialable"
            ></el-date-picker>
            <el-button
              type="primary"
              style="margin-left: 15px"
              @click="notDialTime()"
              >按时间顺序添加</el-button
            >
          </div>
        </el-form-item>
        <el-form-item v-for="(item, index) in notDialDateArr" :key="index">
          <el-date-picker
            v-model="item.callDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="notDialable"
          ></el-date-picker>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteNotCall('', index)"
            circle
            style="margin-left: 15px"
          ></el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="timeVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCallTime">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EleTable from '@/components/Table'
import singleUpload from '@/components/UploadExcel'
import { httpAdminAiCall } from '@/api/admin/httpAdminAiCall'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
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
      title: '添加',
      timeTitle: '时间添加',
      // 搜索表单
      searchForm: {
        excelFile: '',
        hospitalId: '',
        completionTime: '',
        creationTime: '',
        aiName: '',
        setTime: '',
        daily: ['09:00', '20:00'],
      },
      taskForm: {
        task: '',
        taskContent: '',
      },
      addUserFrom: {
        time: '',
        hospitalId: '',
        name: '',
        dialogFlowId: '',
        time: '',
      },
      timeForm: {
        checkListPeriod: [
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
          'SUNDAY',
        ],
        endTime: '',
      },
      dialForm: {
        notCallTime: ['', ''],
      },
      // 任务详情
      informationTask: {},
      list: [],
      hospitalList: [],
      aiSpeechList: [],
      tableHeaderBig: [],
      fileList: [],
      // 不可拨打时间
      notDialTimeArr: [],
      notDialDateArr: [],
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
    this.getAiCallList()
  },
  mounted() {
    this.getHospitalList()
    this.getAiSpeech()
  },
  methods: {
    /**
     * 接口
     */
    // 列表数据 查询
    getAiCallList() {
      let [completeStartTime, completeEndTime] = ['', '']
      let [createStartTime, createEndTime] = ['', '']
      console.log('时间数据', this.searchForm.completeStartTime)
      if (this.searchForm.completeStartTime) {
        ;[completeStartTime, completeEndTime] = [
          this.searchForm.completeStartTime[0],
          this.searchForm.completeStartTime[1],
        ]
      }
      if (this.searchForm.creationTime) {
        ;[createStartTime, createEndTime] = [
          this.searchForm.creationTime[0],
          this.searchForm.creationTime[1],
        ]
      }
      console.log(this.searchForm.completeStartTime)
      httpAdminAiCall
        .getAiCallList({
          hospitalId: this.searchForm.hospitalId,
          status: this.searchForm.status,
          aiName: this.searchForm.aiName,
          taskStage: this.searchForm.taskStage,
          completeStartTime,
          completeEndTime,
          createStartTime,
          createEndTime,
        })
        .then((res) => {
          console.log('ai列表', res)
          this.list = res.data.elements
        })
    },
    // 获取医院列表
    getHospitalList(hospitalId) {
      httpAdminHospital
        .getHospital({ pageSize: 10000, hospitalId })
        .then((res) => {
          console.log(res)
          this.hospitalList = res.data.elements
        })
    },
    gethospitalName(val) {
      console.log(val)
    },
    // 获取话术
    getAiSpeech() {
      httpAdminAiCall.getAiSpeech().then((res) => {
        this.aiSpeechList = res.data.elements
      })
    },
    // 获取随访任务详情
    async getInformationTask(robotCallJobId) {
      let res = await httpAdminAiCall.getInformationTask({ robotCallJobId })
      return res
    },
    // 添加
    postInformation() {
      let notDial = this.timeForm.notDial
      if (
        this.dialForm.notCallTime === undefined ||
        this.dialForm.notCallTime === null
      ) {
        this.dialForm.notCallTime = ['', '']
      }
      if (notDial === undefined || notDial === null) {
        notDial = []
      }
      let inactiveTimeList = this.disposeNotTime()
      let inactiveDateList = this.disposeNotDate()
      console.log('不可拨打时间', inactiveTimeList)
      console.log('不可拨打日期', inactiveDateList)
      console.log('表单数据', this.searchForm)
      console.log('周期', this.timeForm.checkListPeriod)
      console.log('可拨打时间', this.searchForm.daily)
      console.log('周期', this.timeForm.checkListPeriod)
      console.log('医院id', this.addUserFrom.hospitalId)
      console.log('医院名称', this.addUserFrom)
      // 添加接口
      httpAdminAiCall
        .postInformation({
          // 添加
          hospitalId: this.addUserFrom.hospitalId,
          name: this.addUserFrom.name,
          dialogFlowId: this.addUserFrom.dialogFlowId,
          // 时间添加
          dailyStartTime: this.searchForm.daily[0],
          dailyEndTime: this.searchForm.daily[1],
          inactiveTimeList,
          inactiveDateList,
          daysOfWeek: this.timeForm.checkListPeriod,
          fileName: this.searchForm.fileName,
          fileUrl: this.searchForm.fileUrl,
        })
        .then((res) => {
          console.log('添加', res)
          if (res.code === 'OK') {
            this.$message.success(res.message)
            this.getAiCallList()
            this.userVisible = false
          } else {
            this.$message.warning(res.message)
          }
        })
    },
    // 编辑接口
    putInformation() {
      let notDial = this.timeForm.notDial
      if (
        this.dialForm.notCallTime === undefined ||
        this.dialForm.notCallTime === null
      ) {
        this.dialForm.notCallTime = ['', '']
      }
      if (notDial === undefined || notDial === null) {
        notDial = []
      }
      let inactiveTimeList = this.disposeNotTime()
      let inactiveDateList = this.disposeNotDate()
      console.log('编辑数据')
      console.log('不可拨打时间', inactiveTimeList)
      console.log('不可拨打日期', inactiveDateList)
      console.log('表单数据', this.searchForm)
      console.log('周期', this.timeForm.checkListPeriod)
      console.log('可拨打时间', this.searchForm.daily)
      console.log('周期', this.timeForm.checkListPeriod)
      console.log('医院id', this.addUserFrom.hospitalId)
      console.log('医院名称', this.addUserFrom.hospitalName)
      console.log('任务名', this.addUserFrom.name)
      httpAdminAiCall
        .putInformation({
          aiName: this.addUserFrom.name,
          dailyStartTime: this.searchForm.daily[0],
          dailyEndTime: this.searchForm.daily[1],
          daysOfWeek: this.timeForm.checkListPeriod,
          hospitalName: this.addUserFrom.hospitalName,
          id: this.addUserFrom.id,
          inactiveDateList,
          inactiveTimeList,
          robotCallJobId: this.addUserFrom.robotCallJobId,
          robotCount: 2,
          hospitalId: this.addUserFrom.hospitalId,
        })
        .then((res) => {
          console.log('编辑', res)
          if (res.code === 'OK') {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          this.getAiCallList()
          this.userVisible = false
        })
    },
    // 删除
    deleteInformation(val) {
      console.log('删除', val)
      httpAdminAiCall
        .deleteInformation({ taskId: val.robotCallJobId })
        .then((res) => {
          console.log('删除', res)
          if (res.code === 'OK') {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          this.getAiCallList()
        })
    },
    // 开始任务
    getInformationStart(robotCallJobId) {
      console.log('robotCallJobId', robotCallJobId)
      httpAdminAiCall.getInformationStart({ robotCallJobId }).then((res) => {})
    },
    // 复制任务
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
            this.getAiCallList()
          })
      }
    },
    // 获取模板
    getAiDownload() {
      window.open(
        'http://test-api.daliangqing.com/admin/ai/information/download'
      )
    },
    // 上传excel 阿里
    uploadFinish(val) {
      console.log('上传Excel', val)
      this.searchForm.fileUrl = val.value
      this.searchForm.fileName = val.name
    },
    // 添加任务
    addTask() {
      this.addUserFrom = {}
      this.title = '添加'
      this.timeTitle = '时间添加'
      this.userVisible = true
    },
    // 添加 编辑任务
    judgeBtn() {
      if (this.title === '添加') {
        delete this.addUserFrom.id
        delete this.addUserFrom.hospitalName
        delete this.addUserFrom.robotCallJobId
        this.postInformation()
      } else {
        this.putInformation()
      }
    },
    /**
     * 处理提交时间
     */
    // 处理不可拨打时间段
    disposeNotTime() {
      let inactiveTimeList = []
      let notCallTime = this.dialForm.notCallTime
      let callTime = this.notDialTimeArr[0]
      let callTimeOne = this.notDialTimeArr[1]
      console.log('null', callTime)
      if (notCallTime != null) {
        if (notCallTime[0] != '' && notCallTime[1] != '') {
          inactiveTimeList.push({
            startTime: notCallTime[0],
            endTime: notCallTime[1],
          })
        }
      }
      if (callTime != undefined && callTime.callTime[0] != '') {
        inactiveTimeList.push({
          startTime: callTime.callTime[0],
          endTime: callTime.callTime[1],
        })
      }
      if (callTimeOne != undefined && callTimeOne.callTime[0] != '') {
        inactiveTimeList.push({
          startTime: callTimeOne.callTime[0],
          endTime: callTimeOne.callTime[1],
        })
      }
      return inactiveTimeList
    },
    // 处理不可拨打日期
    disposeNotDate() {
      let inactiveDateList = []
      let notDial = this.timeForm.notDial
      let notDialDateArr = this.notDialDateArr[0]
      let notDialDateArrOne = this.notDialDateArr[1]
      if (notDial != undefined && notDial[0] != '') {
        inactiveDateList.push({ startDate: notDial[0], endDate: notDial[1] })
      }
      if (notDialDateArr != undefined && notDialDateArr.callDate != '') {
        if (notDialDateArr.callDate != null) {
          inactiveDateList.push({
            startDate: notDialDateArr.callDate[0],
            endDate: notDialDateArr.callDate[1],
          })
        }
      }
      if (notDialDateArrOne != undefined && notDialDateArrOne.callDate != '') {
        if (notDialDateArrOne.callDate != null) {
          inactiveDateList.push({
            startDate: notDialDateArrOne.callDate[0],
            endDate: notDialDateArrOne.callDate[1],
          })
        }
      }
      return inactiveDateList
    },
    /**
     * ai时间添加区域
     */
    getDialable() {
      //开始searchForm.daily[0] 结束[1]
      console.log('获取可拨打时间', this.searchForm.daily)
    },
    notDialable() {
      //1.dialForm 2.notDialTimeArr
      // console.log('获取不可拨打时间', this.notDialTimeArr)
      // 不可拨打日期  1.this.timeForm.notDial 2.notDialDateArr
      console.log('1不可拨打日期修改', this.timeForm.notDial)
      console.log('2不可拨打日期修改', this.notDialDateArr)
    },
    deleteNotCall(val, index) {
      if (val === 'time') {
        this.notDialTimeArr.splice(index, 1)
      } else {
        this.notDialDateArr.splice(index, 1)
      }
    },
    // 时间设置 弹窗开关
    userSetTime() {
      this.timeVisible = true
    },
    // 时间添加 周期选择 checkbox
    getPeriod() {
      console.log('周期', this.timeForm.checkListPeriod)
    },
    notDialTime(val) {
      let notDialTimeArr = this.notDialTimeArr
      let notDialDateArr = this.notDialDateArr
      if (val === 'time') {
        if (this.notDialTimeArr.length >= 2) return
        notDialTimeArr.push({ callTime: ['', ''] })
      } else {
        if (this.notDialDateArr.length >= 2) return
        notDialDateArr.push({ callDate: '' })
      }
    },
    // 确认
    confirmCallTime() {
      let period = []
      this.timeForm.checkListPeriod.forEach((val) => {
        switch (val) {
          case 'MONDAY':
            period.push('周一')
            break
          case 'TUESDAY':
            period.push('周二')
            break
          case 'WEDNESDAY':
            period.push('周三')
            break
          case 'THURSDAY':
            period.push('周四')
            break
          case 'FRIDAY':
            period.push('周五')
            break
          case 'SATURDAY':
            period.push('周六')
            break
          case 'SUNDAY':
            period.push('周日')
            break
        }
      })
      let [everyday, notTime, notDate] = ['', '', '']
      let inactiveTimeList = this.disposeNotTime()
      let inactiveDateList = this.disposeNotDate()
      let callTime = this.searchForm.daily
      if (period.length === 7) {
        everyday = `每天/${callTime.join('~')}`
        this.searchForm.setTime = everyday
      } else {
        this.searchForm.setTime = `${period.join('、')}/${callTime.join('~')}`
      }
      this.timeVisible = false
    },
    /**
     * 任务选择
     */
    selectTask(val) {
      this.taskForm.taskContent = ''
      if (val === 'aiName') {
        this.searchForm.taskStage = ''
      } else {
        this.searchForm.aiName = ''
      }
    },
    getTask() {
      console.log('任务选择', this.taskForm.taskContent)
      if (this.taskForm.task === 'taskStage') {
        this.searchForm.taskStage = this.taskForm.taskContent
      } else {
        this.searchForm.aiName = this.taskForm.taskContent
      }
    },
    /**
     * 操作
     */
    compile(val, name) {
      switch (name) {
        case 'edit':
          this.userVisible = true
          this.showTaskdetail(val)
          break
        case 'issueStatistics':
          console.log('问题统计', val)
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
    // 获取任务详情 显示 编辑
    async showTaskdetail(val) {
      this.title = '编辑'
      this.timeTitle = '时间编辑'
      // 不可拨打时间 置空
      this.dialForm.notCallTime = []
      this.notDialTimeArr = []
      // 不可拨打日期 置空
      delete this.timeForm.notDial
      const { data: res } = await this.getInformationTask(val.robotCallJobId)
      this.addUserFrom = JSON.parse(JSON.stringify(res))
      this.$set(
        this.addUserFrom,
        'name',
        JSON.parse(JSON.stringify(res.aiName))
      )
      this.timeForm.checkListPeriod = JSON.parse(
        JSON.stringify(res.aiParameter.daysOfWeek)
      )
      // this.searchForm.fileUrl = JSON.parse(JSON.stringify(res.fileUrl))
      this.searchForm.daily = [
        res.aiParameter.dailyStartTime,
        res.aiParameter.dailyEndTime,
      ] //可拨打时间
      this.timeForm.checkListPeriod = res.aiParameter.daysOfWeek
      this.addUserFrom.hospitalName = res.hospitalName
      this.addUserFrom.id = val.id
      this.addUserFrom.robotCallJobId = val.robotCallJobId
      // 判断时间
      if (res.aiParameter.inactiveTimeList.length === 0) {
        this.dialForm.notCallTime = ['', '']
      }
      if (res.aiParameter.inactiveTimeList.length >= 1) {
        this.dialForm.notCallTime = [
          res.aiParameter.inactiveTimeList[0].startTime,
          res.aiParameter.inactiveTimeList[0].endTime,
        ]
      }
      if (res.aiParameter.inactiveTimeList.length === 2) {
        this.notDialTimeArr = [
          {
            callTime: [
              res.aiParameter.inactiveTimeList[1].startTime,
              res.aiParameter.inactiveTimeList[1].endTime,
            ],
          },
        ]
      }
      if (res.aiParameter.inactiveTimeList.length === 3) {
        this.notDialTimeArr = [
          {
            callTime: [
              res.aiParameter.inactiveTimeList[1].startTime,
              res.aiParameter.inactiveTimeList[1].endTime,
            ],
          },
          {
            callTime: [
              res.aiParameter.inactiveTimeList[2].startTime,
              res.aiParameter.inactiveTimeList[2].endTime,
            ],
          },
        ]
      }
      // 日期
      delete this.timeForm.notDial
      console.log('编辑不可拨打日期', this.timeForm.notDial)
      if (res.aiParameter.inactiveDateList.length <= 0) {
        delete this.timeForm.notDial
      }
      if (res.aiParameter.inactiveDateList.length >= 1) {
        this.$set(this.timeForm, 'notDial', [
          res.aiParameter.inactiveDateList[0].startDate,
          res.aiParameter.inactiveDateList[0].endDate,
        ])
      }
      if (res.aiParameter.inactiveDateList.length === 2) {
        this.notDialDateArr = [
          {
            callDate: [
              res.aiParameter.inactiveDateList[1].startDate,
              res.aiParameter.inactiveDateList[1].endDate,
            ],
          },
        ]
      }
      if (res.aiParameter.inactiveDateList.length === 3) {
        this.notDialDateArr = [
          {
            callDate: [
              res.aiParameter.inactiveDateList[1].startDate,
              res.inactiveDateList[1].endDate,
            ],
          },
          {
            callDate: [
              res.aiParameter.inactiveDateList[2].startDate,
              res.aiParameter.inactiveDateList[2].endDate,
            ],
          },
        ]
      }
    },
    /**
     * 路由跳转
     */
    skipRouter(name, robotCallJobId, state) {
      console.log(state)
      if (state !== undefined) {
        sessionStorage.setItem('taskPhoneState', state)
      }
      this.$router.push({ name, query: { robotCallJobId } })
    },
    /**
     * 搜索
     */
    searchBtn() {
      console.log('期名', this.searchForm)
      this.pageNum = 1
      this.getTask()
      this.getAiCallList()
    },
    searchReset() {
      this.$set(this.searchForm, 'completeStartTime', '')
      this.searchForm.creationTime = ''
      this.searchForm.hospitalId = ''
      this.$set(this.searchForm, 'status', '')
      this.searchForm.aiName = ''
      this.searchForm.taskStage = ''
      this.taskForm.task = ''
      this.taskForm.taskContent = ''
      this.getAiCallList()
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
      this.getAiCallList()
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.getAiCallList()
    },
  },
}
</script>

<style scoped>
</style>