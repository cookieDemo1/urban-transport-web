import md5 from 'md5'
import {login, logout} from '@/api/user'

const state = {
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
  login({commit}, payload){
    return login(payload)
  },
  logout({commit}, payload){
    return logout(payload)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}



