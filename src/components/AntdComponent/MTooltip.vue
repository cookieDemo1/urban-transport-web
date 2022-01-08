<template>
  <a-tooltip
      overlayClassName="tooltip__modify"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
    <template slot="title" >
      <slot name="title"></slot>
    </template>
  </a-tooltip>
</template>

<script>
  export default {
    name: 'm-tooltip',
  }
</script>

<style lang="less">


  .tooltip__modify{
    .ant-tooltip-inner{
      padding: 16px;
      background-color: #010D3D;
    }

    .ant-tooltip-arrow::before{
      display: none;
    }
  }


</style>




