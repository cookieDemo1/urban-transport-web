<template>
  <div class="not-found">
    <div class="header">
      <div class="left"></div>
      <div class="middle">
        <div class="title">边缘计算网关管理系统</div>
      </div>
      <div class="right"></div>
      <img class="logo" src="@/assets/logo@2x.png" alt="logo"/>
    </div>
    <div class="content">
      <a-result class="result__modify" title="当前页面不存在或已被删除">
        <template #icon>
          <img class="icon" src="@/assets/404_img@2x.png" alt="404">
        </template>
        <template #extra>
          <a-button  class="button" type="primary" @click="toHome">
            去首页
          </a-button>
        </template>
      </a-result>
      <img class="left-top-corner" src="@/assets/xiuszs_img@2x.png" alt="">
      <img class="right-top-corner" src="@/assets/xiusys_img@2x.png" alt="" >
      <img class="left-bottom-corner" src="@/assets/xiuszx_img@2x.png" alt="" >
      <img class="right-bottom-corner" src="@/assets/xiusyx_img@2x.png" alt="" >
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  methods: {
    toHome(){
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less">
  .result__modify{
    .ant-result-title{
      color: @textPrimaryColor;
    }
  }
</style>

<style scoped lang="less">

  .not-found{
    width: 100%;
    height: 100%;
    min-width: 1366px;
    min-height: 768px;

    background-image: url("~@/assets/beij_img@2x.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .header {
    position: relative;
    padding: 10px 25px 0;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .left{
      flex: 1;
      border: 9.5px solid transparent;
      border-image: url("~@/assets/topzb_img@2x.png") 0 17 19 35 stretch;
      margin-bottom: 13px;
    }

    .right {
      flex: 1;
      border: 9.5px solid transparent;
      border-image: url("~@/assets/topyb_img@2x.png") 0 35 19 17 stretch;
      margin-bottom: 13px;
    }

    .middle {
      width: 711px;
      height: 68px;
      margin: 0 50px;
      background-image: url("~@/assets/topzj_img@2x.png");
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 22px;
        font-weight: bold;
        color: @textPrimaryColor;
      }
    }

    .logo {
      position: absolute;
      top: 20px;
      left: 50px;
      width: 321px;
      height: 35px;
    }
  }

  .content {
    margin: 50px;
    position: relative;
    .left-top-corner{
      position: absolute;
      left: 0;
      top: 0;
      width: 87px;
      height: 58px;
    }
    .right-top-corner{
      position: absolute;
      right: 0;
      top: 0;
      width: 88px;
      height: 332px;
    }

    .left-bottom-corner{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 88px;
      height: 160px;
    }
    .right-bottom-corner{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 87px;
      height: 58px;
    }
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon{
      width: 450px;
      height: 370px;
    }

    .button{
      width: 80px;
      height: 32px;
    }
  }


</style>

