<template>
  <div class="app-container">
    <div class="print-box">
      <div class="print-container">
        <div class="container" id="printMe" v-loading="loading">
          <h3 class="fz18">院外便携式心电监测</h3>
          <!-- 监测医院 时间 -->
          <div class="userInfo top">
            <div class="hospital">
              <span class="title fw">监测医院：</span>
              <span class="content minWidth" contenteditable="true">{{
                userInfo.hospitalName
              }}</span>
            </div>
            <div class="hospital">
              <span class="title fw">监测时间：</span>
              <span class="content">{{ parseTime(userInfo.inspectionTime) }}</span>
            </div>
          </div>
          <!-- 个人详细信息 -->
          <div class="userInfo">
            <div class="userName flex margin">
              <div class="box">
                <span class="fw txt-r">姓名</span>：
                <span
                  contenteditable="true"
                  class="minWidth"
                  v-html="userInfo.patientUserName"
                ></span>
              </div>
              <div class="box">
                <span class="fw txt-r">年龄</span>：
                <span>{{ userInfo.age }}</span>
              </div>
              <div class="box">
                <span class="fw txt-r">身份证号</span>：
                <span>{{ userInfo.idCard }}</span>
              </div>
            </div>
            <div class="userName flex margin">
              <div class="box">
                <span class="fw txt-r">手机号码</span>：
                <span>{{ userInfo.patientUserPhone }}</span>
              </div>
              <div class="box">
                <span class="fw txt-r">监测设备</span>：
                <span>{{ userInfo.name }}</span>
              </div>
              <div class="box">
                <span class="fw txt-r">监测模式</span>：
                <span v-if="userInfo.detectType === 'DAILY'">日常监测</span>
                <span v-else>24小时监测</span>
              </div>
            </div>
            <div class="userName flex">
              <div class="box">
                <span class="fw txt-r">监测时长</span>：
                <span>{{ formatSeconds(heartDetail.length) }}</span>
              </div>
              <div class="over box">
                <span class="fw txt-r">测量结果</span>：
                <span
                  ref="title"
                  class="minWidth"
                  style="
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                  "
                  v-html="heartDetail.title"
                ></span>
              </div>
              <!-- 占位符 -->
              <div class="over box"><span class="fw"></span></div>
            </div>
          </div>
          <div class="analyse">
            <img
              class="analyse-img"
              v-if="heartDetail.fileImagePath && heartDetail.fileImagePath != ''"
              :src="heartDetail.fileImagePath"
              alt=""
            />
            <div class="fz14 analyse-title">心率分析：</div>
            <div class="flex margin resultWidth">
              <div>
                <span class="fw">平均心率：</span>
                <span
                  class="fw fz16"
                  contenteditable="true"
                  ref="avg"
                  v-html="heartDetail.avg"
                ></span>
                <span class="fw">bpm</span>
              </div>
              <div>
                <span class="fw">最高心率：</span>
                <span
                  class="fw fz16"
                  contenteditable="true"
                  ref="max"
                  v-html="heartDetail.max"
                ></span>
                <span class="fw">bpm</span>
              </div>
              <div>
                <span class="fw">最低心率：</span>
                <span
                  class="fw fz16"
                  contenteditable="true"
                  ref="min"
                  v-html="heartDetail.min"
                ></span>
                <span class="fw">bpm</span>
              </div>
            </div>
            <div class="flex resultWidth">
              <div>
                <span class="fw">正常心率：</span>
                <span
                  class="fw fz16"
                  contenteditable="true"
                  ref="normalRate"
                  v-html="heartDetail.normalRate"
                ></span>
                <span class="fw">%</span>
              </div>
              <div>
                <span class="fw">心率偏快：</span>
                <span
                  class="fw fz16"
                  contenteditable="true"
                  ref="heartbeatRate"
                  v-html="heartDetail.heartbeatRate"
                ></span>
                <span class="fw">%</span>
              </div>
              <div>
                <span class="fw">心率偏慢：</span>
                <span
                  class="fw fz16"
                  contenteditable="true"
                  ref="slowRate"
                  v-html="heartDetail.slowRate"
                ></span>
                <span class="fw">%</span>
              </div>
            </div>
          </div>
          <div class="impression">
            <div class="fz14 impression-title">心电分析印象：</div>
            <div
              contenteditable="true"
              ref="ecgResultTz"
              class="ecgResultTz"
              v-html="heartDetail.ecgResultTz"
            ></div>
          </div>
          <div class="result">
            <div class="fz14">心电分析结果：</div>
            <div
              class="fz11 result-text"
              contenteditable="true"
              ref="ecgResult"
              v-html="heartDetail.ecgResult"
            ></div>
            <div class="result-option">
              <div class="fw result-title">处置建议：</div>
              <div
                class="content"
                contenteditable="true"
                ref="suggestion"
                v-html="heartDetail.suggestion"
              ></div>
            </div>
            <div class="result-option middle">
              <div class="fw result-title">原因分析：</div>
              <div
                class="content"
                contenteditable="true"
                ref="abnorAnalysis"
                v-html="heartDetail.abnorAnalysis"
              ></div>
            </div>
            <div class="result-option">
              <div class="fw result-title">保健建议：</div>
              <div
                class="content"
                contenteditable="true"
                ref="healthCareAdvice"
                v-html="heartDetail.healthCareAdvice"
              ></div>
            </div>
          </div>
          <!-- 底部 -->
          <div class="footer">
            <div class="left"></div>
            <div class="right">
              <span class="fz14">医师签名：</span>
            </div>
          </div>
        </div>
      </div>
      <div class="operate removeScroll">
        <!-- 审核 || 重审 || 作废 -->
        <div class="operateList">
          <div class="fw" style="margin-bottom: 10px">操作区</div>
          <div class="list">
            <!-- 审核通过按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="提示：审核并保存即此报告已经经过审核并且保存"
              placement="top-start"
            >
              <el-button
                type="primary"
                :disabled="isAuditDisabled"
                size="medium"
                v-debounce="[passAudit]"
                >审核并保存</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="提示：将此报告恢复至待公司审核状态"
              placement="top-start"
            >
              <el-button plain size="medium" @click="onReviewReport"
                >重审该报告</el-button
              >
            </el-tooltip>
            <el-button
              size="medium"
              type="danger"
              v-if="userInfo.auditStatus === 'INVALID'"
              >已作废</el-button
            >
            <el-tooltip
              class="item"
              effect="dark"
              v-else
              content="提示：将此报告作废，如需取消，则重审该报告"
              placement="top-start"
            >
              <el-button plain size="medium" @click="onCancellation">作废</el-button>
            </el-tooltip>
          </div>
        </div>
        <!-- 将报告发送给其他医院审核 -->
        <div class="operateList">
          <div style="margin-bottom: 10px">
            <span class="tooltip">将此报告发送给:</span>
            <el-select
              size="medium"
              v-model="hospitalId"
              :disabled="isHospitalDisabled"
              style="margin: 0 10px"
            >
              <el-option
                v-for="item in hospitalList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-tooltip
              class="item"
              effect="dark"
              content="提示：可将此报告发送给其他医院进行审核"
              placement="top-start"
            >
              <el-button
                size="medium"
                plain
                :disabled="isHospitalDisabled"
                v-debounce="[sendReport]"
                >确定</el-button
              >
            </el-tooltip>
          </div>
        </div>
        <!-- 查看心电图 -->
        <div class="operateList">
          <div class="list">
            <el-tooltip
              class="item"
              effect="dark"
              content="提示：查看心电图即查看该用户完整的心电图"
              placement="top-start"
            >
              <el-button size="medium" plain @click="examineElectrocardiograph"
                >查看心电图</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="提示：查看该用户动态心电图"
              placement="top-start"
            >
              <a href=""></a>
              <el-button size="medium" plain @click="examineDynamicElectrocardiograph"
                >查看动态心电图</el-button
              >
            </el-tooltip>
          </div>
        </div>
        <!-- 操作时间线 -->
        <div class="operateList">
          <div class="fw" style="margin-bottom: 10px">操作时间线</div>
          <div class="removeScroll">
            <el-steps direction="vertical" :active="1">
              <el-step
                v-for="(item, index) in stepList"
                :key="index"
                :title="formatTitle(item)"
                :description="item.content"
                icon="el-icon-s-promotion"
              ></el-step>
            </el-steps>
            <div></div>
          </div>
        </div>
        <!-- 常用话术 -->
        <div class="operateList">
          <!-- 处置建议模板 -->
          <div class="advice">
            <h2>处置建议</h2>
            <p>1、建议重新测量</p>
            <p>2、建议定期复查</p>
            <p>3、建议治疗后复查</p>
            <p>4、建议进一步检查治疗</p>
            <p>5、建议转诊治疗</p>
            <p>6、建议转院治疗</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 备注 -->
    <div class="remark">
      提示：监测医院和用户姓名进行修改之后，只用于打印，不做其他用途；其余内容修改后会进行数据更新
    </div>
  </div>
