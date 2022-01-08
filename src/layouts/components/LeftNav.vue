<template>
  <a-menu
      class="left-nav nav__modify"
      mode="inline"
      :inlineIndent="0"
      :openKeys.sync="openKeys"
      :selectedKeys="selectedKeys"
      @select="handleSelect"
      @openChange="handleOpenChange"
      :style="{ height: '100%', paddingTop: '30px', borderRight: 0 }"
  >
    <div v-for="item in menus" :key="item.path" :is="item.children?'a-sub-menu':'a-menu-item'">
      <template v-if="item.children">
        <template slot="title">
          <svg-icon class="menu-icon" :icon-class="item.icon"></svg-icon>
          <span class="menu-title">{{ item.title }}</span>
        </template>
        <a-menu-item class="menu-item" v-for="item in item.children" :key="item.path" :title="item.title">
          <div class="menu-icon">
            <svg-icon class="menu-circle" :icon-class="item.icon"></svg-icon>
          </div>
          <span class="menu-title">{{ item.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <svg-icon class="menu-icon" :icon-class="item.icon"></svg-icon>
        <span class="menu-title">{{ item.title }}</span>
      </template>
    </div>

  </a-menu>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'left-nav',
    data() {
      return {
        openKeys: []
      };
    },
    computed: {
      ...mapGetters('app',['menus']),
      selectedKeys(){
        return  this.$route.path ? [this.$route.path] : [this.menus[0].path]
      }
    },
    mounted(){
      const {path} = this.menus.find(item => this.$route.path.includes(item.path))
      this.openKeys = [path]
    },
    methods: {
      handleSelect({key}){
        this.$router.push({path:key})
      },
      handleOpenChange(openKeys) {
        // const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        // this.openKeys = latestOpenKey ? [latestOpenKey] : []
      },
    },
  };
</script>


<style lang="less">
  ul.nav__modify {
    /*title、item*/
    .ant-menu-item, .ant-menu-submenu-title {
      color: @primaryColor;
      padding-left: 24px !important;
      display: flex;
      align-items: center;

      .menu-icon {
        width: 18px;
        height: 18px;
        margin-bottom: 1.75px;
        margin-right: @inlineMargin;
        transition: font-size .15s cubic-bezier(.215, .61, .355, 1), margin .3s cubic-bezier(.645, .045, .355, 1);

        display: flex;
        justify-content: center;
        align-items: center;

        .menu-circle {
          width: 6px;
          height: 6px;
          color: inherit;
        }
      }
      .menu-title {
      }

    }

    /*title*/
    .ant-menu-submenu{
      /*选中*/
      &.ant-menu-submenu-selected{
        .ant-menu-submenu-title{
          color: @textPrimaryColor;
        }
      }

      &:not(.ant-menu-submenu-selected){
        .ant-menu-submenu-title:hover{
          background: linear-gradient(90deg, rgba(27, 172, 255, 0.3) 0%, rgba(27, 172, 255, 0) 100%);
        }
      }

      /*箭头*/
      &.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,
      &.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after{
        background: @primaryColor;
      }

      &.ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,
      &.ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-submenu-arrow::after,
      &.ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::before,
      &.ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow::after{
        background: @textPrimaryColor;
      }
    }

    /*item*/
    .ant-menu-item {
      /*选中*/
      &.ant-menu-item-selected {
        color: @textPrimaryColor;
        background: linear-gradient(90deg, rgba(27, 172, 255, 0.3) 0%, rgba(27, 172, 255, 0) 100%);
      }

      &:not(.ant-menu-item-selected):hover{
        background: linear-gradient(90deg, rgba(27, 172, 255, 0.3) 0%, rgba(27, 172, 255, 0) 100%);
      }

      &.ant-menu-item::after {
        left: 0;
        right: unset;
      }
    }
  }

</style>

<style scoped lang="less">
  .left-nav{
    width: 180px;
    height: 100%;
  }



</style>
