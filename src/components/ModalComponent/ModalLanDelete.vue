<template>
  <m-modal v-model="visible" title="删除IP" :width="388"
           :confirmLoading="okButton" ok-text="删除" :ok-button-props="{props: {type: 'danger'}}" @ok="handleOk">
    <template slot="content">
      <div>
        确定删除该IP地址吗？
      </div>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'modal-lan-delete',
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
      ...mapActions('network',['getLan','deleteLan']),
      reset(){
        this.okButton = false
      },
      handleOk(){
        this.okButton = true
        const { IP, NM } = this.item
        let params = {
            "id":"1",
            "jsonrpc":"2.0",
            "method":"DelLanConf",
            "params":[{
              IP, NM
            }]
        }
        this.deleteLan(params).then((res) => {
          this.okButton = false
          if (res.code === 200) {
            this.visible = false
            this.getLan()
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
