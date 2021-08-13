<template>
  <div class="app-container">
    <el-form ref="FormRef"
      :model="form"
      :rules="FormRules"
      label-width="120px">
      <div class="content-box">
        <div class="test">
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
            <el-cascader class="w100"
              v-model="form.addressDetail"
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
            <el-input oninput="if (value > 240) value = 240"
              v-model="form.height"
              @blur="computeBmi"
              v-Int
              placeholder="请输入身高"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">cm</i></el-input>
          </el-form-item>
          <el-form-item label="体重"
            prop="weight">
            <el-input oninput="if (value > 300) value = 300"
              v-model="form.weight"
              @blur="computeBmi"
              v-Int
              placeholder="请输入体重"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">kg</i></el-input>
          </el-form-item>
          <el-form-item label="BMI"
            prop="bmi">
            <el-input v-model="form.bmi"
              disabled></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机">
            <el-input v-model="form.phone"
              maxlength="11"
              v-Int
              placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="座机">
            <el-input v-model="form.contact"
              maxlength="11"
              v-Int
              placeholder="请输入座机"></el-input>
          </el-form-item>
          <el-form-item label="常住类型"
            prop="liveType">
            <el-select class="w100"
              v-model="form.liveType">
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
            <el-select class="w100"
              v-model="form.bloodType">
              <el-option v-for="item in bloodTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文化程度"
            prop="educationType">
            <el-select class="w100"
              v-model="form.educationType">
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
            <el-select class="w100"
              v-model="form.marriageStatus">
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
            <el-select class="w100"
              v-model="form.hospitalId"
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
            <el-select class="w100"
              v-model="form.doctorUserId"
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
        <div class="test">
          <h3>行为习惯</h3>
          <el-form-item label="日饮酒量">
            <el-input v-Int
              maxlength="3"
              oninput="if (value > 30) value = 30"
              v-model="form.dayDrink"
              placeholder="请输入日饮酒量"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">两</i></el-input>
          </el-form-item>
          <el-form-item label="日吸烟量">
            <el-input v-Int
              maxlength="3"
              oninput="if (value > 60) value = 60"
              v-model="form.daySmoking"
              placeholder="请输入日吸烟量"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">支</i></el-input>
          </el-form-item>
          <el-form-item label="运动次/周">
            <el-input v-Int
              maxlength="3"
              oninput="if (value > 20) value = 20"
              v-model="form.weekMovement"
              placeholder="请输入运动次/周"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">次</i></el-input>
          </el-form-item>
          <el-form-item label="运动分钟/次">
            <el-input v-Int
              maxlength="3"
              oninput="if (value > 500) value = 500"
              v-model="form.minuteMovement"
              placeholder="请输入运动分钟/次"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">分钟</i></el-input>
          </el-form-item>
          <el-form-item label="日主食量">
            <el-input v-Int
              v-model="form.dayFood"
              maxlength="4"
              oninput="if (value > 5000) value = 5000"
              placeholder="请输入日主食量"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">克</i></el-input>
          </el-form-item>
          <el-form-item label="日摄盐量">
            <el-input v-Int
              maxlength="2"
              v-model="form.daySalt"
              oninput="if (value > 99) value = 99"
              placeholder="请输入日摄盐量"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">克</i></el-input>
          </el-form-item>
          <el-form-item label="心理调整">
            <el-select class="w100"
              v-model="form.adjustMentality"
              placeholder="请选择心理调整">
              <el-option v-for="item in complianceList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="遵医行为">
            <el-select class="w100"
              v-model="form.compliance"
              placeholder="请选择遵医行为">
              <el-option v-for="item in complianceList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="test">
          <h3>健康信息</h3>
          <el-form-item label="空腹血糖">
            <el-input v-model="form.fastingBloodGlucose"
              maxlength="4"
              oninput="if (value > 36) {value = 36;return} value=value.replace(/[^0-9.]/g,'')"
              placeholder="请输入空腹血糖"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">mmol/L</i></el-input>
          </el-form-item>
          <!-- <el-form-item label="心率">
            <el-input v-Int
              v-model="form.heartRate"
              oninput="if (value > 200) value = 200"
              maxlength="3"
              placeholder="请输入心率"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">bpm</i></el-input>
          </el-form-item> -->
          <el-form-item label="收缩压">
            <el-input v-Int
              v-model="form.shrinkHighPressure"
              oninput="if (value > 300) value = 300"
              maxlength="3"
              placeholder="请输入收缩压"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="舒张压">
            <el-input v-Int
              v-model="form.diastoleLowPressure"
              oninput="if (value > 200) value = 200"
              maxlength="3"
              placeholder="请输入舒张压"><i slot="suffix"
                style="font-style: normal; margin-right: 10px">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="过敏物质">
            <el-select class="w100"
              v-model="form.allergyTypes"
              placeholder="请选择过敏物质"
              multiple
              clearable>
              <el-option v-for="item in allergyTypesList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="过敏物质名称">
            <el-input v-model="form.allergyName"
              maxlength="20"
              placeholder="请输入过敏物质名称"></el-input>
          </el-form-item>
          <!-- 动态既往史 -->
          <div v-for="(item, index) in form.pastHistories"
            :key="index">
            <div style="margin-left:50px"
              v-if="form.pastHistories.length > 1">
              <el-button type="danger"
                size="mini"
                @click="deletePastHistories(item,index)">删除</el-button>
            </div>
            <el-form-item label="既往史">
              <el-select class="w100"
                @change="pastHistoryTypeVChange"
                v-model="item.pastHistoryType"
                placeholder="请选择既往史">
                <el-option v-for="subItem in pastHistoryTypeList"
                  :key="subItem.id"
                  :label="subItem.label"
                  :value="subItem.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="item.pastHistoryType === 'DISEASE'"
              label="疾病名称">
              <el-input v-model="item.name"
                placeholder="请输入疾病名称"></el-input>
            </el-form-item>
            <el-form-item v-if="item.pastHistoryType === 'SURGERY'"
              label="手术名称">
              <el-input v-model="item.name"
                placeholder="请输入手术名称"></el-input>
            </el-form-item>
            <el-form-item v-if="item.pastHistoryType === 'TRAUMA'"
              label="外伤名称">
              <el-input v-model="item.name"
                placeholder="请输入外伤名称"></el-input>
            </el-form-item>
            <el-form-item v-if="item.pastHistoryType === 'BLOOD_TRANSFUSION'"
              label="输血量">
              <el-input v-model="item.name"
                v-Int
                maxlength="4"
                placeholder="请输入输血量"><i slot="suffix"
                  style="font-style: normal; margin-right: 10px">cc</i></el-input>
            </el-form-item>
            <el-form-item label="详细"
              v-if="item.pastHistoryType === 'DISEASE'">
              <el-input type="textarea"
                v-model="item.remark"
                placeholder="请输入详细"></el-input>
            </el-form-item>

            <el-form-item v-if="item.pastHistoryType === 'DISEASE'"
              label="确诊日期">
              <el-date-picker class="w100"
                v-model="item.dateTime"
                :picker-options="pickerOptions"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
                placeholder="请选择确诊日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="item.pastHistoryType === 'SURGERY'"
              label="手术日期">
              <el-date-picker class="w100"
                v-model="item.dateTime"
                :picker-options="pickerOptions"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
                placeholder="请选择手术日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="item.pastHistoryType === 'TRAUMA'"
              label="外伤日期">
              <el-date-picker class="w100"
                v-model="item.dateTime"
                :picker-options="pickerOptions"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
                placeholder="请选择外伤日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="item.pastHistoryType === 'BLOOD_TRANSFUSION'"
              label="输血日期">
              <el-date-picker class="w100"
                v-model="item.dateTime"
                :picker-options="pickerOptions"
                type="date"
                format="yyyy-MM-dd"
                value-format="timestamp"
                placeholder="请选择输血日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <!-- 按钮 -->
          <div style="margin:0 0 20px 50px">
            <el-button type="info"
              plain
              size="mini"
              @click="addPastHistories">添加既往史</el-button>
          </div>
          <el-form-item label="暴露史">
            <el-select class="w100"
              v-model="form.exposureTypes"
              placeholder="请选择暴露史"
              multiple
              clearable>
              <el-option v-for="item in exposureTypesList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- 家族史 -->
          <div class="family">
            <div style="margin:0 0 10px 60px;font-weight:700">家族史</div>
            <el-form-item label="父亲">
              <el-select class="w100"
                v-model="archivesFamily.father"
                placeholder="请选择"
                multiple
                clearable>
                <el-option v-for="item in diseaseTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="母亲">
              <el-select class="w100"
                v-model="archivesFamily.mother"
                placeholder="请选择"
                multiple
                clearable>
                <el-option v-for="item in diseaseTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="兄弟">
              <el-select class="w100"
                v-model="archivesFamily.brothers"
                placeholder="请选择"
                multiple
                clearable>
                <el-option v-for="item in diseaseTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="子女">
              <el-select class="w100"
                v-model="archivesFamily.child"
                placeholder="请选择"
                multiple
                clearable>
                <el-option v-for="item in diseaseTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他">
              <el-select class="w100"
                v-model="archivesFamily.other"
                placeholder="请选择"
                multiple
                clearable>
                <el-option v-for="item in diseaseTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>

          </div>
          <el-form-item label="遗传病史">
            <el-select class="w100"
              v-model="form.geneticHistory"
              placeholder="请选择遗传病史">
              <el-option v-for="item in drugReactionList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="遗传病史其他"
            v-if="form.geneticHistory === 'HAVE'">
            <el-input v-model="form.otherGeneticHistory"
              type="textarea"
              placeholder="请输入遗传病史其他"></el-input>
          </el-form-item>
          <el-form-item label="残疾情况">
            <el-select class="w100"
              multiple
              clearable
              v-model="form.disabilityTypes"
              placeholder="请选择残疾情况">
              <el-option v-for="item in disabilityTypesList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="残疾其他">
            <el-input v-model="form.disabilityOther"
              type="textarea"
              placeholder="请输入残疾其他"></el-input>
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
        v-debounce="[confirm]">确定</el-button>
    </div>
  </div>
