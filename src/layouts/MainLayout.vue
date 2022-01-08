<template>
  <a-layout class="main-layout">
    <top-header></top-header>
    <a-layout>
      <a-layout-sider width="180">
        <left-nav></left-nav>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <a-breadcrumb v-if="routes" class="breadcrumb" style="margin-bottom: 16px">
          <a-breadcrumb-item v-for="(item,index) in routes" :key="index">
            <template v-if="index === 0">
              <router-link :to="item.path">
                <svg-icon class="path-icon" :icon-class="item.icon"></svg-icon>
              </router-link>
            </template>
            <template v-else-if="routes.indexOf(item) === routes.length - 1">
              {{ item.title }}
            </template>
            <template v-else>
              <router-link :to="item.path">
                {{ item.title }}
              </router-link>
            </template>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <router-view class="content-view"></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import {mapGetters} from "vuex";
  import TopHeader from './components/TopHeader'
  import LeftNav from './components/LeftNav'

  export default {
    name: 'main-layout',
    components: {TopHeader,LeftNav},
    data(){
      return {
      }
    },
    computed: {
      ...mapGetters('app',['menus']),
      routes() {
        if (this.$route.path === '/home'){
          return null
        }
        let res = [{path: '/home', title: '首页', icon: 'home_click_icon'}]
        this.menus.find(item => {
          if (this.$route.path.includes(item.path)){
            res.push({path: item.path, title: item.title})
            if (item.children){
              item.children.find((childItem) => {
                if (this.$route.path === childItem.path){
                  res.push({path: childItem.path, title: childItem.title})
                  return true
                }
                return  false
              })
            }
            return true
          }
          return  false
        })
        return  res
      }
    },
    methods:{
    },
  }
</script>

<style scoped lang="less">

  .main-layout{
    width: 100%;
    height: 100%;
    min-width: 1366px;
    min-height: 768px;

    background-image: url("~@/assets/beij_img@2x.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .layout-content{
    margin: 30px 0 20px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
  }

  .breadcrumb{
    .path-icon{
      width: 14px;
      height: 14px;
    }
  }

  .content-view{
    flex: 1;
  }

</style>
