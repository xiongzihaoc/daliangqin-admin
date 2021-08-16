import { httpPublicLogin } from '@/api/public/httpPublicLogin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'


const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        httpPublicLogin.login(userInfo).then(res => {
          if (res.code === 'OK') {
            if (res.data.adminRoleType) {
              window.localStorage.setItem('userId', res.data.userId)
              commit('SET_TOKEN', "admin")
              setToken("xzh")
              resolve(res)
            }
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出系统
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        httpPublicLogin.logout(state.token).then(() => {
          window.localStorage.clear()
          window.sessionStorage.clear()
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
