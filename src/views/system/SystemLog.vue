<template>
  <full-container>
    <card-container>
      <card-item>
        <card-title>系统日志</card-title>
        <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="pagination" :loading="loading.getSysLog" >
        </m-table>
      </card-item>
    </card-container>
  </full-container>
</template>

<script>
  import moment from 'moment'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'system-log',
    data(){
      return {
        params: {
          pageSize: 10,
          pageNumber: 0,
        },
        columns: [
          {dataIndex: 'Order', title: '序号', align: 'center'},
          {dataIndex: 'User', title: '操作用户', align: 'center'},
          {dataIndex: 'OperateThing', title: '操作信息', align: 'center'},
        ],
        pagination: {
          hideOnSinglePage: true,
          size: 'small',
          total: 0,
          pageSize: 10,
          'show-quick-jumper':true,
          'show-total': (total) => `总共 ${total} 项`,
          onChange: this.handleTableChange
        },
        list: []
      }
    },
    computed:{
      ...mapState('system',['loading','sysLog',]),
    },
    watch:{
      sysLog(newValue){
        if (newValue){
          const {content, pageData} = newValue
          this.pagination.total = parseInt(pageData.totalSize)
          const {pageSize, pageNumber} = this.params
          const offset = pageNumber*pageSize
          this.list = content.map((item,index) => {
            return {...item, key: index, Order: offset+index+1, OperateTime: moment(parseInt(item.OperateTime)).format('YYYY-MM-DD HH:mm:ss').toString()}
          })
        }
      }
    },
    created(){
      this.getTableData()
    },
    methods: {
      ...mapActions('system',['getSysLog']),
      getTableData() {
        this.getSysLog(this.params)
      },
      handleTableChange(pagination){
        this.params.pageNumber =  pagination - 1
        this.getTableData()
      }
    }
  }
</script>

<style scoped lang="less">
</style>
