<template>
  <div class="navbar-box">
    <div class="navbar">
      <div>
        <hamburger :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleSideBar" />
        <!-- <breadcrumb class="breadcrumb-container" /> -->
      </div>
      <topbar />
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <screenfull id="screenfull"
            class="right-menu-item hover-effect" />
        </template>
        <el-dropdown class="avatar-container"
          trigger="click">
          <div class="avatar-wrapper">
            <img :src="userInfo.avatarUrl"
              class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown"
            class="user-dropdown">
            <div style="padding:10px;display: flex;flex-direction: column;align-items: center;">
              <div><img style="width:64px;height:64px;border-radius:50%"
                  :src="userInfo.avatarUrl"
                  alt=""></div>
              <div v-if="userInfo.name"
                class="name">{{userInfo.name}}</div>
              <div class="hospitalName"
                v-if="userInfo.hospitalName">{{userInfo.hospitalName}}</div>
              <div v-if="userInfo.phone"
                class="phone">{{userInfo.phone}}</div>
            </div>
            <div class="bottom">
              <el-button type="danger"
                size="mini"
                icon="el-icon-switch-button"
                @click.native="logout">退出</el-button>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Topbar from './Topbar'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull' // 添加部分
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Topbar,
  },
  data() {
    return {
      userInfo: {
        avatarUrl: '',
        name: '111',
        hospitalName: '杭州萧山医院',
        phone: '18682308445',
      },
    }
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('adminUserInfo'))
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val,
        })
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      },
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('Logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>
<style>
/* .navbar-box .el-popper[x-placement^='bottom'] .popper__arrow {
  border-bottom-color: #304156 !important;
  right: 50% !important;
} */
</style>
<style lang="scss" scoped>
.el-dropdown-menu {
  width: 300px;
  padding: 0;
  border: none;
  background-color: #304156;
  color: #fff;
}
.popper__arrow::after {
  color: red !important;
}
.bottom {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background: #f9f9f9;
}
.name,
.hospitalName,
.phone {
  margin-top: 10px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .user-dropdown {
        background: #1890ff !important;
        color: #fff;
      }
      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
