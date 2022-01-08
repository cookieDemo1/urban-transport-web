<template>
  <m-modal v-model="visible" title="退出登录" :width="388"
           :confirmLoading="okButton" ok-text="退出登录" :ok-button-props="{props: {type: 'danger'}}" @ok="handleOk">
    <template slot="content">
      <div>
        确定退出登录吗？
      </div>
    </template>
  </m-modal>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'modal-logout',
    props: {
      value: Boolean
    },
    data() {
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
      }
    },
    methods:{
      ...mapActions('user',['logout']),
      handleOk(){
        this.okButton = true
        this.logout().then((res) => {
          this.okButton = false
          window.location.href = '/login.html'
        }).catch((err) => {
          this.okButton = false
        })
      }
    }
  }

</script>

<style scoped lang="less">

</style>
