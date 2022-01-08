<template>
  <a-switch
      class="switch__modify"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-switch>
</template>

<script>

  export default {
    name: 'm-switch',
    model: {
      prop: 'checked',
      event: 'change'
    },
  }
</script>

<style lang="less">

  .switch__modify{
    background-color: #425EA3;
    &.ant-switch-checked{
      background-color: #00da95;
    }
    &.ant-switch::after{
      background: #DFF0FF;
    }
  }

</style>
