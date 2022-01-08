<template>
  <a-row >
    <template v-if="mode === '0'">
      <a-row type="flex" style="margin-bottom: 20px">
        <a-col class="label">开/关</a-col><a-col >
          <m-switch size="small" v-model="isOpen"></m-switch>
        </a-col>
      </a-row>
      <a-row type="flex" style="margin-bottom: 20px" align="middle">
        <a-col class="label">亮度</a-col>
        <a-col :flex="1" style="margin-right: 20px">
          <m-slider class="slider" :min="0" :max="10" v-model="value"></m-slider>
        </a-col>
        <a-col flex="20px">{{value}}</a-col>
      </a-row>
    </template>
    <template v-else>
      <div class="timing">
        <div class="label">定时</div>
        <div class="input">
            <m-time-picker class="time-picker" size="small" placeholder="定时开时间" popupClassName="time-picker-popup__modify" format="HH:mm" v-model="openTime"></m-time-picker>
            <m-time-picker class="time-picker" size="small" placeholder="定时关时间" popupClassName="time-picker-popup__modify" format="HH:mm" v-model="closeTime"></m-time-picker>
        </div>
      </div>
      <a-row type="flex" style="margin-bottom: 20px" align="middle">
        <a-col class="label">亮度</a-col>
        <a-col :flex="1" style="margin-right: 20px">
          <m-slider class="slider" :min="0" :max="10" v-model="value"></m-slider>
        </a-col>
        <a-col flex="20px">{{value}}</a-col>
      </a-row>
    </template>
    <a-row type="flex" justify="center">
      <a-button class="setting-button" :loading="saveButton" @click="handleSave">保存设置</a-button>
    </a-row>
  </a-row>
</template>

<script>
  import {mapActions} from "vuex";
  import moment from 'moment'

  export default {
    name: 'light-controller',
    props: {
      mode: String,
      item: {
        type: Object,
        default: () => {}
      }
    },
    data(){
      return {
        saveButton:false,
        value: 0,
        isOpen: false,
        openTime: '',
        closeTime: '',
      }
    },
    watch: {
      item(newValue){
        if (newValue){
          const {value, isOpen, openTime, closeTime} = newValue
          this.value = value
          this.isOpen = isOpen
          this.openTime = moment(openTime, 'HH:mm')
          this.closeTime = moment(closeTime, 'HH:mm')
        }
      }
    },
    methods: {
      moment,
      ...mapActions('home',['getLightCtrl','setLightCtrl']),
      handleSave(){
        this.saveButton = true
        const BrightMode = this.mode === '0'?"Manual":"TimingPlan"
        const BrightCtrl = this.isOpen?'On':'Off'
        const params = {
          LightControl:{
            BrightMode,
            BrightCtrl,
            BrightValue: this.value+'',
            BrightOpeningTime: this.openTime.format('HH:mm').toString(),
            BrightClosingTime: this.closeTime.format('HH:mm').toString(),
          }
        }
        this.setLightCtrl(params).then((res) => {
          this.saveButton = false
          if (res.code === 200){
            this.getLightCtrl()
          }
        }).catch(() => {
          this.saveButton = false
        })
      }
    }
  }
</script>

<style scoped lang="less">

  .label{
    width: 45px;
    margin-right: 20px;
    text-align: right;
  }

  .timing{
    display: flex;
    margin-bottom: 10px;
    .label{
      width: 45px;
      margin-right: 20px;
      text-align: right;
    }

    .input{
      flex: 1;
      .time-picker{
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }





</style>
