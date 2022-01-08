<template>
  <a-spin
      size="large"
      tip="加载中"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-spin>
</template>

<script>
  export default {
    name: 'm-spin',
  }
</script>

<style lang="less">

  //.loading__modify{
  //  //height: 100%;
  //  //display: flex;
  //  //justify-content: center;
  //  //flex-direction: column;
  //  //align-items: center;
  //  //&.ant-spin-nested-loading > div > .ant-spin{
  //  //  max-height: none;
  //  //}
  //}

</style>
