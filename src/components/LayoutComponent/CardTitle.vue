<template>
  <div class="card-title">
    <img class="decoration-icon" src="@/assets/biaotz_img@2x.png" alt="">
    <div class="title"><slot></slot></div>
    <img class="decoration-icon" src="@/assets/biaoty_img@2x.png" alt="">
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: 'card-title',
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .card-title{
    margin-bottom: 20px;
    display: flex;
    align-items: baseline;
  }

  .title{
    margin: 0 8px;
    font-size: 16px;
    font-weight: bold;
    color: @primaryColor;
  }

  .decoration-icon{
    width: 24px;
    height: 16px;
  }

  .line{
    flex: 1;
    border-bottom: 1px solid @lineColor;
  }

</style>
