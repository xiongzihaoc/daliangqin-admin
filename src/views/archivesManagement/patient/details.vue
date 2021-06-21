<template>
  <div class="app-container">
    <el-form ref="FormRef"
      :model="form"
      :rules="FormRules"
      label-width="100px">
      <div class="content-box">
        <div>
          <h3>基本资料</h3>
          <el-form-item label="用户姓名"
            prop="name">
            <el-input v-model="form.name"
              placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <!-- 用户头像 -->
          <el-form-item label="用户头像"
            prop="photoUrl">
            <single-upload v-model="form.photoUrl"
              uploadType="AVATAR" />
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号"
            prop="phone">
            <el-input v-model="form.phone"
               v-Int
              placeholder="请输入该用户手机号"></el-input>
          </el-form-item>
          <!-- 身份证 -->
          <el-form-item label="身份证号"
            prop="idCard">
            <el-input v-model="form.idCard"
               v-Int
              placeholder="请输入该用户身份证号"></el-input>
          </el-form-item>
          <el-form-item label="省市区"
            prop="addressDetail">
            <el-cascader v-model="form.addressDetail"
              :options="addressJson"
              :props="cateListProps"
              @change="selectAddrssChange"
              clearable></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址"
            prop="address">
            <el-input v-model="form.address"
              placeholder="请输入医院地址"></el-input>
          </el-form-item>
          <!-- 对应医师 -->
          <el-form-item label="对应医师"
            prop="doctorUserId">
            <el-select v-model="form.doctorUserId"
              filterable
              placeholder="请输入内容搜索">
              <el-option v-for="item in toDoctorList"
                :key="item.id"
                :value="item.id"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </div>
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
          <el-form-item label="吸烟习惯"
            prop="smokeType">
            <el-select v-model="form.smokeType"
              placeholder="请选择吸烟习惯">
              <el-option v-for="item in isSmokeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="饮酒习惯"
            prop="drinkType">
            <el-select v-model="form.drinkType"
              placeholder="请选择饮酒习惯">
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
            <el-select v-model="form.sit"
              placeholder="请选择静坐时长">
              <el-option v-for="item in sitType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
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
               v-Int
              placeholder="请输入身高"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">cm</i></el-input>
          </el-form-item>
          <el-form-item label="体重"
            prop="weight">
            <el-input v-model="form.weight"
              @blur="computeBmi"
               v-Int
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
               v-Int
              placeholder="请输入腰围"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">cm</i></el-input>
          </el-form-item>
          <el-form-item label="臀围"
            prop="hips">
            <el-input v-model="form.hips"
              v-Int
              placeholder="请输入臀围"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">kg</i></el-input>
          </el-form-item>
          <el-form-item label="收缩压/高压"
            prop="shrinkHighPressure">
            <el-input v-model="form.bloodPressure.shrinkHighPressure"
              v-Int
              placeholder="请输入收缩压/高压"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="舒张压/低压"
            prop="diastoleLowPressure">
            <el-input v-model="form.bloodPressure.diastoleLowPressure"
              v-Int
              placeholder="请输入舒张压/低压"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="心率"
            prop="heartRate">
            <el-input v-model="form.heartRate"
              v-Intv-Int
              placeholder="请输入心率"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">bpm</i></el-input>
          </el-form-item>
        </div>
        <div>
          <h3>实验室检查</h3>
          <el-form-item label="血型"
            prop="bloodType">
            <el-select v-model="form.bloodType"
              placeholder="请选择血型">
              <el-option v-for="item in bloodTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="空腹血糖"
            prop="fastingBloodGlucose">
            <el-input v-model="form.fastingBloodGlucose"
              v-Int
              placeholder="请输入空腹血糖"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="总胆固醇"
            prop="totalCholesterol">
            <el-input v-model="form.bloodLipids.totalCholesterol"
              v-Int
              placeholder="请输入总胆固醇"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="甘油三酯"
            prop="triglycerides">
            <el-input v-model="form.bloodLipids.triglycerides"
              v-Int
              placeholder="请输入甘油三酯"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="高密度脂蛋白胆固醇"
            prop="hdlCholesterol">
            <el-input v-model="form.bloodLipids.hdlCholesterol"
              v-Int
              placeholder="请输入高密度脂蛋白胆固醇"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="低密度脂蛋白胆固醇"
            prop="ldlCholesterol">
            <el-input v-model="form.bloodLipids.ldlCholesterol"
              v-Int
              placeholder="请输入低密度脂蛋白胆固醇"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="肌酐"
            prop="creatinine">
            <el-input v-model="form.creatinine"
              v-Int
              placeholder="请输入肌酐"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">μmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="尿酸"
            prop="uricAcid">
            <el-input v-model="form.uricAcid"
              v-Int
              placeholder="请输入尿酸"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">umol/L</i></el-input>
          </el-form-item>
          <el-form-item label="血钾"
            prop="serumPotassium">
            <el-input v-model="form.serumPotassium"
              v-Int
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
import singleUpload from "@/components/Upload";
import { httpAdminArchives } from "@/api/admin/httpAdminArchives";
import { httpAdminPatient } from "@/api/admin/httpAdminPatient";
import addressJson from "@/utils/address.json";
import {
  eatHabitsList,
  isSmokeList,
  stayUpLateList,
  exerciseList,
  chronicDiseaseList,
  liverFunction,
  carotidPlaque,
  sitType,
  bloodTypeList,
  validatePhone,
  validateIdCard,
} from "@/utils/index";
export default {
  components: {
    singleUpload,
  },
  data() {
    return {
      addressJson,
      eatHabitsList,
      isSmokeList,
      stayUpLateList,
      exerciseList,
      chronicDiseaseList,
      liverFunction,
      carotidPlaque,
      sitType,
      bloodTypeList,
      FormRules: {
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        photoUrl: [
          { required: true, message: "请上传用户头像", trigger: "blur" },
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        idCard: [
          { required: true, trigger: "blur", validator: validateIdCard },
        ],
        type: [{ required: true, message: "请选择职位", trigger: "blur" }],
        addressDetail: [
          { required: true, message: "请选择省市区", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        doctorUserId: [
          { required: true, message: "请选择对应医师", trigger: "blur" },
        ],
        height: [{ required: true, message: "请输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "请输入体重", trigger: "blur" }],
      },
      // 级联配置
      cateListProps: {
        value: "name", //匹配响应数据中的id
        label: "name", //匹配响应数据中的name
        children: "districts", //匹配响应数据中的children
      },
      // 转诊医生列表
      toDoctorList: [],
      form: {
        // 基本信息
        name: "",
        photoUrl: "",
        phone: "",
        idCard: "",
        addressDetail: "",
        address: "",
        province: "",
        city: "",
        area: "",
        doctorUserId: "",
        // 基本检查
        eatHabits: [],
        smokeType: "",
        drinkType: "",
        stayUpLate: "",
        sit: "",
        exercise: "",
        chronicDisease: [],
        stayUpLate: "",
        otherDisease: "",
        // 体格检查
        height: 160,
        weight: 60,
        bmi: 0,
        waistline: 60,
        hips: 80,
        bloodPressure: {
          shrinkHighPressure: 140,
          diastoleLowPressure: 90,
        },
        heartRate: 60,
        // 实验室检查
        bloodType: "",
        fastingBloodGlucose: 3.9,
        bloodLipids: {
          totalCholesterol: 3.0,
          triglycerides: 1,
          hdlCholesterol: 1,
          ldlCholesterol: 1,
        },
        creatinine: 60,
        uricAcid: 300,
        serumPotassium: 3.5,
        liverFunction: "",
        kidneyFunction: "",
        carotidPlaque: "",
      },
    };
  },
  created() {
    // 判断是编辑还是新增
    if (this.$route.query.type === "edit") {
      this.getList();
    } else {
    }
  },
  mounted() {
    this.getTodoctorList();
    this.computeBmi();
    this.getTreeData(addressJson);
  },
  methods: {
    // 列表数据
    getList() {
      httpAdminPatient
        .getPatient({ userId: this.$route.query.id })
        .then((res) => {
          // 回显表单数据
          let value = res.data.elements[0];
          if (value.archivesMongo != null) {
            if (value.archivesMongo.bloodLipids === null) {
              value.archivesMongo.bloodLipids = this.form.bloodLipids;
            }
            if (value.archivesMongo.bloodPressure === null) {
              value.archivesMongo.bloodPressure = this.form.bloodPressure;
            }
            if (
              value.archivesMongo.eatHabits === null ||
              value.archivesMongo.eatHabits === []
            ) {
              value.archivesMongo.eatHabits = this.form.eatHabits;
            }
            if (
              value.archivesMongo.chronicDisease === null ||
              value.archivesMongo.chronicDisease === []
            ) {
              value.archivesMongo.chronicDisease = this.form.chronicDisease;
            }
            this.form = value.archivesMongo;
            this.form.province = value.province;
            this.form.city = value.city;
            this.form.area = value.area;
            this.$set(this.form, "address", value.address);
            this.$set(this.form, "photoUrl", value.avatarUrl);
            this.computeBmi()
            this.form.addressDetail = [
              this.form.province,
              this.form.city,
              this.form.area,
            ];
          }
        });
    },
    // 级联change事件
    selectAddrssChange(val) {
      if (val) {
        this.form.province = val[0];
        this.form.city = val[1];
        this.form.area = val[2];
      }
    },
    // 递归处理json文件的最后一级
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].districts.length < 1) {
          //  将children设为undefined
          data[i].districts = undefined;
        } else {
          // 若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].districts);
        }
      }
      return data;
    },
    // 获取转诊医生列表
    getTodoctorList() {
      httpAdminPatient.getPatientTransfer().then((res) => {
        this.toDoctorList = res.data.elements;
      });
    },
    // 根据身高体重计算BMI
    computeBmi() {
      if (this.form.height && this.form.weight) {
        this.form.bmi = (
          this.form.weight /
          ((this.form.height / 100) * (this.form.height / 100))
        ).toFixed(2);
      }
    },
    cancel() {
      this.$router.push({ path: "/archivesManagement/patient" });
    },
    confirm() {
      console.log(this.$route.query.id);
      console.log(this.form.id);
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 编辑
          if (this.$route.query.type === "edit") {
            httpAdminArchives
              .putArchives(this.form, this.form.id)
              .then((res) => {
                if (res.code === "OK") {
                  this.$router.push({ path: "/archivesManagement/patient" });
                }
              });
          } else {
            // 新增
            httpAdminArchives.postArchives(this.form).then((res) => {
              if (res.code === "OK") {
                this.$router.push({ path: "/archivesManagement/patient" });
              }
            });
          }
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
</style>