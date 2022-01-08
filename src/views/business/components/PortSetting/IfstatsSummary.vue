<template>
  <card-container>
    <card-item>
      <card-title>概要统计</card-title>
      <a-row type="flex" justify="space-between" style="margin-bottom: 20px">
        <a-col>
          <a-button type="danger" :loading="settingButton" @click="handleSetting">清除</a-button>
        </a-col>
        <a-col>
          <icon-button @click="getTableData"></icon-button>
        </a-col>
      </a-row>
      <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getIfstatsSummary"></m-table>
    </card-item>
  </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'ifstats-summary',
    data(){
      return {
        settingButton: false,
        columns: [
          {dataIndex: 'Name', title: '端口名称', align: 'center'},
          {dataIndex: 'IQD', title: '接收报文数', align: 'center'},
          {dataIndex: 'OQD', title: '发送报文数', align: 'center'},
          {dataIndex: 'RXbits', title: '接收字节数', align: 'center'},
          {dataIndex: 'RXpkts', title: '发送字节数', align: 'center'},
          {dataIndex: 'TXbits', title: '接收丢弃报文数', align: 'center'},
          {dataIndex: 'TXbpkts', title: '发送丢弃报文数', align: 'center'},
        ],
        list: [],
        timer: null,
      }
    },
    computed:{
      ...mapState('business',['loading','ifstatsSummary']),
    },
    watch: {
      ifstatsSummary(newValue){
        if (newValue){
          const { content=[] } = newValue
          this.list = content.map((item,index) => ({...item,key:index}))
        }
      },
    },
    created(){
      this.getTableData()
    },
    methods: {
      ...mapActions('business',['getIfstatsSummary', 'setIfstatsSummary']),
      getTableData(){
        this.getIfstatsSummary()
      },
      handleSetting(){
        this.settingButton = true
        const params = {
          ifstats_detail: {
            data: "clr&all"
          }
        }
        this.setIfstatsSummary(params).then((res) => {
          this.settingButton = false
          if (res.code === 200){
            this.getIfstatsSummary()
          }
        }).catch(() => {
          this.settingButton = false
        })
      }
    }
  }
</script>

<style scoped lang="less">


</style>
