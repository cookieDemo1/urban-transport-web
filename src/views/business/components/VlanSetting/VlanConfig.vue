<template>
  <card-container>
    <card-item>
      <card-title>Vlan配置</card-title>
      <a-button type="primary" style="margin-bottom: 20px" @click="handleAdd">添加</a-button>
      <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="pagination" :loading="loading.getVlanConfig">
        <span slot="Name" slot-scope="{text,record}">
          {{text?text:'-'}}
        </span>
        <div slot="Untag" slot-scope="{text,record}" class="untag-column">
          <div class="item">
            <span class="name">Untag：</span>
            <span class="value">{{record.Untag?record.Untag:'-'}}</span>
          </div>
          <div class="item">
            <span class="name">Tag：</span>
            <span class="value">{{record.Tag?record.Tag:'-'}}</span>
          </div>
          <div class="item">
            <span class="name">Pvlan：</span>
            <span class="value">{{record.Pvlan?record.Pvlan:'-'}}</span>
          </div>
        </div>
        <span slot="action" slot-scope="{text,record}">
          <a-button class="text-button text-danger-button" type="link" size="small" @click="handleDelete(record)">删除</a-button>
        </span>
      </m-table>
    </card-item>
    <modal-vlan-add v-model="showAdd" @callback="getTableData"></modal-vlan-add>
    <modal-vlan-delete v-model="showDelete" :item="item" @callback="getTableData"></modal-vlan-delete>
  </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalVlanAdd from '@/components/ModalComponent/ModalVlanAdd'
  import ModalVlanDelete from '@/components/ModalComponent/ModalVlanDelete'
  export default {
    name: 'vlan-config',
    components: {ModalVlanAdd,ModalVlanDelete},
    data(){
      return {
        params: {
          page: 1,
          row: 20,
        },
        columns: [
          {dataIndex: 'vid', title: 'VID', align: 'center'},
          {dataIndex: 'Name', title: '描述', align: 'center', scopedSlots: { customRender: 'Name' },},
          {dataIndex: 'Untag', title: '端口列表', align: 'center', scopedSlots: { customRender: 'Untag' },},
          {dataIndex: 'action', title: '操作', align: 'center', scopedSlots: { customRender: 'action' },},
        ],
        pagination: {
          hideOnSinglePage: true,
          size: 'small',
          total: 0,
          pageSize: 20,
          'show-quick-jumper':true,
          'show-total': (total) => `总共 ${total} 项`,
          onChange: this.handleTableChange
        },
        list: [],
        showAdd: false,
        showDelete: false,
        item: null,
      }
    },
    computed:{
      ...mapState('business',['loading','vlanConfig']),
    },
    watch:{
      vlanConfig(newValue){
        if (newValue){
          const { content=[], size: {ArraySize} } = newValue
          this.pagination.total = ArraySize
          this.list = content.map((item,index) => ({...item,key:index}))
        }
      }
    },
    created(){
      this.getTableData()
    },
    methods: {
      ...mapActions('business',['getVlanConfig',]),
      getTableData() {
        const params = {
          vlan_list: {
            ...this.params
          }
        }
        this.getVlanConfig(params)
      },
      handleTableChange(pagination){
        this.params.page =  pagination
        this.getTableData()
      },
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


  .untag-column{
    padding: 10px 0;
    .item{
      text-align: left;
      display: flex;
      .name{
        display: block;
        text-align: right;
        width: 60px;
      }
      .value{
        flex: 1;
        color: @primaryColor;
      }
    }
  }


</style>
