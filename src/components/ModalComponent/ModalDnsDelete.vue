<template>
  <m-modal v-model="visible" title="删除Dns地址" :width="388"
           :confirmLoading="okButton" ok-text="删除" :ok-button-props="{props: {type: 'danger'}}" @ok="handleOk">
    <template slot="content">
      <div>
        确定删除该Dns地址吗？
      </div>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'modal-dns-delete',
    props: {
      value: Boolean,
      item: Object,
    },
    data(){
      return {
        okButton: false,
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
      ...mapActions('network',['getDns','deleteDns']),
      reset(){
        this.okButton = false
      },
      handleOk(){
        this.okButton = true
        const { Dns } = this.item
        let params = {
          dns_config:
            {
              Add: false,
              Dns
            }
        }
        this.deleteDns(params).then((res) => {
          this.okButton = false
          if (res.code === 200) {
            this.visible = false
            this.getDns()
          }
        }).catch(() => {
          this.okButton = false
        })
      }
    }

  }

</script>

<style scoped lang="less">


</style>
