<template>
  <full-container>
    <m-spin :spinning="false">
      <card-container>
        <card-item>
          <card-title>访问配置</card-title>
          <m-form ref="mForm" :model="form" :rules="rules">
            <card-sub-title>Telnet配置</card-sub-title>
            <a-form-model-item class="form-item" label="Telnet服务" prop="telnet">
              <m-switch size="small" v-model="form.telnet"></m-switch>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="端口" prop="tel_port">
              <m-input-number v-model="form.tel_port" :min="1" :max="29999"></m-input-number>
            </a-form-model-item>
            <div class="line"></div>
            <card-sub-title>SSH配置</card-sub-title>
            <a-form-model-item class="form-item" label="SSH服务" prop="ssh">
              <m-switch size="small" v-model="form.ssh"></m-switch>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="端口" prop="ssh_port">
              <m-input-number v-model="form.ssh_port" :min="1" :max="29999"></m-input-number>
            </a-form-model-item>
            <a-form-model-item class="form-item">
              <a-button class="save-button" type="primary" :loading="settingButton" @click="handleSetting">
                设置
              </a-button>
            </a-form-model-item>
          </m-form>
        </card-item>
      </card-container>
    </m-spin>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'device-visit',
    data(){
      return {
        settingButton: false,
        form: {
          telnet: false,
          tel_port: 23,
          ssh: false,
          ssh_port: 22
        },
        rules: {
        },
      }
    },
    computed:{
      ...mapState('device',['loading','visitConfig',]),
    },
    watch:{
      visitConfig(newValue){
        if (newValue){
          const { telnet, tel_port, ssh, ssh_port } = newValue
          this.form = {
            telnet: !!telnet,
            tel_port,
            ssh: !!ssh,
            ssh_port
          }
        }
      }
    },
    created(){
      this.getVisitConfig()
    },
    methods: {
      ...mapActions('device',['getVisitConfig', 'setVisitConfig']),
      handleSetting(){
        this.settingButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.settingButton = false
            return
          }
          const { telnet, tel_port, ssh, ssh_port } = this.form
          const params = {
            visit_config:{
              telnet: telnet?1:0,
              tel_port,
              ssh: ssh?1:0,
              ssh_port
            }
          }
          this.setVisitConfig(params).then((res) => {
            this.settingButton = false
            if (res.code === 200){
              this.getVisitConfig()
            }
          }).catch(() => {
            this.settingButton = false
          })
        })
      },
    }
  }
</script>

<style scoped lang="less">

  .line{
    margin-top: 6px;
    margin-bottom: 30px;
    height: 1px;
    background-color: @lineColor;
  }

</style>
