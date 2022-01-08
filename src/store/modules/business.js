import {
  getPortGet,
  setPortGet,
  getIfrateSummary,
  getIfstatsSummary,
  setIfstatsSummary,
  getPvlanConfig,
  setPvlanConfig,
  getVlanConfig,
  setVlanPage,
  addVlanConfig,
  deleteVlanConfig
} from '@/api/system'
import {message} from "ant-design-vue";

const state = {
  loading: {},
  portGet: null,
  ifrateSummary: null,
  ifstatsSummary: null,
  pvlanConfig: null,
  vlanConfig: null,
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
  getPortGet({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getPortGet: true }})
      getPortGet(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getPortGet: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{portGet: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getPortGet: false }})
        reject(err)
      })
    })
  },
  setPortGet({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setPortGet: true }})
      setPortGet(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setPortGet: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setPortGet: false }})
        reject(err)
      })
    })
  },
  getIfrateSummary({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getIfrateSummary: true }})
      getIfrateSummary(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getIfrateSummary: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{ifrateSummary: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getIfrateSummary: false }})
        reject(err)
      })
    })
  },
  getIfstatsSummary({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getIfstatsSummary: true }})
      getIfstatsSummary(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getIfstatsSummary: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{ifstatsSummary: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getIfstatsSummary: false }})
        reject(err)
      })
    })
  },
  setIfstatsSummary({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setIfstatsSummary: true }})
      setIfstatsSummary(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setIfstatsSummary: false }})
        const { code, data } = res
        if (code === 200){
          message.success('清除成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setIfstatsSummary: false }})
        reject(err)
      })
    })
  },
  getPvlanConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getPvlanConfig: true }})
      getPvlanConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getPvlanConfig: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{pvlanConfig: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getPvlanConfig: false }})
        reject(err)
      })
    })
  },
  setPvlanConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setPvlanConfig: true }})
      setIfstatsSummary(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setPvlanConfig: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setPvlanConfig: false }})
        reject(err)
      })
    })
  },
  getVlanConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getVlanConfig: true }})
      setVlanPage(payload).then((res) => {
        getVlanConfig().then((res) => {
          commit('updateState',{loading: {...state.loading, getVlanConfig: false }})
          const { code, data } = res
          if (code === 200){
            commit('updateState',{vlanConfig: data})
          }
          resolve(res)
        }).catch((err) => {
          commit('updateState',{loading: {...state.loading, getVlanConfig: false }})
          reject(err)
        })
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getVlanConfig: false }})
        reject(err)
      })
    })
  },
  addVlanConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, addVlanConfig: true }})
      addVlanConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, addVlanConfig: false }})
        const { code, data } = res
        if (code === 200){
          message.success('添加成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, addVlanConfig: false }})
        reject(err)
      })
    })
  },
  deleteVlanConfig({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, deleteVlanConfig: true }})
      deleteVlanConfig(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, deleteVlanConfig: false }})
        const { code, data } = res
        if (code === 200){
          message.success('删除成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, deleteVlanConfig: false }})
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



