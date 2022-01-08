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
    name: 'modal-wan-delete',
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
      ...mapActions('network',['getWan','deleteWan']),
      reset(){
        this.okButton = false
      },
      handleOk(){
        this.okButton = true
        const { IpAddr } = this.item
        let params = {
          interface_add:
            {
              type: 2,
              Add: false,
              IpAddr
            }
        }
        this.deleteWan(params).then((res) => {
          this.okButton = false
          if (res.code === 200) {
            this.visible = false
            this.getWan()
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
