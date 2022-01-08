<template>
  <full-container class="home">
    <m-spin :spinning="loading.getSysInfo || loading.getDevCfg || loading.getEnvStatus || loading.getLightCtrl || loading.getVolCtrl || deviceLoading.getSrvCfg">
      <a-row :gutter="[16,16]">
        <a-col :span="24">
          <card-container >
            <card-item>
              <card-title>基本信息</card-title>
              <a-row :gutter="[16,16]">
                <a-col :span="8" v-for="(item,index) in baseInfo" :key="index">
                  <info-item :item="item" @edit="handleEdit"></info-item>
                </a-col>
              </a-row>
            </card-item>
            <card-item>
              <card-title>设备状态</card-title>
              <a-row type="flex">
                <a-col flex="70%" style="min-width: 820px">
                  <a-row  style="margin-bottom: 20px" :gutter="[20,0]" type="flex">
                    <a-col class="device-status" :class="{clickable: !isMiddle}" flex="1" v-for="(item,index) in deviceList.slice(0,7)" :key="index" @click="handleDevice(index,item)" >
                      <device-item class="device-item" :item="item" ></device-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="[20,0]" type="flex">
                    <a-col flex="1" v-for="(item,index) in deviceList.slice(7)" :key="index">
                      <device-item :item="item"></device-item>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col flex="1">
                  <a-row type="flex">
                    <a-col>
                      <div class="line1" style="margin: 0 35px"></div>
                    </a-col>
                    <a-col flex="1">
                      <server-item :item="srvData" style="margin-right: 5px"></server-item>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </card-item>
          </card-container>
        </a-col>
        <a-col :span="12">
          <card-container class="bottom-card-container">
            <card-title>环境监控</card-title>
            <div class="bottom-card-content">
              <a-row type="flex">
                <a-col v-for="(item,index) in envList.slice(0,5)" :key="index" :flex="item.flex">
                  <template v-if="item.name === 'line1'">
                    <div class="line1"></div>
                  </template>
                  <template v-else>
                    <grid-item :item="item"></grid-item>
                  </template>
                </a-col>
              </a-row>
              <div class="line2"></div>
              <a-row type="flex">
                <a-col v-for="(item,index) in envList.slice(5)" :key="index" :flex="item.flex">
                  <template v-if="item.name === 'line1'">
                    <div class="line1"></div>
                  </template>
                  <template v-else>
                    <grid-item :item="item"></grid-item>
                  </template>
                </a-col>
              </a-row>
            </div>
          </card-container>
        </a-col>
        <a-col :span="6">
          <div style="position: relative">
            <card-container class="bottom-card-container">
              <card-title>照明调节</card-title>
              <div class="bottom-card-content">
                <light-controller :mode="mode" :item="lightData"></light-controller>
              </div>
              <a-radio-group class="radio-group radio-group__modify" size="small" name="radioGroup" button-style="solid" v-model="mode">
                <a-radio-button value="0">
                  手动
                </a-radio-button>
                <a-radio-button  value="1">
                  定时
                </a-radio-button>
              </a-radio-group>
            </card-container>
          </div>
        </a-col>
        <a-col :span="6">
          <card-container class="bottom-card-container">
            <card-title>声音调节</card-title>
            <div class="bottom-card-content">
              <vol-controller :item="volData"></vol-controller>
            </div>
          </card-container>
        </a-col>
      </a-row>
    </m-spin>

    <modal-info-edit v-model="showEdit" :item="item"></modal-info-edit>
    <modal-camera v-model="showCamera" :item="cameraItem"></modal-camera>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalInfoEdit from '@/components/ModalComponent/ModalInfoEdit'
  import ModalCamera from '@/components/ModalComponent/ModalCamera'
  import InfoItem from './components/InfoItem'
  import DeviceItem from './components/DeviceItem'
  import ServerItem from './components/ServerItem'
  import GridItem from './components/GridItem'
  import LightController from './components/LightController'
  import VolController from './components/VolController'
  import moment from "moment";

  export default {
    name: 'home',
    components: {InfoItem, DeviceItem, ServerItem, GridItem, LightController, VolController, ModalInfoEdit, ModalCamera},
    data(){
      return {
        isMiddle: process.env.VUE_APP_MODE === 'middle',

        mode: '0',
        showEdit: false,
        item: {},

        showCamera: false,
        cameraItem: null,
      }
    },
    computed:{
      ...mapState('home',['loading', 'sysInfo','devCfg','envStatus','lightCtrl','volCtrl']),
      ...mapState('device',{deviceLoading: 'loading', srvCfg: 'srvCfg'}),
      baseInfo(){
        let res = [
          {key: 'SystemId', name: '网关ID', value: '', showEdit: true},
          {key: 'Location', name: '安装定位', value: '', showEdit: true},
          {key: 'ProductType', name: '型号', value: ''},
          {key: 'ActivateStatus', name: '激活状态', value: ''},
          {key: 'SN', name: 'SN', value: ''},
          {key: 'MAC', name: 'MAC', value: ''},
          {key: 'HardVersion', name: '硬件版本', value: ''},
          {key: 'SysVersion', name: '系统版本', value: ''},
          {key: 'SoftVersion', name: '应用版本', value: ''},
        ]
        if (this.sysInfo){
          const {SystemInfo} = this.sysInfo || {}
          return res.map((item) => {
            const {key} = item
            return {...item, value: SystemInfo[key]}
          })
        }
        return res
      },
      deviceList(){
        let res = [
          {name: '主摄像头', icon: 'shext_icon', ipKey: 'CameraIp', ip: '0.0.0.0', modelKey: 'CameraModel', model: '', statusKey: 'CamRunStatus', status: 'none'},
          {name: '次摄像头', icon: 'shext_icon', ipKey: 'MiniCameraIp', ip: '0.0.0.0', modelKey: 'MiniCamRunModel', model: '', statusKey: 'MiniCamRunStatus', status: 'none'},
          {name: '显示屏', icon: 'xiansp_icon', ipKey: 'DisplayIp', ip: '0.0.0.0', modelKey: 'DisplayModel', model: '', statusKey: 'DisplayRunStatus', status: 'none'},
          {name: '广播音柱', icon: 'guangbyz_icon', ipKey: 'RadioIp', ip: '0.0.0.0', modelKey: 'RadioModel', model: '', statusKey: 'RadioRunStatus', status: 'none'},
          {name: '智慧电源', icon: 'zhihdy_icon', ipKey: 'PowerIp', ip: '0.0.0.0', modelKey: 'PowerModel', model: '', statusKey: 'PowerRunStatus', status: 'none'},
          {name: '微波雷达', icon: 'weibld_icon', ipKey: 'RadarIp', ip: '0.0.0.0', modelKey: 'RadarModel', model: '', statusKey: 'RadarRunStatus', status: 'none'},
          {name: '防雷模块', icon: 'fanglmk_icon', ipKey: 'LightningProtectionIp', ip: '0.0.0.0', modelKey: 'LightningProtectionModel', model: '', statusKey: 'LightningProtectionRunStatus', status: 'none'},
          {name: '一键报警', icon: 'sos_icon', ipKey: 'SosIp', ip: '0.0.0.0', modelKey: 'SosModel', model: '', statusKey: 'SosRunStatus', status: 'none'},
          {name: 'AP设备', icon: 'apsheb_icon',ipKey: 'ApIp', ip: '0.0.0.0', modelKey: 'ApModel', model: '', statusKey: 'ApRunStatus', status: 'none'},
          {name: '环境传感器', icon: 'huanjcgq_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'EnvironmentModel', model: '', statusKey: 'EnvironmentRunStatus', status: 'none'},
          {name: '智能门锁', icon: 'zhinmens_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'LockModel', model: '', statusKey: 'LockRunStatus', status: 'none'},
          {name: '数据采集器', icon: 'shujcjq_icon',ipKey: '', ip: '0.0.0.0', modelKey: 'DataAcquisitionModuleModel', model: '', statusKey: 'DataAcquisitionModuleRunStatus', status: 'none'},
          {name: '倾角传感器', icon: 'qinjcg_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'InclinationSensorModel', model: '', statusKey: 'InclinationRunStatus', status: 'none'},
          {name: '水尺传感器', icon: 'shuiccg_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'DraftSensorModel', model: '', statusKey: 'DraftSensorRunStatus', status: 'none'},
        ]
        if (this.devCfg){
          const {IpConfig, DevicesModel, RunStatus} = this.devCfg || {}
          return res.map((item, index) => {
            const {ipKey, modelKey, statusKey} = item
            let ip = IpConfig[ipKey] || '0.0.0.0', model = DevicesModel[modelKey] || '', status = RunStatus[statusKey] || 'none'
            status = (model && status !== 'none') ? (status === 'Online' ? 'online' : 'error') : 'none'
            return {
              ...item, key: index, ip, model, status
            }
          })
        }
        return res
      },
      srvData(){
        let res = {name: '云服务器', icon: 'yunfwq_icon', status: 'none', ServiceAddr: '0.0.0.0', ServicePort: '', CommMethod: '', CommEncrypt: ''}
        if (this.devCfg){
          const {RunStatus} = this.devCfg || {}
          const {ServiceRunStatus} = RunStatus || {}
          let status = ServiceRunStatus || 'none'
          status = status === 'Online' ? 'online' : 'error'
          res = {...res, status}
        }
        if (this.srvCfg){
          const { ServiceAddress } = this.srvCfg || {}
          const { ServiceAddr, ServicePort, CommMethod, CommEncrypt} = ServiceAddress || {}
          res = {...res, ServiceAddr, ServicePort, CommMethod, CommEncrypt}
        }
        return res
      },
      envList(){
        let res = [
          {key: 'Temperature',name: '温度', icon: 'wend_icon', value: '', unit: '℃', flex: '1'},
          {key: 'line', name: 'line1', flex: '1px'},//line1 Vertical
          {key: 'Humidity', name: '湿度', icon: 'shid_icon', value: '',  unit: '%', flex: '1'},
          {key: 'line', name: 'line1', flex: '1px'},
          {key: 'CO', name: 'CO', icon: 'co_icon', value: '', unit: 'ppm', flex: '1'},
          {key: 'PM2.5', name: 'PM2.5', icon: 'pm2.5_icon', value: '', unit: 'μg/m³', flex: '1'},
          {key: 'line', name: 'line1', flex: '1px'},
          {key: 'PM10', name: 'PM10', icon: 'pm10_icon', value: '', unit: 'μg/m³', flex: '1'},
          {key: 'line', name: 'line1', flex: '1px'},
          {key: 'Noise', name: '噪声', icon: 'caos_icon', value: '', unit: 'dB', flex: '1'},
        ]
        if (this.envStatus){
          const { EnvironmentStatus } = this.envStatus || {}
          return res.map((item) => {
            const {key} = item
            if (key === 'line'){
              return {...item}
            }
            return {...item, value: EnvironmentStatus[key]}
          })
        }
        return res
      },
      lightData(){
        //0手动 1自动
        let res = {mode: '0', isOpen: false, value: 0, openTime: "", closeTime: "",}
        if (this.lightCtrl){
          const { BrightMode, BrightValue, BrightCtrl, BrightOpeningTime, BrightClosingTime, } = this.lightCtrl || {}
          let mode = BrightMode === 'Manual'?'0':'1'
          let isOpen = BrightCtrl === 'On'
          let value = parseInt(BrightValue)
          return {
            mode, isOpen, value, openTime: moment(BrightOpeningTime,"HH:mm"), closeTime: moment(BrightClosingTime,"HH:mm"),
          }
        }
        return res
      },
      volData(){
        let res = { isOpen: false, value: 0 }
        if (this.volCtrl){
          const { VolumnValue, VolumnCtrl, } = this.volCtrl
          let isOpen = VolumnCtrl === 'On'
          let value = parseInt(VolumnValue)
          res = {value, isOpen}
        }
        return res
      },
      cameraData(){
        let res = [
          {title: '主摄像头', ip:'', port:80, username:'', password:''},
          {title: '次摄像头', ip:'', port:80, username:'', password:''},
        ]
        if (this.srvCfg){
          const { ServiceAddress={} } = this.srvCfg
          const {UrlCamAv,UrlMiniCamAv} = ServiceAddress
          if (/rtsp:\/\/(.*?):(.*?)@(.*?)(?::(.*?))?\//.test(UrlCamAv)){
            const title = '主摄像头'
            const [url, username='', password='', ip='', port=80] = UrlCamAv.match(/rtsp:\/\/(.*?):(.*?)@(.*?)(?::(.*?))?\//)
            res[0] = {title,ip,port,username,password}
          }
          if (/rtsp:\/\/(.*?):(.*?)@(.*?)(?::(.*?))?\//.test(UrlMiniCamAv)){
            const title = '次摄像头'
            const [url, username='', password='', ip='', port=80] = UrlMiniCamAv.match(/rtsp:\/\/(.*?):(.*?)@(.*?)(?::(.*?))?\//)
            res[1] = {title,ip,port,username,password}
          }
        }
        return res
      },
    },
    watch:{
      lightCtrl(newValue){
        if (newValue){
          const { BrightMode } = newValue || {}
          this.mode =  BrightMode === 'Manual'?'0':'1'
        }
      }
    },
    created(){
      this.getSysInfo()
      this.getDevCfg()
      this.getSrvCfg()
      this.getEnvStatus()
      this.getLightCtrl()
      this.getVolCtrl()
    },
    methods: {
      ...mapActions('home',['getSysInfo','getDevCfg','getEnvStatus','getLightCtrl','getVolCtrl']),
      ...mapActions('device',['getSrvCfg']),
      handleEdit(item){
        this.showEdit = true
        this.item = item
      },
      handleDevice(index,item){
        if (this.isMiddle){
          return
        }
        if ((index === 0 || index === 1) && item.status === 'online'){
          const cameraItem = this.cameraData[index]
          if (cameraItem){
            this.showCamera = true
            this.cameraItem = cameraItem
          }
        }
      },
    }
  }
</script>

<style lang="less">
  .radio-group__modify{
    .ant-radio-button-wrapper{
      border-radius: 0;
    }
  }
</style>


<style scoped lang="less">

  /*width: 1142px，height:640px*/
  .home{
  }

  .line1{
    width: 1px;
    height: 100%;
    background-color: @lineColor;
  }
  .line2{
    width: 100%;
    height: 1px;
    background-color: @lineColor;
  }

  .setting-button{
    width: 100px;
    height: 32px;
  }

  .bottom-card-container{
    height: 230px;
    display: flex;
    flex-direction: column;

    .bottom-card-content{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .radio-group{
    position: absolute;
    top: 0;
    right: 0;
  }

  .device-status.clickable:nth-child(-n+2){
    .device-item.online{
      cursor: pointer;
    }
  }

</style>
