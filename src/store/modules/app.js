import { homeRouterMap }  from '@/config/router.config'

const state = {
  routes: homeRouterMap
}

const getters = {
  menus(state){
    const routes = state.routes.find(item => item.path === '/')
    const menus = ((routes && routes.children) || []).map((item) => {
      if (item.children){
        let children = item.children.map(childItem => {
          return {...childItem, icon: childItem.meta.icon, title: childItem.meta.title,  }
        })
        return {...item, icon: item.meta.icon, title: item.meta.title, children }
      }
      return {...item, icon: item.meta.icon, title: item.meta.title, }
    })
    return menus
  },
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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
