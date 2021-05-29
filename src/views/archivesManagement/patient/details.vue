<template>
  <div class="app-container">
    <el-form ref="FormRef"
      :model="form"
      :rules="FormRules"
      label-width="100px">
      <div class="content-box">
        <div>
          <h3>基本检查</h3>
          <el-form-item label="饮食习惯"
            prop="eatHabits">
            <el-select multiple
              v-model="form.eatHabits"
              placeholder="请选择饮食习惯">
              <el-option v-for="item in eatHabitsList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否吸烟"
            prop="isSmoke">
            <el-select v-model="form.isSmoke"
              placeholder="请选择是否吸烟">
              <el-option v-for="item in isSmokeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否饮酒"
            prop="isDrink">
            <el-select v-model="form.isDrink"
              placeholder="请选择是否饮酒">
              <el-option v-for="item in isSmokeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="熬夜情况"
            prop="stayUpLate">
            <el-select v-model="form.stayUpLate"
              placeholder="请选择熬夜情况">
              <el-option v-for="item in stayUpLateList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="静坐时长"
            prop="sit">
            <el-input v-model="form.sit"
              placeholder="请选择静坐时长"></el-input>
          </el-form-item>
          <el-form-item label="运动习惯"
            prop="exercise">
            <el-select v-model="form.exercise"
              placeholder="请选择运动习惯">
              <el-option v-for="item in exerciseList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="慢性病史"
            prop="chronicDisease">
            <el-select multiple
              v-model="form.chronicDisease"
              placeholder="请选择慢性病史">
              <el-option v-for="item in chronicDiseaseList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他"
            prop="otherDisease">
            <el-input v-model="form.otherDisease"
              placeholder="请输入其他慢性病史"></el-input>
          </el-form-item>
        </div>
        <div>
          <h3>体格检查</h3>
          <el-form-item label="身高"
            prop="height">
            <el-input v-model="form.height"
              @blur="computeBmi"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入身高"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">cm</i></el-input>
          </el-form-item>
          <el-form-item label="体重"
            prop="weight">
            <el-input v-model="form.weight"
              @blur="computeBmi"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入体重"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">kg</i></el-input>
          </el-form-item>
          <el-form-item label="BMI"
            prop="bmi">
            <el-input v-model="form.bmi"
              disabled></el-input>
          </el-form-item>
          <el-form-item label="腰围"
            prop="waistline">
            <el-input v-model="form.waistline"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入腰围"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">kg</i></el-input>
          </el-form-item>
          <el-form-item label="臀围"
            prop="hips">
            <el-input v-model="form.hips"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入臀围"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">kg</i></el-input>
          </el-form-item>
          <el-form-item label="收缩压/高压"
            prop="shrinkHighPressure">
            <el-input v-model="form.shrinkHighPressure"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入收缩压/高压"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="舒张压/低压"
            prop="diastoleLowPressure">
            <el-input v-model="form.diastoleLowPressure"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入舒张压/低压"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="心率"
            prop="heartRate">
            <el-input v-model="form.heartRate"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入心率"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">bpm</i></el-input>
          </el-form-item>
        </div>
        <div>
          <h3>实验室检查</h3>
          <el-form-item label="血型"
            prop="bloodType">
            <el-input v-model="form.bloodType"
              placeholder="请选择血型"></el-input>
          </el-form-item>
          <el-form-item label="空腹血糖"
            prop="fastingBloodGlucose">
            <el-input v-model="form.fastingBloodGlucose"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入空腹血糖"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="总胆固醇"
            prop="totalCholesterol">
            <el-input v-model="form.totalCholesterol"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入总胆固醇"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="甘油三酯"
            prop="triglycerides">
            <el-input v-model="form.triglycerides"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入甘油三酯"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="高密度脂蛋白胆固醇"
            prop="hdlCholesterol">
            <el-input v-model="form.hdlCholesterol"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入高密度脂蛋白胆固醇"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="低密度脂蛋白胆固醇"
            prop="ldlCholesterol">
            <el-input v-model="form.ldlCholesterol"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入低密度脂蛋白胆固醇"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="肌酐"
            prop="creatinine">
            <el-input v-model="form.creatinine"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入肌酐"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">umol/L</i></el-input>
          </el-form-item>
          <el-form-item label="尿酸"
            prop="uricAcid">
            <el-input v-model="form.uricAcid"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入尿酸"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">umol/L</i></el-input>
          </el-form-item>
          <el-form-item label="血钾"
            prop="serumPotassium">
            <el-input v-model="form.serumPotassium"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              placeholder="请输入血钾"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="肝功能"
            prop="liverFunction">
            <el-select v-model="form.liverFunction"
              placeholder="请选择肝功能情况">
              <el-option v-for="item in liverFunction"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="肾功能"
            prop="kidneyFunction">
            <el-select v-model="form.kidneyFunction"
              placeholder="请选择肾功能情况">
              <el-option v-for="item in liverFunction"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="颈动脉斑块"
            prop="carotidPlaque">
            <el-select v-model="form.carotidPlaque"
              placeholder="请选择颈动脉斑块情况">
              <el-option v-for="item in carotidPlaque"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="心电图"
            prop="electrocardiogram">
            <el-select v-model="form.electrocardiogram"
              placeholder="请选择心电图情况">
              <el-option v-for="item in liverFunction"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="眼底检查"
            prop="fundusExamination">
            <el-select v-model="form.fundusExamination"
              placeholder="请选择眼底检查情况">
              <el-option v-for="item in liverFunction"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="btn-box">
      <el-button size="small"
        plain
        @click="cancel">取消</el-button>
      <el-button size="small"
        type="primary"
        @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import { httpHospitalArchives } from "@/api/hospital/httpHospitalArchives";
