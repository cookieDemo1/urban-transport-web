import {
  getSysInfo,
  setSysInfo,
  getDevCfg,
  getEnvStatus,
  // setDevCfg,
  // setEnvStatus,
  getLightCtrl,
  setLightCtrl,
  getVolCtrl,
  setVolCtrl,
} from '@/api/device'
import {message} from "ant-design-vue";

const state = {
  loading: {},

  sysInfo: null,
  devCfg: null,
  envStatus: null,
  lightCtrl: null,
  volCtrl: null,
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

//action 页面loading、提示、数据，其他状态不管（confirmButton、saveButton、visible）
const actions = {
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
  setSysInfo({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setSysInfo: true }})
      setSysInfo(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setSysInfo: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setSysInfo: false }})
        reject(err)
      })
    })
  },
  getDevCfg({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getDevCfg: true }})
      getDevCfg(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getDevCfg: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{devCfg: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getDevCfg: false }})
        reject(err)
      })
    })
  },
  getEnvStatus({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getEnvStatus: true }})
      getEnvStatus(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getEnvStatus: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{envStatus: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getEnvStatus: false }})
        reject(err)
      })
    })
  },
  getLightCtrl({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getLightCtrl: true }})
      getLightCtrl(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getLightCtrl: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{lightCtrl: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getLightCtrl: false }})
        reject(err)
      })
    })
  },
  setLightCtrl({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setLightCtrl: true }})
      setLightCtrl(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setLightCtrl: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setLightCtrl: false }})
        reject(err)
      })
    })
  },
  getVolCtrl({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getVolCtrl: true }})
      getVolCtrl(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getVolCtrl: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{volCtrl: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getVolCtrl: false }})
        reject(err)
      })
    })
  },
  setVolCtrl({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setVolCtrl: true }})
      setVolCtrl(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setVolCtrl: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setVolCtrl: false }})
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



