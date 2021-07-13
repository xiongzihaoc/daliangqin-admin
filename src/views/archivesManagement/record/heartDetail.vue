<template>

  <div>

    <div class="print-box">
      <div class="container"
        id="printMe">
        <h3 class="fz18">动态心电仪检测报告</h3>
        <div class="userInfo">
          <div class="hospital">
            <span class="title fw">检测医院：</span>
            <span class="content">浙江省杭州市滨江第二附属医院</span>
          </div>
          <div class="userName flex margin">
            <div class="box"><span class="fw">用户姓名：</span>
              <span>胡进刚</span>
            </div>
            <div class="box"><span class="fw">检测日期：</span>
              <span>2021/6/17 15:30:00</span>
            </div>
            <div class="box"><span class="fw">设备：</span>
              <span>动态心电仪</span>
            </div>
          </div>
          <div class="userName flex margin">
            <div class="box"><span class="fw">检测模式：</span>
              <span>日常检测</span>
            </div>
            <div class="box"><span class="fw">检测时常：</span>
              <span>29秒</span>
            </div>
            <div class="box"><span class="fw">心率：</span>
              <span>76bpm</span>
            </div>
          </div>
          <div class="userName flex">
            <div class="box"><span class="fw">检测结果：</span>
              <span>正常</span>
            </div>
            <div class="box"><span class="fw">测量结果：</span>
              <span>窦性心律</span>
            </div>
            <!-- 占位符 -->
            <div class="over box"><span class="fw">测量结果：</span>
              <span>2021/6/17 15:30:00</span>
            </div>
          </div>
        </div>

        <div class="analyse">
          <img class="analyse-img"
            src="https://api.995120.cn/ecgdata/other/2021-07-07/4299720210707192719.png"
            alt="">
          <div class="fz14 analyse-title">心率分析：</div>
          <div class="flex margin">
            <div>
              <span class="fw">平均心率：</span>
              <span>76bpm</span>
            </div>
            <div>
              <span class="fw">最高心率：</span>
              <span>76bpm</span>
            </div>
            <div>
              <span class="fw">最低心率：</span>
              <span>76bpm</span>
            </div>
          </div>
          <div class="flex">
            <div>
              <span class="fw">正常心率：</span>
              <span>76bpm</span>
            </div>
            <div>
              <span class="fw">心率偏快：</span>
              <span>76bpm</span>
            </div>
            <div>
              <span class="fw">心率偏慢：</span>
              <span>76bpm</span>
            </div>
          </div>
        </div>
        <div class="impression">
          <div class="fz14 impression-title">心电分析印象：</div>
          <div>P波规律出现且直立圆顿，本次心电监测未发现明显的心电波形异常</div>
        </div>
        <div class="result">
          <div class="fz14">心电分析结果：</div>
          <div class="fz11 result-text">窦性心律，本次心电监测未见明显异常</div>
          <div class="result-option">
            <div class="fw result-title">原因分析：</div>
            <div class="content">由心脏中的窦房结每隔一定时间发出的电激动所产生的心电图叫做窦性心律，是人体的正常的心现象，也是维持人体心脏正常工作的主要电生理活动</div>
          </div>
          <div class="result-option middle">
            <div class="fw result-title">处置建议：</div>
            <div class="content">由心脏中的窦房结每隔一定时间发出的电激动所产生的心电图叫做窦性心律，是人体的正常的心现象，也是维持人体心脏正常工作的主要电生理活动</div>
          </div>
          <div class="result-option">
            <div class="fw result-title">保健建议：</div>
            <div class="content">由心脏中的窦房结每隔一定时间发出的电激动所产生的心电图叫做窦性心律，是人体的正常的心现象，也是维持人体心脏正常工作的主要电生理活动</div>
          </div>
        </div>
        <div class="variation-box">
          <div class="fz14 impression-title">心率变异性分析：</div>
          <div>
            <div class="fz11 variation">心率变异性指数：</div>
            <div class="variation-text">您的心率变异性指数正常，请保持目前良好的生活习惯，坚持定期做心电监测，随时关注心率变异性情况。</div>
          </div>
          <div>
            <div class="fz11 variation">心脏疾病风险评估：</div>
            <div class="variation-text">您的心率变异性指数正常，请保持目前良好的生活习惯，坚持定期做心电监测，随时关注心率变异性情况。</div>
          </div>
          <div>
            <div class="fz11 variation">精神压力指数：</div>
            <div class="variation-text">您的心率变异性指数正常，请保持目前良好的生活习惯，坚持定期做心电监测，随时关注心率变异性情况。</div>
          </div>
          <div>
            <div class="fz11 variation">身体疲劳指数：</div>
            <div class="variation-text">您的心率变异性指数正常，请保持目前良好的生活习惯，坚持定期做心电监测，随时关注心率变异性情况。</div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer">
          <div class="left">
            <span class="fz14 date">签名日期：</span>
            <span class="fz14">年</span>
            <span class="fz14">月</span>
            <span class="fz14">日</span>
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
        style="marin:0 auto">打印</el-button>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      printObj: {
        id: "printMe",
        popTitle: "good print",
        extraCss: "https://www.google.com,https://www.google.com",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.print-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 595px;
  font-size: 11px;
  padding: 20px;
  box-sizing: border-box;
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