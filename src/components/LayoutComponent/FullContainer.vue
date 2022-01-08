<template>
  <div class="full-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'full-container',
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .full-container{
    height: 100%;
  }
</style>
