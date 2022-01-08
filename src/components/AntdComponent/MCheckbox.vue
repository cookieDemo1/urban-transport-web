<template>
  <a-checkbox
      class="checkbox__modify"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-checkbox>
</template>

<script>

  export default {
    name: 'm-checkbox',
    model: {
      prop: 'checked',
    },
  }
</script>

<style lang="less">

  .checkbox__modify{

    .ant-checkbox-inner{
      border-color: @primaryColor;
      background-color: @componentColor;
    }
    .ant-checkbox-checked .ant-checkbox-inner{
      background-color: @primaryColor;
    }

    &.ant-checkbox-wrapper + &.ant-checkbox-wrapper{
      margin-left: 0;
      margin-right: 8px;
    }
  }

</style>
