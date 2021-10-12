<template>
  <div class="app-container">
    <el-form ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="80px"
      style="width:50%">
      <el-form-item label="选择时间"
        prop="time">
        <el-date-picker class="w100"
          v-model="form.time"
          type="daterange"
          align="right"
          unlink-panels
          value-format="timestamp"
          @change="changeTime"
          :default-time="['00:00:00', '23:59:59']"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择医院">
        <el-select multiple
          clearable
          class="w100"
          @change="selectHospital"
          value-key="id"
          v-model="form.equipmentHeartRateAis">
          <el-option v-for="item in hospitalList"
            :key="item.id"
            :label="item.name"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <div v-for="(item,index) in form.equipmentHeartRateAis"
        :key="index">
        <div style="margin: 0 0 20px 30px;color:#1890FF"
          class="fw">{{item.name}}</div>
        <el-form-item label="医院名称">
          <el-select class="w100"
            disabled
            v-model="item.id">
            <el-option v-for="item in hospitalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="item.number"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary"
          @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { httpAdminHeartRate } from '@/api/admin/httpAdminHeartRate'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
export default {
  data() {
    return {
      time: '',
      formRules: {
        time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        number: [{ required: true, message: '请输入数量', trigger: 'blur' }],
      },
      form: {
        beginDate: '',
        endDate: '',
        equipmentHeartRateAis: [],
      },
      hospitalList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const start = new Date(new Date().toLocaleDateString()).getTime()
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const start =
                new Date(new Date().toLocaleDateString()).getTime() -
                3600 * 1000 * 24 * 6
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const start =
                new Date(new Date().toLocaleDateString()).getTime() -
                3600 * 1000 * 24 * 30
              const end = new Date().getTime()
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },
  created() {
    this.getHospitalList()
  },
  methods: {
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        console.log(res.data)
        this.hospitalList = res.data.elements
      })
    },
    selectHospital(val) {
      this.form.equipmentHeartRateAis = val
    },
    changeTime(val) {
      this.form.beginDate = val[0]
      this.form.endDate = val[1]
    },
    onSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          httpAdminHeartRate.postHeartRateAi(this.form).then((res) => {
            if (res.code === 'OK') {
              this.$message.success('新增成功')
              location.reload()
            }
          })
        }
      })
    },
  },
}
</script>

<style>
</style>