<template>
  <m-modal v-model="visible" title="恢复出厂设置" :width="388"
           :confirmLoading="okButton" ok-text="确定"  @ok="handleOk" v-bind="changeProps">
    <template slot="content">
      <template v-if="!reseting">
        确定将设备恢复出厂设置？
      </template>
      <template v-else >
        <m-progress class="progress-bar" :percent="progress.percent" :showInfo="false" />
        <div class="hint">{{progress.text}}</div>
      </template>
    </template>
  </m-modal>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'modal-system-restart',
    props: {
      value: Boolean
    },
    data() {
      return {
        okButton: false,
        reseting: false,
        timer: null,
        progress: {
          status: 0,
          percent: 0,
          text: '恢复出厂设置中...',
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
      changeProps() {
        return this.reseting?{footer: null, closable: false}:{}
      }
    },
    watch: {
      visible(newValue){
        if (newValue){
          this.reset()
        }else {
          this.timer && clearTimeout(this.timer)
          this.timer = null
        }
      },
    },
    methods:{
      ...mapActions('system',['resetSystem']),
      reset(){
        this.okButton = false
        this.reseting = false
      },
      handleOk(){
        this.okButton = true
        const params = {
          "id":"1",
          "jsonrpc":"2.0",
          "method":"RecoverConfig",
          "params":[{}]
        }
        this.resetSystem(params).then((res) => {
          this.okButton = false
          if (res.code === 200){
            this.reseting = true
            this.progress = {status: 0, percent: 0, text:'恢复出厂设置中...' }
            this.timerGetPercent()
          }
        }).catch((err) => {
          this.okButton = false
        })
      },
      timerGetPercent(){
        this.timer = setTimeout( () => {
          this.progress.percent += 1
          if (this.progress.percent >= 100){
            this.progress.text = '恢复出厂设置成功'
            setTimeout(() => {
              window.location.href = '/index.html'
            },2000)
          }else {
            this.timerGetPercent()
          }
        },400)
      },
    }
  }

</script>

<style scoped lang="less">

  .progress-bar{
    margin-bottom: 8px;
  }

  .hint{
    text-align: center;
    font-size: 12px;
    color: @primaryColor;
  }

</style>
