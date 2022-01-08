<template>
    <card-container>
      <card-item>
        <card-title>端口配置</card-title>
        <a-button type="primary" style="margin-bottom: 20px" :loading="settingButton" @click="handleSetting">设置</a-button>
        <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getMstpPort">
          <div slot="Name" slot-scope="{text,record}">
            <template v-if="text === '*'">*</template>
            <template v-else>
             {{text}}
            </template>
          </div>
          <div slot="Enable" slot-scope="{text,record}">
             <template v-if="text === '*'">
              <m-select size="small" class="select" v-model="firstRowValue.Enable" @change="handleSelectChange('Enable',firstRowValue.Enable)">
                <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-checkbox v-model="record.Enable"></m-checkbox>
            </template>
          </div>
          <div slot="AdminEdgePort" slot-scope="{text,record}">
            <template v-if="text === '*'">
              <m-select size="small" class="select" v-model="firstRowValue.AdminEdgePort" @change="handleSelectChange('AdminEdgePort',firstRowValue.AdminEdgePort)">
                <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-checkbox v-model="record.AdminEdgePort"></m-checkbox>
            </template>
          </div>
          <div slot="AdminAutoEdgePort" slot-scope="{text,record}">
            <template v-if="text === '*'">
              <m-select size="small" class="select" v-model="firstRowValue.AdminAutoEdgePort" @change="handleSelectChange('AdminAutoEdgePort',firstRowValue.AdminAutoEdgePort)">
                <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-checkbox v-model="record.AdminAutoEdgePort"></m-checkbox>
            </template>
          </div>
          <div slot="RestrictedRole" slot-scope="{text,record}">
            <template v-if="text === '*'">
              <m-select size="small" class="select" v-model="firstRowValue.RestrictedRole" @change="handleSelectChange('RestrictedRole',firstRowValue.RestrictedRole)">
                <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-checkbox v-model="record.RestrictedRole"></m-checkbox>
            </template>
          </div>
          <div slot="RestrictedTcn" slot-scope="{text,record}">
            <template v-if="text === '*'">
              <m-select size="small" class="select" v-model="firstRowValue.RestrictedTcn" @change="handleSelectChange('RestrictedTcn',firstRowValue.RestrictedTcn)">
                <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-checkbox v-model="record.RestrictedTcn"></m-checkbox>
            </template>
          </div>
          <div slot="BpduGuard" slot-scope="{text,record}">
            <template v-if="text === '*'">
              <m-select size="small" class="select" v-model="firstRowValue.BpduGuard" @change="handleSelectChange('BpduGuard',firstRowValue.BpduGuard)">
                <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-checkbox v-model="record.BpduGuard"></m-checkbox>
            </template>
          </div>
          <div slot="AdminPTPMAC" slot-scope="{text,record}">
            <template v-if="text === '*'">
              <m-select size="small" class="p2p-select" v-model="firstRowValue.AdminPTPMAC" @change="handleSelectChange('AdminPTPMAC',firstRowValue.AdminPTPMAC)">
                <a-select-option v-for="(item,index) in ptpOptions" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-select size="small" class="p2p-select" v-model="record.AdminPTPMAC">
                <a-select-option v-for="(item,index) in ptpOptions.slice(1)" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
          </div>
          <div slot="LoopDetect" slot-scope="{text,record}">
            <template v-if="text === '*'">
              <m-select size="small" class="select" v-model="firstRowValue.LoopDetect" @change="handleSelectChange('LoopDetect',firstRowValue.LoopDetect)">
                <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </template>
            <template v-else>
              <m-checkbox v-model="record.LoopDetect"></m-checkbox>
            </template>
          </div>
        </m-table>
      </card-item>
    </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'port-setting',
    data(){
      return {
        settingButton: false,
        columns: [
          {dataIndex: 'Name', title: '名称', align: 'center', scopedSlots: { customRender: 'Name' },},
          {dataIndex: 'Enable', title: '启用', align: 'center', scopedSlots: { customRender: 'Enable' },},
          {dataIndex: 'AdminEdgePort', title: 'AdminEdge', align: 'center', scopedSlots: { customRender: 'AdminEdgePort' },},
          {dataIndex: 'AdminAutoEdgePort', title: 'AutoEdge', align: 'center', scopedSlots: { customRender: 'AdminAutoEdgePort' },},
          {dataIndex: 'RestrictedRole', title: 'restrictedRole', align: 'center', scopedSlots: { customRender: 'RestrictedRole' },},
          {dataIndex: 'RestrictedTcn', title: 'restrictedTcn', align: 'center', scopedSlots: { customRender: 'RestrictedTcn' },},
          {dataIndex: 'BpduGuard', title: 'BPDU Guard', align: 'center', scopedSlots: { customRender: 'BpduGuard' },},
          {dataIndex: 'AdminPTPMAC', title: 'Point-to-Point', align: 'center', scopedSlots: { customRender: 'AdminPTPMAC' },},
          {dataIndex: 'LoopDetect', title: '环路检测', align: 'center', scopedSlots: { customRender: 'LoopDetect' },},
        ],
        firstRowValue: {},
        list: [],
        options: [
          {name:"*",value:"*"},
          {name:"Enable",value:"1"},
          {name:"Disable",value:"2"},
        ],
        ptpOptions: [
          {name:"*",value: "*"},
          {name:"Auto",value: 0},
          {name:"Force True",value: 1},
          {name:"Force False",value: 2},
        ],
      }
    },
    computed:{
      ...mapState('network',['loading','mstpPort',]),
    },
    watch: {
      mstpPort(newValue){
        if (newValue){
          const { content=[] } = newValue
          this.firstRowValue = {"Name":"*", "Enable":"*", "AdminEdgePort":"*", "AdminAutoEdgePort":"*", "RestrictedRole":"*", "RestrictedTcn":"*", "BpduGuard":"*", "AdminPTPMAC": "*", "LoopDetect":"*",},
          this.list = [
            {"Name":"*", "Enable":"*", "AdminEdgePort":"*", "AdminAutoEdgePort":"*", "RestrictedRole":"*", "RestrictedTcn":"*", "BpduGuard":"*", "AdminPTPMAC":"*", "LoopDetect":"*", key: '*'}
          ].concat(content.map((item,index) => ({...item,key:index})))
        }
      },
    },
    created(){
      this.getMstpPort()
    },
    methods: {
      ...mapActions('network',['getMstpPort','setMstpPort']),
      handleSelectChange(key,value){
        if (value === "*"){
          return;
        }
        let checked = value === '1'
        if (key === 'AdminPTPMAC'){
          checked = value
        }
        this.list.forEach((item,index) => {
          if (index !== 0){
            item[key] = checked
          }
        })
      },
      handleSetting(){
        this.settingButton = true
        const params = {
          mstp_port_config: {
            content: this.list.map((item) => {
              const {key,...rest} = item
              return {...rest}
            }).slice(1)
          }
        }
        this.setMstpPort(params).then((res) => {
          this.settingButton = false
          if (res.code === 200){
            this.getMstpPort()
          }
        }).catch(() => {
          this.settingButton = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .select{
    width: 80px;
  }

  .p2p-select{
    width: 120px;
  }
</style>
