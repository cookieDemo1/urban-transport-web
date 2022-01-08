<template>
  <full-container>
    <card-container>
      <card-item>
        <card-title>DNS配置</card-title>
        <a-button type="primary" style="margin-bottom: 20px" @click="handleAdd">添加</a-button>
        <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getDns">
            <span slot="action" slot-scope="{text,record}">
              <a-button class="text-button text-danger-button" type="link" size="small" @click="handleDelete(record)">删除</a-button>
            </span>
        </m-table>
      </card-item>
    </card-container>
    <modal-dns-add v-model="showAdd"></modal-dns-add>
    <modal-dns-delete v-model="showDelete" :item="item"></modal-dns-delete>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalDnsAdd from '@/components/ModalComponent/ModalDnsAdd'
  import ModalDnsDelete from '@/components/ModalComponent/ModalDnsDelete'
  export default {
    name: 'dns-setting',
    components: {ModalDnsAdd,ModalDnsDelete},
    data(){
      return {
        columns: [
          {dataIndex: 'Order', title: '序号', align: 'center'},
          {dataIndex: 'Dns', title: 'DNS地址', align: 'center'},
          {dataIndex: 'action', title: '操作', align: 'center', scopedSlots: { customRender: 'action' },},
        ],
        list: [],
        showAdd: false,
        showDelete: false,
        item: null,
      }
    },
    computed:{
      ...mapState('network',['loading','dns']),
    },
    watch:{
      dns(newValue){
        if (newValue){
          const { content=[] } = newValue
          this.list = content.map((item,index) => ({...item,key:index,Order: index+1}))
        }
      }
    },
    created(){
      this.getDns()
    },
    methods: {
      ...mapActions('network',['getDns']),
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