</template>

<script>
import singleUpload from '@/components/Upload'
import { httpAdminArchives } from '@/api/admin/httpAdminArchives'
import { httpAdminDoctor } from '@/api/admin/httpAdminDoctor'
import { httpAdminPatient } from '@/api/admin/httpAdminPatient'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import addressJson from '@/utils/address.json'
import {
  GetBirthday,
  Getsex,
  educationType,
  bloodTypeList,
  marriageList,
  validateIdCard,
  complianceList,
  allergyTypesList,
  pastHistoryTypeList,
  exposureTypesList,
  diseaseTypeList,
  drugReactionList,
  disabilityTypesList,
} from '@/utils/index'
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
      complianceList,
      allergyTypesList,
      pastHistoryTypeList,
      exposureTypesList,
      diseaseTypeList,
      drugReactionList,
      disabilityTypesList,
      FormRules: {
        name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        idCard: [
          { required: true, trigger: 'blur', validator: validateIdCard },
        ],
        addressDetail: [
          { required: true, message: '请选择省市区', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        hospitalId: [
          { required: true, message: '请选择对应医院', trigger: 'blur' },
        ],
        doctorUserId: [
          { required: true, message: '请选择对应医师', trigger: 'blur' },
        ],
        height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入体重', trigger: 'blur' }],
      },
      // 级联配置
      cateListProps: {
        value: 'name', //匹配响应数据中的id
        label: 'name', //匹配响应数据中的name
        children: 'districts', //匹配响应数据中的children
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
      // 医生列表
      doctorList: [],
      hospitalList: [],
      form: {
        // 基本信息
        name: '',
        avatarUrl: '',
        phone: '',
        contact: '',
        idCard: '',
        addressDetail: '',
        address: '',
        liveType: '',
        province: '',
        city: '',
        area: '',
        ethnic: '',
        height: '',
        weight: '',
        bmi: 0,
        bloodType: '',
        educationType: '',
        job: '',
        marriageStatus: '',
        employer: '',
        createUserName: '',
        hospitalId: '',
        doctorUserId: '',
        patientUserId: '',
        dayDrink: '',
        daySmoking: '',
        weekMovement: '',
        minuteMovement: '',
        dayFood: '',
        daySalt: '',
        adjustMentality: '',
        compliance: '',
        fastingBloodGlucose: '',
        // heartRate: '',
        shrinkHighPressure: '',
        diastoleLowPressure: '',
        allergyTypes: [],
        allergyName: '',
        pastHistories: [
          {
            dateTime: '',
            name: '',
            pastHistoryType: 'DISEASE',
            remark: '',
          },
        ],
        exposureTypes: [],
        archivesFamily: {
          father: [],
          mother: [],
          brothers: [],
          child: [],
          other: [],
        },
        geneticHistory: '',
        otherGeneticHistory: '',
        disabilityTypes: [],
        disabilityOther: '',
      },
      archivesFamily: {
        father: [],
        mother: [],
        brothers: [],
        child: [],
        other: [],
      },
    }
  },
  created() {
    // 判断是编辑还是新增
    if (this.$route.query.type === 'edit') {
      this.getList()
    } else {
      this.$set(
        this.form,
        'avatarUrl',
        'http://cdn.daliangqing.com/patient/%E6%BE%B6%E6%9D%91%E5%84%9A2.png'
      )
    }
    this.form.patientUserId = this.$route.query.id
  },
  mounted() {
    this.getHospitalList()
    this.computeBmi()
    this.getTreeData(addressJson)
  },
  methods: {
    // 列表数据
    getList() {
      httpAdminPatient
        .getPatient({ userId: this.$route.query.id })
        .then((res) => {
          // 回显表单数据
          let value = res.data.elements[0]
          if (value.archivesMongo) {
            this.getDoctorList(value.archivesMongo.hospitalId)
            this.form = value?.archivesMongo
            if (value?.archivesMongo?.archivesFamily) {
              this.archivesFamily = value?.archivesMongo?.archivesFamily
            }
          } else {
            this.form.phone = value?.phone
          }
          this.form.province = value?.province
          this.form.city = value?.city
          this.form.area = value?.area
          this.$set(this.form, 'address', value?.address)
          this.$set(this.form, 'avatarUrl', value?.avatarUrl)
          this.computeBmi()
          this.form.addressDetail = [
            this.form.province,
            this.form.city,
            this.form.area,
          ]
        })
    },
    // 级联change事件
    selectAddrssChange(val) {
      if (val) {
        this.form.province = val[0]
        this.form.city = val[1]
        this.form.area = val[2]
      }
    },
    // 递归处理json文件的最后一级
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].districts.length < 1) {
          //  将children设为undefined
          data[i].districts = undefined
        } else {
          // 若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].districts)
        }
      }
      return data
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 获取医生列表
    getDoctorList(val) {
      httpAdminDoctor
        .getDoctor({ hospitalId: val, pageSize: 10000 })
        .then((res) => {
          this.doctorList = res.data.elements
        })
    },
    selectHospital(val) {
      this.getDoctorList(val)
      this.form.doctorUserId = ''
    },
    selectDoctor(val) {
      this.$forceUpdate()
    },
    // 根据身高体重计算BMI
    computeBmi() {
      if (this.form.height && this.form.weight) {
        let bmi = (
          this.form.weight /
          ((this.form.height / 100) * (this.form.height / 100))
        ).toFixed(1)
        this.$set(this.form, 'bmi', bmi)
      } else {
        this.$set(this.form, 'bmi', '')
      }
    },
    // 动态添加既往史
    addPastHistories() {
      this.form.pastHistories.push({
        dateTime: '',
        name: '',
        pastHistoryType: 'DISEASE',
        remark: '',
      })
    },
    pastHistoryTypeVChange() {},
    // 删除既往史
    deletePastHistories(val, index) {
      if (this.form.pastHistories.length <= 1) {
        return
      } else {
        this.form.pastHistories.splice(index, 1)
      }
    },
    cancel() {
      this.$router.push({ path: '/archivesManagement/patient' })
    },
    confirm() {
      this.form.archivesFamily = this.archivesFamily

      // 创建人信息
      // this.form.createUserName = JSON.parse(
      //   localStorage.getItem('adminUserInfo')
      // ).name

      // 提交
      this.$refs.FormRef.validate((valid) => {
        if (valid) {
          // 编辑
          if (this.$route.query.isArchives == true) {
            httpAdminArchives.putArchives(this.form).then((res) => {
              if (res.code === 'OK') {
                this.$router.push({ path: '/archivesManagement/patient' })
              }
            })
          } else {
            // 新增
            httpAdminArchives.postArchives(this.form).then((res) => {
              if (res.code === 'OK') {
                this.$router.push({ path: '/archivesManagement/patient' })
              }
            })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  .test {
    flex: 1;
    width: 95%;
  }
}
.btn-box {
  text-align: center;
}
</style>