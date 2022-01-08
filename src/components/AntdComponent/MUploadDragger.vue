<template>
  <a-upload-dragger
      class="upload-dragger__modify"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-upload-dragger>
</template>

<script>

  export default {
    name: 'm-upload-dragger',
  }
</script>

<style lang="less">

  .upload-dragger__modify{
    .ant-upload.ant-upload-drag{
      background-color: @componentColor;
    }

    .ant-upload.ant-upload-drag .ant-upload{
      padding: 0;
    }
  }


</style>
