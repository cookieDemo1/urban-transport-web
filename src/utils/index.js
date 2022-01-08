import x2js from 'x2js' //xml数据处理插件
const $x2js = new x2js()

const ua = window.navigator.userAgent
export const isIE =  ua.indexOf('MSIE') >= 0
export const isIE11 =  'ActiveXObject' in window

const modelItems = {
  CameraModel: {
    "HIK":"海康",
    "DAHUA":"大华",
  },
  MiniCamRunModel: {
    "HIK":"海康",
    "DAHUA":"大华",
  },
  DisplayModel: {
    "KLT":"北京卡莱特",
    "XIXUN":"上海熙讯",
  },
  RadioModel: {
    "KLT":"北京卡莱特",
    "XIXUN":"上海熙讯",
    "OPLUS":"欧普仕",
  },
  PowerModel: {
    "SUTPC":"深研",
    "NFDW":"南方电网",
  },
  RadarModel: {
    "SXHD":"首信哈迪",
  },
  LightningProtectionModel: {
    "YUANZHENG":"远征",
  },
  SosModel: {
    "HIK":"海康",
    "RTD":"锐通达",
  },
  ApModel: {
    "RZX":"任子行",
  },
  EnvironmentModel: {
    "ZXHB":"众兴环保",
    "FAOT-AQM602":"富奥通 AQM602",
    "FAOT-AQM606":"富奥通 AQM606",
    "FAOT-AQM916":"富奥通 AQM916",
    "FAOT-RDM306":"富奥通 RDM306",
    "WXT":"萨维拉",
    "DNQ":"南油公司",
  },
  LockModel: {
    "MS899":"MS899 智能门锁",
  },
  DataAcquisitionModuleModel: {
    "MD-82R":"广东大榕树",
  },
  InclinationSensorModel: {
    "ZC":"直川科技",
  },
  DraftSensorModel: {
    "JINSHUI":"金水华禹",
  },
}

const modelNames = Object.keys(modelItems).reduce((res,modelKey) => {
  const item = modelItems[modelKey]
  return {...res,...item}
},{})


export const getModelOptions = (modelKey) => {
  if (modelKey){
    return modelItems[modelKey] || {}
  }
  return {}
}


export const getModelDesc = (model) => {
  if (model){
    return modelNames[model] || '无设备数据'
  }
  return '无设备数据'
}

//校验端口
export const checkPortRequired = (rule, value, callback) => {
   const res = value.some(item => item.value)
  if(res){
    callback();
    return
  }
  callback(new Error('未选择端口'));
}


//校验端口
export const checkPort = (rule, value, callback) => {
  if(/^\d+$/.test(value) && (parseInt(value) >= 0 && parseInt(value) <= 65535 )){
    callback();
    return
  }
  callback(new Error('格式错误'));
}

//校验ip
export const checkIP = (rule, value, callback) => {
  if(/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(value)){
    callback();
    return
  }
  callback(new Error('格式错误'));
}

export const checkEmptyOrIPMask = (rule, value, callback) => {
  if (!value){
    callback()
    return
  }

  if (checkIP4Mask(value) || checkIP6Mask(value)){
    callback()
    return
  }
  callback(new Error('格式错误'));
}

export const checkIPMask = (rule, value, callback) => {
  if (checkIP4Mask(value) || checkIP6Mask(value)){
    callback()
    return
  }
  callback(new Error('格式错误'));
}

export const checkIP4Mask = (value) => {
  let tmp = value.split("/");
  if(tmp.length !== 2){
    return false
  }

  const ip = tmp[0], mask = tmp[1]
  if(/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(ip) && (mask>=0 && mask<=32)){
    return true
  }

  return false
}

export const checkIP6Mask = (value) => {
  let tmp = value.split("/");
  if(tmp.length !== 2){
    return false
  }

  const ip = tmp[0], mask = tmp[1]
  if(/((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*$/.test(ip)
    && (mask>0 && mask<=128)
  ){
    return true
  }

  return false
}


export function XMLSTR2JSON(xmlStr) {
  return $x2js.xml2js(xmlStr);
}
