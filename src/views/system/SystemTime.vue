<template>
  <full-container>
    <m-spin :spinning="loading.getNtpConfig || loading.getSysTime">
      <card-container>
        <card-item>
          <card-title>NTP服务器时间</card-title>
          <m-form ref="form1" :model="form" :rules="rules">
            <a-form-model-item class="form-item" label="开关" prop="enable">
              <m-switch size="small" v-model="form.enable"></m-switch>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="NTP服务器" prop="server">
              <a-input v-model="form.server" allowClear autocomplete="off" :disabled="!form.enable">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item">
              <a-button class="save-button" type="primary" :loading="saveButton" @click="handleSave" :disabled="!form.enable">
                保存
              </a-button>
            </a-form-model-item>
          </m-form>
        </card-item>

        <card-item>
          <card-title>手动设置时间</card-title>
          <m-form ref="form2" :model="form" :rules="rules">
            <a-form-model-item class="form-item" label="设置日期时间" prop="Date">
              <m-date-picker v-model="form.time" :disabled="form.enable" :showTime="true"></m-date-picker>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="设置时区" prop="utc">
              <m-select v-model="form.utc" :disabled="form.enable">
                <a-select-option v-for="(item,index) in Zone" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </a-form-model-item>
            <a-form-model-item class="form-item">
              <a-button class="save-button" type="primary" :loading="settingButton" @click="handleSetting" :disabled="form.enable">设置</a-button>
            </a-form-model-item>
          </m-form>
        </card-item>
      </card-container>
    </m-spin>
  </full-container>
</template>

<script>
  import moment from 'moment'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'system-time',
    data(){
      return {
        saveButton: false,
        settingButton: false,
        form: {
          enable: false,
          server: '',
          time: '',
          ntp_time: '',
          sys_time: '',
          utc: "UTC+8",
        },
        rules: {
        },
        Zone:[
          {name:"UTC+12",value:"UTC+12"},
          {name:"UTC+11",value:"UTC+11"},
          {name:"UTC+10",value:"UTC+10"},
          {name:"UTC+9",value:"UTC+9"},
          {name:"UTC+8",value:"UTC+8"},
          {name:"UTC+7",value:"UTC+7"},
          {name:"UTC+6",value:"UTC+6"},
          {name:"UTC+5",value:"UTC+5"},
          {name:"UTC+4",value:"UTC+4"},
          {name:"UTC+3",value:"UTC+3"},
          {name:"UTC+2",value:"UTC+2"},
          {name:"UTC+1",value:"UTC+1"},
          {name:"UTC+0",value:"UTC+0"},
          {name:"UTC-1",value:"UTC-1"},
          {name:"UTC-2",value:"UTC-2"},
          {name:"UTC-3",value:"UTC-3"},
          {name:"UTC-4",value:"UTC-4"},
          {name:"UTC-5",value:"UTC-5"},
          {name:"UTC-6",value:"UTC-6"},
          {name:"UTC-7",value:"UTC-7"},
          {name:"UTC-8",value:"UTC-8"},
          {name:"UTC-9",value:"UTC-9"},
          {name:"UTC-10",value:"UTC-10"},
          {name:"UTC-11",value:"UTC-11"},

        ]
      }
    },

    computed:{
      ...mapState('system',['loading','ntpConfig','sysTime']),
    },
    watch:{
      ntpConfig(newValue){
        if (newValue){
          const { enable, server, time: ntp_time } = newValue
          this.form = {
            ...this.form,
            enable: enable === 2,
            server,
            ntp_time: moment(ntp_time,'YYYY-MM-DD HH:mm:ss'),
          }
          const time = this.form.enable?this.form.ntp_time:this.form.sys_time
          this.form = {...this.form,time}
        }
      },
      sysTime(newValue){
        if (newValue){
          let { time: sys_time, utc } = newValue
          sys_time = sys_time.replace(/\//g,'-').split('&')[0]
          this.form = {
            ...this.form,
            sys_time: moment(sys_time,'YYYY-MM-DD HH:mm:ss'),
            utc,
          }
          const time = this.form.enable?this.form.ntp_time:this.form.sys_time
          this.form = {...this.form,time}
        }
      },
      "form.enable": function (newValue) {
        const time = this.form.enable?this.form.ntp_time:this.form.sys_time
        this.form = {...this.form,time}
      }
    },
    created(){
      this.getNtpConfig()
      this.getSysTime()
    },
    methods: {
      ...mapActions('system',['getNtpConfig', 'setNtpConfig', 'getSysTime', 'beforeSetSysTime', 'setSysTime']),
      handleSave(){
        this.saveButton = true
        const {enable, server} = this.form
        const params = {
          "id":"1",
          "jsonrpc":"2.0",
          "method":"SetNtpConf",
          "params":{
            "enable": enable?2:0,
            server
          }
        }
        this.setNtpConfig(params).then((res) => {
          this.saveButton = false
          if (res.code === 200){
            this.getNtpConfig()
          }
        }).catch(() => {
          this.saveButton = false
        })
      },
      handleSetting(){
        this.settingButton = true
        const {server, utc, time} = this.form
        const params = {
          "id":"1",
          "jsonrpc":"2.0",
          "method":"SetNtpConf",
          "params":{
            "enable": 0,
            server
          }
        }
        this.beforeSetSysTime(params).then((res) => {
          if (res.code === 200){
            const params = {
              "id":"1",
              "jsonrpc":"2.0",
              "method":"SetSysTime",
              "params":{
                time: time.format('YYYY.MM.DD-HH:mm:ss').toString(),
                utc
              }
            }
            this.setSysTime(params).then((res) => {
              this.settingButton = false
              if (res.code === 200){
                this.getSysTime()
              }
            }).catch(() => {
              this.settingButton = false
            })
          }
        }).catch(() => {
          this.settingButton = false
        })
      },
    }
  }
</script>

<style scoped lang="less">


</style>
