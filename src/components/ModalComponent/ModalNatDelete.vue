<template>
  <m-modal v-model="visible" title="删除端口映射" :width="388"
           :confirmLoading="okButton" ok-text="删除" :ok-button-props="{props: {type: 'danger'}}" @ok="handleOk">
    <template slot="content">
      <div>
        确定删除该端口映射吗？
      </div>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'modal-nat-delete',
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
      ...mapActions('network',['getNat','deleteNat']),
      reset(){
        this.okButton = false
      },
      handleOk(){
        this.okButton = true
        const { key, Order, ...rest } = this.item
        let params = {
          "id": "1",
          "jsonrpc": "2.0",
          "method":"DelNatConf",
          "params": [{
            ...rest
          }]
        }
        this.deleteNat(params).then((res) => {
          this.okButton = false
          if (res.code === 200) {
            this.visible = false
            this.getNat()
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
