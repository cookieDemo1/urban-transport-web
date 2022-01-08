<template>
  <div class="card-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'card-item',
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .card-item{
    margin-bottom: 30px;

    &:last-child{
      margin-bottom: 0;
    }
  }

</style>
