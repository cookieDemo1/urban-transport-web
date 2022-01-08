<template>
  <m-modal v-model="visible" title="修改设备" :width="388"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form ref="form" :model="form" :rules="rules" >
        <a-form-model-item class="form-item" label="设备类型" prop="">
          <span class="device-type">{{item.name}}</span>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="品牌" prop="model">
          <m-select v-model="form.model">
            <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
              {{item.name}}
            </a-select-option>
          </m-select>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="参数" prop="ip">
          <a-input ref="input" v-model="form.ip"  allowClear autocomplete="off">
          </a-input>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'
  import {getModelOptions} from '@/utils'

  export default {
    name: 'modal-device-edit',
    props: {
      value: Boolean,
      item: Object,
    },
    data(){
      return {
        okButton: false,
        options: [],
        form:{
          model: '',
          ip: '',
        },
        rules: {
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
      ...mapActions('device',['getDevCfg','setDevCfg']),
      reset(){
        this.okButton = false
        const {ip, modelKey, model} = this.item
        const modelNames = getModelOptions(modelKey)
        this.options = Object.keys(modelNames).map((key) => {
          const name = modelNames[key]
          return {name, value: key}
        }).concat([{name: '无设备', value: ''}])
        this.form= {
          model,
          ip,
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          let params = {
            DevicesConfig: {
              IpConfig: {
                [this.item.ipKey]: this.form.ip,
              },
              DevicesModel: {
                [this.item.modelKey]: this.form.model,
              },
            }
          }
          this.setDevCfg(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.getDevCfg()
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

  .device-type{
    color: @primaryColor;
  }

</style>