import {
  eatHabitsList,
  isSmokeList,
  stayUpLateList,
  exerciseList,
  chronicDiseaseList,
  liverFunction,
  carotidPlaque,
} from "@/utils/index";
export default {
  data() {
    return {
      eatHabitsList,
      isSmokeList,
      stayUpLateList,
      exerciseList,
      chronicDiseaseList,
      liverFunction,
      carotidPlaque,
      FormRules: {
        height: [{ required: true, message: "请输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "请输入体重", trigger: "blur" }],
      },
      form: {
        // 基本信息
        eatHabits: [],
        isSmoke: "",
        isDrink: "",
        stayUpLate: "",
        sit: "",
        exercise: "",
        chronicDisease: [],
        stayUpLate: "",
        otherDisease: "",
        // 体格检查
        height: "",
        weight: "",
        bmi: 0,
        waistline: "",
        hips: "",
        shrinkHighPressure: "",
        diastoleLowPressure: "",
        heartRate: "",
        // 实验室检查
        bloodType: "",
        fastingBloodGlucose: "",
        totalCholesterol: "",
        triglycerides: "",
        hdlCholesterol: "",
        ldlCholesterol: "",
        creatinine: "",
        uricAcid: "",
        serumPotassium: "",
        uricAcid: "",
        liverFunction: "",
        kidneyFunction: "",
        carotidPlaque: "",
      },
    };
  },
  created() {},
  computed: {
    // bmi(){
    //   return this.form.weight / ((this.form.height / 100) * (this.form.height / 100))
    // },
  },
  methods: {
    computeBmi(){
    if (this.form.height && this.form.weight) {
      console.log(333);
      this.form.bmi = (this.form.weight / ((this.form.height / 100) * (this.form.height / 100))).toFixed(2)
    }
    },
    cancel() {
      this.$router.push({ path: "/archivesManagement/patient" });
    },
    confirm() {
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          httpHospitalArchives.postArchives(this.form).then((res) => {
            if (res.code === "OK") {
              this.$router.push({ path: "/archivesManagement/patient" });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  div {
    flex: 1;
    width: 95%;
  }
}
.btn-box {
  text-align: center;
}
// “体质指数（BMI）计算公式=体重（千克）除以身高（平方米）。BMI指数是用体重公斤数除以身高米数平方得出的数字
</style>