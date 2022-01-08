import Mock from 'mockjs2'
import api from '@/api/api'

const sysInfo = {
  "code": 200,
  "message": "SystemInfo",
  "data": {
    "SystemInfo": {   /*系统信息*/
      "SystemId": "SY-EG18100001",  /*网关设备 ID*/
      "Location": "沙河西路-白石路 K0-385",  /*安装点位*/
      "ProductType": "STC-SL300LITE",  /*型号*/
      "ActivateStatus": "已激活",  /*激活状态*/
      "SN": "20201221001",  /*序列号*/
      "MAC": "AA:BB:CC:11:88",  /*MAC 地址*/
      "HardVersion": "V3.01",   /*硬件版本*/
      "SysVersion": "V3.01",   /*系统版本*/
      "SoftVersion": "V2.09",   /*应用版本*/
    }
  }
}


const devCfg = {
  "code": 200, "message": "DevicesConfig", "data": {
    "IpConfig": {   /*IP 相关参数设置，0.0.0.0 表示数据为空*/
      "CameraIp": "10.10.101.50",  /*摄像头 IP*/
      "MiniCameraIp": "10.10.150.50", /*次摄像头 IP*/
      "DisplayIp": "10.10.61.50",  /*显示屏 IP*/
      "RadioIp": "10.10.71.50",  /*广播音柱 IP*/
      "PowerIp": "10.10.111.50",   /*智慧电源 IP*/
      "RadarIp": "10.10.121.50",   /*微波雷达 IP*/
      "LightningProtectionIp": "10.10.131.50",  /*防雷模块 IP*/
      "SosIp": "10.10.81.50",   /*SOS IP*/
      "ApIp": "10.10.51.50",   /*AP IP*/
    },
    "DevicesModel": {  /*设备型号选择*/
      "CameraModel": "HIK",   /*NULL:无设备数据 HIK:海康 DAHUA:大华*/
      "MiniCamRunModel": "DAHUA", /*NULL:无设备数据 HIK:海康 DAHUA:大华*/
      "DisplayModel": "KLT",   /*NULL:无设备数据 KLT:北京卡莱特 XIXUN:上海熙讯*/
      "RadioModel": "KLT",  /*NULL:无设备数据 KLT:北京卡莱特 XIXUN:上海熙讯 OPLUS:欧普仕*/
      "PowerModel": "SUTPC",   /* NULL:无设备数据 SUTPC:深研 NFDW:南方电网*/
      "RadarModel": "SXHD",   /* NULL:无设备数据 SXHD:首信哈迪*/
      "LightningProtectionModel": "YUANZHENG",  /* NULL:无设备数据 YUANZHENG:远征*/
      "SosModel": "HIK",   /*NULL:无设备数据 HIK:海康 RTD:锐通达*/
      "ApModel": "RZX",    /*NULL:无设备数据 RZX:任子行*/
      "EnvironmentModel": "ZXHB", /* NULL:无设备数据、ZXHB:众兴环保、FAOT-AQM602:富奥通 AQM602、FAOTAQM606:富奥通 AQM606、FAOT-AQM916:富奥通 AQM916、FAOT-RDM306:富奥通 RDM306、WXT:萨维拉 DNQ:南油 公司*/

      "LockModel": "MS899",   /* NULL:无设备数据 MS899:MS899 智能门锁*/
      "DataAcquisitionModuleModel": "MD-82R", /* NULL:无设备数据 MD-82R:广东大榕树*/
      "InclinationSensorModel": "ZC",  /* NULL:无设备数据 ZC:直川科技*/
      "DraftSensorModel": "JINSHUI",   /*NULL:无设备数据 JINSHUI:金水华禹*/
    },
    "RunStatus": { /*Offline:离线 Online:在线 根据“DevicesModel”判断是否存在此设备*/
      "CamRunStatus": "Online",  /*摄像头运行状态*/
      "MiniCamRunStatus": "Online", /*次摄像头运行状态*/
      "DisplayRunStatus": "Online", /*显示屏运行状态*/
      "RadioRunStatus": "Online", /*广播音柱运行状态*/
      "PowerRunStatus": "Online", /*智慧电源运行状态*/
      "RadarRunStatus": "Online", /*微波雷达运行状态*/
      "LightningProtectionRunStatus": "Online", /*防雷模块运行状态*/
      "SosRunStatus": "Online", /*SOS 运行状态*/
      "ApRunStatus": "Online", /*AP 运行状态*/
      "EnvironmentRunStatus": "Online", /*环境传感器运行状态*/
      "LockRunStatus": "Online", /*智能门锁运行状态*/
      "DataAcquisitionModuleRunStatus": "Online", /*数据采集器运行状态*/
      "InclinationRunStatus": "Online", /*倾角传感器运行状态*/
      "DraftSensorRunStatus": "Online", /*水尺传感器运行状态*/
      "ServiceRunStatus": "Online", /*服务器运行状态*/
    }
  }
}

