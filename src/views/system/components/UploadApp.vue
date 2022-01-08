<template>
  <div class="upload-file">

    <card-title>{{item.name}}</card-title>
    <div class="desc">
      <div class="version">版本号:</div>
      <div class="value">{{item.version}}</div>
    </div>

    <template v-if="!uploading">
      <div class="area upload-area">
        <div class="wrapper">
          <m-upload-dragger
              :showUploadList="false"
              :beforeUpload="handleBeforeUpload"
              @change="handleChange"
          >
            <div class="content">
              <svg-icon class="icon" icon-class="shangc_icon"></svg-icon>
              <template v-if="!file">
                <div class="text">选择文件</div>
                <div class="hint">或将文件拖动到框内</div>
              </template>
              <template v-else>
                <div class="text">{{file.name}}</div>
              </template>
            </div>
          </m-upload-dragger>
        </div>
        <a-row type="flex" justify="center" class="buttons">
          <a-button type="primary" @click="handleUpload">上传</a-button>
        </a-row>
      </div>
    </template>

    <template v-else>
      <div class="area uploading-area">
        <div class="wrapper">
          <div class="content">
            <svg-icon class="icon" icon-class="shangc_icon"></svg-icon>
              <div class="text">{{file.name}}</div>
              <m-progress class="progress-bar" :percent="progress.percent" :showInfo="false" />
              <transition name="fade" mode="out-in">
                <div :key="progress.text" class="hint" :class="{error: progress.status === -1}">{{progress.text}}</div>
              </transition>
          </div>
        </div>
        <a-row type="flex" justify="center" class="buttons" v-if="progress.status === -1">
          <a-button @click="handleBack" style="margin-right: 20px">返回</a-button>
          <a-button type="primary" @click="startUpload">重新上传</a-button>
        </a-row>
      </div>
    </template>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'upload-app',
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    data(){
      return {
        uploading: false,
        file: null,
        timer: null,
        progress: {
          status: 0,
          percent: 0,
          text: '',
        }
      }
    },
    beforeDestroy() {
        this.timer && clearTimeout(this.timer)
        this.timer = null
    },
    methods: {
      ...mapActions('system',['upgradeApp','setUpgradeAppInfo','getUpgradeAppInfo']),
      handleBeforeUpload(){
        return false
      },
      handleChange(info) {
        this.file = info.file
      },
      handleUpload(){
        if (!this.file){
          this.$message.error('请选择文件')
          return
        }
        this.uploading = true
        this.startUpload()
      },
      handleBack(){
          this.uploading = false
          this.file = null
      },
      startUpload(){
        this.progress = {status: 0, percent: 0, text:'上传文件中，请等待...' }
        const params = {app: this.file}
        this.upgradeApp(params).then((res) => {
          if (res.status === 200){
            this.setupAppUpgrade()
          }else {
            this.upgradeFail()
          }
        }).catch((err) => {
          this.upgradeFail()
        })
      },
      setupAppUpgrade(){
        this.progress.text = '升级中...'
        const params = {
          UpgradeInfo:{ /*主控"+固件升级*/
            UpgradeFileName: '/tmp/'+this.file.name,
            UpgradeCommand:"1" /*"+1:升级固件版本，0:不升级*/
          }
        }
        this.setUpgradeAppInfo(params)
        this.timerGetText()
      },
      timerGetText(){
        this.timer = setTimeout( () => {
          this.getUpgradeAppInfo().then((res) => {
            if (res.code === 200){
              const {UpgradeInfo} = res.data
              const {UpgradeStatus} = UpgradeInfo || {}
              this.progress.percent = parseInt(UpgradeStatus)
              if (this.progress.percent >= 100){
                this.upgradeSuccess()
              }else {
              this.timerGetText()
              }
            } else {
              this.upgradeFail()
            }
          }).catch((err) => {
            this.upgradeFail()
          })
        },500)
      },
      upgradeFail(){
        this.progress = {...this.progress,status:-1,text:'升级失败'}
      },
      upgradeSuccess(){
        this.progress = {...this.progress,status:1,text:'升级完成'}
        setTimeout(() => {
          window.location.href = '/index.html'
        },2000)
      },
    }
  }
</script>

<style scoped lang="less">
  .upload-file{
    width: 400px;
    height: 300px;
    padding: 20px;

    background: @hoverColor;
    border: 1px solid @lineColor;

    display: flex;
    flex-direction: column;
  }

  .desc{
    margin-bottom: @inlineMargin;
    line-height: 1;
    display: flex;
    align-items: center;
    .version{
      margin-right: @inlineMargin;
    }
    .value{
      color: @primaryColor;
      font-weight: bold;
    }
  }

  .area{
    flex: 1;
    .wrapper{
      height: 125px;
      margin-bottom: 20px;
      .content{
        height: 100%;
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon{
          width: 40px;
          height: 34px;
          margin-bottom: @inlineMargin;
        }
        .text{
          font-weight: bold;
          margin-bottom: @smallMargin;
        }
        .hint{
          font-size: 12px;
          color: @primaryColor;
        }
      }
    }
  }

  .uploading-area{
    background-color: @componentColor;
    .wrapper{
      margin-bottom: @inlineMargin;
      .progress-bar{
        line-height: 1;
        padding: 0 30px;
        margin-bottom: 8px;
      }
      .hint{
        &.error{
          color: @dangerColor;
        }
      }
    }
  }


  .fade-enter-active {
    opacity: 0;
    animation: fadeInUp 1s ease;
  }
  @keyframes fadeInUp {
    from {
      transform: translate3d(0,20px,0)
    }
    to {
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }
  .fade-leave-active{
    opacity: 1;
    animation: fadeOutUp 1s ease;
  }
  @keyframes fadeOutUp {
    from {
      transform: translate3d(0,0,0)
    }
    to {
      transform: translate3d(0,-8px,0);
      opacity: 0;
    }
  }
</style>
