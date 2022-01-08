<template>
  <div class="login">
    <div class="header">
      <div class="left"></div>
      <div class="middle">
        <div class="title">边缘计算网关管理系统</div>
      </div>
      <div class="right"></div>
      <img v-if="!isMiddle" class="logo" src="@/assets/logo@2x.png" alt="logo"/>
    </div>
    <div class="content">
      <div class="left">
        <img src="@/assets/peit_img@2x.png" alt="earth"/>
      </div>
      <div class="right">
        <div class="title">欢迎登录</div>
<!--        <a-form class="form" :form="form" @submit="handleLogin">-->
<!--          <a-form-item class="form-item">-->
<!--            <a-input-password-->
<!--                class="input input__modify"-->
<!--                size="large"-->
<!--                placeholder="填写密码"-->
<!--                @pressEnter="handleLogin"-->
<!--                v-decorator="[-->
<!--                  'password',-->
<!--                  {validateTrigger: ['blur'],rules: [{ required: true, message: '请输入密码'}]}-->
<!--                ]"-->
<!--                allowClear-->
<!--                autocomplete="off"-->
<!--            >-->
<!--            </a-input-password>-->
<!--          </a-form-item>-->
<!--          <a-form-item class="form-item">-->
<!--            <a-button class="login-button" type="primary" block html-type="submit" :loading="loginButton" >登录</a-button>-->
<!--          </a-form-item>-->
<!--        </a-form>-->

        <a-form-model ref="form" class="form" :model="form" :rules="rules" @submit="handleLogin">
          <a-form-model-item class="form-item" prop="password">
            <a-input-password
                class="input input__modify"
                size="large"
                placeholder="填写密码"
                v-model="form.password"
                allowClear
                autocomplete="off"
            >
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item class="form-item">
            <a-button class="login-button" type="primary" block html-type="submit" :loading="loginButton">登录</a-button>
          </a-form-model-item>
        </a-form-model>
        <form ref="loginForm" v-show="false" action="/action/login/" method="post">
          <input type="text" name="username" :value="form.username"/>
          <input type="password" name="password" :value="form.password"/>
        </form>
      </div>
      <img class="left-top-corner" src="@/assets/xiuszs_img@2x.png" alt="">
      <img class="right-top-corner" src="@/assets/xiusys_img@2x.png" alt="" >
      <img class="left-bottom-corner" src="@/assets/xiuszx_img@2x.png" alt="" >
      <img class="right-bottom-corner" src="@/assets/xiusyx_img@2x.png" alt="" >
    </div>
    <div class="footer">
      {{footer}}
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'login-layout',
    data() {
      return {
        isMiddle: process.env.VUE_APP_MODE === 'middle',
        footer: process.env.VUE_APP_MODE === 'middle'?'':'深圳市城市交通规划设计研究中心',

        loginButton: false,
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        form: {
          username: 'admin',
          password: ''
        }
      }
    },
    methods:{
      ...mapActions('user',['login']),
      handleLogin(e) {
        e.preventDefault();
        this.loginButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            setTimeout(() => {
              this.loginButton = false
            }, 600)
            return
          }
          this.$refs.loginForm.submit()
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;

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
    margin: 50px 50px 0;
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      width: 45%;
      min-width: 570px;
      max-width: 694px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 30%;
      min-width: 380px;
      max-width: 430px;
      height: 320px;

      margin-left: 80px;
      padding: 0 20px;
      border: 28px solid transparent;
      border-image: url("~@/assets/tancd_img@2x.png") 56 fill;

      .title {
        margin-top: 40px;
        font-size: 28px;
        height: 28px;
        line-height: 28px;
        font-weight: bold;
        color: @textPrimaryColor;
      }
      .form{
        margin-top: 30px;
        .form-item{
          .login-button{
            margin-top: 16px;
            height: 44px;
          }
        }
      }

    }

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

  .footer{
    position: relative;
    top: -18px;
    height: 50px;
    text-align: center;
    font-size: 12px;
    color: @primaryColor;
  }

</style>

