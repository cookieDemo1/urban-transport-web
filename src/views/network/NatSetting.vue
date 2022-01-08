<template>
  <full-container>
    <card-container>
      <card-item>
        <card-title>端口映射列表</card-title>
        <a-button type="primary" style="margin-bottom: 20px" @click="handleAdd">新增</a-button>
        <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="pagination" :loading="loading.getNat">
          <span slot="Active" slot-scope="{text,record}">
            {{text?'启用':'禁用'}}
          </span>
          <span slot="action" slot-scope="{text,record}">
            <a-button class="text-button text-danger-button" type="link" size="small" @click="handleDelete(record)">删除</a-button>
          </span>
        </m-table>
      </card-item>
    </card-container>

    <modal-nat-add v-model="showAdd"></modal-nat-add>
    <modal-nat-delete v-model="showDelete" :item="item"></modal-nat-delete>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalNatAdd from '@/components/ModalComponent/ModalNatAdd'
  import ModalNatDelete from '@/components/ModalComponent/ModalNatDelete'

  export default {
    name: 'nat-setting',
    components: {ModalNatAdd, ModalNatDelete},
    data(){
      return {
        pagination: {
          hideOnSinglePage: true,
          size: 'small',
          total: 0,
          pageSize: 10,
          'show-quick-jumper':true,
          'show-total': (total) => `总共 ${total} 项`,
          onChange: this.handleTableChange
        },
        columns: [
          {dataIndex: 'Order', title: '序号', align: 'center'},
          {dataIndex: 'Service', title: '服务名称', align: 'center'},
          {dataIndex: 'DstPort', title: '外部端口', align: 'center',},
          {dataIndex: 'SrcPort', title: '内部端口', align: 'center', },
          {dataIndex: 'DstAddr', title: '内部服务器', align: 'center'},
          {dataIndex: 'Protocol', title: '端口类型', align: 'center'},
          {dataIndex: 'Active', title: '状态', align: 'center', scopedSlots: { customRender: 'Active' },},
          {dataIndex: 'action', title: '操作', align: 'center', scopedSlots: { customRender: 'action' },},
        ],
        list: [],

        showAdd: false,
        showDelete: false,
        item: null
      }
    },
    computed:{
      ...mapState('network',['loading','nat']),
    },
    watch: {
      nat(newValue){
        if (newValue){
          this.pagination.total = parseInt(newValue.length)
          this.list = newValue.map((item,index) => {
            return {...item,key:index, Order:index+1}
          })
        }
      }
    },
    created(){
      this.getNat()
    },
    methods: {
      ...mapActions('network',['getNat','setNat']),
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
