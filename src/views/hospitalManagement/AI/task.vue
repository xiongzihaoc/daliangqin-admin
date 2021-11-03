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
            value-key="id"
            placeholder="请选择医院">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务">
          <el-select v-model="getSearchForm.getTaskStage"
            size="small"
            filterable
            value-key="name"
            placeholder="请选择任务"
            @change="selectTaskStage">
            <el-option v-for="item in taskStage"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务或期名">
          <el-select v-model="getSearchForm.selectTaskStage"
            size="small"
            filterable
            value-key="text"
            placeholder="请选择任务名称或期名"
            @change="getTaskStage">
            <el-option v-for="item in aiTaskList"
              :key="item.text"
              :label="item.text"
              :value="item"></el-option>
          </el-select>
        </el-form-item>

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
        prop="dialogFlowName"
        width="200">
        <template slot-scope="scope">
          <el-tooltip class="item"
            effect="dark"
            :content="scope.row.dialogFlowName"
            placement="top">
            <span class="hidden">{{ scope.row.dialogFlowName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="任务状态"
        prop="status"
        :formatter="statusFormatter"></el-table-column>
      <el-table-column align="center"
        label="总外呼人数"
        prop="taskTotalNumber">
        <template slot-scope="scope">
          <span :class="[scope.row.taskTotalNumber ? 'skipStyle' : '']"
            @click="
              ;[
                scope.row.taskTotalNumber
                  ? skipRouter('addcall', scope.row)
                  : '',
              ]
            ">{{ scope.row.taskTotalNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="已呼人数"
        prop="alreadyNumber">
        <template slot-scope="scope">
          <span :class="[scope.row.alreadyNumber ? 'skipStyle' : '']"
            @click="
              ;[
                scope.row.alreadyNumber
                  ? skipRouter('fulfillcall', scope.row, 'cause')
                  : '',
              ]
            ">{{ scope.row.alreadyNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="未呼人数"
        prop="notNumber">
        <template slot-scope="scope">
          <span :class="[scope.row.notNumber ? 'skipStyle' : '']"
            @click="
              ;[scope.row.notNumber ? skipRouter('notcall', scope.row) : '']
            ">{{ scope.row.notNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="已接听人数"
        prop="alreadyPeopleNumber">
        <template slot-scope="scope">
          <span :class="[scope.row.alreadyPeopleNumber ? 'skipStyle' : '']"
            @click="
              ;[
                scope.row.alreadyPeopleNumber
                  ? skipRouter('fulfillcall', scope.row, ['ANSWERED'])
                  : '',
              ]
            ">{{ scope.row.alreadyPeopleNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="未接听人数"
        prop="notPeopleNumber">
        <template slot-scope="scope">
          <span :class="[scope.row.notPeopleNumber ? 'skipStyle' : '']"
            @click="
              ;[
                scope.row.notPeopleNumber
                  ? skipRouter('fulfillcall', scope.row, [
                      'NO_ANSWER',
                      'BUSY',
                      'POWER_OFF',
                      'OUT_OF_SERVICE',
                      'REFUSED',
                      'VACANT_NUMBER',
                      'CAN_NOT_CONNECT',
                      'FROM_PHONE_ERROR',
                      'SYSTEM_ERROR',
                    ])
                  : '',
              ]
            ">{{ scope.row.notPeopleNumber }}</span>
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
        prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
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
              <el-dropdown-item v-show="moreMenus(scope.row.status, 'USER_PAUSE')"
                @click.native="compile(scope.row, 'USER_PAUSE')">暂停任务</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, '中止任务')"
                @click.native="compile(scope.row)">中止任务</el-dropdown-item>
              <el-dropdown-item v-show="moreMenus(scope.row.status, '运营概况')"
                @click.native="compile(scope.row, 'operation')">运营概况</el-dropdown-item>
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
        ref="addUserFrom"
        :model="addUserFrom"
        label-width="100px">
        <el-form-item label="选择医院:"
          prop="hospitalId">
          <el-select v-model="addUserFrom.hospitalId"
            filterable
            clearable
            :disabled="editBot"
            value-key="id"
            style="width: 100%"
            placeholder="请选择医院"
            @change="getHospitalName">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称:"
          prop="name">
          <el-input :disabled="editBot"
            v-model="addUserFrom.name"
            placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="BOT名称:"
          prop="dialogFlowId">
          <el-select v-model="addUserFrom.dialogFlowId"
            value-key="dialogFlowId"
            filterable
            style="width: 100%"
            placeholder="请选择BOT名称"
            :disabled="editBot"
            @change="getBotName">
            <el-option v-for="item in aiSpeechList"
              :label="item.name"
              :value="item"
              :key="item.dialogFlowId"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="并发数量" prop="concurrencyQuota">
                    <el-input placeholder="请输入并发数量"></el-input>
                </el-form-item>-->
        <el-form-item label="时间设置:">
          <el-input @focus="userSetTime"
            v-model="searchForm.setTime"></el-input>
        </el-form-item>
        <el-form-item label="导入用户:"
          prop="fileName">
          <div class="skipStyle">
            <!-- 上传组件 -->
            <single-upload v-model="addUserFrom.fileName"
              @uploadFinish="uploadFinish"
              uploadType="BANNER"
              :disabled="excelStatus"></single-upload>
            <div slot="tip"
              class="el-upload__tip"
              style="font-size: 13px">
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
          :disabled="addSubmit"
          @click="judgeBtn('addUserFrom')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ai时间段 -->
    <el-dialog :title="timeTitle"
      :visible.sync="timeVisible"
      :model="dialForm"
      width="40%">
      <el-form label-width="120px"
        label-position="left"
        :rules="formRules"
        :model="dialForm">
        <el-form-item label="可拨打时间段"
          prop="notCallTime">
          <el-time-picker is-range
            format="HH:mm"
            value-format="HH:mm"
            v-model="searchForm.daily"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="getDialable"></el-time-picker>
        </el-form-item>
        <el-form-item label="不可拨打时间段">
          <div style="display: flex">
            <el-time-picker is-range
              format="HH:mm"
              value-format="HH:mm"
              :default-time="['09:00', '20:00']"
              v-model="dialForm.notCallTime"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @change="notDialable"></el-time-picker>
            <el-button type="primary"
              style="margin-left: 15px"
              @click="notDialTime('time')">按时间顺序添加</el-button>
          </div>
        </el-form-item>
        <el-form-item v-for="(item, index) in notDialTimeArr"
          :key="item.id">
          <el-time-picker :picker-options="{ selectableRange: '18:30:00 - 20:30:00' }"
            is-range
            format="HH:mm"
            value-format="HH:mm"
            v-model="item.callTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="notDialable"></el-time-picker>
          <el-button type="danger"
            icon="el-icon-delete"
            @click="deleteNotCall('time', index)"
            circle
            style="margin-left: 15px"></el-button>
        </el-form-item>
        <el-form-item label="重复周期">
          <el-checkbox-group v-model="timeForm.checkListPeriod"
            @change="getPeriod"
            :min="1">
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
            <el-date-picker v-model="timeForm.notDial"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="notDialable"></el-date-picker>
            <el-button type="primary"
              style="margin-left: 15px"
              @click="notDialTime('date')">按时间顺序添加</el-button>
          </div>
        </el-form-item>
        <el-form-item v-for="(item, index) in notDialDateArr"
          :key="index">
          <el-date-picker v-model="item.callDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="notDialable"></el-date-picker>
          <el-button type="danger"
            icon="el-icon-delete"
            @click="deleteNotCall('', index)"
            circle
            style="margin-left: 15px"></el-button>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="timeVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="confirmCallTime(true)">确 定</el-button>
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
      editBot: false,
      addSubmit: false,
      excelStatus: false,
      formRules: {
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        dialogFlowId: [
          { required: true, message: '请输入BOT名称', trigger: 'blur' },
        ],
        concurrencyQuota: [
          { required: true, message: '请输入并发数', trigger: 'blur' },
        ],
        notCallTime: [
          { required: true, message: '请选择可拨打时间段', trigger: 'change' },
        ],
        // fileName: [
        //   {  required: true, message: '请导入用户', trigger: 'blur' }
        // ],
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
      getSearchForm: {
        getTaskStage: '',
        selectTaskStage: '',
        callDuration: '',
      },
      botFrom: {
        dialogFlowId: '',
        dialogFlowName: '',
      },
      hospitalFrom: {
        id: '',
        name: '',
      },
      taskForm: {
        task: '',
        taskContent: '',
      },
      addUserFrom: {
        time: '',
        name: '',
        dialogFlowId: '',
        time: '',
      },
      // 周期选择
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
      aiTaskList: [],
      taskStage: [
        { id: 'robotCallJobId', name: '任务名称' },
        { id: 'taskStage', name: '期名' },
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
    /**
     * 处理时间 比较大小
     */
    disposeTime(time) {
      let startTime =
        time.startTime.substring(0, 2) + time.startTime.substring(3, 5)
      let endTime = time.endTime.substring(0, 2) + time.endTime.substring(3, 5)
      return [startTime, endTime]
    },
    // 处理可拨打时间 比较大小
    disposeDaily(time) {
      let startTime = time[0].substring(0, 2) + time[0].substring(3, 5)
      let endTime = time[1].substring(0, 2) + time[1].substring(3, 5)
      return [startTime, endTime]
    },
    judgeTimeSize(time) {
      let [getOkTime, oneTime, twoTime, threeTime] = [
        arguments[0],
        arguments[1],
        arguments[2],
        arguments[3],
      ]
      if (oneTime === '') {
        return false
      }
      if (getOkTime[0] >= oneTime[0] || getOkTime[1] <= oneTime[1]) {
        this.$message.warning('不可拨打时间不能超过可拨打时间')
        return true
      }
      if (twoTime === '') {
        return false
      }
      if (oneTime[1] >= twoTime[0] || oneTime[1] >= twoTime[1]) {
        this.$message.warning('请按时间顺序添加不可拨打时间')
        return true
      }
      if (threeTime === '') {
        return false
      }
      if (twoTime[1] >= threeTime[0] || twoTime[1] >= threeTime[1]) {
        this.$message.warning('请按时间顺序添加不可拨打时间')
        return true
      }
    },
    // 列表数据 查询
    getList() {
      let [completeStartTime, completeEndTime] = ['', '']
      let [createStartTime, createEndTime] = ['', '']
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
      httpAdminAiCall
        .getAiCallList({
          page: this.pageNum,
          pageSize: this.pageSize,
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
          this.list = res.data.elements
          this.total = res.data.totalSize
        })
    },
    // 获取医院列表
    getHospitalList(hospitalId) {
      httpAdminHospital
        .getHospital({ pageSize: 10000, hospitalId })
        .then((res) => {
          this.hospitalList = res.data.elements
        })
    },
    // 获取任务与期数
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
      this.addSubmit = true
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
      // 添加接口
      httpAdminAiCall
        .postInformation({
          hospitalId: this.hospitalFrom.id,
          hospitalName: this.hospitalFrom.name,
          name: this.addUserFrom.name,
          dialogFlowId: this.botFrom.dialogFlowId,
          dialogFlowName: this.botFrom.dialogFlowName,
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
          if (res.code === 'OK') {
            this.$message.success(res.message)
            this.getList()
            this.userVisible = false
            this.addSubmit = false
          } else {
            this.$message.warning(res.message)
          }
        })
    },
    // 编辑接口
    putInformation() {
      this.addSubmit = true
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
      httpAdminAiCall
        .putInformation({
          dailyStartTime: this.searchForm.daily[0],
          dailyEndTime: this.searchForm.daily[1],
          daysOfWeek: this.timeForm.checkListPeriod,
          id: this.addUserFrom.id,
          inactiveDateList,
          inactiveTimeList,
          robotCallJobId: this.addUserFrom.robotCallJobId,
          robotCount: 2,
          hospitalId: this.hospitalFrom.hospitalId,
          fileName: this.searchForm.fileName,
          fileUrl: this.searchForm.fileUrl,
        })
        .then((res) => {
          if (res.code === 'OK') {
            this.$message.success('操作成功')
          } else {
            this.$message.error(res.message)
          }
          this.getList()
          this.userVisible = false
          this.addSubmit = false
        })
    },
    // 删除
    deleteInformation(val) {
      httpAdminAiCall
        .deleteInformation({ taskId: val.robotCallJobId })
        .then((res) => {
          if (res.code === 'OK') {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          this.getList()
        })
    },
    // 开始任务
    getInformationStart(robotCallJobId) {
      httpAdminAiCall.getInformationStart({ robotCallJobId }).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('操作成功')
          this.getList()
        }
      })
    },
    // 暂停任务
    getSuspendTask(val) {
      httpAdminAiCall
        .getSuspendTask({ robotCallJobId: val.robotCallJobId })
        .then((res) => {
          if (res.code === 'OK') {
            this.$message.success('操作成功')
            this.getList()
          }
        })
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
     * excel上传
     */
    // 下载表格
    getAiDownload() {
      window.location.href =
        'https://test-api.daliangqing.com/admin/ai/information/download'
    },
    // 上传excel 阿里
    uploadFinish(val) {
      this.searchForm.fileUrl = val.value
      this.searchForm.fileName = val.name
      // this.addUserFrom.fileName = val.value;
    },
    // 添加任务
    addTask() {
      this.editBot = false
      this.addUserFrom = {}
      this.title = '添加'
      this.timeTitle = '时间添加'
      this.timeForm.checkListPeriod = [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ]
      this.$set(this.botFrom, 'dialogFlowId', {})
      this.confirmCallTime('add')
      this.userVisible = true
    },
    // 添加 编辑任务
    judgeBtn(val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.title === '添加') {
            delete this.addUserFrom.id
            delete this.addUserFrom.hospitalName
            delete this.addUserFrom.robotCallJobId
            this.postInformation()
          } else {
            this.putInformation()
          }
        } else {
          return false
        }
      })
    },
    /**
     * 获取 select 话术名称 医院名称
     */
    getBotName(val) {
      this.botFrom.dialogFlowId = val.dialogFlowId
      this.botFrom.dialogFlowName = val.name
    },
    getHospitalName(val) {
      this.hospitalFrom.id = val.id
      this.hospitalFrom.name = val.name
      // name id
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
      if (notCallTime != null && notCallTime != '') {
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
      if (notDial != undefined && notDial != '' && notDial[0] != '') {
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
    getDialable() {},
    notDialable() {},
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
    getPeriod() {},
    // 不可拨打时间段添加
    notDialTime(val) {
      let notDialTimeArr = this.notDialTimeArr
      let notDialDateArr = this.notDialDateArr
      let dialForm = this.dialForm.notCallTime
      if (val === 'time') {
        if (!dialForm || dialForm[0] === '') {
          this.$message.error('请选择不可拨打时间段')
          return
        }
      }
      if (val === 'time') {
        if (this.notDialTimeArr.length >= 2) return
        notDialTimeArr.push({ callTime: ['', ''] })
      } else {
        if (this.notDialDateArr.length >= 2) return
        notDialDateArr.push({ callDate: '' })
      }
    },
    // 确认
    confirmCallTime(val) {
      if (val === 'add') {
        // 添加任务置空 时间与日期
        this.$set(this.dialForm, 'notCallTime', '')
        this.$set(this, 'notDialTimeArr', [])
        this.$set(this.timeForm, 'notDial', [])
        this.$set(this, 'notDialDateArr', [])
      }
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
      // 是否正确添加不可拨打时间
      let getOkTime = this.disposeDaily(this.searchForm.daily)
      let oneTime = inactiveTimeList[0]?.startTime
        ? this.disposeTime(inactiveTimeList[0])
        : ''
      let twoTime = inactiveTimeList[1]?.startTime
        ? this.disposeTime(inactiveTimeList[1])
        : ''
      let threeTime = inactiveTimeList[2]?.startTime
        ? this.disposeTime(inactiveTimeList[2])
        : ''
      let switchState = this.judgeTimeSize(
        getOkTime,
        oneTime,
        twoTime,
        threeTime
      )
      if (switchState) {
        return
      }
      // 拼接周期
      if (period.length === 7) {
        if (inactiveTimeList.length === 1 && inactiveTimeList[0].startTime) {
          everyday = `每天/${callTime[0]}~${inactiveTimeList[0].startTime}和${inactiveTimeList[0].endTime}~${callTime[1]}`
          this.searchForm.setTime = everyday
        } else if (inactiveTimeList.length === 2) {
          everyday = `每天/${callTime[0]}~${inactiveTimeList[0].startTime}和${inactiveTimeList[0].endTime}~${inactiveTimeList[1].startTime}和${inactiveTimeList[1].endTime}~${callTime[1]}`
          this.searchForm.setTime = everyday
        } else if (inactiveTimeList.length === 3) {
          everyday = `每天/${callTime[0]}~${inactiveTimeList[0].startTime}和${inactiveTimeList[0].endTime}~${inactiveTimeList[1].startTime}和${inactiveTimeList[1].endTime}~${inactiveTimeList[2].startTime}和${inactiveTimeList[2].endTime}~${callTime[1]}`
          this.searchForm.setTime = everyday
        } else {
          everyday = `每天/${callTime.join('~')}`
          this.searchForm.setTime = everyday
        }
      } else {
        if (inactiveTimeList.length === 1) {
          everyday = `${period.join('、')}/${callTime[0]}~${
            inactiveTimeList[0].startTime
          }和${inactiveTimeList[0].endTime}~${callTime[1]}`
          this.searchForm.setTime = everyday
        } else if (inactiveTimeList.length === 2) {
          everyday = `${period.join('、')}/${callTime[0]}~${
            inactiveTimeList[0].startTime
          }和${inactiveTimeList[0].endTime}~${inactiveTimeList[1].startTime}和${
            inactiveTimeList[1].endTime
          }~${callTime[1]}`
          this.searchForm.setTime = everyday
        } else if (inactiveTimeList.length === 3) {
          everyday = `${period.join('、')}/${callTime[0]}~${
            inactiveTimeList[0].startTime
          }和${inactiveTimeList[0].endTime}~${inactiveTimeList[1].startTime}和${
            inactiveTimeList[1].endTime
          }~${inactiveTimeList[2].startTime}和${inactiveTimeList[2].endTime}~${
            callTime[1]
          }`
          this.searchForm.setTime = everyday
        } else {
          this.searchForm.setTime = `${period.join('、')}/${callTime.join('~')}`
        }
      }
      if (val) {
        this.timeVisible = false
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
          sessionStorage.setItem('taskHospitalId', val.hospitalId)
          this.$router.push({
            name: 'problemstatistics',
            params: { id: val.robotCallJobId },
          })
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
        case 'USER_PAUSE':
          this.getSuspendTask(val)
          break
        case 'operation':
          console.log(val.aiName)
          sessionStorage.setItem('taskHospitalId', val.hospitalId)
          sessionStorage.setItem('taskAiName', val.aiName)
          sessionStorage.setItem('taskRobotCallJobId', val.robotCallJobId)
          this.$router.push({ name: 'analysis' })
          break
      }
    },
    // 根据任务状态显示操作
    moreMenus(val, state) {
      switch (state) {
        case 'edit':
          if (
            val === 'IN_PROCESS' ||
            val === 'COMPLETED' ||
            val === 'SYSTEM_SUSPENDED'
          ) {
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
            return true
          } else {
            return false
          }
          break
        case 'startTask':
          if (val === 'IN_PROCESS' || val === 'COMPLETED') {
            return false
          } else {
            return true
          }
          break
        case 'USER_PAUSE':
          if (val === 'RUNNABLE' || val === 'IN_PROCESS') {
            return true
          } else {
            return false
          }
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
     * 任务编辑
     */
    // 获取任务详情 显示 编辑
    async showTaskdetail(val) {
      this.excelStatus = this.upExcel(val.status)
      this.title = '编辑'
      this.timeTitle = '时间编辑'
      this.editBot = true
      // 不可拨打时间、日期 置空
      this.dialForm.notCallTime = []
      this.notDialTimeArr = []
      delete this.timeForm.notDial
      const { data: res } = await this.getInformationTask(val.robotCallJobId)
      this.addUserFrom = JSON.parse(JSON.stringify(res))
      // 回显 BOT名称
      this.addUserFrom.dialogFlowId = {
        dialogFlowId: res.dialogFlowId,
        name: res.dialogFlowName,
      }
      this.addUserFrom.hospitalId = {
        id: res.hospitalId,
        name: res.hospitalName,
      }
      this.$set(
        this.addUserFrom,
        'name',
        JSON.parse(JSON.stringify(res.aiName))
      )
      this.timeForm.checkListPeriod = JSON.parse(
        JSON.stringify(res.aiParameter.daysOfWeek)
      )
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
              res.aiParameter.inactiveDateList[1].endDate,
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
      this.confirmCallTime(true)
      this.userVisible = true
    },
    /**
     * 是否可重新上传excel
     */
    upExcel(val) {
      switch (val) {
        case 'NOT_STARTED':
          return false
          break
        case 'USER_PAUSE':
          return false
          break
        case 'SYSTEM_HANG_UP':
          return false
          break
        default:
          return false
      }
    },
    /**
     * 路由跳转
     */
    skipRouter(name, val, state) {
      if (state !== undefined && state !== 'cause') {
        sessionStorage.setItem('taskPhoneState', JSON.stringify(state))
        // 跳转已呼用户 暂时不带医院id
        // sessionStorage.setItem('taskHospitalId', val.hospitalId)
      }
      this.$router.push({
        name,
        query: { robotCallJobId: val.robotCallJobId },
      })
    },
    /**
     * 搜索
     */
    searchBtn() {
      this.pageNum = 1
      this.getList()
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
      this.$set(this, 'getSearchForm', {})
      this.$set(this, 'aiTaskList', [])
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

<style scoped>
.hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
