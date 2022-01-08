<template>
  <div class="grid-item">
    <div class="left">
      <svg-icon class="icon" :icon-class="item.icon"></svg-icon>
    </div>
    <div class="right">
      <div class="value">{{item.value?item.value+item.unit:'-'}}</div>
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'grid-item',
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
  .grid-item{
    height: 64px;
    padding: 0 30px;
    display: flex;
    align-items: center;
  }

  .left{
    width: 40px;
    height: 40px;
    margin-right: @inlineMargin;
  }

  .right{
    .value{
      font-weight: bold;
      line-height: 1;
      margin-bottom: @smallMargin;
    }

    .name{
      color: @primaryColor;
      font-size: 12px;
      line-height: 1;
    }

  }

</style>
