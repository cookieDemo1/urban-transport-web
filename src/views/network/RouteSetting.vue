<template>
  <full-container>
    <card-container>
      <card-item>
        <card-title>路由配置</card-title>
        <a-button type="primary" style="margin-bottom: 20px" @click="handleAdd">添加</a-button>
        <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getRoute">
            <span slot="action" slot-scope="{text,record}">
              <a-button class="text-button text-danger-button" type="link" size="small" @click="handleDelete(record)">删除</a-button>
            </span>
        </m-table>
      </card-item>
    </card-container>
    <modal-route-add v-model="showAdd"></modal-route-add>
    <modal-route-delete v-model="showDelete" :item="item"></modal-route-delete>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalRouteAdd from '@/components/ModalComponent/ModalRouteAdd'
  import ModalRouteDelete from '@/components/ModalComponent/ModalRouteDelete'
  export default {
    name: 'route-setting',
    components: {ModalRouteAdd,ModalRouteDelete},
    data(){
      return {
        columns: [
          {dataIndex: 'Order', title: '序号', align: 'center'},
          {dataIndex: 'IpAddr', title: '目的地址', align: 'center'},
          {dataIndex: 'Gate', title: '网关', align: 'center'},
          {dataIndex: 'Distance', title: '距离', align: 'center'},
          {dataIndex: 'action', title: '操作', align: 'center', scopedSlots: { customRender: 'action' },},
        ],
        list: [],
        showAdd: false,
        showDelete: false,
        item: null,
      }
    },
    computed:{
      ...mapState('network',['loading','route']),
    },
    watch:{
      route(newValue){
        if (newValue){
          const { content=[] } = newValue
          this.list = content.map((item,index) => ({...item,key:index,Order: index+1}))
        }
      }
    },
    created(){
      this.getRoute()
    },
    methods: {
      ...mapActions('network',['getRoute']),
      handleAdd(){
        this.showAdd = true
      },
      handleDelete(record){
        this.showDelete = true
        this.item = record
      },
    }
  }
</script>

<style scoped lang="less">


</style>
