<template>
  <div class="app-container">
    <el-form ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="80px"
      style="width:50%">
      <el-form-item label="选择操作">
        <el-select clearable
          class="w100"
          @change="selectOperation"
          v-model="operationType">
          <el-option label="ai新增"
            value="ai新增"></el-option>
          <el-option label="ai系统删除"
            value="ai系统删除"></el-option>
          <el-option label="ai医院删除"
            value="ai医院删除"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间"
        prop="time"
        v-if="operationType === 'ai新增'">
        <el-date-picker v-model="form.time"
          class="w100"
          type="datetimerange"
          range-separator="至"
          value-format="timestamp"
          @change="changeTime"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item>
      <!-- 新增多选医院 -->
      <el-form-item label="选择医院"
        v-if="operationType === 'ai新增'">
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
      <!-- 删除单选医院 -->
      <el-form-item label="选择医院"
        v-if="operationType === 'ai医院删除'"
        prop="removeHospital">
        <el-select clearable
          class="w100"
          @change="selectRemoveHospital"
          v-model="removeHospitalId">
          <el-option v-for="item in hospitalList"
            :key="item.id"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <div v-if="operationType === 'ai新增'">
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
      </div>
      <el-form-item>
        <el-button type="primary"
          @click="onSubmit"
          v-if="operationType === 'ai新增'">ai新增</el-button>
        <el-button type="primary"
          @click="removeSystem"
          v-if="operationType === 'ai系统删除'">ai系统删除</el-button>
        <el-button type="primary"
          @click="removeHospital"
          v-if="operationType === 'ai医院删除'">ai医院删除</el-button>
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
      formRules: {
        time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        number: [{ required: true, message: '请输入数量', trigger: 'blur' }],
      },
      operationType: 'ai新增',
      removeHospitalId: '', // 删除医院的id
      form: {
        time: '',
        beginDate: '',
        endDate: '',
        equipmentHeartRateAis: [],
      },
      hospitalList: [],
    }
  },
  created() {
    this.getHospitalList()
  },
  methods: {
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 选择医院
    selectHospital(val) {
      this.form.equipmentHeartRateAis = val
    },
    // 选择操作类型
    selectOperation(val) {
      this.$refs.formRef.resetFields()
    },
    // 选择删除医院
    selectRemoveHospital(val) {},
    // 选择时间
    changeTime(val) {
      this.form.beginDate = val[0]
      this.form.endDate = val[1]
    },
    // 新增
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
    // 系统删除
    async removeSystem() {
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
      httpAdminHeartRate.deleteHeartRateAiAll().then((res) => {
        if (res.code === 'OK') {
          this.$message.success('删除成功')
        }
      })
    },
    // 医院删除
    async removeHospital() {
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
      if (!this.removeHospitalId) {
        return this.$message.error('请选择医院')
      }
      httpAdminHeartRate
        .deleteHeartRateAi(this.removeHospitalId)
        .then((res) => {
          if (res.code === 'OK') {
            this.$message.success('删除成功')
            this.removeHospitalId = ''
          }
        })
    },
  },
}
</script>

<style>
</style>