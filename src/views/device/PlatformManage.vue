<template>
  <full-container class="platform-manage">
    <card-container>
      <card-item>
        <card-title>云服务器配置</card-title>
        <m-spin :spinning="loading.getSrvCfg">
          <m-form ref="form" :model="form" :rules="rules" >
            <a-form-model-item class="form-item" label="通信协议" prop="CommMethod">
              <m-select v-model="form.CommMethod">
                <a-select-option v-for="(item,index) in CommMethod" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="IP地址" prop="ServiceAddr">
              <a-input v-model="form.ServiceAddr" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="端口" prop="ServicePort">
              <a-input v-model="form.ServicePort" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="加密方式" prop="CommEncrypt">
              <m-select  v-model="form.CommEncrypt">
                <a-select-option v-for="(item,index) in CommEncrypt" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </a-form-model-item>

            <template v-if="form.CommMethod === 'MQTT'">
              <a-form-model-item class="form-item" label="用户名" prop="MqttUser">
                <a-input v-model="form.MqttUser" allowClear autocomplete="off">
                </a-input>
              </a-form-model-item>
              <a-form-model-item class="form-item" label="密码" prop="MqttPwd">
                <a-input v-model="form.MqttPwd" allowClear autocomplete="off">
                </a-input>
              </a-form-model-item>
              <a-form-model-item class="form-item" label="发布主题" prop="MqttPublishTopic">
                <a-input v-model="form.MqttPublishTopic" allowClear autocomplete="off">
                </a-input>
              </a-form-model-item>
              <a-form-model-item class="form-item" label="订阅主题" prop="MqttSubscribeTopic">
                <a-input v-model="form.MqttSubscribeTopic" allowClear autocomplete="off">
                </a-input>
              </a-form-model-item>
            </template>

            <div class="line"></div>
            <a-form-model-item class="form-item" label="主摄像头视频流地址" prop="UrlCamAv">
              <a-input v-model="form.UrlCamAv" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="次摄像头视频流地址" prop="UrlMiniCamAv">
              <a-input v-model="form.UrlMiniCamAv" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>

            <a-form-model-item class="form-item" label="SOS图片上传地址" prop="UrlSosPic">
              <a-input v-model="form.UrlSosPic" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="AI数据上传地址" prop="UrlAiData">
              <a-input v-model="form.UrlAiData" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item">
              <a-button class="save-button" type="primary" :loading="saveButton" @click="handleSave">保存</a-button>
            </a-form-model-item>
          </m-form>
        </m-spin>
      </card-item>
    </card-container>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {checkIP, checkPort} from "@/utils";
  export default {
    name: 'platform-manage',
    data(){
      return {
        saveButton: false,
        form: {
          "ServiceAddr": "",  /*服务器地址*/
          "ServicePort": "",   /*服务器端口*/
          "CommMethod": "",  /*TCPIP 或者 MQTT*/
          "CommEncrypt": "",  /*NULL:不加密 SM2:SM2 加密*/
          "MqttUser": "",   /*MQTT 用户名*/
          "MqttPwd": "",   /*MQTT 密码*/
          "MqttPublishTopic": "",   /*MQTT 发布主题*/
          "MqttSubscribeTopic": "",   /*MQTT 订阅主题*/
          "UrlCamAv": "",              /*主摄像头视频流地址*/
          "UrlMiniCamAv": "",             /*主摄像头视频流地址*/
          "UrlSosPic": "",              /*SOS 图片上传地址*/
          "UrlAiData": "",              /*AI 数据上传地址*/
        },
        rules: {
          ServiceAddr: [
            {required: true, message: 'IP地址不能为空', trigger: 'blur'},
            {validator: checkIP, trigger: 'blur'},
          ],
          ServicePort: [
            {required: true, message: '端口不能为空', trigger: 'blur'},
            {validator: checkPort, trigger: 'blur'},
          ],
        },
        CommMethod: [
          {name:"TCPIP",value:"TCPIP"},
          {name:"MQTT",value:"MQTT"},
        ],
        CommEncrypt: [
          {name:"不加密",value:""},
          {name:"SM2 加密",value:"SM2"},
        ],
    }
    },
    computed:{
      ...mapState('device',['loading','srvCfg',]),
    },
    watch:{
      srvCfg(newValue){
        if (newValue){
          const { ServiceAddress={} } = newValue
          this.form = {...ServiceAddress}
        }
      }
    },
    created(){
      this.getSrvCfg()
    },
    methods: {
      ...mapActions('device',['getSrvCfg','setSrvCfg']),
      handleSave(){
        this.saveButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.saveButton = false
            return
          }
          let params = {
            ServiceAddress: {
              ...this.form
            }
          }
          this.setSrvCfg(params).then((res) => {
            this.saveButton = false
            if (res.code === 200) {
              this.getSrvCfg()
            }
          }).catch(() => {
            this.saveButton = false
          })
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .line{
    width: 100%;
    height: 1px;
    margin-top: 6px;
    margin-bottom: 30px;
    background-color: @lineColor;
  }
</style>
