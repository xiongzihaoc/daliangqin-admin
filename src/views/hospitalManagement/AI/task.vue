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
        <!-- 表格组件 -->
        <EleTable></EleTable>
    </div>
</template>

<script>
import EleTable from '@/components/Untable'
import { httpAdminTask } from '@/api/admin/httpAdminTask'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
export default {
    components: {
        EleTable
    },
    data() {
        return {
            searchForm: {
                hospitalId: '',
                taskState: '',
                completionTime: '',
                creationTime: ''
            },
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
            tableHeaderBig: [
                { type: 'index', label: '序号' },
                { type: 'index', label: '医院名称' },
                { type: 'index', label: '任务名称' },
                { type: 'index', label: '期名' },
                { type: 'index', label: 'BOT名称' },
                { type: 'index', label: '任务状态' },
                { type: 'index', label: '总外呼人数' },
                { type: 'index', label: '已呼人数' },
                { type: 'index', label: '未呼人数' },
                { type: 'index', label: '已经接听人数' },
                { type: 'index', label: '并发数据' },
                { type: 'index', label: '启动时间' },
                { type: 'index', label: '完成时间' },
                { type: 'index', label: '创建人' },
                { type: 'index', label: '创建时间' },
                { type: 'index', label: '操作' },
            ]
        }
    },
    mounted() {
        this.getHospitalList()
    },
    methods: {
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

        }
    }
}
</script>

<style>
</style>