const envStatus = {
  "code": 200,
  "message": "EnvironmentStatus",
  "data": {
    "EnvironmentStatus": { /*环境传感数据*//*NULL 表示无此功能项*/
      "Temperature": "25",
      "Humidity": "40",
      "CO": "",
      "PM2.5": "10",
      "PM10": "10",
      "Noise": "50"
    }
  }
}


const lightCtrl = {
  "code": 200,
  "message": "LightControl",
  "data": {
    "BrightMode": "Manual", /*控灯模式：Manual 手动调节，TimingPlan 定时计划，AI 为 AI 调光*/
    "BrightValue": "5", /*亮度：0-10*/
    "BrightCtrl": "On", /*亮度开关：On/Off*/
    "BrightOpeningTime": "19:00", /*每天开灯时间*/
    "BrightClosingTime": "06:00",  /*每天关灯时间*/
  }
}

const volCtrl = {
  "code": 200,
  "message": "VolumnControl",
  "data": {"VolumnValue": "5", /*音量：0-12*/   "VolumnCtrl": "On" /*音量开关：On/Off*/}
}

const srvCfg = {
  "code": 200,
  "message": "LightControl",
  "data": {
    "ServiceAddress": {  /*服务器相关设置*/
      "ServiceAddr": "10.10.2.167",  /*服务器地址*/
      "ServicePort": "8080",   /*服务器端口*/
      "CommMethod": "TCPIP",  /*TCPIP 或者 MQTT*/
      "CommEncrypt": "",  /*NULL:不加密 SM2:SM2 加密*/
      "MqttUser": "sutpc",   /*MQTT 用户名*/
      "MqttPwd": "123456",   /*MQTT 密码*/
      "MqttPublishTopic": "mqtt-smr-pubtopic",   /*MQTT 发布主题*/
      "MqttSubscribeTopic": "mqtt-smr-subtopic",   /*MQTT 订阅主题*/
      "UrlCamAv": "rtsp://admin:asd123456@192.168.1.201:80/h264/ch1/sub/av_stream",              /*主摄像头视频流地址*/
      "UrlMiniCamAv": "rtsp://admin:sutpc654321@10.10.150.50:554/h264/ch1/sub/av_stream",             /*主摄像头视频流地址*/
      "UrlSosPic": "http://10.10.2.167:8080/SmartRoadMS/api/attach/uploadAttachments",              /*SOS 图片上传地址*/
      "UrlAiData": "http://10.10.2.167:8080/SmartRoadMS/api/attach/uploadAttachments",              /*AI 数据上传地址*/
    }
  }
}

