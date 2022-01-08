<template>
  <a-modal
      class="modal__modify"
      :mask="true"
      :maskClosable="false"
      :keyboard="false"
      :destroyOnClose="true"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot name="content"></slot>
  </a-modal>
</template>

<script>
  export default {
    name: 'm-modal',
    model: {
      prop: 'visible',
      event: 'change'
    },
  }
</script>

<style lang="less">

  .modal__modify{

    .ant-modal-content{
      border: 28px solid transparent;
      border-image: url("~@/assets/tanckpd_img@2x.png") 56 fill;
    }

    .ant-modal-header {
      position: absolute;
      top: -28px;
      left: 0;
      right: 0;
      padding: 0;
      height: 40px;
      text-align: center;
      border-bottom: none;
      border-radius: 0;
      background-color: transparent;
    }

    .ant-modal-title {
      width: 216px;
      height: 40px;
      margin: 0 auto;
      background-image: url("~@/assets/tetd_img@2x.png");
      background-size: 100% 100%;
      font-size: 16px;
      line-height: 40px;
      font-weight: bold;
      color: @textPrimaryColor;
    }


    .ant-modal-close{
      position: absolute;
      top: -28px;
      right: -28px;
    }

    .ant-modal-body{
      //+28px  80px 50px 0
      padding: 52px 0 30px;
    }

    .ant-modal-footer {
      border-top: none;
      padding: 0 22px 12px;
    }
  }

</style>
