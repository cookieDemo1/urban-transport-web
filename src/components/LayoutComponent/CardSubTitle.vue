<template>
  <div class="card-sub-title">
    <div class="line"></div>
    <div class="title"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'card-sub-title',
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .card-sub-title{
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: baseline;
  }

  .line{
    width: 4px;
    height: 14px;
    background: @primaryColor;
    border-radius: 2px;
    margin: 0 @inlineMargin;
  }

  .title{
    font-size: 16px;
    font-weight: bold;
    color: @primaryColor;
  }

</style>
