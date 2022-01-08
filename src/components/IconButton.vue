<template>
  <a class="refresh-button" v-on="$listeners">
    <svg-icon icon-class="shuax_icon" class="icon"></svg-icon>
  </a>
</template>
<script>
  export default {
    name: 'icon-button'
  }

</script>
<style scoped lang="less">
  .refresh-button{
    width: 32px;
    height: 32px;
    background: rgba(1, 13, 61, 0.5);
    border: 1px solid #0E267C;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    display: flex;
    align-items: center;
    justify-content: center;
    .icon{
      width: 16px;
      height: 16px;
    }
    &:hover{
      border-color: @primaryColor;
    }
  }
</style>
