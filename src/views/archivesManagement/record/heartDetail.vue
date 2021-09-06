<template>
  <div>
    <!-- 打印区域 -->
    <div class="print-box">
      <div class="container"
        id="printMe"
        v-loading="loading">
        <h3 class="fz18">院外便携式心电监测</h3>
        <!-- 监测医院 时间 -->
        <div class="userInfo top">
          <div class="hospital">
            <span class="title fw">监测医院：</span>
            <span class="content"
              contenteditable="true"
              v-html="userInfo.hospitalName"></span>
          </div>
          <div class="hospital">
            <span class="title fw">监测时间：</span>
            <span class="content">{{parseTime(userInfo.inspectionTime)}}</span>
          </div>
        </div>
        <!-- 个人详细信息 -->
        <div class="userInfo">
          <div class="userName flex margin">
            <div class="box"><span class="fw txt-r">姓名</span>：
              <span contenteditable="true"
                v-html="userInfo.patientUserName"></span>
            </div>
            <div class="box"><span class="fw txt-r">年龄</span>：
              <span>{{userInfo.age}}</span>
            </div>
            <div class="box"><span class="fw txt-r">身份证号</span>：
              <span>{{userInfo.idCard}}</span>
            </div>
          </div>
          <div class="userName flex margin">
            <div class="box"><span class="fw txt-r">手机号码</span>：
              <span>{{userInfo.patientUserPhone}}</span>
            </div>
            <div class="box"><span class="fw txt-r">监测设备</span>：
              <span>{{userInfo.name}}</span>
            </div>
            <div class="box"><span class="fw txt-r">监测模式</span>：
              <span v-if="userInfo.detectType === 'DAILY'">日常监测</span>
              <span v-else>24小时监测</span>
            </div>
          </div>
          <div class="userName flex">
            <div class="box"><span class="fw txt-r">监测时长</span>：
              <span>{{formatSeconds(heartDetail.length)}}</span>
            </div>
            <div class="box"><span class="fw txt-r">测量结果</span>：
              <span ref="title"
                contenteditable="true"
                v-html="heartDetail.title"></span>
            </div>
            <!-- 占位符 -->
            <div class="over box"><span class="fw"></span></div>
          </div>
        </div>
        <div class="analyse">
          <img class="analyse-img"
            :src="heartDetail.fileImagePath"
            alt="">
          <div class="fz14 analyse-title">心率分析：</div>
          <div class="flex margin resultWidth">
            <div>
              <span class="fw">平均心率：</span>
              <span class="fw fz16"
                contenteditable="true"
                ref="avg"
                v-html="heartDetail.avg"></span>
              <span class="fw">bpm</span>
            </div>
            <div>
              <span class="fw">最高心率：</span>
              <span class="fw fz16"
                contenteditable="true"
                ref="max"
                v-html="heartDetail.max"></span>
              <span class="fw">bpm</span>
            </div>
            <div>
              <span class="fw">最低心率：</span>
              <span class="fw fz16"
                contenteditable="true"
                ref="min"
                v-html="heartDetail.min"></span>
              <span class="fw">bpm</span>
            </div>
          </div>
          <div class="flex resultWidth">
            <div>
              <span class="fw">正常心率：</span>
              <span class="fw fz16"
                contenteditable="true"
                ref="normalRate"
                v-html="heartDetail.normalRate"></span>
              <span class="fw">%</span>
            </div>
            <div>
              <span class="fw">心率偏快：</span>
              <span class="fw fz16"
                contenteditable="true"
                ref="heartbeatRate"
                v-html="heartDetail.heartbeatRate"></span>
              <span class="fw">%</span>
            </div>
            <div>
              <span class="fw">心率偏慢：</span>
              <span class="fw fz16"
                contenteditable="true"
                ref="slowRate"
                v-html="heartDetail.slowRate"></span>
              <span class="fw">%</span>
            </div>
          </div>
        </div>
        <div class="impression">
          <div class="fz14 impression-title">心电分析印象：</div>
          <div contenteditable="true"
            ref="ecgResultTz"
            v-html="heartDetail.ecgResultTz"></div>
        </div>
        <div class="result">
          <div class="fz14">心电分析结果：</div>
          <div class="fz11 result-text"
            contenteditable="true"
            ref="ecgResult"
            v-html="heartDetail.ecgResult"></div>

          <div class="result-option">
            <div class="fw result-title">处置建议：</div>
            <div class="content"
              contenteditable="true"
              ref="suggestion"
              v-html="heartDetail.suggestion"></div>
          </div>

          <div class="result-option middle">
            <div class="fw result-title">原因分析：</div>
            <div class="content"
              contenteditable="true"
              ref="abnorAnalysis"
              v-html="heartDetail.abnorAnalysis"></div>
          </div>

          <div class="result-option">
            <div class="fw result-title">保健建议：</div>
            <div class="content"
              contenteditable="true"
              ref="healthCareAdvice"
              v-html="heartDetail.healthCareAdvice"></div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
          <div class="left">
          </div>
          <div class="right">
            <span class="fz14">医生签名：</span>
            <img v-if="this.$route.query.isSignature ==='1'"
              class="signature"
              :src="userInfo.signUrl"
              alt="">
          </div>
        </div>
        <!-- 处置建议模板 -->
        <div class="advice">
          <h2>处置建议</h2>
          <p>1. 建议重新测量</p>
          <p>2. 建议定期复查</p>
          <p>3. 建议治疗后复查</p>
          <p>4. 建议进一步检查治疗</p>
          <p>5. 建议转诊治疗</p>
          <p>6. 建议转院治疗</p>
        </div>
      </div>
    </div>
    <!-- 备注 -->
    <div class="remark">
      提示：监测医院和用户姓名进行修改之后，只用于打印，不做其他用途；其余内容修改后会进行数据更新
    </div>
    <!-- 操作按钮 -->
    <div class="operationBtn">
      <el-button size="mini"
        plain
        v-debounce="[reset]">重置报告</el-button>
      <el-button plain
        size="mini"
        :disabled="isAuditDisabled"
        v-debounce="[passAudit]">审核通过</el-button>
      <el-button plain
        v-print="printObj"
        size="mini">打印</el-button>
    </div>
    <div class="operationBtn"
      style="margin-top:20px;font-size:12px;color:#ccc">
      <span>将此报告发送给:</span>
      <el-select size="mini"
        v-model="hospitalId"
        :disabled="isHospitalDisabled"
        style="margin:0 10px;">
        <el-option v-for="item in hospitalList"
          :key="item.id"
          :label="item.name"
          :value="item.id"></el-option>
      </el-select>
      <el-button type="primary"
        size="mini"
        :disabled="isHospitalDisabled"
        v-debounce="[sendReport]">确定</el-button>
    </div>
  </div>