const sysLog = {
  "code": 200,
  "message": "SystemLogs",
  "data": {
    "content|5": [ /*日志内容*/
      // {
      //   "LogId|+1": "1568228999683934",/*随机日志 ID*/
      //   "User": "@name",
      //   "OperateTime": "@date @time",/*ms 时间戳*/
      //   "OperateThing|20": "Change DNS"
      // },
    {
      "LogId": "1568228999683934",/*随机日志 ID*/
      "User": "zhangsan",
      "OperateTime": "1568228999683",/*ms 时间戳*/
      "OperateThing": "Change DNS"
    },
    {
      "LogId": "1568228999683934",
      "User": "lisi",
      "OperateTime": "1568228999683",
      "OperateThing": "Change SubnetMask"
    },
    // {
    //   "LogId": "1568228999683934",
    //   "User": "wangwu",
    //   "OperateTime": "1568228999683",
    //   "OperateThing": "Change CameraIp"
    // }
    ],
    "pageData": {"totalSize": "3000"  /*总的日志条数*/}
  }
}


// enctype="multipart/form-data"
const sysUpd = {
  "code": 200,
  "message": "SystemInfo",
  "data": {}
}

const upload = {
  "code": 200,
  "message": "SystemInfo",
  "data": {}
}

const timeSet = {
  "code": 200,
  "message": "TimeDate",
  "data": {
    "TimeDate": {  /*时间设置*/
      "AdjustMode": "MANUAL",   /* MANUAL:手动校时 AUTO:自动校时*/
      "Date": "2019-08-29 16:36:21",  /*日期时间*/
      "Zone": "UTC+8",     /*所属时区*/
      "NtpServer": "time.windows.com",  /*NTP服务器地址*/
    }
  }
}


const testServer = {
  "code": 200,
  "message": "ModeAndVersion",
  "data": {"TestModeStatus": "1", /*1：进入测试模式界面； 0：进入主界面*/   "HardPlatform": "3.0" /*2.0:适配 V2.0 网关界面 3.0:适配 V3.0 网关界面*/}
}

const testResult = {
  "code": 200, "message": " TestResult", "data": {   /*2：设备不存在；1: 测试通过； 0：测试失败*/
    "RS485-1": "1",
    "RS485-2": "1",
    "RS232-1": "1",
    "RS232-2": "1",
    "RS232-SW": "2",  /*交换机 RS232*/
    "USB-1": "2",
    "USB-2": "2",
    "SD": "2",    /*SD 卡*/
    "EI-1": "1",   /*输入口 1*/
    "EI-2": "1",
    "EI-3": "1",
    "EI-4": "1",
    "EI-5": "1",


    "EI-6": "1",
    "EI-7": "1",
    "EI-8": "1",   /*输入口 8*/
    "DO-1": "1",   /*输出口 1*/
    "DO-2": "1",
    "DO-3": "1",
    "DO-4": "1",
    "DO-5": "1",
    "DO-6": "1",
    "DO-7": "1",
    "DO-8": "1",   /*输出口 8*/
    "SecurityChip": "1",  /*安全芯片*/
    "eeprom": "1",   /*EEPROM*/
    "4G": "1",    /*4G 模块*/
    "Zigbee": "1",   /*Zigbee 模块*/
    "GPS": "1",   /*GPS 模块*/
    "RTC": "1",   /*时钟芯片*/

    /*-8888：设备不存在*/
    "temperature": "-8888", /*温度*/
    "humidity": "-8888"  /*湿度*/
  }
}

Mock.mock(new RegExp(api.sysInfo), sysInfo)
Mock.mock(new RegExp(api.devCfg),  devCfg)
Mock.mock(new RegExp(api.envStatus), envStatus)
Mock.mock(new RegExp(api.lightCtrl), lightCtrl)
Mock.mock(new RegExp(api.volCtrl),  volCtrl)
Mock.mock(new RegExp(api.srvCfg), () => ({
  ...srvCfg
}))
Mock.mock(new RegExp(api.sysLog),  (options) => {
  // const {url} = options
  // const pageNumber = url.match(/\?pageSize=10&pageNumber=(\d+)/)[1]
  return  Mock.mock(sysLog)
})
Mock.mock(new RegExp(api.sysUpd),  sysUpd)
Mock.mock(new RegExp(api.upload),  upload)
Mock.mock(new RegExp(api.timeSet),  timeSet)
Mock.mock(new RegExp(api.testServer),  testServer)
