<template>
  <m-modal v-model="visible" title="删除静态路由" :width="388"
           :confirmLoading="okButton" ok-text="删除" :ok-button-props="{props: {type: 'danger'}}" @ok="handleOk">
    <template slot="content">
      <div>
        确定删除该静态路由吗？
      </div>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'modal-route-delete',
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
      ...mapActions('network',['getRoute','deleteRoute']),
      reset(){
        this.okButton = false
      },
      handleOk(){
        this.okButton = true
        const { IpAddr, Gate, Distance } = this.item
        let params = {
          static_route_config:
            {
              Add: false,
              IpAddr, Gate, Distance
            }
        }
        this.deleteRoute(params).then((res) => {
          this.okButton = false
          if (res.code === 200) {
            this.visible = false
            this.getRoute()
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
