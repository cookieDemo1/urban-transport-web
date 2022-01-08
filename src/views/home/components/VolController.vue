<template>
  <a-row >
    <a-row type="flex" style="margin-bottom: 20px">
      <a-col class="label">开/关</a-col>
      <a-col >
        <m-switch size="small" v-model="isOpen"></m-switch>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-bottom: 20px" align="middle">
      <a-col class="label">音量</a-col>
      <a-col :flex="1" style="margin-right: 20px">
        <m-slider class="slider" :min="0" :max="12" v-model="value"></m-slider>
      </a-col>
      <a-col flex="20px">{{value}}</a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button class="setting-button" :loading="saveButton" @click="handleSave">保存设置</a-button>
    </a-row>
  </a-row>
</template>

<script>
  import {mapActions}  from 'vuex'
  export default {
    name: 'vol-controller',
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    data(){
      return {
        saveButton: false,
        value: 0,
        isOpen: false
      }
    },
    watch: {
      item(newValue){
        if (newValue){
          const {value, isOpen} = newValue
          this.value = value
          this.isOpen = isOpen
        }
      }
    },
    methods: {
      // setLightCtrl
      ...mapActions('home',['getVolCtrl','setVolCtrl']),
      handleSave(){
        this.saveButton = true
        const VolumnCtrl = this.isOpen?'On':'Off'
        const params = {
          VolumnControl:{
            VolumnValue: this.value+'',
            VolumnCtrl
          }
        }
        this.setVolCtrl(params).then((res) => {
          this.saveButton = false
          if (res.code === 200){
            this.getVolCtrl()
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

</style>
