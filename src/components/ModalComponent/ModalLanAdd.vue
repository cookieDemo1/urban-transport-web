<template>
  <m-modal v-model="visible" title="添加地址" :width="388"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form ref="form" :model="form" :rules="rules" >
        <a-form-model-item class="form-item" label="网络地址" prop="IP">
          <a-input v-model="form.IP" allowClear autocomplete="off">
          </a-input>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="子网掩码" prop="NM">
          <a-input v-model="form.NM" allowClear autocomplete="off">
          </a-input>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'
  import {checkIP} from "@/utils";

  export default {
    name: 'modal-lan-add',
    props: {
      value: Boolean,
    },
    data(){
      return {
        okButton: false,
        form: {
          "IP": "",
          "NM": "",
        },
        rules: {
          IP: [
            { required: true, message: '网络地址不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
          NM: [
            { required: true, message: '子网掩码不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
        },
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
    },
    watch: {
      visible(newValue){
        newValue && this.reset()
      },
    },
    methods: {
      ...mapActions('network',['getLan','addLan']),
      reset(){
        this.okButton = false
        this.form= {
          "IP": "",
          "NM": "",
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          const {IP, NM} = this.form
          let params = {
              "id":"1",
              "jsonrpc":"2.0",
              "method":"AddLanConf",
              "params":[{
                IP, NM
              }]
          }
          this.addLan(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.getLan()
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
