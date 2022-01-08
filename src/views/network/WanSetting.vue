<template>
  <full-container>
    <card-container>
      <card-item>
        <card-title>WAN配置</card-title>
        <m-spin :spinning="loading.getWan">
          <m-form ref="form" :model="form" :rules="rules" >
            <a-form-model-item class="form-item" label="IP地址" prop="IP">
              <a-input v-model="form.IP" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="掩码" prop="NM">
              <a-input v-model="form.NM" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="网关" prop="GW">
              <a-input v-model="form.GW" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="DNS1" prop="DNS1">
              <a-input v-model="form.DNS1" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="DNS2" prop="DNS2">
              <a-input v-model="form.DNS2" allowClear autocomplete="off">
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form-item">
              <a-button class="save-button" type="primary" :loading="okButton" @click="handleOk">保存</a-button>
            </a-form-model-item>
          </m-form>
        </m-spin>
      </card-item>
    </card-container>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {checkIP} from "@/utils";
  export default {
    name: 'wan-setting',
    data(){
      return {
        okButton: false,
        form: {
          "IP": "",
          "NM": "",
          "GW": "",
          "DNS1": "",
          "DNS2": "",
        },
        rules: {
          IP: [
            { required: true, message: 'IP地址不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
          NM: [
            { required: true, message: '掩码不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
          GW: [
            { required: true, message: '网关不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
          DNS1: [
            { required: true, message: 'DNS1不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
          DNS2: [
            { required: true, message: 'DNS2不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
        }
      }
    },
    computed:{
      ...mapState('network',['loading','wan']),
    },
    watch:{
      wan(newValue){
        if (newValue){
          const { DNS=[], ...rest} = newValue
          this.form = {...rest, DNS1: DNS[0], DNS2: DNS[1],}
        }
      }
    },
    created(){
      this.getWan()
    },
    methods: {
      ...mapActions('network',['getWan','addWan']),
      handleOk(){
        this.okButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          const { DNS1, DNS2, ...rest} = this.form
          let params = {
            "id": "1",
            "jsonrpc": "2.0",
            "method": "SetWanConf",
            "params": [{
              ...rest,
              DNS: [DNS1, DNS2]
            }]
          }
          this.addWan(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.getWan()
            }
          }).catch(() => {
            this.okButton = false
          })
        });
      }
    }
  }
</script>

<style scoped lang="less">


</style>
