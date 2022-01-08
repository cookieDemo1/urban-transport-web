<template>
  <a-input-number
      class="input-number__modify"
      style="width: 100%"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-input-number>
</template>

<script>
  export default {
    name: 'm-input-number',
    model: {
      event: 'change'
    },
  }
</script>

<style lang="less">

  .input-number__modify{
    .ant-input-number-handler{
      background-color: @componentColor;
    }
  }
</style>
