import {
  getWan,
  addWan,
  deleteWan,
  getLan,
  addLan,
  deleteLan,
  getRoute,
  addRoute,
  deleteRoute,
  getDns,
  addDns,
  deleteDns,
  getNat,
  addNat,
  deleteNat,
  getMstp,
  setMstp,
  getMstpCist,
  getMstpPort,
  setMstpPort,
  getMstpMsti,
  setMstpMsti,
  getMstpInstPort,
  setMstpInstPort,
} from '@/api/system'
import {message} from "ant-design-vue";

const state = {
  loading: {},
  wan: null,
  lan: null,
  route: null,
  dns: null,
  nat: null,
  mstp: null,
  mstpCist: null,
  mstpPort: null,
  mstpMsti: null,
  mstpInstPort: null,
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
  getWan({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getWan: true }})
      getWan(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getWan: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{wan: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getWan: false }})
        reject(err)
      })
    })
  },
  addWan({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, addWan: true }})
      addWan(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, addWan: false }})
        const { code, data } = res
        if (code === 200){
          message.success('添加成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, addWan: false }})
        reject(err)
      })
    })
  },
  deleteWan({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, deleteWan: true }})
      deleteWan(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, deleteWan: false }})
        const { code, data } = res
        if (code === 200){
          message.success('删除成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, deleteWan: false }})
        reject(err)
      })
    })
  },
  getLan({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getLan: true }})
      getLan(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getLan: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{lan: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getLan: false }})
        reject(err)
      })
    })
  },
  addLan({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, addLan: true }})
      addLan(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, addLan: false }})
        const { code, data } = res
        if (code === 200){
          message.success('添加成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, addLan: false }})
        reject(err)
      })
    })
  },
  deleteLan({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, deleteLan: true }})
      deleteLan(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, deleteLan: false }})
        const { code, data } = res
        if (code === 200){
          message.success('删除成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, deleteLan: false }})
        reject(err)
      })
    })
  },
  getRoute({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getRoute: true }})
      getRoute(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getRoute: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{route: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getRoute: false }})
        reject(err)
      })
    })
  },
  addRoute({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, addRoute: true }})
      addRoute(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, addRoute: false }})
        const { code, data } = res
        if (code === 200){
          message.success('添加成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, addRoute: false }})
        reject(err)
      })
    })
  },
  deleteRoute({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, deleteRoute: true }})
      deleteRoute(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, deleteRoute: false }})
        const { code, data } = res
        if (code === 200){
          message.success('删除成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, deleteRoute: false }})
        reject(err)
      })
    })
  },
  getDns({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getDns: true }})
      getDns(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getDns: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{dns: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getDns: false }})
        reject(err)
      })
    })
  },
  addDns({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, addDns: true }})
      addDns(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, addDns: false }})
        const { code, data } = res
        if (code === 200){
          message.success('添加成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, addDns: false }})
        reject(err)
      })
    })
  },
  deleteDns({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, deleteDns: true }})
      deleteDns(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, deleteDns: false }})
        const { code, data } = res
        if (code === 200){
          message.success('删除成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, deleteDns: false }})
        reject(err)
      })
    })
  },
  getNat({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getNat: true }})
      getNat(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getNat: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{nat: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getNat: false }})
        reject(err)
      })
    })
  },
  addNat({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, addNat: true }})
      addNat(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, addNat: false }})
        const { code, data } = res
        if (code === 200){
          message.success('添加成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, addNat: false }})
        reject(err)
      })
    })
  },
  deleteNat({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, deleteNat: true }})
      deleteNat(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, deleteNat: false }})
        const { code, data } = res
        if (code === 200){
          message.success('删除成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, deleteNat: false }})
        reject(err)
      })
    })
  },
  getMstp({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getMstp: true }})
      getMstp(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getMstp: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{mstp: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getMstp: false }})
        reject(err)
      })
    })
  },
  setMstp({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setMstp: true }})
      setMstp(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setMstp: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setMstp: false }})
        reject(err)
      })
    })
  },
  getMstpCist({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getMstpCist: true }})
      getMstpCist(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getMstpCist: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{mstpCist: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getMstpCist: false }})
        reject(err)
      })
    })
  },
  getMstpPort({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getMstpPort: true }})
      getMstpPort(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getMstpPort: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{mstpPort: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getMstpPort: false }})
        reject(err)
      })
    })
  },
  setMstpPort({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setMstpPort: true }})
      setMstpPort(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setMstpPort: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setMstpPort: false }})
        reject(err)
      })
    })
  },
  getMstpMsti({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getMstpMsti: true }})
      getMstpMsti(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getMstpMsti: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{mstpMsti: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getMstpMsti: false }})
        reject(err)
      })
    })
  },
  setMstpMsti({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setMstpMsti: true }})
      setMstpMsti(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setMstpMsti: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setMstpMsti: false }})
        reject(err)
      })
    })
  },
  getMstpInstPort({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, getMstpInstPort: true }})
      getMstpInstPort(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, getMstpInstPort: false }})
        const { code, data } = res
        if (code === 200){
          commit('updateState',{mstpInstPort: data})
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, getMstpInstPort: false }})
        reject(err)
      })
    })
  },
  setMstpInstPort({state,commit}, payload){
    return new Promise((resolve,reject) => {
      commit('updateState',{loading: {...state.loading, setMstpInstPort: true }})
      setMstpInstPort(payload).then((res) => {
        commit('updateState',{loading: {...state.loading, setMstpInstPort: false }})
        const { code, data } = res
        if (code === 200){
          message.success('设置成功')
        }
        resolve(res)
      }).catch((err) => {
        commit('updateState',{loading: {...state.loading, setMstpInstPort: false }})
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



