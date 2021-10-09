<template>
    <div class="app-container">
        <!-- 搜索区域 -->
        <div class="search-box">
            <el-form :model="searchForm" class="searchForm" :inline="true">
                <el-form-item label="用户姓名">
                    <el-input v-model="searchForm.name" size="small" placeholder="请输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号">
                    <el-input
                        v-model="searchForm.phone"
                        maxlength="11"
                        size="small"
                        placeholder="请输入用户手机号"
                    ></el-input>
                </el-form-item>
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
                <el-form-item label="呼叫时间">
                    <el-date-picker
                        v-model="searchForm.callDuration"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="通话状态">
                    <el-select
                        v-model="searchForm.hospitalId"
                        size="small"
                        filterable
                        placeholder="请选择医院"
                    >
                        <el-option
                            v-for="item in AiResultStatus"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
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
        <!-- 表格区域 -->
        <EleTable
            :data="list"
            :header="tableHeaderBig"
            :pageNum="pageNum"
            :pageSize="pageSize"
            :total="total"
            show-summary
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        >
            <el-table-column align="center" label="序号" type="index"></el-table-column>
            <el-table-column align="center" label="医院名称" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="用户姓名" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="用户手机号" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="任务名称" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="BOT名称" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="期名" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="通话时长" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="对话轮次" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="呼叫时间" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="通话状态" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="挂断状态" prop="hospitalName"></el-table-column>
            <el-table-column align="center" label="通话详情" prop="hospitalName"></el-table-column>
        </EleTable>
    </div>
</template>

<script>
import EleTable from '@/components/Table'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import {
    parseTime,
    AiResultStatus,
    formatterElement,
} from '@/utils/index'
export default {
    components: {
        EleTable,
    },
    data() {
        return {
            AiResultStatus,
            searchForm: {},
            hospitalList: [],
            list: [],
            tableHeaderBig: [],
            // 分页区域
            pageSize: 10,
            pageNum: 1,
            total: 0,
        }
    },
    created() {
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
        /**
         * 搜索
         */
        searchBtn() {
        },
        searchReset() {
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

<style>
</style>