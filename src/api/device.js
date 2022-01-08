import request from '@/utils/request'
import api from './api'

export function getSysInfo() {
  return request({
    url: api.sysInfo,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setSysInfo(params) {
  return request({
    url: api.sysInfo,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getDevCfg() {
  return request({
    url: api.devCfg,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setDevCfg(params) {
  return request({
    url: api.devCfg,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getEnvStatus() {
  return request({
    url: api.envStatus,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setEnvStatus(params) {
  return request({
    url: api.envStatus,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getLightCtrl() {
  return request({
    url: api.lightCtrl,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setLightCtrl(params) {
  return request({
    url: api.lightCtrl,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getVolCtrl() {
  return request({
    url: api.volCtrl,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setVolCtrl(params) {
  return request({
    url: api.volCtrl,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getSrvCfg() {
  return request({
    url: api.srvCfg,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setSrvCfg(params) {
  return request({
    url: api.srvCfg,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getSysLog(params) {
  return request({
    url: api.sysLog,
    method: 'GET',
    params,
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export function getSysUpd() {
  return request({
    url: api.sysUpd,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setSysUpd(params) {
  return request({
    url: api.sysUpd,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export function setUpload(params) {
  return request({
    url: api.upload,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}



export function getTimeSet() {
  return request({
    url: api.timeSet,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setTimeSet(params) {
  return request({
    url: api.timeSet,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getTestServer(params) {
  return request({
    url: api.testServer,
    method: 'GET',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getTestResult(params) {
  return request({
    url: api.testServer,
    method: 'GET',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
