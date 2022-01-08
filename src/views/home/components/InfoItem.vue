<template>
  <div class="info-item">
    <div class="name">{{item.name}}：</div>
    <div class="value">{{item.value?item.value:'-'}}</div>
    <svg-icon v-if="item.showEdit && item.value" class="icon" icon-class="xiug_icon" @click="$emit('edit',item)"></svg-icon>
  </div>
</template>

<script>
  export default {
    name: 'info-item',
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .info-item{
    display: flex;
    align-items: center;
  }

  .name{
    width: 70px;
    text-align: right;
    margin-right: 26px;
    color: @primaryColor;
  }

  .value{
    .text-hidden();
    max-width: 244px;
    margin-right: @inlineMargin;
  }

  .icon{
    width: 13px;
    height: 13px;
    color: @primaryColor;
    cursor: pointer;

    &:hover{
      color: @textPrimaryColor;
    }
  }


</style>
