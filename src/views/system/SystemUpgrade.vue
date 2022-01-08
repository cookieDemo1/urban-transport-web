<template>
  <full-container>
    <m-spin :spinning="loading.getSystemConfig || loading.getSysInfo">
      <a-row :gutter="[20,0]" type="flex">
        <a-col>
          <card-container style="padding: 30px 0;">
            <upload-file :item="system"></upload-file>
          </card-container>
        </a-col>
        <a-col>
          <card-container style="padding: 30px 0;">
            <upload-app :item="application"></upload-app>
          </card-container>
        </a-col>
      </a-row>
    </m-spin>
  </full-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import UploadFile from './components/UploadFile'
  import UploadApp from './components/UploadApp'
  export default {
    name: 'system-upgrade',
    components: {UploadFile, UploadApp},
    data(){
      return {
        system: {
          type: 0,
          name: '系统软件',
          version: '',
        },
        application: {
          type: 1,
          name: '应用软件',
          version: '',
        }
      }
    },
    computed: {
      ...mapState('system',['loading','systemConfig','sysInfo'])
    },
    watch: {
      systemConfig(newValue){
        if (newValue){
          const {Version} = newValue
          this.system.version = Version
        }
      },
      sysInfo(newValue){
        if (newValue){
          const {SystemInfo} = newValue
          const {SoftVersion} = SystemInfo || {}
          this.application.version = SoftVersion
        }
      },
    },
    created(){
      this.getSystemConfig()
      this.getSysInfo()
    },
    methods: {
      ...mapActions('system',['getSystemConfig', 'getSysInfo'])
    }
  }
</script>

<style scoped lang="less">


</style>
