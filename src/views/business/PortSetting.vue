<template>
  <full-container>
    <div class="buttons">
      <div v-for="(item,index) in buttons" :class="{[item.className]: true, active: activeIndex === index}" @click="handleChange(index)">{{item.name}}</div>
    </div>
    <component :is="component"></component>
  </full-container>
</template>

<script>
  import PortSetting from './components/PortSetting/PortGet'
  import IfrateSummary from './components/PortSetting/IfrateSummary'
  import IfstatsSummary from './components/PortSetting/IfstatsSummary'

  export default {
    name: 'port-setting',
    components: {PortSetting, IfrateSummary, IfstatsSummary},
    data(){
      return {
        buttons: [
          {name: '端口配置', className: 'button first-button',},
          {name: '速率统计', className: 'button',},
          {name: '概要统计', className: 'button last-button',},
        ],
        activeIndex: 0,
        components: [PortSetting, IfrateSummary, IfstatsSummary],
      }
    },
    computed:{
      component(){
        return this.components[this.activeIndex]
      }
    },
    methods: {
      handleChange(index){
        this.activeIndex = index
      },
    }
  }
</script>

<style scoped lang="less">


  .buttons{
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .button{
    margin-right: 8px;
    width: 110px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: @primaryColor;
    cursor: pointer;

    background-image: url("~@/assets/fenduans_z_img.png");
    background-size: 100% 100%;

    &.first-button{
      width: 100px;
      background-image: url("~@/assets/fenduans_t_img.png");
    }
    &.last-button{
      width: 120px;
      background-image: url("~@/assets/fenduans_w_img.png");
    }

    &:hover{
      color: @textPrimaryColor;
    }

    &.active{
      color: @textPrimaryColor;
      font-weight: bold;
    }

  }


</style>
