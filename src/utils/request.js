import axios from 'axios'
import VueAxios from './axios'
// import storage from 'store'
// import store from '@/store'
import {isIE} from '@/utils/index'
import {notification, message} from 'ant-design-vue'

const loginAction = '/action/login'
//不是json格式的cgi
const responseAll = ['/cgi-bin/j.cgi?upgrade_conf']

const request = axios.create({
  timeout: 10000, // 请求超时时间
  baseURL: window.location.origin,
})
// 异常拦截处理器
const errorHandler = (error) => {
  const config = error.config || {}
  const {url} = config || {}
  if (url === '/cgi-bin/sys_upd'){
    return
  }
  if (error.response) {
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      window.location.href = '/login.html'
    }else {
      notification.error({
        message: 'Error',
        description: error.message
      })
    }
  }else {
    notification.error({
      message: 'Error',
      description: error.message
    })
  }
  return Promise.reject(error)
}

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    if (config.method === 'get' && isIE) {
      config.params = {
        ...config.params,
        t: Date.parse(new Date()) / 1000
      }
    }
    return config
}, errorHandler)

//code非200， 其他错误
request.interceptors.response.use(function(response) {
  const {url} = response.config
  const { responseURL='' } = response.request
  //不是登录的xhr，且后台响应login.html页面，那就跳转到登录页
  if (url !== loginAction && responseURL.includes('login.html')){//后台响应登录页面
    window.location.href = '/login.html'
  }else if (url.startsWith('/cgi-bin/')){//后台响应json
    if (responseAll.includes(url)){
      return response
    }else if (url.startsWith('/cgi-bin/j.cgi')){
      const { result } = response.data
      const { code, data } = result || {}
      if (parseInt(code) !== 200){
        message.error(data)
      }
      return {...result, code: parseInt(code)}
    }else {
      const { code, data } = response.data
      if (parseInt(code) !== 200){
        message.error(data)
      }
      return {...response.data, code: parseInt(code)}
    }
  }
  return response
},errorHandler)

export default request


const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export {
  installer as VueAxios,
}
