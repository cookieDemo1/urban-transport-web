<template>
  <m-modal v-model="visible" title="删除Vlan" :width="388"
           :confirmLoading="okButton" ok-text="删除" :ok-button-props="{props: {type: 'danger'}}" @ok="handleOk">
    <template slot="content">
      <div>
        确定删除该Vlan吗？
      </div>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'modal-vlan-delete',
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
      ...mapActions('business',['deleteVlanConfig']),
      reset(){
        this.okButton = false
      },
      handleOk(){
        this.okButton = true
        const { vid, Tag, Untag } = this.item
        let params = {
          vlan_8021q_config: {
              add: 0,
              vid: vid+"", Tag, Untag
          }
        }
        this.deleteVlanConfig(params).then((res) => {
          this.okButton = false
          if (res.code === 200) {
            this.visible = false
            this.$emit('callback')
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
