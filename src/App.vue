<template>
  <a-config-provider :locale="locale">
    <template #renderEmpty>
      <!--      <div style="text-align: center">-->
      <!--        <a-icon type="smile" style="font-size: 20px" />-->
      <!--        <p>Data Not Found</p>-->
      <!--      </div>-->
      <empty-content></empty-content>
    </template>
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  export default {
    name: 'app',
    data() {
      return {
        locale: zhCN,
      };
    },
  };
</script>

<style lang="less">


</style>
