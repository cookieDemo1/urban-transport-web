<template>
  <full-container>
    <card-container>
      <card-item>
        <card-title>恢复出厂</card-title>
        <div class="reset-area">
          <img class="icon" src="@/assets/huifccsz_icon_button.png" alt="" @click="handleReset">
          <div class="text">单击此图标按钮，将使设备恢复出厂设置</div>
        </div>
      </card-item>
    </card-container>
    <modal-system-reset v-model="showReset"></modal-system-reset>
  </full-container>
</template>

<script>
  import ModalSystemReset from '@/components/ModalComponent/ModalSystemReset'
  export default {
    name: 'system-reset',
    components: {ModalSystemReset},
    data(){
      return {
        showReset: false,
      }
    },
    methods: {
      handleReset(){
        this.showReset = true
      }
    }
  }
</script>

<style scoped lang="less">


  .reset-area{
    height: 200px;
    background-color: @hoverColor;
    border: 1px solid @lineColor;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .icon{
    width: 240px;
    height: 110px;
    cursor: pointer;
  }
  .text{
    color: @primaryColor;
  }

</style>
