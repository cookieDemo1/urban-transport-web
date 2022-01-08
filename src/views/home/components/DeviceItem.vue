<template>
  <m-tooltip
      placement="right"
      overlayClassName="tooltip__modify"
  >
    <div class="device-item" :class="item.status">
      <svg-icon class="icon" :icon-class="item.icon"></svg-icon>
      <div class="name">{{item.name}}</div>
      <div class="status"></div>
    </div>
    <div slot="title" class="device-tooltip-title">
      <div class="device-info">
        <span class="name">品牌：</span>
        <span class="value">{{getModelDesc(item.model)}}</span>
      </div>
      <div class="device-info">
        <span class="name">IP：</span>
        <span class="value">{{item.ip === '0.0.0.0'?'-':item.ip}}</span>
      </div>
    </div>
  </m-tooltip>
</template>

<script>
  import {getModelDesc} from '@/utils'

  export default {
    name: 'device-item',
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      getModelDesc,
    }
  }
</script>

<style scoped lang="less">
  .device-item{
    position: relative;
    height: 100px;

    background: rgba(16, 45, 155, 0.1);
    border: 1px solid #0978B7;
    box-shadow: inset 0px 0px 15px 0px rgba(27, 172, 255, 0.3);
    border-radius: 4px;
  }


  .device-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon{
      width: 46px;
      height: 46px;
      padding: @smallPadding;
      margin-bottom: @smallMargin;
    }

    .name{
    }

    .status{
      position: absolute;
      top: 8px;
      left: 8px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
  }


  .device-item{
    &.none{
      opacity: 0.6;
      .status{
        background: #3F6188;
        box-shadow: 0px 0px 6px 0px #3F6188;
      }
    }

    &.online{
      .status{
        background: @successColor;
        box-shadow: 0px 0px 6px 0px @successColor;
      }
    }

    &.error{
      .status{
        background: @dangerColor;
        box-shadow: 0px 0px 6px 0px @dangerColor;
      }
    }
  }


  .device-tooltip-title{
    .device-info{
      .name{
        margin-right: @smallMargin;
        color: @primaryColor;
      }
      .value{
        color: @textPrimaryColor;
      }
    }
  }

</style>
