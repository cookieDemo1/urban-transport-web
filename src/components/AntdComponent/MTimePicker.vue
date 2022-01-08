<template>
  <a-time-picker
      class="time-picker__modify"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-time-picker>
</template>

<script>

  export default {
    name: 'm-time-picker',
    model: {
      event: 'change'
    },
  }
</script>

<style lang="less">

  .time-picker-popup__modify,.large-time-picker-popup__modify{
    .ant-time-picker-panel-inner{
      color: @textPrimaryColor;
      border: 1px solid @primaryColor;
    }
  }

  .time-picker-popup__modify,.large-time-picker-popup__modify{
    .ant-time-picker-panel-input {
      background: @componentColor;
    }
    .ant-time-picker-panel-input-wrap{
      border-color: @lineColor;
    }
  }

  .time-picker-popup__modify,.large-time-picker-popup__modify{
    .ant-time-picker-panel-select{
      border-color: @lineColor;
      ul{
        width: 100%;
      }
      //li:focus{
      //  color: @primaryColor;
      //}
      li:hover{
        background: @hoverColor;
      }
      li.ant-time-picker-panel-select-option-selected{
        background: @hoverColor;
        color: @primaryColor;
      }
      li.ant-time-picker-panel-select-option-selected:hover{
        background: @hoverColor;
      }
    }
  }
  .large-time-picker-popup__modify{
    .ant-time-picker-panel-inner{
      width: 300px;
    }
    .ant-time-picker-panel-select {
      width: 99px;
    }
  }


</style>
