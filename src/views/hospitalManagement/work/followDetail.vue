<template>
  <div class="app-container">
    <div class="content-box"
      v-loading="loading">
      <!-- 基本信息 -->
      <div>
        <el-form ref="FormRef"
          :model="form"
          :rules="FormRules"
          label-width="130px">
          <div>
            <h3>随访基本信息</h3>
            <el-form-item label="选择医院"
              prop="hospitalId">
              <el-select v-model="form.hospitalId"
                @change="selectHospital"
                placeholder="请选择医院">
                <el-option v-for="item in hospitalList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择医生"
              prop="doctorUserId">
              <el-select v-model="form.doctorUserId"
                @change="selectDoctor"
                placeholder="请选择医生">
                <el-option v-for="item in doctorList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择用户"
              prop="patientUserId">
              <el-select v-model="form.patientUserId"
                placeholder="请选择用户"
                @change="selectPatient">
                <el-option v-for="item in patientList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户身份证号"
              prop="patientIdCard">
              <el-input disabled
                v-model="form.patientIdCard">
              </el-input>
            </el-form-item>
            <el-form-item label="随访方式"
              prop="type">
              <el-select v-model="form.type"
                placeholder="请选择随访方式">
                <el-option v-for="item in followTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="随访开始时间"
              prop="startTime">
              <el-date-picker v-model="form.startTime"
                @blur="startTimeBlur"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="timestamp"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="随访结束时间"
              prop="endTime">
              <el-date-picker @blur="endTimeBlur"
                v-model="form.endTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="timestamp"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="本次身高"
              prop="nowHeight">
              <el-input v-model="form.nowHeight"
                @blur="computeBmi"
                v-Int
                maxlength="3"
                placeholder="请输入身高"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">cm</i></el-input>
            </el-form-item>
            <el-form-item label="本次体重"
              prop="nowWeight">
              <el-input v-model="form.nowWeight"
                @blur="computeBmi"
                v-Int
                maxlength="3"
                placeholder="请输入体重"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">kg</i></el-input>
            </el-form-item>
            <el-form-item label="BMI">
              <el-input v-model="form.BMI"
                disabled></el-input>
            </el-form-item>
            <el-form-item label="体重建议"
              prop="weightSuggest">
              <el-input v-model="form.weightSuggest"
                v-Int
                maxlength="3"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">kg</i></el-input>
            </el-form-item>
          </div>
          <div>
            <h3>行为方式</h3>
            <el-form-item label="日吸烟量">
              <el-input oninput="if (value > 60) value = 60"
                v-model="form.daySmoking"
                v-Int
                maxlength="2"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">支</i></el-input>
            </el-form-item>
            <el-form-item label="日吸烟量建议">
              <el-input v-model="form.daySmokingSuggest"
                v-Int
                maxlength="2"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">支</i></el-input>
            </el-form-item>
            <el-form-item label="日饮酒量">
              <el-input oninput="if (value > 30) value = 30"
                v-model="form.dayDrink"
                v-Int
                maxlength="2"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">两</i></el-input>
            </el-form-item>
            <el-form-item label="日饮酒量建议">
              <el-input v-model="form.dayDrinkSuggest"
                v-Int
                maxlength="2"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">两</i></el-input>
            </el-form-item>
            <el-form-item label="运动次/周">
              <el-input oninput="if (value > 20) value = 20"
                v-model="form.weekMovement"
                v-Int
                maxlength="3"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">次</i></el-input>
            </el-form-item>
            <el-form-item label="运动分钟/次">
              <el-input oninput="if (value > 500) value = 500"
                v-model="form.minuteMovement"
                v-Int
                maxlength="3"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">分钟</i></el-input>
            </el-form-item>
            <el-form-item label="日主食量">
              <el-input oninput="if (value > 5000) value = 5000"
                v-model="form.dayFood"
                v-Int
                maxlength="4"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">克</i></el-input>
            </el-form-item>
            <el-form-item label="日主食量建议">
              <el-input v-model="form.dayFoodSuggest"
                v-Int
                maxlength="4"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">克</i></el-input>
            </el-form-item>
            <el-form-item label="摄盐情况">
              <el-input v-model="form.saltIntake"
                v-Int oninput="if (value > 99) value = 00"
                maxlength="3"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">克</i></el-input>
            </el-form-item>
            <el-form-item label="摄盐情况建议">
              <el-input v-model="form.saltIntakeSuggest"
                v-Int
                maxlength="4"><i slot="suffix"
                  style="font-style:normal;margin-right: 10px;">克</i></el-input>
            </el-form-item>
            <el-form-item label="心理调整">
              <el-select v-model="form.adjustMentality"
                placeholder="请选择心理调整">
                <el-option v-for="item in complianceList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="遵医行为">
              <el-select v-model="form.compliance"
                placeholder="请选择遵医行为">
                <el-option v-for="item in complianceList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="此次随访分类">
              <el-select v-model="form.FollowClassStatus"
                placeholder="请选择此次随访分类">
                <el-option v-for="item in FollowClassStatusList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户状态"
              prop="userStatus">
              <el-select v-model="form.userStatus"
                placeholder="请选择用户状态">
                <el-option v-for="item in userStatusList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="随访备注"
              prop="content">
              <el-input type="textarea"
                maxlength="140"
                v-model="form.content"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 糖尿病随访 -->
      <div style="padding-top:20px;">
        <el-checkbox v-model="diabetesChecked">添加糖尿病随访</el-checkbox>
        <el-form v-if="diabetesChecked === true"
          ref="diabetesFormRef"
          :model="diabetesForm"
          :rules="diabetesFormRules"
          label-width="130px">
          <el-form-item label="症状">
            <el-select v-model="diabetesForm.symptomTypes"
              multiple
              clearable
              placeholder="请选择症状">
              <el-option v-for="item in symptomTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他症状">
            <el-input v-model="diabetesForm.symptomOther"
              type="textarea"
              maxlength="140"
              placeholder="请输入其他症状"></el-input>
          </el-form-item>
          <el-form-item label="足背动脉搏动">
            <el-select v-model="diabetesForm.dorsalArteryStatus"
              placeholder="请选择足背动脉搏动">
              <el-option v-for="item in dorsalArteryStatusList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收缩压"
            prop="shrinkHighPressure">
            <el-input oninput="if (value > 300) value = 300"
              v-model="diabetesForm.shrinkHighPressure"
              v-Int
              maxlength="3"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="舒张压"
            prop="diastoleLowPressure">
            <el-input oninput="if (value > 200) value = 200"
              v-model="diabetesForm.diastoleLowPressure"
              v-Int
              maxlength="3"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="空腹血糖"
            prop="fastingBloodGlucose">
            <el-input v-model="diabetesForm.fastingBloodGlucose"
              maxlength="4"
              oninput="if (value > 36) {value = 36;return} value=value.replace(/[^0-9.]/g,'')"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="血糖随机">
            <el-input v-model="diabetesForm.bloodGlucoseRandom"
              maxlength="4"
              oninput="if (value > 36) {value = 36;return} value=value.replace(/[^0-9.]/g,'')"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmol/L</i></el-input>
          </el-form-item>
          <el-form-item label="糖化血红蛋白">
            <el-input v-model="diabetesForm.glycosylatedHemoglobin"
              v-Int oninput="if (value > 100) value = 100" maxlength="3"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">%</i></el-input>
          </el-form-item>
          <el-form-item label="其他辅助检查">
            <el-input v-model="diabetesForm.otherInspection"
              type="textarea"
              maxlength="140"
              placeholder="请输入其他辅助检查"></el-input>
          </el-form-item>
          <el-form-item label="并发症症状">
            <el-select v-model="diabetesForm.complicationType"
              placeholder="请选择并发症症状"
              multiple
              clearable>
              <el-option v-for="item in complicationTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他并发症症状">
            <el-input type="textarea"
              v-model="diabetesForm.otherComplication"
              placeholder="请输入并发症症状"></el-input>
          </el-form-item>
          <el-form-item label="转诊原因">
            <el-select v-model="diabetesForm.referralReasonStatuses"
              multiple
              clearable
              placeholder="请选择转诊原因">
              <el-option v-for="item in referralReasonStatusesList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他转诊原因">
            <el-input v-model="diabetesForm.otherReferralReason"
              type="textarea"
              maxlength="140"
              placeholder="请输入其他转诊原因"></el-input>
          </el-form-item>
          <el-form-item label="转诊机构">
            <el-input v-model="diabetesForm.referralAgency"
              placeholder="请输入转诊机构"></el-input>
          </el-form-item>
          <el-form-item label="转诊科别">
            <el-input v-model="diabetesForm.referralDepartment"
              placeholder="请输入转诊科别"></el-input>
          </el-form-item>
          <el-form-item label="药物名称">
            <el-input v-model="diabetesForm.drugName"
              placeholder="请输入药物名称"></el-input>
          </el-form-item>
          <el-form-item label="用量">
            <el-input v-model="diabetesForm.drugDosage"
              placeholder="请输入用量"></el-input>
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input v-model="diabetesForm.companyName"
              placeholder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="用法">
            <el-input v-model="diabetesForm.using"
              placeholder="请输入药物用法"></el-input>
          </el-form-item>
          <el-form-item label="给药方式">
            <el-input v-model="diabetesForm.giveDrugMode"
              placeholder="请输入给药方式"></el-input>
          </el-form-item>
          <el-form-item label="胰岛素品种">
            <el-select v-model="diabetesForm.insulinVarietiesType"
              placeholder="请选择胰岛素品种">
              <el-option v-for="item in insulinVarietiesTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="胰岛素用法">
            <el-select v-model="diabetesForm.insulinUsings"
              placeholder="请选择胰岛素用法"
              multiple
              clearable>
              <el-option v-for="item in insulinUsingsList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="胰岛素用量  早上">
            <el-input v-model="diabetesForm.insulinDosageMorning"
              v-Int
              maxlength="5"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">μ</i></el-input>
          </el-form-item>
          <el-form-item label="胰岛素用量  中午">
            <el-input v-model="diabetesForm.insulinDosageNoon"
              v-Int
              maxlength="5"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">μ</i></el-input>
          </el-form-item>
          <el-form-item label="胰岛素用量  晚上">
            <el-input v-model="diabetesForm.insulinDosageNight"
              v-Int
              maxlength="5"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">μ</i></el-input>
          </el-form-item>
          <el-form-item label="胰岛素用量  睡前">
            <el-input v-model="diabetesForm.insulinDosageBeforeSleep"
              v-Int
              maxlength="5"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">μ</i></el-input>
          </el-form-item>
          <el-form-item label="服药依从性">
            <el-select v-model="diabetesForm.medicationStatus"
              placeholder="请选择服药依从性">
              <el-option v-for="item in medicationStatusList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药物不良反应">
            <el-select v-model="diabetesForm.drugReaction"
              placeholder="请选择药物不良反应">
              <el-option v-for="item in drugReactionList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不良反应情况">
            <el-input v-model="diabetesForm.reactionRemark"
              type="textarea"
              maxlength="140"
              placeholder="请输入不良反应情况"></el-input>
          </el-form-item>
          <el-form-item label="低血糖反应">
            <el-select v-model="diabetesForm.hypoglycemiaReaction"
              placeholder="请选择低血糖反应">
              <el-option v-for="item in hypoglycemiaReactionList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个性化健康教育">
            <el-select multiple
              clearable
              v-model="diabetesForm.healthEducationTypes"
              placeholder="请选择个性化健康教育">
              <el-option v-for="item in healthEducationTypesList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个性化健康教育其他措施">
            <el-input v-model="diabetesForm.otherHealthEducation"
              type="textarea"
              maxlength="140"
              placeholder="请输入个性化健康教育其他措施"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 高血压随访 -->
      <div style="padding-top:20px;">
        <el-checkbox v-model="bloodChecked">添加高血压随访</el-checkbox>
        <el-form v-if="bloodChecked === true"
          ref="bloddFormRef"
          :model="highBloodForm"
          :rules="highBloodFormRules"
          label-width="130px">
          <el-form-item label="症状">
            <el-select v-model="highBloodForm.symptomTypes"
              multiple
              clearable
              placeholder="请选择症状">
              <el-option v-for="item in bloodSymptomTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他症状">
            <el-input v-model="highBloodForm.symptomOther"
              type="textarea"
              maxlength="140"
              placeholder="请输入其他症状"></el-input>
          </el-form-item>
          <el-form-item label="收缩压"
            prop="shrinkHighPressure">
            <el-input oninput="if (value > 300) value = 300"
              v-model="highBloodForm.shrinkHighPressure"
              v-Int
              maxlength="3"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="舒张压"
            prop="diastoleLowPressure">
            <el-input oninput="if (value > 200) value = 200"
              v-model="highBloodForm.diastoleLowPressure"
              v-Int
              maxlength="3"><i slot="suffix"
                style="font-style:normal;margin-right: 10px;">mmHg</i></el-input>
          </el-form-item>
          <el-form-item label="其他体征">
            <el-input v-model="highBloodForm.physicalSignsOther"
              type="textarea"
              maxlength="140"
              placeholder="请输入其他体征"></el-input>
          </el-form-item>
          <el-form-item label="其他辅助检查">
            <el-input v-model="highBloodForm.otherInspection"
              type="textarea"
              maxlength="140"
              placeholder="请输入其他辅助检查"></el-input>
          </el-form-item>
          <el-form-item label="并发症症状">
            <el-select v-model="highBloodForm.complicationType"
              placeholder="请选择并发症症状"
              multiple
              clearable>
              <el-option v-for="item in bloodComplicationTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他并发症症状">
            <el-input type="textarea"
              v-model="highBloodForm.otherComplication"
              placeholder="请输入并发症症状"></el-input>
          </el-form-item>
          <el-form-item label="转诊原因">
            <el-select v-model="highBloodForm.referralReasonStatuses"
              placeholder="请选择转诊原因"
              multiple
              clearable>
              <el-option v-for="item in BloodReferralReasonStatusesList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他转诊原因">
            <el-input type="textarea"
              v-model="highBloodForm.otherReferralReason"
              placeholder="请输入其他转诊原因"></el-input>
          </el-form-item>
          <el-form-item label="转诊机构">
            <el-input v-model="highBloodForm.referralAgency"
              placeholder="请输入转诊机构"></el-input>
          </el-form-item>
          <el-form-item label="转诊科别">
            <el-input v-model="highBloodForm.referralDepartment"
              placeholder="请输入转诊科别"></el-input>
          </el-form-item>
          <el-form-item label="药物名称">
            <el-input v-model="highBloodForm.drugName"
              placeholder="请输入药物名称"></el-input>
          </el-form-item>
          <el-form-item label="用量">
            <el-input v-model="highBloodForm.drugDosage"
              placeholder="请输入用量"></el-input>
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input v-model="highBloodForm.companyName"
              placeholder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="用法">
            <el-input v-model="highBloodForm.using"
              placeholder="请输入药物用法"></el-input>
          </el-form-item>
          <el-form-item label="给药方式">
            <el-input v-model="highBloodForm.giveDrugMode"
              placeholder="请输入给药方式"></el-input>
          </el-form-item>
          <el-form-item label="服药依从性">
            <el-select v-model="highBloodForm.medicationStatus"
              placeholder="请选择服药依从性">
              <el-option v-for="item in medicationStatusList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药物不良反应">
            <el-select v-model="highBloodForm.drugReaction"
              placeholder="请选择药物不良反应">
              <el-option v-for="item in drugReactionList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不良反应情况">
            <el-input v-model="highBloodForm.reactionRemark"
              type="textarea"
              maxlength="140"
              placeholder="请输入不良反应情况"></el-input>
          </el-form-item>
          <el-form-item label="个性化健康教育">
            <el-select multiple
              clearable
              v-model="highBloodForm.healthEducationTypes"
              placeholder="请选择个性化健康教育">
              <el-option v-for="item in healthEducationTypesList"
                :key="item.id"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个性化健康教育其他措施">
            <el-input v-model="highBloodForm.otherHealthEducation"
              type="textarea"
              maxlength="140"
              placeholder="请输入个性化健康教育其他措施"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
