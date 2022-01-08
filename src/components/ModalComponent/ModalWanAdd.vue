<template>
  <m-modal v-model="visible" title="添加地址" :width="388"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form class="form" ref="mForm" :model="form" :rules="rules">
        <a-form-model-item class="form-item" label="IP地址" prop="IpAddr"  help="例如：10.1.1.0/24 or 2000::3/64">
          <a-input v-model="form.IpAddr" allowClear autocomplete="off"></a-input>
        </a-form-model-item>
      </m-modal-form>

    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'
  import {checkIPMask} from "@/utils";

  export default {
    name: 'modal-wan-add',
    props: {
      value: Boolean,
    },
    data(){
      return {
        okButton: false,
        form:{
          IpAddr: '',
        },
        rules: {
          IpAddr: [
            { required: true, message: 'IP地址不能为空', trigger: 'blur'},
            { validator: checkIPMask, trigger: 'blur'},
          ],
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
    },
    watch: {
      visible(newValue){
        newValue && this.reset()
      },
    },
    methods: {
      ...mapActions('network',['getWan','addWan']),
      reset(){
        this.okButton = false
        this.form= {
          IpAddr: '',
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          const { IpAddr } = this.form
          let params = {
            interface_add:
              {
                type: 2,
                Add: true,
                IpAddr
              }
          }
          this.addWan(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
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
