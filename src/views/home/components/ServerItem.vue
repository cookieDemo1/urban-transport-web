<template>
  <m-tooltip
      placement="right"
      overlayClassName="tooltip__modify"
  >
    <div class="server-item" :class="item.status">
      <svg-icon class="icon" :icon-class="item.icon"></svg-icon>
      <div class="name">{{item.name}}</div>
      <div class="status"></div>
    </div>
    <div slot="title" class="tooltip-title">
      <div class="info-item">
        <span class="name">IP：</span>
        <span class="value">{{item.ServiceAddr === '0.0.0.0'?'-':item.ServiceAddr}}</span>
      </div>
      <div class="info-item">
        <span class="name">端口：</span>
        <span class="value">{{item.ServicePort}}</span>
      </div>
      <div class="info-item">
        <span class="name">通信协议：</span>
        <span class="value">{{item.CommMethod}}</span>
      </div>
      <div class="info-item">
        <span class="name">加密方式：</span>
        <span class="value">{{item.CommEncrypt?'item.CommEncrypt':'不加密'}}</span>
      </div>
    </div>
  </m-tooltip>
</template>

<script>
  import {getModelDesc} from '@/utils'

  export default {
    name: 'server-item',
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
  .server-item{
    position: relative;
    height: 220px;

    background: rgba(16, 45, 155, 0.1);
    border: 1px solid #0978B7;
    box-shadow: inset 0px 0px 15px 0px rgba(27, 172, 255, 0.3);
    border-radius: 4px;
  }


  .server-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon{
      width: 68px;
      height: 68px;
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


  .server-item{
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


  .tooltip-title{
    .info-item{
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
