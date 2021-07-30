<template>
  <div>
    <div class="print-box">
      <div class="container"
        id="printMe"
        v-loading="loading">
        <h3 class="fz18">动态心电仪检测报告</h3>
        <div class="userInfo">
          <div class="hospital">
            <span class="title fw">检测医院：</span>
            <span class="content">{{userInfo.hospitalName}}</span>
          </div>
          <div class="userName flex margin">
            <div class="box"><span class="fw">用户姓名：</span>
              <span>{{userInfo.patientUserName}}</span>
            </div>
            <div class="box"><span class="fw">检测日期：</span>
              <span>{{parseTime(userInfo.inspectionTime)}}</span>
            </div>
            <div class="box"><span class="fw">设备：</span>
              <span>{{userInfo.name}}</span>
            </div>
          </div>
          <div class="userName flex margin">
            <div class="box"><span class="fw">检测模式：</span>
              <span v-if="userInfo.detectType === 'DAILY'">日常检测</span>
              <span v-else>24小时检测</span>
            </div>
            <div class="box"><span class="fw">检测时长：</span>
              <span>{{heartDetail.length}}秒</span>
            </div>
            <div class="box"><span class="fw">心率：</span>
              <span>{{userInfo.heartRateScore}}bpm</span>
            </div>
          </div>
          <div class="userName flex">
            <div class="box"><span class="fw">检测结果：</span>
              <span v-if="userInfo.heartRateStatus ==='NORMAL'">正常</span>
              <span v-else-if="userInfo.heartRateStatus ==='FAST'">稍快</span>
              <span v-else>稍慢</span>
            </div>
            <div class="box"><span class="fw">测量结果：</span>
              <span>{{userInfo.title}}</span>
            </div>
            <!-- 占位符 -->
            <div class="over box"><span class="fw">测量结果：</span>
              <span>2021/6/17 15:30:00</span>
            </div>
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
              <span class="fw fz16">{{heartDetail.avg}}</span>
              <span>bpm</span>
            </div>
            <div>
              <span class="fw">最高心率：</span>
              <span class="fw fz16">{{heartDetail.max}}</span>
              <span>bpm</span>
            </div>
            <div>
              <span class="fw">最低心率：</span>
              <span class="fw fz16">{{heartDetail.min}}</span>
              <span>bpm</span>
            </div>
          </div>
          <div class="flex resultWidth">
            <div>
              <span class="fw">正常心率：</span>
              <span class="fw fz16">{{heartDetail.normalRate}}%</span>
            </div>
            <div>
              <span class="fw">心率偏快：</span>
              <span class="fw fz16">{{heartDetail.heartbeatRate}}%</span>

            </div>
            <div>
              <span class="fw">心率偏慢：</span>
              <span class="fw fz16">{{heartDetail.slowRate}}%</span>

            </div>
          </div>
        </div>
        <div class="impression">
          <div class="fz14 impression-title">心电分析印象：</div>
          <div>{{heartDetail.ecgResultTz}}</div>
        </div>
        <div class="result">
          <div class="fz14">心电分析结果：</div>
          <div class="fz11 result-text">{{heartDetail.ecgResult}}</div>
          <div class="result-option">
            <div class="fw result-title">原因分析：</div>
            <div class="content">{{heartDetail.abnorAnalysis}}</div>
          </div>
          <div class="result-option middle">
            <div class="fw result-title">处置建议：</div>
            <div class="content">{{heartDetail.suggestion}}</div>
          </div>
          <div class="result-option">
            <div class="fw result-title">保健建议：</div>
            <div class="content">{{heartDetail.healthCareAdvice}}</div>
          </div>
        </div>
        <div class="variation-box">
          <div class="fz14 impression-title">心率变异性分析：</div>
          <div>
            <div class="fz11 variation">心率变异性指数：</div>
            <div class="variation-text">{{heartDetail.hrv}}</div>
          </div>
          <div>
            <div class="fz11 variation">心脏疾病风险评估：</div>
            <div class="variation-text">{{heartDetail.hdrisk}}</div>
          </div>
          <div>
            <div class="fz11 variation">精神压力指数：</div>
            <div class="variation-text">{{heartDetail.mentalPressure}}</div>
          </div>
          <div>
            <div class="fz11 variation">身体疲劳指数：</div>
            <div class="variation-text">{{heartDetail.fatigue}}</div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
          <div class="left">
            <!-- <span class="fz14 date">签名日期：</span>
            <span class="fz14">年</span>
            <span class="fz14">月</span>
            <span class="fz14">日</span> -->
          </div>
          <div class="right">
            <span class="fz14">医生签名：</span>
          </div>
        </div>
      </div>

    </div>
    <div style="text-align:center">
      <el-button type="primary"
        v-print="printObj"
        size="mini"
        style="marin:0 auto;margin-top:30px">打印</el-button>
    </div>
  </div>

</template>

<script>
import { httpAdminHeartRate } from '@/api/admin/httpAdminHeartRate'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      parseTime,
      printObj: {
        id: 'printMe',

        popTitle: '',

        extraCss: '',

        extraHead: '',
      },
      loading: true,
      heartDetail: {},
      userInfo: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      httpAdminHeartRate
        .getHeartRate({ id: this.$route.query.id })
        .then((res) => {
          this.userInfo = res.data.elements[0]
          this.heartDetail = JSON.parse(
            res.data.elements[0].reportResult
          ).body.data
          this.loading = false
        })
    },
  },
}
</script>

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
.print-box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#printMe {
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
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    .userName {
      .box {
        flex: 1;
      }
    }
  }
  .analyse {
    padding: 8px 10px;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    .analyse-img {
      display: block;
      margin: 0 auto;
      width: 347px;
      height: 93px;
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
        min-width: 60px;
      }
      .content {
        line-height: 18px;
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
  }
  .resultWidth div {
    min-width: 110px;
  }
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