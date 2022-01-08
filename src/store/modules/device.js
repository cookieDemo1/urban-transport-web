import {
  getDevCfg,
  setDevCfg,
  getSrvCfg,
  setSrvCfg,
} from '@/api/device'
import {getVisitConfig,setVisitConfig} from '@/api/system'
import {message} from "ant-design-vue";

const state = {
  loading: {},
  devCfg: null,
  srvCfg: null,
  visitConfig: null,
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
  setDevCfg({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setDevCfg: true }})
      setDevCfg(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setDevCfg: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setDevCfg: false }})
        reject(err)
      })
    })
  },
  getSrvCfg({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getSrvCfg: true }})
      getSrvCfg(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getSrvCfg: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{srvCfg: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getSrvCfg: false }})
        reject(err)
      })
    })
  },
  setSrvCfg({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setSrvCfg: true }})
      setSrvCfg(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setSrvCfg: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setSrvCfg: false }})
        reject(err)
      })
    })
  },
  getVisitConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getVisitConfig: true }})
      getVisitConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getVisitConfig: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{visitConfig: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getVisitConfig: false }})
        reject(err)
      })
    })
  },
  setVisitConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setVisitConfig: true }})
      setVisitConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setVisitConfig: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setVisitConfig: false }})
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