import { httpAdminFollow } from "@/api/admin/httpAdminFollow";
import {
  followType,
  followTypeList,
  complianceList,
  FollowClassStatusList,
  userStatusList,
  symptomTypeList,
  dorsalArteryStatusList,
  complicationTypeList,
  referralReasonStatusesList,
  insulinVarietiesTypeList,
  insulinUsingsList,
  medicationStatusList,
  drugReactionList,
  hypoglycemiaReactionList,
  healthEducationTypesList,
  bloodSymptomTypeList,
  bloodComplicationTypeList,
  BloodReferralReasonStatusesList,
} from "@/utils/index";
export default {
  data() {
    return {
      followType,
      followTypeList,
      complianceList,
      FollowClassStatusList,
      userStatusList,
      symptomTypeList,
      dorsalArteryStatusList,
      complicationTypeList,
      referralReasonStatusesList,
      insulinVarietiesTypeList,
      insulinUsingsList,
      medicationStatusList,
      hypoglycemiaReactionList,
      drugReactionList,
      healthEducationTypesList,
      bloodSymptomTypeList,
      bloodComplicationTypeList,
      BloodReferralReasonStatusesList,
      FormRules: {
        hospitalId: [
          { required: true, message: "请选择医院", trigger: "change" },
        ],
        doctorUserId: [
          { required: true, message: "请选择医生", trigger: "change" },
        ],
        patientUserId: [
          { required: true, message: "请选择用户", trigger: "change" },
        ],
        patientIdCard: [
          { required: true, message: "请输入用户身份证号", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择随访开始时间", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择随访结束时间", trigger: "change" },
        ],
        nowHeight: [
          { required: true, message: "请输入本次身高", trigger: "blur" },
        ],
        nowWeight: [
          { required: true, message: "请输入本次体重", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择随访方式", trigger: "change" },
        ],
        weightSuggest: [
          { required: true, message: "请输入体重建议", trigger: "blur" },
        ],
        userStatus: [
          { required: true, message: "请选择用户状态", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入随访备注", trigger: "change" },
        ],
      },
      diabetesFormRules: {
        shrinkHighPressure: [
          { required: true, message: "请输入收缩压", trigger: "blur" },
        ],
        diastoleLowPressure: [
          { required: true, message: "请输入舒张压", trigger: "blur" },
        ],
        fastingBloodGlucose: [
          { required: true, message: "请输入空腹血糖", trigger: "blur" },
        ],
      },
      highBloodFormRules: {
        shrinkHighPressure: [
          { required: true, message: "请输入收缩压", trigger: "blur" },
        ],
        diastoleLowPressure: [
          { required: true, message: "请输入舒张压", trigger: "blur" },
        ],
      },
      hospitalList: [],
      doctorList: [],
      patientList: [],
      diabetesChecked: false,
      bloodChecked: false,
      loading: true,
      form: {
        // 基本信息
        hospitalId: "",
        doctorUserId: "",
        patientUserId: "",
        patientIdCard: "",
        type: "",
        startTime: "",
        endTime: "",
        nowHeight: "",
        nowWeight: "",
        BMI: "",
        weightSuggest: "",
        // 行为方式
        daySmoking: "",
        daySmokingSuggest: "",
        dayDrink: "",
        dayDrinkSuggest: "",
        weekMovement: "",
        minuteMovement: "",
        dayFood:"",
        dayFoodSuggest:"",
        saltIntake:"",
        saltIntakeSuggest:"",
        adjustMentality: "",
        compliance: "",
        FollowClassStatus: "",
        userStatus: "",
        content: "",
      },
      diabetesForm: {
        symptomTypes: [],
        symptomOther: "",
        dorsalArteryStatus: "",
        shrinkHighPressure: "",
        diastoleLowPressure: "",
        fastingBloodGlucose: "",
        bloodGlucoseRandom: "",
        glycosylatedHemoglobin: "",
        otherInspection: "",
        complicationType: [],
        otherComplication: "",
        referralReasonStatuses: [],
        otherReferralReason: "",
        referralAgency: "",
        referralDepartment: "",
        drugName: "",
        drugDosage: "",
        companyName: "",
        using: "",
        giveDrugMode: "",
        insulinVarietiesType: "",
        insulinUsings: [],
        insulinDosageMorning: "",
        insulinDosageNoon: "",
        insulinDosageNight: "",
        insulinDosageBeforeSleep: "",
        medicationStatus: "",
        drugReaction: "",
        reactionRemark: "",
        hypoglycemiaReaction: "",
        healthEducationTypes: [],
        otherHealthEducation: "",
      },
      highBloodForm: {
        symptomTypes: [],
        symptomOther: "",
        shrinkHighPressure: "",
        diastoleLowPressure: "",
        physicalSignsOther: "",
        otherInspection: "",
        complicationType: [],
        otherComplication: "",
        referralReasonStatuses: [],
        otherReferralReason: "",
        referralAgency: "",
        referralDepartment: "",
        drugName: "",
        drugDosage: "",
        companyName: "",
        using: "",
        giveDrugMode: "",
        medicationStatus: "",
        drugReaction: "",
        reactionRemark: "",
        healthEducationTypes: [],
        otherHealthEducation: "",
      },
    };
  },
  created() {
    // 判断是编辑还是新增
    if (this.$route.query.type === "edit") {
      this.getList();
    } else {
      this.loading = false;
    }
  },
  mounted() {
    this.getHospitalList();
  },
  methods: {
    // 列表数据
    getList() {
      httpAdminFollow
        .getFollowDetail({ id: this.$route.query.id })
        .then((res) => {
          this.form = res.data;
          if (Boolean(res.data.followDiabetesMongo)) {
            this.diabetesChecked = true;
            this.diabetesForm = res?.data?.followDiabetesMongo;
          }
          if (Boolean(res.data.followBloodMongo)) {
            this.bloodChecked = true;
            this.highBloodForm = res?.data?.followBloodMongo;
          }
          this.getDoctorList(res.data.hospitalId);
          this.getPatientList(res.data.doctorUserIdd);
        });
    },
    // 根据身高体重计算BMI
    computeBmi() {
      if (this.form.nowHeight.length > 0 && this.form.nowWeight.length > 0) {
        this.form.BMI = (
          this.form.nowWeight /
          ((this.form.nowHeight / 100) * (this.form.nowHeight / 100))
        ).toFixed(2);
      }
    },
    startTimeBlur() {
      if (this.form.endTime != "") {
        if (this.form.endTime <= this.form.startTime) {
          this.form.endTime = "";
          return this.$notify.error({
            title: "结束时间不能小于或等于开始时间",
          });
        }
      }
    },
    // 结束时间失去焦点
    endTimeBlur() {
      if (this.form.startTime != "") {
        if (this.form.endTime <= this.form.startTime) {
          this.form.endTime = "";
          return this.$notify.error({
            title: "结束时间不能小于或等于开始时间",
          });
        }
      }
    },
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
        this.loading = false;
      });
    },
    selectHospital(val) {
      this.getDoctorList(val);
      this.form.doctorUserId = "";
      this.form.patientUserId = "";
      this.form.patientIdCard = "";
    },
    selectDoctor(val) {
      this.getPatientList(val);
      this.form.patientUserId = "";
      this.form.patientIdCard = "";
    },
    selectPatient(val) {
      httpAdminPatient.getPatient({ userId: val }).then((res) => {
        this.form.patientIdCard = res.data.elements[0].idCard;
      });
    },
    cancel() {
      this.$router.push({ path: "/hospitalManagement/follow" });
    },
    confirm() {
      let form = this.form;
      // 必须选一个随访类型
      if (this.diabetesChecked === false && this.bloodChecked === false) {
        return this.$notify.error({
          title: "未添加随访",
        });
      } else {
        if (this.diabetesChecked === true) {
          form.followDiabetesDTO = this.diabetesForm;
        }
        if (this.bloodChecked === true) {
          form.followBloodDTO = this.highBloodForm;
        }
      }

      let FormRef = new Promise((resolve, reject) => {
        this.$refs.FormRef.validate((valid) => {
          if (valid) {
            resolve();
          }
        });
      });
      let refArr = [FormRef];
      if (this.diabetesChecked === true) {
        let diabetesFormRef = new Promise((resolve, reject) => {
          this.$refs.diabetesFormRef.validate((valid) => {
            if (valid) {
              resolve();
            }
          });
        });
        refArr.push(diabetesFormRef);
      }
      if (this.bloodChecked === true) {
        let bloddFormRef = new Promise((resolve, reject) => {
          this.$refs.bloddFormRef.validate((valid) => {
            if (valid) {
              resolve();
            }
          });
        });
        refArr.push(bloddFormRef);
      }
      Promise.all(refArr).then(() => {
        // 编辑
        if (this.$route.query.type === "edit") {
          httpAdminFollow.putFollow(form, this.$route.query.id).then((res) => {
            if (res.code === "OK") {
              this.$router.push({
                path: "/hospitalManagement/work/follow",
              });
            }
          });
        } else {
          // 新增
          httpAdminFollow.postFollow(form).then((res) => {
            if (res.code === "OK") {
              this.$router.push({ path: "/hospitalManagement/work/follow" });
            }
          });
        }
      });
    },
  },
};
</script>
<style>
.el-checkbox {
  margin-bottom: 18px;
}
.el-checkbox__label {
  font-size: 18px;
  font-weight: 700;
  color: #000;
}
.el-select__tags-text {
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-select .el-tag__close.el-icon-close {
  top: -7px;
  right: -4px;
}
</style>
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