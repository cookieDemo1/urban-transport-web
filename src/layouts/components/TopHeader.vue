<template>
  <div class="top-header">
    <div class="left"></div>
    <div class="middle">
      <div class="title">边缘计算网关管理系统</div>
    </div>
    <div class="right"></div>
    <img v-if="!isMiddle" class="logo" src="@/assets/logo@2x.png" alt="logo"/>

    <div class="info">
        <div class="time">{{time}}</div>
        <div class="line"></div>

        <a-popover
            placement="bottom"
            overlayClassName="popover__modify"
        >
          <div class="user-info">
            <div class="user-name">管理员</div>
            <svg-icon class="arrow-icon" icon-class="xial_icon"></svg-icon>
          </div>
          <div slot="content" class="menu-content">
            <div class="menu-item" @click="handleLogout">退出登录</div>
          </div>
        </a-popover>
    </div>
    <modal-logout v-model="showLogout"></modal-logout>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapActions} from "vuex";
  import ModalLogout from '@/components/ModalComponent/ModalLogout'

  export default {
    name: 'top-header',
    components: {ModalLogout},
    data(){
      return {
        isMiddle: process.env.VUE_APP_MODE === 'middle',
        time: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
        showLogout: false,
      }
    },
    created(){
      this.updateTime()
    },
    methods: {
      ...mapActions('user',['logout']),
      updateTime(){
        setTimeout(() => {
          this.time = moment().format('YYYY-MM-DD HH:mm:ss').toString()
          this.updateTime()
        },1000)
      },
      handleLogout(){
        this.showLogout = true
      },
    }
  }
</script>

<style lang="less">

  .popover__modify{
    .ant-popover-arrow{
      border-top-color: #010D3D!important;
      border-left-color: #010D3D!important;
    }
    .ant-popover-inner{
      background-color: #010D3D;
      .ant-popover-inner-content{
        padding: 0 16px;
      }
    }
  }


</style>

<style scoped lang="less">

  .top-header {
    position: relative;
    padding: 10px 25px 0;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

  }

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

  .info{
    position: absolute;
    top: 20px;
    right: 50px;
    width: 321px;
    height: 35px;
  }

  .info{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: @primaryColor;

    .time{
    }

    .line{
      width: 1px;
      height: 15px;
      margin: 0 30px;
      background: #057FC5;
    }

    .user-info{
      display: flex;
      align-items: center;
      .user-name{
        margin-right: @inlineMargin;
        color: @primaryColor;
      }
      .arrow-icon{
        width: 12px;
        height: 6px;
      }
    }
  }


  .menu-content{
    width: 100px;
    padding: 5px 0;
    .menu-item{
      margin: 5px 0;
      padding: 5px 0;
      text-align: center;
      cursor: pointer;
      color: @textPrimaryColor;
      &:hover {
        background: @hoverColor;
      }
    }
  }



</style>
