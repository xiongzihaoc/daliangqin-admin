<template>
    <div class="app-container">
        <!-- 搜索区域 -->
        <div class="search-box">
            <el-form class="searchForm" ref="searchFormRef" :model="searchForm" :inline="true">
                <!-- 医院名称 -->
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
                <!-- 任务期名 -->
                <el-form-item>
                    <el-select v-model="searchForm.task" size="small" placeholder="请选择任务名称">
                        <el-option label="期名" value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="searchForm.task" size="small" placeholder="任务">
                        <el-option label="一期" value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 任务状态 -->
                <el-form-item label="任务状态">
                    <el-select v-model="searchForm.taskState" size="small" filterable>
                        <el-option
                            v-for="item in taskState"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- 完成时间 -->
                <el-form-item label="完成时间">
                    <el-select v-model="searchForm.completionTime" size="small" filterable>
                        <el-option label="完成时间" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 创建时间 -->
                <el-form-item label="创建时间">
                    <el-select v-model="searchForm.creationTime" size="small" filterable>
                        <el-option label="创建时间" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <!-- bottom -->
                <el-form-item>
                    <el-button
                        @click="searchBtn"
                        type="primary"
                        size="small"
                        icon="el-icon-search"
                    >搜索</el-button>
                    <el-button @click="searchReset" size="small" plain icon="el-icon-refresh">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button
                @click="taskAdd"
                type="primary"
                class="tableAdd"
                size="small"
                plain
                icon="el-icon-plus"
            >添加任务</el-button>
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
            <el-table-column align="center" type="index" label="序号"></el-table-column>
            <el-table-column align="center" label="医院名称" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="BOT名称" prop></el-table-column>
            <el-table-column align="center" label="任务状态"></el-table-column>
            <el-table-column align="center" label="总外呼人数"></el-table-column>
            <el-table-column align="center" label="已呼人数"></el-table-column>
            <el-table-column align="center" label="未呼人数"></el-table-column>
            <el-table-column align="center" label="已接听人数"></el-table-column>
            <el-table-column align="center" label="未接听人数"></el-table-column>
            <el-table-column align="center" label="并发数量"></el-table-column>
            <el-table-column align="center" label="启动时间"></el-table-column>
            <el-table-column align="center" label="完成时间"></el-table-column>
            <el-table-column align="center" label="创建人"></el-table-column>
            <el-table-column align="center" label="创建时间"></el-table-column>
            <el-table-column align="center" label="操作"></el-table-column>
        </EleTable>
        <!-- 添加用户 -->
        <el-dialog title="添加" :visible.sync="userVisible" width="40%">
            <el-form :rules="formRules" :model="addUserFrom" label-width="100px">
                <el-form-item label="选择医院" prop="name">
                    <el-select
                        v-model="addUserFrom.hospitalId"
                        filterable
                        style="width:100%;"
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
            </el-form>
            <el-form :model="addUserFrom" label-width="100px">
                <el-form-item label="任务名称">
                    <el-input placeholder="请输入任务名称和"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="addUserFrom" label-width="100px">
                <el-form-item label="BOT名称">
                    <el-select
                        v-model="addUserFrom.BOT"
                        filterable
                        style="width:100%;"
                        placeholder="请选择BOT名称"
                    >
                        <el-option label="BOT名称" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="并发数量">
                    <el-input placeholder="请输入并发数量"></el-input>
                </el-form-item>
                <el-form-item label="并发数量">
                    <el-input placeholder="请输入并发数量"></el-input>
                </el-form-item>
                <el-form-item label="时间设置">
                    <el-input @focus="userSetTime"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userVisible = false">取 消</el-button>
                <el-button type="primary" @click="userVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- ai时间段 -->
        <el-dialog title="时间添加" :visible.sync="timeVisible" width="40%">
            <el-form>
                <el-form-item label="可拨打时间段">
                    <el-time-picker
                        is-range
                        format="HH:mm:ss"
                        v-model="dialForm"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        @change="time"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="不可拨打时间段" style="display: flex;">
                    <div>
                        <el-time-picker
                            is-range
                            format="HH:mm:ss"
                            v-model="dialForm"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                            @change="time"
                        ></el-time-picker>
                    </div>
                     <el-button type="primary" size="small">添加</el-button>
                </el-form-item>
                <el-form-item label="重复周期"></el-form-item>
                <el-form-item label="不可拨打日期"></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="timeVisible = false">取 消</el-button>
                <el-button type="primary" @click="timeVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import EleTable from '@/components/Table'
import { httpAdminAiCall } from '@/api/admin/httpAdminAiCall'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
export default {
    components: {
        EleTable
    },
    data() {
        return {
            formRules: {
                name: [{ required: true, message: '请选择医院', trigger: 'change' }],
            },
            // 搜索表单
            searchForm: {
                hospitalId: '',
                taskState: '',
                completionTime: '',
                creationTime: '',
                task: '',
            },
            addUserFrom: {
                time: '',
            },
            dialForm: [new Date(new Date().toLocaleDateString()), new Date()],
            list: [],
            hospitalList: [],
            taskState: [
                {
                    label: '未开始',
                    value: '0'
                },
                {
                    label: '进行中',
                    value: '1'
                },
                {
                    label: '用户暂停',
                    value: '2'
                },
                {
                    label: '系统暂停',
                    value: '3'
                },
                {
                    label: '已完成',
                    value: '4'
                },
                {
                    label: '系统挂起',
                    value: '5'
                },
                {
                    label: '已终止',
                    value: '6'
                },
            ],
            tableHeaderBig: [],
            // 分页区域
            pageSize: 10,
            pageNum: 1,
            total: 0,
            // 弹框区域
            userVisible: true,
            timeVisible: true,
        }
    },
    mounted() {
        this.getHospitalList()
        this.getAiCallList()
    },
    methods: {
        time() {
            console.log(this.dialForm)
        },
        /* 列表数据 */
        getAiCallList() {
            httpAdminAiCall.getAiCallList().then(res => {
                console.log('ai列表', res)
                this.list = res.data.elements
            })
        },
        /* 获取医院列表 */
        getHospitalList() {
            httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
                console.log(res)
                this.hospitalList = res.data.elements
            })
        },
        /* 搜索 */
        searchBtn() {

        },
        /* 重置 */
        searchReset() {

        },
        /* 添加任务 */
        taskAdd() {
            this.userVisible = true
        },
        /* 时间设置 */
        userSetTime() {
            this.timeVisible = true
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
    }
}
</script>

<style>
</style>