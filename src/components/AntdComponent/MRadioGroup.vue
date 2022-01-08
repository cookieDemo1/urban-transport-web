<template>
  <a-radio-group
      class="radio-group__modify"
      name="radioGroup"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-radio-group>
</template>

<script>

  export default {
    name: 'm-radio-group',
  }
</script>

<style lang="less">
  .radio-group__modify{
    .radio{
      .ant-radio-inner{
        background-color: @componentColor;
        border-color: #0978B7;
      }
      .ant-radio-checked .ant-radio-inner{
        border-color: @primaryColor;
      }
      &.ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner{
        border-color: @primaryColor;
      }
    }
  }

</style>
