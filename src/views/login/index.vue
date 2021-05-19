<template>
  <div class="login-container">
    <el-form ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">大良卿科技</h3>
      </div>
      <!-- 手机号 -->
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="phone" />
        </span>
        <el-input ref="phone"
          v-model.trim="loginForm.phone"
          placeholder="手机号"
          name="phone"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          tabindex="1"
          auto-complete="on" />
        <el-button v-show="show"
          @click="getCodeBtn"
          type="plain"
          size="mini"
          class="btnCode">验证码</el-button>
        <el-button v-show="!show"
          type="plain"
          size="mini"
          class="btnCode">{{
          count + "S"
        }}</el-button>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="code"
          v-model.trim="loginForm.code"
          placeholder="验证码"
          name="code"
          auto-complete="on"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          @keyup.enter.native="handleLogin" />
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
import { getCode } from "@/api/login/user";
import { validatePhone, validateCode } from "@/utils/index";
export default {
  name: "Login",
  data() {
    return {
      // 表单验证
      loginRules: {
        phone: [
          { required: true, trigger: "change", validator: validatePhone },
        ],
        code: [{ required: true, trigger: "blur", validator: validateCode }],
      },
      loginForm: {
        phone: "",
        code: "",
        deviceType: "PC_WEB",
        deviceId: "333333",
        isAdmin: true,
        maxAge: 2592000,
        // userType: "DOCTOR",
      },
      loading: false,
      redirect: undefined,
      show: true,
      count: "",
      timer: null,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    // 获取验证码按钮
    getCodeBtn() {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (this.loginForm.phone.length <= 0) {
        return this.$message.error("请填写手机号码！");
      } else if (!reg.test(this.loginForm.phone)) {
        return this.$message.error("请填写正确的手机号码！");
      } else {
        // 定时器
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              // 清除定时器
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        // 发送请求
        getCode({ phone: Number(this.loginForm.phone), smsType: "LOGIN" }).then(
          (res) => {
            console.log(res);
          }
        );
      }
    },
    // 登录按钮
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then((res) => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // 清除定时器
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .btnCode {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    opacity: 0.3;
    color: red;
    font-weight: 700;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
