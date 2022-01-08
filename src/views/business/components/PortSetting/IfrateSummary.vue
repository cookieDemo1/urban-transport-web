<template>
  <card-container>
    <card-item>
      <card-title>速率统计</card-title>
      <a-row type="flex" justify="space-between" style="margin-bottom: 20px">
        <a-col>
          <span class="item">
            <span class="name">刷新时间: </span><span class="value">30秒</span>
          </span>
          <span class="item">
            <span class="name">IQD: </span><span class="value">Pkts Dropped From Input Queue</span>
          </span>
          <span class="item">
            <span class="name">OQD: </span><span class="value">Pkts Dropped From Input Queue</span>
          </span>
        </a-col>
        <a-col>
          <icon-button @click="handleRefresh"></icon-button>
        </a-col>
      </a-row>
      <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getIfrateSummary"></m-table>
    </card-item>
  </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'ifrate-summary',
    data(){
      return {
        settingButton: false,
        columns: [
          {dataIndex: 'Name', title: '端口名称', align: 'center'},
          {dataIndex: 'InFrame', title: 'IQD(pkts/sec)', align: 'center'},
          {dataIndex: 'OutFrame', title: 'OQD(pkts/sec)', align: 'center'},
          {dataIndex: 'InOctect', title: 'RX(bits/sec)', align: 'center'},
          {dataIndex: 'OutOctect', title: 'RX(pkts/sec)', align: 'center'},
          {dataIndex: 'InMissFrame', title: 'TX(bits/sec)', align: 'center'},
          {dataIndex: 'OutMissFrame', title: 'TX(pkts/sec)', align: 'center'},
        ],
        list: [],
        timer: null,
      }
    },
    computed:{
      ...mapState('business',['loading','ifrateSummary']),
    },
    watch: {
      ifrateSummary(newValue){
        if (newValue){
          const { content=[] } = newValue
            this.list = content.map((item,index) => ({...item,key:index}))
        }
      },
    },
    created(){
      this.getTableData()
      this.timerRefresh()
    },
    beforeDestroy(){
      this.timer && clearTimeout(this.timer)
      this.timer = null
    },
    methods: {
      ...mapActions('business',['getIfrateSummary']),
      getTableData(){
        this.getIfrateSummary()
      },
      handleRefresh(){
        //手动获取
        this.getTableData()
        //重新定时刷新
        this.timer && clearTimeout(this.timer)
        this.timerRefresh()
      },
      timerRefresh(){
        this.timer = setTimeout( () => {
          this.getTableData()
          this.timerRefresh()
        },30000)
      }
    }
  }
</script>

<style scoped lang="less">



  .item{
    margin-right: 40px;
    .name{
      color: @primaryColor;
    }
    .value{
      font-weight: bold;
    }

  }

</style>