</template>

<script>
import { httpAdminHeartRate } from '@/api/admin/httpAdminHeartRate'
import { httpAdminHospital } from '@/api/admin/httpAdminHospital'
import { httpAdminAudit } from '@/api/admin/httpAdminAudit'
import { parseTime, formatSeconds } from '@/utils/index'
export default {
  data() {
    return {
      parseTime,
      formatSeconds,
      printObj: {
        id: 'printMe',
        popTitle: '',
        extraCss: '',
        extraHead: '',
      },
      hospitalList: [],
      hospitalId: '',
      loading: true,
      heartDetail: {},
      userInfo: {},
      isAuditDisabled: false,
      isHospitalDisabled: false,
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getHospitalList()
  },
  methods: {
    // 获取信息
    getList() {
      httpAdminHeartRate
        .getHeartRate({ id: this.$route.query.id })
        .then((res) => {
          // 个人信息
          this.userInfo = res?.data?.elements[0]
          // 心率建议信息
          this.heartDetail = JSON.parse(
            res?.data?.elements[0]?.reportResult
          )?.body?.data
          this.loading = false
          // 根据审核状态判断按钮置灰
          if (
            this.userInfo.auditStatus === 'INVALID' ||
            this.userInfo.auditStatus === 'TO_HOSPITAL_AUDIT' || this.userInfo.auditStatus === 'HOSPITAL_COMPLETE_AUDIT'
          ) {
            this.isAuditDisabled = true
            this.isHospitalDisabled = true
          } else if (this.userInfo.auditStatus === 'PLATFORM_COMPLETE_AUDIT') {
            this.isHospitalDisabled = true
          }
        })
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements
      })
    },
    // 审核通过
    passAudit() {
      let thirdForm = {
        recordId: this.$route.query.id,
        avg: Number(this.$refs.avg.innerText),
        title: this.$refs.title.innerText,
        max: Number(this.$refs.max.innerText),
        min: Number(this.$refs.min.innerText),
        normalRate: Number(this.$refs.normalRate.innerText),
        heartRate: Number(this.$refs.avg.innerText),
        heartbeatRate: Number(this.$refs.heartbeatRate.innerText),
        slowRate: Number(this.$refs.slowRate.innerText),
        ecgResultTz: this.$refs.ecgResultTz.innerText,
        ecgResult: this.$refs.ecgResult.innerText,
        abnorAnalysis: this.$refs.abnorAnalysis.innerText,
        suggestion: this.$refs.suggestion.innerText,
        healthCareAdvice: this.$refs.healthCareAdvice.innerText,
      }
      httpAdminHeartRate.putThirdReport(thirdForm).then((res) => {
        if (res.code === 'OK') {
          let data = {
            id: this.$route.query.id,
            ecgAuditStatus: 'PLATFORM_COMPLETE_AUDIT',
          }
          httpAdminAudit.postAudit(data).then((res) => {
            if (res.code === 'OK') {
              this.loading = true
              this.$message.success('审核成功')
              this.getList()
            }
          })
        }
      })
    },
    // 重置报告
    reset() {
      location.reload()
      this.$message.success('重置报告成功')
    },
    // 发送报告
    sendReport() {
      let data = {
        id: this.$route.query.id,
        hospitalId: this.hospitalId,
        // 待医院审核枚举
        ecgAuditStatus: 'TO_HOSPITAL_AUDIT',
      }
      httpAdminAudit.postAudit(data).then((res) => {
        if (res.code === 'OK') {
          this.$message.success('发送成功')
          this.getList()
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
[contenteditable]:focus {
  outline: 0px solid transparent;
  caret-color: red;
}
@page {
  size: auto; /* auto is the initial value */
  margin: 3mm; /* this affects the margin in the printer settings */
}

html {
  background-color: #ffffff;
  margin: 0; /* this affects the margin on the html before sending to printer */
}

body {
  border: solid 1px blue;
  margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
}
.print-box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#printMe {
  position: relative;
  border: 1px solid #ccc;
  // margin-top: 100px;
}
.container {
  width: 595px;
  font-size: 11px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  h3 {
    text-align: center;
  }
  .userInfo {
    padding: 10px 0;
    box-sizing: border-box;
    border-top: 2px solid #000;
    .userName {
      .box {
        display: flex;
        align-items: center;
        width: 33.3%;
        .txt-r {
          display: inline-block;
          width: 50px;
          text-align-last: justify;
        }
      }
    }
  }
  .top {
    display: flex;
    align-items: center;
    border-bottom: none;
    justify-content: space-between;
  }
  .analyse {
    padding: 0 10px 10px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    .analyse-img {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 120px;
    }
    .analyse-title {
      margin: 5px 0;
    }
  }
  .impression {
    padding: 8px 10px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    .impression-title {
      margin-bottom: 5px;
    }
  }
  .result {
    padding: 8px 10px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    .result-text {
      margin: 10px 0;
    }
    .middle {
      margin: 10px 0;
    }
    .result-option {
      display: flex;
      .result-title {
        line-height: 1.5;
        min-width: 60px;
      }
      .content {
        width: 473px;
        line-height: 1.5;
        text-align-last: left;
        text-align: justify;
        text-justify: distribute-all-lines;
      }
    }
  }
  .variation-box {
    padding: 8px 10px;
    box-sizing: border-box;
    .variation {
      margin: 5px 0;
    }
    .variation-text {
      line-height: 18px;
      text-align-last: left;
      text-align: justify;
      text-justify: distribute-all-lines;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding: 8px 10px;
    .left,
    .right {
      flex: 1;
    }
    .left {
      display: flex;
      span {
        flex: 1;
        flex-wrap: nowrap;
      }
      .date {
        min-width: 120px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      span {
        min-width: 80px;
      }
      .signature {
        vertical-align: bottom;
        width: 200px;
        height: 70px;
        margin-left: -20px;
      }
    }
  }
  .resultWidth div {
    min-width: 110px;
  }
}
.advice {
  position: absolute;
  right: -60%;
  top: 50%;
  transform: translateY(-50%);
  p {
    font-size: 11px;
  }
}
.operationBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.remark {
  text-align: center;
  margin: 30px 0;
  font-size: 12px;
  color: #ccc;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.over {
  visibility: hidden;
}
.fz11 {
  font-size: 11px;
  font-weight: 700;
}

.fz14 {
  font-size: 14px;
  font-weight: 700;
}
.fz18 {
  font-size: 18px;
  font-weight: 700;
}
.fw {
  font-weight: 700;
}
.margin {
  margin: 10px 0;
}
</style>