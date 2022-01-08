import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {},
  getters,
  mutations: {},
  actions: {},
  // strict: process.env.NODE_ENV !== 'production'
})
