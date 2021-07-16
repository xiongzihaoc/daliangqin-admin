<template>
  <div class="app-container">
    <el-form ref="FormRef"
      :model="form"
      :rules="FormRules"
      label-width="120px">
      <div class="content-box">
        <div>
          <h3>基本资料</h3>
          <el-form-item label="姓名"
            prop="name">
            <el-input v-model="form.name"
              placeholder="请输入姓名"></el-input>
          </el-form-item>
          <!-- 用户头像 -->
          <el-form-item label="照片"
            prop="avatarUrl">
            <single-upload v-model="form.avatarUrl"
              uploadType="AVATAR" />
          </el-form-item>
          <!-- 身份证 -->
          <el-form-item label="身份证号"
            prop="idCard">
            <el-input v-model="form.idCard"
              maxlength="18"
              oninput="value=value.replace(/[^0-9Xx]/g,'')"
              placeholder="请输入身份证号"></el-input>
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
              placeholder="请输入详细地址"></el-input>
          </el-form-item>
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
          <!-- 手机号 -->
          <el-form-item label="手机"
            prop="phone">
            <el-input v-model="form.phone"
              maxlength="11"
              v-Int
              placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="常住类型"
            prop="liveType">
            <el-select v-model="form.liveType">
              <el-option label="户籍"
                value="DOMICILE"></el-option>
              <el-option label="非户籍"
                value="NO_DOMICILE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族"
            prop="ethnic">
            <el-input v-model="form.ethnic"
              placeholder="（ 例:汉族 ）"></el-input>
          </el-form-item>
          <el-form-item label="血型"
            prop="bloodType">
            <el-select v-model="form.bloodType">
              <el-option v-for="item in bloodTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文化程度"
            prop="educationType">
            <el-select v-model="form.educationType">
              <el-option v-for="item in educationType"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职业"
            prop="job">
            <el-input v-model="form.job"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="婚姻情况"
            prop="marriageStatus">
            <el-select v-model="form.marriageStatus">
              <el-option v-for="item in marriageList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作单位"
            prop="employer">
            <el-input v-model="form.employer"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="对应医师医院"
            prop="hospitalId">
            <el-select v-model="form.hospitalId"
              filterable
              @change="selectHospital"
              placeholder="请选择对应医师医院">
              <el-option v-for="item in hospitalList"
                :key="item.id"
                :value="item.id"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <!-- 对应医师 -->
          <el-form-item label="对应医师"
            prop="doctorUserId">
            <el-select v-model="form.doctorUserId"
              @change="selectDoctor"
              filterable
              placeholder="请选择对应医师">
              <el-option v-for="item in doctorList"
                :key="item.id"
                :value="item.id"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div>
          <h3>行为习惯</h3>
          <el-form-item label="日饮酒量"
            prop="otherDisease">
            <el-input maxlength="3"
              v-model="form.otherDisease"
              placeholder="请输入日饮酒量"></el-input>
          </el-form-item>
          <el-form-item label="日吸烟量"
            prop="otherDisease">
            <el-input maxlength="3"
              v-model="form.otherDisease"
              placeholder="请输入日吸烟量"></el-input>
          </el-form-item>
          <el-form-item label="运动次数/周"
            prop="exercise">
            <el-input maxlength="3"
              v-model="form.otherDisease"
              placeholder="请输入运动次数/周"></el-input>
          </el-form-item>
          <el-form-item label="运动分钟/次"
            prop="chronicDisease">
            <el-input maxlength="3"
              v-model="form.otherDisease"
              placeholder="请输入运动分钟/次"></el-input>
          </el-form-item>
          <el-form-item label="日主食量"
            prop="otherDisease">
            <el-input v-model="form.otherDisease"
              placeholder="请输入日主食量"></el-input>
          </el-form-item>
          <el-form-item label="日摄盐量"
            prop="otherDisease">
            <el-input v-model="form.otherDisease"
              placeholder="请输入日摄盐量"></el-input>
          </el-form-item>
          <el-form-item label="心理调整"
            prop="otherDisease">
            <el-input v-model="form.otherDisease"
              placeholder="请选择心理调整"></el-input>
          </el-form-item>
          <el-form-item label="遵医行为"
            prop="otherDisease">
            <el-input v-model="form.otherDisease"
              placeholder="请选择遵医行为"></el-input>
          </el-form-item>
        </div>
        <div>
          <h3>健康信息</h3>
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
import { httpAdminDoctor } from "@/api/admin/httpAdminDoctor";
import { httpAdminPatient } from "@/api/admin/httpAdminPatient";
import { httpAdminHospital } from "@/api/admin/httpAdminHospital";
import addressJson from "@/utils/address.json";
import {
  GetBirthday,
  Getsex,
  educationType,
  bloodTypeList,
  marriageList,
  validatePhone,
  validateIdCard,
} from "@/utils/index";
export default {
  components: {
    singleUpload,
  },
  data() {
    return {
      GetBirthday,
      Getsex,
      educationType,
      bloodTypeList,
      marriageList,
      addressJson,
      FormRules: {
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        idCard: [
          { required: true, trigger: "blur", validator: validateIdCard },
        ],
        addressDetail: [
          { required: true, message: "请选择省市区", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        hospitalId: [
          { required: true, message: "请选择对应医院", trigger: "blur" },
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
      // 医生列表
      doctorList: [],
      hospitalList: [],
      form: {
        // 基本信息
        name: "",
        avatarUrl: "",
        phone: "",
        idCard: "",
        addressDetail: "",
        address: "",
        liveType: "",
        province: "",
        city: "",
        area: "",
        ethnic: "",
        height: "160",
        weight: "60",
        bmi: 0,
        bloodType: "",
        educationType: "",
        job: "",
        marriageStatus: "",
        employer: "",
        createUserName: "",
        hospitalId: "",
        doctorUserId: "",
        patientUserId: "",
      },
    };
  },
  created() {
    // 判断是编辑还是新增
    if (this.$route.query.type === "edit") {
      this.getList();
    } else {
    }
    this.form.patientUserId = this.$route.query.id;
  },
  mounted() {
    this.getHospitalList();
    this.getDoctorList();
    this.computeBmi();
    this.getTreeData(addressJson);
  },
  methods: {
    // 列表数据
    getList() {
      httpAdminPatient
        .getPatient({ userId: this.$route.query.id })
        .then((res) => {
          console.log(res);
          // 回显表单数据
          let value = res.data.elements[0];
          if (value.archivesMongo) {
            this.form = value.archivesMongo;
          } else {
            this.form.phone = value.phone;
          }
          this.form.province = value.province;
          this.form.city = value.city;
          this.form.area = value.area;
          this.$set(this.form, "address", value.address);
          this.$set(this.form, "avatarUrl", value.avatarUrl);
          this.computeBmi();
          this.form.addressDetail = [
            this.form.province,
            this.form.city,
            this.form.area,
          ];
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
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital().then((res) => {
        this.hospitalList = res.data.elements;
      });
    },
    // 获取医生列表
    getDoctorList(val) {
      httpAdminDoctor.getDoctor({ hospitalId: val }).then((res) => {
        this.doctorList = res.data.elements;
      });
    },
    selectHospital(val) {
      this.getDoctorList(val);
      this.form.doctorUserId = "";
    },
    selectDoctor(val) {
      this.$forceUpdate();
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
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 编辑
          if (this.$route.query.isArchives == true) {
            httpAdminArchives.putArchives(this.form).then((res) => {
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