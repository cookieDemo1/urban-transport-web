<template>
  <m-modal v-model="visible" title="系统重启" :width="388"
           :confirmLoading="okButton" ok-text="确定"  @ok="handleOk" v-bind="changeProps">
    <template slot="content">
      <template v-if="!restarting">
        确定将设备重新启动？
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
        restarting: false,
        timer: null,
        progress: {
          status: 0,
          percent: 0,
          text: '系统重启中...',
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
        return this.restarting?{footer: null, closable: false}:{}
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
      ...mapActions('system',['restartSystem']),
      reset(){
        this.okButton = false
        this.restarting = false
      },
      handleOk(){
        this.okButton = true
        const params = {
          "id":"1",
          "jsonrpc":"2.0",
          "method":"RebootSystem",
          "params":[{}]
        }
        this.restartSystem(params).then((res) => {
          this.okButton = false
          if (res.code === 200){
            this.restarting = true
            this.progress = {status: 0, percent: 0, text:'系统重启中...' }
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
            this.progress.text = '重启完成'
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
