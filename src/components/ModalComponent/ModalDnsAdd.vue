<template>
  <m-modal v-model="visible" title="添加DNS地址" :width="388"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form class="form" ref="mForm" :model="form" :rules="rules">
        <a-form-model-item class="form-item" label="DNS地址" prop="Dns" help="例如：20.1.1.3 or 2002::4">
          <a-input v-model="form.Dns" allowClear autocomplete="off"></a-input>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'
  import {checkIP} from "@/utils";

  export default {
    name: 'modal-dns-add',
    props: {
      value: Boolean,
    },
    data(){
      return {
        okButton: false,
        form:{
          Dns: '',
        },
        rules: {
          Dns: [
            { required: true, message: 'Dns地址不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
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
      ...mapActions('network',['getDns','addDns']),
      reset(){
        this.okButton = false
        this.form= {
          Dns: '',
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          const { Dns } = this.form
          let params = {
            dns_config:
              {
                Add: true,
                Dns
              }
          }
          this.addDns(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.getDns()
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
