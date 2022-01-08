<template>
  <div class="card-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'card-container',
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .card-container{
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-image: url("~@/assets/kapd_img@2x.png") 40 60 fill;
  }
</style>
