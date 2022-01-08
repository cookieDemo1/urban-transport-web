<template>
  <div class="empty-content" >
    <svg-icon class="image" icon-class="wushuju" :style="imageStyle"></svg-icon>
    <div class="desc">
      <slot>{{desc}}</slot>
    </div>
  </div>
</template>

<script>
  import { Empty } from 'ant-design-vue'
  export default {
    name: 'empty-content',
    props: {
      imageStyle: {
        type: Object,
        default: () => ({
          width: '80px',
          height: '80px',
        })
      },
      desc: {
        type: String,
        default: '暂无数据',
      },
    },
    data(){
      return {
        image: Empty.PRESENTED_IMAGE_SIMPLE,
      }
    }
  }
</script>


<style scoped lang="less">

  .empty-content{
    width: 100%;
    height: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .image{
  }

  .desc{
    text-align: center;
    margin-top: 10px;
    color: rgba(27, 172, 255, 0.6);
  }




</style>
