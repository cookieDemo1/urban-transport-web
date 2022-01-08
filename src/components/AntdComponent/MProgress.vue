<template>
  <a-progress
    class="progress-bar__modify"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: 'm-progress',
  }
</script>

<style lang="less">
  .progress-bar__modify{
    .ant-progress-inner{
      background-color: #425EA3;
    }
    .ant-progress-success-bg, .ant-progress-bg{
      background-color: #00D2FF;
    }
  }
</style>
