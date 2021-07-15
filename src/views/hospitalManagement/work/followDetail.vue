<template>
  <div class="app-container">
    <el-form ref="FormRef"
      :model="form"
      :rules="FormRules"
      label-width="130px">
      <div class="content-box">
        <div>
          <h3>随访基本信息</h3>
          <el-form-item label="随访类型"
            prop="name">
            <el-select disabled
              v-model="highBloodForm.diseaseType"
              placeholder="请选择随访类型">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择医院"
            prop="hospitalName">
            <el-select v-model="highBloodForm.hospitalName"
              @change="selectHospital"
              placeholder="请选择医生"
              value-key="id">
              <el-option v-for="item in hospitalList"
                :key="item.id"
                :label="item.name"
                :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择医生"
            prop="doctorName">
            <el-select v-model="highBloodForm.doctorName"
              @change="selectDoctor"
              placeholder="请选择医生"
              value-key="id">
              <el-option v-for="item in doctorList"
                :key="item.id"
                :label="item.name"
                :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医生身份证号"
            prop="doctorIdcard">
            <el-input disabled
              v-model="highBloodForm.doctorIdcard">
            </el-input>
          </el-form-item>
          <el-form-item label="随访方式"
            prop="type">
            <el-select v-model="highBloodForm.type"
              placeholder="请选择随访方式">
              <el-option v-for="item in followTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择用户"
            prop="patientName">
            <el-select v-model="highBloodForm.patientName"
              placeholder="请选择用户"
              value-key="id"
              @change="selectPatient">
              <el-option v-for="item in patientList"
                :key="item.id"
                :label="item.name"
                :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户身份证号"
            prop="patientIdCard">
            <el-input disabled
              v-model="highBloodForm.patientIdCard">
            </el-input>
          </el-form-item>
          <el-form-item label="随访开始时间"
            prop="phone">
            <el-date-picker v-model="highBloodForm.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="timestamp"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="随访结束时间"
            prop="phone">
            <el-date-picker v-model="highBloodForm.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="timestamp"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="症状"
            prop="phone">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择症状">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="症状其他"
            prop="phone">
            <el-input v-model="highBloodForm.name">
            </el-input>
          </el-form-item>

          <el-form-item label="收缩压/高压"
            prop="shrinkHighPressure">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入收缩压/高压"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="舒张压/低压"
            prop="diastoleLowPressure">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入舒张压/低压"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="本次身高"
            prop="height">
            <el-input v-model="highBloodForm.name"
              @blur="computeBmi"
              v-Int
              placeholder="请输入身高"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">cm</i></el-input>
          </el-form-item>
          <el-form-item label="本次体重"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              @blur="computeBmi"
              v-Int
              placeholder="请输入体重"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">kg</i></el-input>
          </el-form-item>
          <el-form-item label="BMI"
            prop="bmi">
            <el-input v-model="highBloodForm.name"
              disabled></el-input>
          </el-form-item>
          <el-form-item label="体重建议"
            prop="bmi">
            <el-input v-model="highBloodForm.name"></el-input>
          </el-form-item>
          <el-form-item label="足背动脉搏动"
            prop="phone">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择症状">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <h3>随访生活方式</h3>
          <el-form-item label="日吸烟量"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">支</i></el-input>
          </el-form-item>
          <el-form-item label="日吸烟量建议"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">支</i></el-input>
          </el-form-item>
          <el-form-item label="日饮酒量"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">两</i></el-input>
          </el-form-item>
          <el-form-item label="日饮酒量建议"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">两</i></el-input>
          </el-form-item>

          <el-form-item label="运动次/周"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">两</i></el-input>
          </el-form-item>
          <el-form-item label="运动分钟/次"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">两</i></el-input>
          </el-form-item>
          <el-form-item label="日主食量"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">两</i></el-input>
          </el-form-item>
          <el-form-item label="日主食量建议"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">两</i></el-input>
          </el-form-item>
          <el-form-item label="心理调整"
            prop="weight">
            <el-select v-model="highBloodForm.name"
              placeholder="请选择心理调整">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="遵医行为"
            prop="weight">
            <el-select v-model="highBloodForm.name"
              placeholder="请选择遵医行为">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="空腹血糖"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="血糖随机"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="糖化血红蛋白"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="其他检查"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入其他检查"></el-input>
          </el-form-item>
          <el-form-item label="服药依从性"
            prop="weight">
            <el-select v-model="highBloodForm.name"
              placeholder="请选择服药依从性">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药物不良反应"
            prop="weight">
            <el-select v-model="highBloodForm.name"
              placeholder="请选择药物不良反应">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不良反应情况"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入不良反应情况"></el-input>
          </el-form-item>
          <el-form-item label="低血糖反应"
            prop="weight">
            <el-select v-model="highBloodForm.name"
              placeholder="请选择低血糖反应">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="此次随访分类"
            prop="weight">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择此次随访分类">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="并发症症状"
            prop="weight">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择并发症症状">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <h3>随访转诊及用药</h3>
          <el-form-item label="转诊原因"
            prop="weight">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择转诊原因">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他转诊原因"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入其他转诊原因"></el-input>
          </el-form-item>
          <el-form-item label="转诊机构"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入转诊机构"></el-input>
          </el-form-item>
          <el-form-item label="转诊科别"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入转诊科别"></el-input>
          </el-form-item>
          <el-form-item label="药物名称"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入药物名称"></el-input>
          </el-form-item>
          <el-form-item label="用量"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入用量"></el-input>
          </el-form-item>
          <el-form-item label="用法"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入用法"></el-input>
          </el-form-item>
          <el-form-item label="给药方式"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入给药方式"></el-input>
          </el-form-item>
          <el-form-item label="胰岛素品种"
            prop="weight">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择胰岛素品种">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="胰岛素用法"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入胰岛素用法"></el-input>
          </el-form-item>

          <el-form-item label="胰岛素用量  早上"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="胰岛素用量  早上"></el-input>
          </el-form-item>
          <el-form-item label="胰岛素用量  中午"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="胰岛素用量  中午"></el-input>
          </el-form-item>
          <el-form-item label="胰岛素用量  晚上"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="胰岛素用量  晚上"></el-input>
          </el-form-item>
          <el-form-item label="胰岛素用量  睡前"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="胰岛素用量  睡前"></el-input>
          </el-form-item>
          <el-form-item label="个性化健康教育"
            prop="weight">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择个性化健康教育">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个性化健康教育其他措施"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请选择个性化健康教育其他措施"></el-input>
          </el-form-item>
          <el-form-item label="用户状态"
            prop="weight">
            <el-select multiple
              v-model="highBloodForm.name"
              placeholder="请选择用户状态">
              <el-option v-for="item in followType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="随访备注"
            prop="weight">
            <el-input v-model="highBloodForm.name"
              v-Int
              placeholder="请输入随访备注"></el-input>
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
import { httpAdminHospital } from "@/api/admin/httpAdminHospital";
import { httpAdminDoctor } from "@/api/admin/httpAdminDoctor";
import { httpAdminPatient } from "@/api/admin/httpAdminPatient";
import {
  followType,
  followTypeList,
  validatePhone,
  validateIdCard,
} from "@/utils/index";
export default {
  data() {
    return {
      followType,
      followTypeList,
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
      hospitalList: [],
      doctorList: [],
      patientList: [],
      highBloodForm: {
        diseaseType: "HIGH_BLOOD",
        doctoeName: "",
        doctorIdcard: "",
        type: "",
        patientName: "",
        patientIdCard: "",
        startTime: "",
        endTime: "",
      },
    };
  },
  created() {
    // 判断是编辑还是新增
    if (this.$route.query.type === "addHighBlood") {
      this.highBloodForm.diseaseType = "HIGH_BLOOD";
    } else if (this.$route.query.type === "adddiabetes") {
      this.highBloodForm.diseaseType = "DIABETES";
    }
  },
  mounted() {
    this.getHospitalList();
    this.getDoctorList();
    this.getPatientList();
  },
  methods: {
    // 列表数据
    getList() {},
    // // 根据身高体重计算BMI
    // computeBmi() {
    //   if (this.form.height && this.form.weight) {
    //     this.form.bmi = (
    //       this.form.weight /
    //       ((this.form.height / 100) * (this.form.height / 100))
    //     ).toFixed(2);
    //   }
    // },
    getHospitalList() {
      httpAdminHospital.getHospital().then((res) => {
        this.hospitalList = res.data.elements;
      });
    },
    getDoctorList(val) {
      httpAdminDoctor.getDoctor({ hospitalId: val }).then((res) => {
        this.doctorList = res.data.elements;
      });
    },
    getPatientList(val) {
      httpAdminPatient.getPatient({ doctorUserId: val }).then((res) => {
        this.patientList = res.data.elements;
      });
    },
    selectHospital(val) {
      this.getDoctorList(val.id);
      this.highBloodForm.doctorName = "";
      this.highBloodForm.patientName = "";
    },
    selectDoctor(val) {
        console.log(val);
        this.getPatientList(val.id)
      this.highBloodForm.doctorIdcard = val.idCard;
      this.highBloodForm.patientName = "";
    },
    selectPatient(val) {
      this.highBloodForm.patientIdCard = val.idCard;
    },
    cancel() {
      this.$router.push({ path: "/hospitalManagement/follow" });
    },
    // confirm() {
    //   console.log(this.$route.query.id);
    //   console.log(this.form.id);
    //   this.$refs.FormRef.validate((valid) => {
    //     if (valid) {
    //       // 编辑
    //       if (this.$route.query.type === "edit") {
    //         httpAdminArchives
    //           .putArchives(this.form, this.form.id)
    //           .then((res) => {
    //             if (res.code === "OK") {
    //               this.$router.push({ path: "/archivesManagement/patient" });
    //             }
    //           });
    //       } else {
    //         // 新增
    //         httpAdminArchives.postArchives(this.form).then((res) => {
    //           if (res.code === "OK") {
    //             this.$router.push({ path: "/archivesManagement/patient" });
    //           }
    //         });
    //       }
    //     }
    //   });
    // },
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