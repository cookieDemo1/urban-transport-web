<template>
  <m-modal v-model="visible" title="修改信息" :width="388"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form class="form" ref="mForm" :model="form" :rules="rules">
        <a-form-model-item class="form-item" :label="item.name" :prop="item.key" >
          <a-input v-model="form[item.key]" allowClear autocomplete="off"></a-input>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'modal-info-edit',
    props: {
      value: Boolean,
      item: Object,
    },
    data(){
      return {
        okButton: false,
        form:{
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
      ...mapActions('home',['getSysInfo','setSysInfo']),
      reset(){
        this.okButton = false
        const {key,value} = this.item
        this.form= {
          [key]: value
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          let params = {
            SystemInfo: {
              ...this.form
            }
          }
          this.setSysInfo(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.getSysInfo()
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
