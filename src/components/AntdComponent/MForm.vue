<template>
  <a-form-model
      class="form-horizontal__modify"
      ref="form"
      :hideRequiredMark="true"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-form-model>

</template>

<script>

  export default {
    name: 'm-form',
    data(){
      return {
        labelCol: { span: 1 },
        wrapperCol: { span: 1 },
      }
    },
    mounted(){
      this.clearValidate = this.$refs.form.clearValidate
      this.validate = this.$refs.form.validate
    },
  }
</script>

<style lang="less">

  /*form区域*/
  .form-horizontal__modify{
    .form-item{
      .ant-form-item-label{
        display: inline-block;
        width: 150px;
      }
      .ant-form-item-control-wrapper{
        display: inline-block;
        width: 300px;
      }
    }
  }

  /*额外文本*/
  .form-horizontal__modify{
    .form-item {
      .form-item-extra {
        position: absolute;
        top: 0;
        left: 300px;
        width: 250px;
        margin-left: 12px;
        height: 15.33px;
        line-height: 15.33px;
        color: @primaryColor;
      }
    }
  }

  /*save-button*/
  .form-horizontal__modify{
    .form-item {
      .save-button {
        margin-left: 150px;
      }
    }
  }


</style>
