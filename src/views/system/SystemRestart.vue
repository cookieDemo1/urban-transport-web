<template>
  <full-container>
    <card-container>
      <card-item>
        <card-title>系统重启</card-title>
        <div class="restart-area">
          <img class="icon" src="@/assets/chongq_icon_button.png" alt="" @click="handleRestart">
          <div class="text">单击此图标按钮，将使设备重新启动</div>
        </div>
      </card-item>
    </card-container>
    <modal-system-restart v-model="showRestart"></modal-system-restart>
  </full-container>
</template>

<script>
  import ModalSystemRestart from '@/components/ModalComponent/ModalSystemRestart'
  export default {
    name: 'system-restart',
    components: {ModalSystemRestart},
    data(){
      return {
        showRestart: false,
      }
    },
    methods: {
      handleRestart(){
        this.showRestart = true
      }
    }
  }
</script>

<style scoped lang="less">


  .restart-area{
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
