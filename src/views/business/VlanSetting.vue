<template>
  <full-container>
    <div class="buttons">
      <div v-for="(item,index) in buttons" :class="{[item.className]: true, active: activeIndex === index}" @click="handleChange(index)">{{item.name}}</div>
    </div>
    <component :is="component"></component>
  </full-container>
</template>

<script>
  import PvlanConfig from './components/VlanSetting/PvlanConfig'
  import VlanConfig from './components/VlanSetting/VlanConfig'

  export default {
    name: 'vlan-setting',
    components: {PvlanConfig, VlanConfig},
    data(){
      return {
        buttons: [
          {name: '端口配置', className: 'button first-button',},
          {name: 'Vlan配置', className: 'button last-button',},
        ],
        activeIndex: 0,
        components: [PvlanConfig, VlanConfig],
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
