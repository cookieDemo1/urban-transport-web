<template>
  <card-container>
    <card-item>
      <card-title>实例端口配置</card-title>
      <a-row type="flex" justify="space-between" style="margin-bottom: 20px">
        <a-button type="primary" :loading="settingButton" @click="handleSetting">设置</a-button>
        <m-select v-model="msti" style="width: 80px" @change="handleSelectChange">
          <a-select-option v-for="(item,index) in mstiOptions" :key="index" :value="item.value">
            {{item.name}}
          </a-select-option>
        </m-select>
      </a-row>
      <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getMstpInstPort">
        <div slot="State" slot-scope="{text,record}" class="status" :class="text==='Forwarding'?'success':'error'">
          {{text}}
        </div>
        <div slot="Priority" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-input-number class="input" size="small" v-model="firstRowValue.Priority" :min="0" :max="240" @change="handleInputChange('Priority',firstRowValue.Priority)"></m-input-number>
          </template>
          <template v-else>
            <m-input-number class="input" size="small" v-model="record.Priority" :min="0" :max="240"></m-input-number>
          </template>
        </div>
        <div slot="AdminPathCost" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-input-number class="input" size="small" v-model="firstRowValue.AdminPathCost" @change="handleInputChange('AdminPathCost',firstRowValue.AdminPathCost)" :min="0" :max="200000000"></m-input-number>
          </template>
          <template v-else>
            <m-input-number class="input" size="small" v-model="record.AdminPathCost" :min="0" :max="200000000"></m-input-number>
          </template>
        </div>
      </m-table>
    </card-item>
  </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'instance-port-setting',
    data(){
      return {
        settingButton: false,
        msti: 0,
        mstiOptions: Array(64).fill(0).map((item,index) => ({name:index, value: index})),

        columns: [
          {dataIndex: 'Name', title: '端口', align: 'center'},
          {dataIndex: 'Role', title: '角色', align: 'center'},
          {dataIndex: 'State', title: '状态', align: 'center', scopedSlots: { customRender: 'State' },},
          {dataIndex: 'Priority', title: '优先级', align: 'center', scopedSlots: { customRender: 'Priority' },},
          {dataIndex: 'AdminPathCost', title: '配置花销', align: 'center', scopedSlots: { customRender: 'AdminPathCost' },},
          {dataIndex: 'PathCost', title: '花销', align: 'center'},
          {dataIndex: 'EdgePort', title: 'Edge', align: 'center'},
          {dataIndex: 'P2PMAC', title: 'P2P', align: 'center'},
          {dataIndex: 'UpTime', title: 'UpTime', align: 'center'},
        ],
        firstRowValue: {},
        list: [],
      }
    },
    computed:{
      ...mapState('network',['loading','mstpInstPort',]),
    },
    watch: {
      mstpInstPort(newValue){
        if (newValue){
          const {content=[]} = newValue
          this.firstRowValue = {"Priority":"*", "AdminPathCost":"*",}
          this.list = [
            {"Name":"*", "Role":"", "State":"", "Priority":"*", "AdminPathCost":"*", "PathCost":"", "EdgePort":"", "P2PMAC":"", "UpTime":"", key: '*'}
          ].concat(content.map((item,index) => ({...item,key:index})))

          content.map((item,index) => ({...item,key:index}))
        }
      }
    },
    created(){
      this.getTableData()
    },
    methods: {
      ...mapActions('network',['getMstpInstPort','setMstpInstPort']),
      getTableData(){
        const params = {msti: this.msti}
        this.getMstpInstPort(params)
      },
      handleSelectChange(){
        this.getTableData()
      },
      handleInputChange(key,value){
        if (typeof value !== 'number'){
          return;
        }
        this.list.forEach((item,index) => {
          if (index !== 0){
            item[key] = value
          }
        })
      },
      handleSetting(){
        this.settingButton = true
        const params = {
          mstp_inst_port_config: {
            msti: this.msti,
            content:this.list.map((item) => {
              const {Name, Priority, AdminPathCost} = item
              return {Name, Priority, AdminPathCost}
            }).slice(1)
          }
        }
        this.setMstpInstPort(params).then((res) => {
          this.settingButton = false
          if (res.code === 200){
            this.getTableData()
          }
        }).catch(() => {
          this.settingButton = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .status{
    &.success{
      color: @successColor;
    }
    &.error{
      color: @dangerColor;
    }
  }

  .input{
    width: 80px!important;
  }


</style>
