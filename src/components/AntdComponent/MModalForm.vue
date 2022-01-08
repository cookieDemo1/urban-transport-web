<template>
  <a-form-model
      ref="form"
      class="modal-form__modify"
      :hideRequiredMark="true"
      :labelCol="{...labelCol, ...$attrs.labelCol}"
      :wrapperCol="{...wrapperCol,...$attrs.wrapperCol}"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-form-model>
</template>

<script>

  export default {
    name: 'm-modal-form',
    data(){
      return {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      }
    },
    mounted(){
      this.clearValidate = this.$refs.form.clearValidate
      this.validate = this.$refs.form.validate
    },
  }
</script>

<style lang="less">
  .modal-form__modify{
    .ant-form-explain {
      color: @primaryColor;
    }
    .has-error .ant-form-explain {
      color: @dangerColor;
    }
  }

</style>
