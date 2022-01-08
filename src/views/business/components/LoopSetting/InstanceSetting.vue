<template>
  <card-container>
    <card-item>
      <card-title>实例配置</card-title>
      <a-button type="primary" style="margin-bottom: 20px" @click="handleAdd">添加</a-button>
      <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getMstpMsti">
      </m-table>
    </card-item>
    <modal-mstp-msti-add v-model="showAdd"></modal-mstp-msti-add>
  </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalMstpMstiAdd from '@/components/ModalComponent/ModalMstpMstiAdd'

  export default {
    name: 'instance-setting',
    components: {ModalMstpMstiAdd},
    data(){
      return {
        columns: [
          {dataIndex: 'Msti', title: '实例', align: 'center'},
          {dataIndex: 'Priority', title: '优先级', align: 'center'},
          {dataIndex: 'VlanRange', title: 'Vlan Mapped', align: 'center'},
        ],
        list: [],
        showAdd: false,
      }
    },
    computed:{
      ...mapState('network',['loading','mstpMsti',]),
    },
    watch:{
      mstpMsti(newValue){
        if (newValue){
          const { content=[] } = newValue
          this.list = content.map((item,index) => ({...item,key:index}))
        }
      }
    },
    created(){
      this.getMstpMsti()
    },
    methods: {
      ...mapActions('network',['getMstpMsti']),
      handleAdd(){
        this.showAdd = true
      },
    }
  }
</script>

<style scoped lang="less">


</style>