</template>

<script>
import { httpAdminHeartRate } from "@/api/admin/httpAdminHeartRate";
import { httpAdminHospital } from "@/api/admin/httpAdminHospital";
import { httpAdminAudit } from "@/api/admin/httpAdminAudit";
import { parseTime, formatSeconds } from "@/utils/index";
export default {
  data() {
    return {
      parseTime,
      formatSeconds,
      printObj: {
        id: "printMe",
        popTitle: "",
        extraCss: "",
        extraHead: "",
      },
      hospitalList: [],
      hospitalId: "",
      loading: true,
      // 操作时间线列表
      stepList: [],
      // 心率信息
      heartDetail: {},
      // 个人信息
      userInfo: {},
      // 审核并保存按钮是否禁用
      isAuditDisabled: false,
      // 发送给医院按钮是否禁用
      isHospitalDisabled: false,
      // 打印按钮是否禁用
      isPrintDisabled: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.getHospitalList();
  },
  methods: {
    // 获取信息
    getList() {
      httpAdminHeartRate.getHeartRate({ id: this.$route.query.id }).then((res) => {
        // 个人信息
        this.userInfo = res?.data?.elements[0];
        // 心率建议信息
        this.heartDetail = JSON.parse(res?.data?.elements[0]?.reportResult)?.body?.data;
        this.loading = false;
        this.getAuditList();
      });
    },
    // 获取操作时间线信息
    getAuditList() {
      httpAdminAudit.getAudit({ id: this.$route.query.id }).then((res) => {
        this.stepList = res.data.elements;
        /**
         * 根据审核状态判断按钮置灰
         */
        if (
          //如果状态是已作废
          this.userInfo.auditStatus === "INVALID"
        ) {
          this.isAuditDisabled = true;
          this.isHospitalDisabled = true;
          this.isPrintDisabled = true;
          this.clearPrint();
        } else if (this.userInfo.auditStatus === "PLATFORM_COMPLETE_AUDIT") {
          // 如果状态是公司已审核
          this.isHospitalDisabled = true;
          this.isPrintDisabled = false;
        } else if (this.userInfo.auditStatus === "TO_AUDIT") {
          // 如果状态是公司待审核
          this.isAuditDisabled = false;
          this.isHospitalDisabled = false;
          this.isPrintDisabled = true;
          this.clearPrint();
        } else if (
          // 如果状态是医院待审核
          this.userInfo.auditStatus === "TO_HOSPITAL_AUDIT"
        ) {
          this.isAuditDisabled = true;
          this.isHospitalDisabled = true;
          this.isPrintDisabled = true;
          let step = this.stepList.find((item) => {
            return item.auditStatus === "TO_HOSPITAL_AUDIT";
          });
          this.hospitalId = step.hospitalId;
          this.clearPrint();
        } else if (
          // 如果状态是医院已审核
          this.userInfo.auditStatus === "HOSPITAL_COMPLETE_AUDIT"
        ) {
          this.isAuditDisabled = true;
          this.isHospitalDisabled = true;
          this.isPrintDisabled = false;
          let step = this.stepList.find((item) => {
            return item.auditStatus === "HOSPITAL_COMPLETE_AUDIT";
          });
          this.hospitalId = step.hospitalId;
        }
      });
    },
    // 获取医院列表
    getHospitalList() {
      httpAdminHospital.getHospital({ pageSize: 10000 }).then((res) => {
        this.hospitalList = res.data.elements;
      });
    },
    // 查看心电图
    examineElectrocardiograph() {
      let deskUrl = JSON.parse(this.userInfo.reportResult).body.data.deskUrl;
      let ecgUrl = JSON.parse(this.userInfo.reportResult).body.data.ecgUrl;
      if (deskUrl) {
        window.open(deskUrl);
      } else {
        window.open(ecgUrl.replace("vertical", "one_ecg"));
      }
    },
    // 查看动态心电图
    examineDynamicElectrocardiograph() {
      let dynamicElectrocarUrl = JSON.parse(this.userInfo.reportResult).body.data
        .dynamicPdf;
      console.log(dynamicElectrocarUrl);
      if (dynamicElectrocarUrl) {
        window.open(dynamicElectrocarUrl);
      } else {
        return this.$message.error("暂无动态心电图");
      }
    },
    // 审核通过
    passAudit() {
      let thirdForm = {
        recordId: this.$route.query.id,
        avg: Number(this.$refs.avg.innerText),
        // title: this.$refs.ecgResult.innerText,
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
      };
      httpAdminHeartRate.putThirdReport(thirdForm).then((res) => {
        let data = {
          id: this.$route.query.id,
          ecgAuditStatus: "PLATFORM_COMPLETE_AUDIT",
        };
        if (res.code === "OK") {
          httpAdminAudit.postAudit(data).then((res) => {
            if (res.code === "OK") {
              this.loading = true;
              this.$message.success("审核成功");
              this.getList();
            }
          });
        }
      });
    },
    // 发送报告
    sendReport() {
      if (this.hospitalId) {
        let formData = {
          id: this.$route.query.id,
          hospitalId: this.hospitalId,
          // 待医院审核枚举
          ecgAuditStatus: "TO_HOSPITAL_AUDIT",
        };
        httpAdminAudit.postAudit(formData).then((res) => {
          if (res.code === "OK") {
            this.$message.success("发送成功");
            this.getList();
          }
        });
      } else {
        return this.$message.error("请选择医院");
      }
    },
    // 重审报告
    onReviewReport() {
      let formData = {
        id: this.$route.query.id,
        ecgAuditStatus: "TO_AUDIT",
      };
      httpAdminAudit.postAudit(formData).then((res) => {
        if (res.code === "OK") {
          this.$message.success("重审报告成功");
          this.getList();
          this.hospitalId = "";
        }
      });
    },
    // 作废
    onCancellation() {
      let formData = {
        id: this.$route.query.id,
        ecgAuditStatus: "INVALID",
      };
      httpAdminAudit.postAudit(formData).then((res) => {
        if (res.code === "OK") {
          this.$message.success("已作废");
          this.getList();
          this.hospitalId = "";
        }
      });
    },
    formatTitle(val) {
      switch (val.auditStatus) {
        case "TO_AUDIT":
          return "待公司审核" + " - " + parseTime(val.auditTime);
        case "PLATFORM_COMPLETE_AUDIT":
          return "公司已审核" + " - " + parseTime(val.auditTime);
        case "TO_HOSPITAL_AUDIT":
          return "待医院审核" + " - " + parseTime(val.auditTime);
        case "HOSPITAL_COMPLETE_AUDIT":
          return "医院已审核" + " - " + parseTime(val.auditTime);
        case "INVALID":
          return "已作废" + " - " + parseTime(val.auditTime);
      }
    },
  },
};
</script>
<style>
.el-step__title {
  font-size: 14px !important;
}
</style>
<style lang="scss" scoped>
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
[contenteditable]:focus {
  outline: 0px solid transparent;
  caret-color: red;
}
.print-box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .operate {
    max-width: 430px;
    height: 840px;
    margin-left: 50px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    .operateList {
      padding: 20px 0 10px 0;
      border-bottom: 1px solid #ccc;
    }
    .operationBtn {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .list {
      margin-bottom: 10px;
      .el-button {
        display: block;
        width: 100%;
        margin: 10px 0;
      }
    }
  }
}
.print-container {
  width: 650px;
}
.container {
  width: 90%;
  margin: 0 auto;
  font-size: 11px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  h3 {
    text-align: center;
  }
  .userInfo {
    padding: 10px 10px;
    box-sizing: border-box;
    border-top: 2px solid #000;
    .userName {
      display: flex;
      justify-content: space-around;
      .box {
        display: flex;
        align-items: center;
        width: 33.33%;
        .txt-r {
          display: inline-block;
          word-break: keep-all;
          white-space: nowrap;
          width: 70px;
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
        word-break: keep-all;
        white-space: nowrap;
        line-height: 1.5;
        min-width: 60px;
      }
      .content {
        min-width: 200px;
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
.rightSignature {
  margin-left: 30px;
  img {
    width: 260px;
    height: 70px;
    border-radius: 5px;
  }
}
.printBtn {
  margin-top: 10px;
}
.ecgResultTz {
  line-height: 1.5;
}
.advice {
  font-size: 11px;
}
.remark {
  text-align: center;
  margin: 30px 0;
  font-size: 12px;
  color: #ccc;
}
.tooltip {
  display: inline-block;
  font-size: 10px;
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
.minWidth {
  display: inline-block;
  min-width: 10px;
}
.margin {
  margin: 10px 0;
}
.removeScroll {
  overflow: hidden;
  overflow-y: auto;
}
/*滚动条样式*/
.removeScroll::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}
.removeScroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0);
}
.removeScroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}
</style>
