import {
  getSysInfo,
  getSysLog,
} from '@/api/device'
import {
  upgradeSystem,
  getUpgradeStatus,
  upgradeApp,
  setUpgradeAppInfo,
  getUpgradeAppInfo,
  restartSystem,
  resetSystem,
  getSystemConfig,
  getNtpConfig,
  setNtpConfig,
  getSysTime,
  setSysTime,
} from '@/api/system'
import {message} from "ant-design-vue";

const state = {
  loading: {},
  sysLog: null,
  systemConfig: null,
  sysInfo: null,
  ntpConfig: null,
  sysTime: null,
}

const getters = {
}

const mutations = {
  updateState(state, payload) {
    if (typeof payload !== 'object') {
      return
    }
    Object.keys(payload).forEach(key => {
      state[key] = payload[key]
    })
  }
}

const actions = {
  getSysLog({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getSysLog: true }})
      getSysLog(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getSysLog: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{sysLog: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getSysLog: false }})
        reject(err)
      })
    })
  },
  getNtpConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getNtpConfig: true }})
      getNtpConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getNtpConfig: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{ntpConfig: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getNtpConfig: false }})
        reject(err)
      })
    })
  },
  setNtpConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setNtpConfig: true }})
      setNtpConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setNtpConfig: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setNtpConfig: false }})
        reject(err)
      })
    })
  },
  getSysTime({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getSysTime: true }})
      getSysTime(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getSysTime: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{sysTime: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getSysTime: false }})
        reject(err)
      })
    })
  },
  beforeSetSysTime({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, beforeSetSysTime: true }})
      setNtpConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, beforeSetSysTime: false }})
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, beforeSetSysTime: false }})
        reject(err)
      })
    })
  },
  setSysTime({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setSysTime: true }})
      setSysTime(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setSysTime: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setSysTime: false }})
        reject(err)
      })
    })
  },
  upgradeSystem({state,commit}, payload){
    return upgradeSystem(payload)
  },
  getUpgradeStatus({state,commit}, payload){
    return getUpgradeStatus(payload)
  },
  upgradeApp({state,commit}, payload){
    return upgradeApp(payload)
  },
  setUpgradeAppInfo({state,commit}, payload){
    return setUpgradeAppInfo(payload)
  },
  getUpgradeAppInfo({state,commit}, payload){
    return getUpgradeAppInfo(payload)
  },
  restartSystem({state,commit}, payload){
    return restartSystem(payload)
  },
  resetSystem({state,commit}, payload){
    return resetSystem(payload)
  },
  getSystemConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getSystemConfig: true }})
      getSystemConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getSystemConfig: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{systemConfig: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getSystemConfig: false }})
        reject(err)
      })
    })
  },
  getSysInfo({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getSysInfo: true }})
      getSysInfo(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getSysInfo: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{sysInfo: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getSysInfo: false }})
        reject(err)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}



