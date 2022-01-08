import request from "@/utils/request";
import api from "@/api/api";

export const restartSystem = (data) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: data,
  })
}

export const resetSystem = (data) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: data,
  })
}

export const upgradeSystem = (params) => {
  let formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key,params[key])
  })
  return request({
    url: api.upgradeSystem,
    method: 'POST',
    data: formData,
    timeout: 60 * 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getUpgradeStatus = () => {
  return request({
    url: api.upgradeStatus,
    method: 'GET',
  })
}


export const upgradeApp = (params) => {
  let formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key,params[key])
  })
  return request({
    url: api.upgradeApp,
    method: 'POST',
    data: formData,
    timeout: 60 * 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}


export const setUpgradeAppInfo = (params) => {
  return request({
    url: api.upgradeAppInfo,
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getUpgradeAppInfo = () => {
  return request({
    url: api.upgradeAppInfo,
    method: 'GET',
    data: {},
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


export const getWan = () => {
  return request({
    url: api.wan,
    method: 'GET',
  })
}


export const addWan = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const deleteWan = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getLan = () => {
  return request({
    url: api.lan,
    method: 'GET',
  })
}

export const addLan = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const deleteLan = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getRoute = () => {
  return request({
    url: api.route,
    method: 'GET',
  })
}


export const addRoute = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const deleteRoute = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}


export const getDns = () => {
  return request({
    url: api.dns,
    method: 'GET',
  })
}


export const addDns = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const deleteDns = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getNat = () => {
  return request({
    url: api.nat,
    method: 'GET',
  })
}

export const addNat = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const deleteNat = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getMstp = () => {
  return request({
    url: api.mstp,
    method: 'GET',
  })
}

export const setMstp = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getMstpCist = () => {
  return request({
    url: api.mstpCist,
    method: 'GET',
  })
}


export const getMstpPort = () => {
  return request({
    url: api.mstpPort,
    method: 'GET',
  })
}

export const setMstpPort = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}


export const getMstpMsti = () => {
  return request({
    url: api.mstpMsti,
    method: 'GET',
  })
}

export const setMstpMsti = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}



export const getMstpInstPort = (params) => {
  return request({
    url: api.mstpInstPort,
    method: 'GET',
    params
  })
}

export const setMstpInstPort = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}


export const getPortGet = () => {
  return request({
    url: api.portGet,
    method: 'GET',
  })
}

export const setPortGet = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getIfrateSummary = () => {
  return request({
    url: api.ifrateSummary,
    method: 'GET',
  })
}

export const getIfstatsSummary = () => {
  return request({
    url: api.ifstatsSummary,
    method: 'GET',
  })
}

export const setIfstatsSummary = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}


export const getPvlanConfig = () => {
  return request({
    url: api.pvlanConfig,
    method: 'GET',
  })
}

export const setPvlanConfig = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getVlanConfig = () => {
  return request({
    url: api.vlanConfig,
    method: 'GET',
  })
}

export const setVlanPage = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const addVlanConfig = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const deleteVlanConfig = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}



export const getVisitConfig = () => {
  return request({
    url: api.visitConfig,
    method: 'GET',
  })
}

export const setVisitConfig = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}

export const getSystemConfig = () => {
  return request({
    url: api.systemConfig,
    method: 'GET',
  })
}


export const getNtpConfig = () => {
  return request({
    url: api.ntp,
    method: 'GET',
  })
}

export const setNtpConfig = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}



export const getSysTime = () => {
  return request({
    url: api.time,
    method: 'GET',
  })
}

export const setSysTime = (params) => {
  return request({
    url: api.jcgi,
    method: 'POST',
    data: params
  })
}
