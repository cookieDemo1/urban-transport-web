<template>
  <m-modal v-model="visible" :title="cameraInfo.title" :width="856"
           :footer="null"
           >
<!--    cancel-text="关闭" :cancel-button-props="{props: {type: 'primary'}}" :ok-button-props="{style: {display: 'none'}}"-->
    <template slot="content">
      <m-spin :spinning="isSupport && isInstalled && loading">
        <div class="camera" id="camera">
<!--          <div class="error" v-if="!isSupport">-->
<!--            该浏览器不支持，请使用IE浏览器或者360浏览器兼容模式查看-->
<!--          </div>-->
          <div class="error" v-if="!isInstalled">
            查看监控视频需安装视频插件，点击此处<span style="color: #1BACFF;text-decoration: underline; cursor: pointer" @click="downloadPlugin">下载插件</span>
          </div>
          <a ref="download" v-show="false" href="/WebComponentsKit.exe" download="/WebComponentsKit.exe"></a>
        </div>
      </m-spin>
    </template>
  </m-modal>
</template>

<script>
  import { WebVideoCtrl } from '@/api/webVideoCtrl'
  import {XMLSTR2JSON} from '@/utils'

  export default {
    name: 'modal-camera',
    props: {
      value: Boolean,
      item: Object,
    },
    data(){
      return {
        isSupport: true,
        isInstalled: true,
        loading: false,

        cameraInfo: {
          title: '摄像头',
          ip: '',
          port: 80,
          username: '',
          password: '',
          szDeviceIdentify: '',
          iChannelID: '',
          iProtocol: 1,
        }
      }
    },
    computed: {
      visible: {
        get() {
          return this.value
        },
        set (value) {
          this.$emit('input',value)
        }
      },
    },
    watch: {
      visible(newValue){
        !newValue && this.exit()
        newValue && this.reset()
      },
    },
    methods: {
      exit(){
        this.stopPlay()
      },
      reset(){
        this.isSupport = true
        this.isInstalled = true
        this.loading = false
        // port=80
        const {title = '摄像头', ip='', username='', password=''} = this.item || {}
        const port = 80
        const szDeviceIdentify = ip + "_" + port
        this.cameraInfo = {
          title, ip, port, username, password, szDeviceIdentify, iProtocol: 1, iChannelID: '',
        }
        if (!this.checkEnv()){
          return;
        }
        this.loading = true
        setTimeout(() => {
          this.startPlay()
        },1000)
      },
      checkEnv(){
        // if (!(window.ActiveXObject || "ActiveXObject" in window)){
        //   this.isSupport = false
        //   return false
        // }
        const isInstalled = WebVideoCtrl.I_CheckPluginInstall();
        if (isInstalled !== 0) {
          this.isInstalled = false
          return false
        }
        return true
      },
      startPlay(){
        this.toInitPlugin()
      },
      toInitPlugin() {
        const  szColorProperty = `sub-background:051757;sub-border:051757;sub-border-select:051757;`
        WebVideoCtrl.I_InitPlugin('100%', '100%', {
          szColorProperty,
          cbSelWnd: function(xmlDoc) {
            // console.log(xmlDoc)
          },
          myCbSelWnd: (xmlSTR)  => {
            // const jsonObj = XMLSTR2JSON(xmlSTR)
            // console.log(jsonObj.RealPlayInfo.SelectWnd)
          },
          cbInitPluginComplete:  ()  => {
            WebVideoCtrl.I_InsertOBJECTPlugin("camera");
            this.toLogin()
          }
        });
      },
      toLogin(){
        const {ip,port,username,password, iProtocol, szDeviceIdentify} = this.cameraInfo
        WebVideoCtrl.I_Login(ip, iProtocol, port, username, password, {
          // async: false,
          success:  (xmlDoc)  => {
            WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
                async: false,
                success:  (xmlDoc)  => {
                },
                mysuccess:  (xmlSTR)  => {
                  let jsonObj = XMLSTR2JSON(xmlSTR)
                  let list = jsonObj.InputProxyChannelStatusList.InputProxyChannelStatus;
                  let iChannelID = list[0].id
                  this.cameraInfo.iChannelID = iChannelID
                },
                error:  (status, xmlDoc)  => {
                  console.log("获取数字通道失败");
                }
              }
            );
            WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
              async: false,
              success:  (xmlDOC)  => {
              },
              mysuccess:  (xmlSTR)  => {
                let jsonObj = XMLSTR2JSON(xmlSTR);
                let iChannelID = jsonObj.VideoInputChannelList.VideoInputChannel.id;
                this.cameraInfo.iChannelID = iChannelID
              },
              error: (status, xmlDoc)  => {
                console.log("获取模拟通道失败");
              }
            });
            this.toRealPlay()
          },
          error: ()  => {
            this.loading = false
            this.$message.error(`播放失败！`)
          }
        });
      },
      toRealPlay(){
        const {szDeviceIdentify, iChannelID } = this.cameraInfo
        WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
          iChannelID,
          success:  ()  => {
            this.loading = false
          },
          error:  (status, xmlDoc2)  => {
            this.loading = false
            this.$message.error(`播放失败！`)
          }
        });
      },
      stopPlay() {
        const {szDeviceIdentify} = this.cameraInfo
        WebVideoCtrl.I_Stop();
        WebVideoCtrl.I_Logout(szDeviceIdentify);
      },
      downloadPlugin(){
        this.$refs.download.click()
      }
    }
  }

</script>

<style scoped lang="less">

  .camera {
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @componentColor;
  }

  .error{
    color: @textPrimaryColor;
  }
</style>
