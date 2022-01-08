<template>
  <a-slider
      class="slider__modify"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-slider>
</template>

<script>

  export default {
    name: 'm-slider',
    model: {
      event: 'change'
    },
    // render () {
    //   return (
    //     <a-slider
    //       class="slider slider__modify"
    //       props={{...this.$props, ...this.$attrs}}
    //       on={this.$listeners}
    //     >
    //       <slot></slot>
    //     </a-slider>
    //   )
    // }
  }
</script>

<style lang="less">

  .slider__modify{
    margin: 0;
    .ant-slider-rail{
      background-color: #425EA3;
    }
    &.ant-slider:hover .ant-slider-rail{
      background-color: #425EA3;
    }
    .ant-slider-track{
      background-color: @primaryColor;
    }
    &.ant-slider:hover .ant-slider-track{
      background-color: @primaryColor;
    }
    .ant-slider-handle{
      width: 10px;
      height: 10px;
      margin-top: -3px;
      background-color: #ffffff;
      border: none;
      box-shadow: none;
      transform: translateX(0)!important;

    }
    &.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open){
      background-color: #ffffff;
      border: none;
    }
    &.ant-slider-disabled .ant-slider-handle{
      border: none;
    }
  }


</style>
