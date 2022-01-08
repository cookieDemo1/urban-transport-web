<template>
  <card-container>
    <card-item>
      <card-title>端口配置</card-title>
      <a-row type="flex" justify="space-between" style="margin-bottom: 20px">
        <a-col>
          <a-button type="primary" :loading="settingButton" @click="handleSetting">设置</a-button>
        </a-col>
        <a-col>
          <icon-button @click="getTableData"></icon-button>
        </a-col>
      </a-row>
      <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getPortGet">
        <div slot="Name" slot-scope="{text,record}">
          <template v-if="text === '*'">*</template>
          <template v-else>
            {{text}}
          </template>
        </div>
        <div slot="link" slot-scope="{text,record}">
          <template v-if="text === '*'"></template>
          <template v-else>
            <div class="link" :class="text===1?'success':'error'">
              {{text===1?'Up':'Down'}}
            </div>
          </template>
        </div>
        <div slot="media" slot-scope="{text,record}">
          <template v-if="text === '*'"></template>
          <template v-else>
            {{text===1?'Copper':(text===2?'Fiber':'COMBO')}}
          </template>
        </div>
        <div slot="autoneg" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-select size="small" class="select" v-model="firstRowValue.autoneg" @change="handleSelectChange('autoneg',firstRowValue.autoneg)">
              <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
          </template>
          <template v-else>
            <m-checkbox v-model="record.autoneg" :disabled="disabledRows.includes(record.media)"></m-checkbox>
          </template>
        </div>
        <div slot="speed_conf" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-select size="small" class="select" v-model="firstRowValue.speed_conf" @change="handleSelectChange('speed_conf',firstRowValue.speed_conf)">
              <a-select-option v-for="(item,index) in lanSpeedOptions" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
          </template>
          <template v-else>
            <m-select v-if="disabledRows.includes(record.media)" size="small" class="select" v-model="record.speed_conf" :disabled="disabledRows.includes(record.media)">
              <a-select-option v-for="(item,index) in speedOptions.slice(1)" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
            <m-select v-else size="small" class="select" v-model="record.speed_conf" :disabled="disabledRows.includes(record.media)">
              <a-select-option v-for="(item,index) in lanSpeedOptions.slice(1)" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
          </template>
        </div>
        <div slot="speed" slot-scope="{text,record}">
          <template v-if="text === '*'"></template>
          <template v-else-if="disabledRows.includes(record.media)">
            1G (Full)
          </template>
          <template v-else>
            {{getSpeedDesc(text)}}
          </template>
        </div>
        <div slot="flow" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-select size="small" class="select" v-model="firstRowValue.flow" @change="handleSelectChange('flow',firstRowValue.flow)">
              <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
          </template>
          <template v-else>
            <m-checkbox v-model="record.flow" :disabled="disabledRows.includes(record.media)"></m-checkbox>
          </template>
        </div>
        <div slot="jumbo" slot-scope="{text,record}">
          <template v-if="text === '*'">
            *
          </template>
          <template v-else>
            <m-input-number class="input" size="small" v-model="record.jumbo" :min="60" :max="16356" :disabled="true"></m-input-number>
          </template>
        </div>
        <div slot="enable" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-select size="small" class="select" v-model="firstRowValue.enable" @change="handleSelectChange('enable',firstRowValue.enable)">
              <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
          </template>
          <template v-else>
            <m-checkbox v-model="record.enable"></m-checkbox>
          </template>
        </div>
      </m-table>
    </card-item>
  </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'port-get',
    data(){
      return {
        settingButton: false,
        columns: [
          {dataIndex: 'Name', title: '端口', align: 'center', scopedSlots: { customRender: 'Name' },},
          {dataIndex: 'link', title: '状态', align: 'center', scopedSlots: { customRender: 'link' },},
          {dataIndex: 'media', title: '介质', align: 'center', scopedSlots: { customRender: 'media' },},
          {dataIndex: 'autoneg', title: '自协商', align: 'center', scopedSlots: { customRender: 'autoneg' },},
          {dataIndex: 'speed_conf', title: '设置速率', align: 'center', scopedSlots: { customRender: 'speed_conf' },},
          {dataIndex: 'speed', title: '速率', align: 'center', scopedSlots: { customRender: 'speed' },},
          {dataIndex: 'flow', title: '流控', align: 'center', scopedSlots: { customRender: 'flow' },},
          {dataIndex: 'jumbo', title: '最大帧长', align: 'center', scopedSlots: { customRender: 'jumbo' },},
          {dataIndex: 'enable', title: '启用', align: 'center', scopedSlots: { customRender: 'enable' },},
        ],
        firstRowValue: {},
        list: [],
        options: [
          {name:"*",value:"*"},
          {name:"Enable",value:"1"},
          {name:"Disable",value:"2"},
        ],
        speedOptions: [
          {name:"*",value: "*"},
          {name:"10M",value: 10},
          {name:"100M",value: 100},
          {name:"1G",value: 1000},
        ],
        lanSpeedOptions: [
          {name:"*",value: "*"},
          {name:"10M",value: 10},
          {name:"100M",value: 100},
        ],
        speedDesc: [
          "10M (Half)", "10M (Half)", "100M (Half)", "1G (Half)", "10G (Half)", "40G (Half)",
          "","10M (Full)", "100M (Full)", "1G (Full)", "10G (Full)", "40G (Full)",
        ],
        disabledRows: [2]
      }
    },
    computed:{
      ...mapState('business',['loading','portGet']),
    },
    watch: {
      portGet(newValue){
        if (newValue){
          const { content=[] } = newValue
          this.firstRowValue = {"Name":"*", "link":"*", "media":"*", "autoneg":"*", "speed_conf":"*", "speed":"*", "flow":"*", "jumbo":"*", "enable":"*",},
            this.list = [
              {"Name":"*", "link":"*", "media":"*", "autoneg":"*", "speed_conf":"*", "speed":"*", "flow":"*", "jumbo":"*", "enable":"*", key: '*'}
            ].concat(content.map((item,index) => ({...item,key:index})))
        }
      },
    },
    created(){
      this.getTableData()
    },
    methods: {
      ...mapActions('business',['getPortGet','setPortGet']),
      getSpeedDesc(text){
        return this.speedDesc[text] || text
      },
      getTableData(){
        this.getPortGet()
      },
      handleSelectChange(key,value){
        if (value === '*'){
          return;
        }
        let checked = value === '1'
        if (key === 'speed_conf'){
          checked = value
        }
        let checkRow = key !== 'enable'
        this.list.forEach((item,index) => {
          if (index === 0){
            return
          }
          if (checkRow && this.disabledRows.includes(item.media)){
            return;
          }
          item[key] = checked
        })
      },
      handleInputChange(key,value){
        if (typeof value !== 'number'){
          return;
        }
        let checkRow = key !== 'enable'
        this.list.forEach((item,index) => {
          if (index === 0){
            return
          }
          if (checkRow && this.disabledRows.includes(item.media)){
            return;
          }
          item[key] = value
        })
      },
      handleSetting(){
        this.settingButton = true
        const params = {
          port_set: {
            content: this.list.map((item) => {
              const {key,...rest} = item
              return {...rest}
            }).slice(1)
          }
        }
        this.setPortGet(params).then((res) => {
          this.settingButton = false
          if (res.code === 200){
            this.getPortGet()
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

  .input{
    width: 80px!important;
  }

  .link{
    &.success{
      color: @successColor;
    }
    &.error{
      color: @dangerColor;
    }
  }

</style>
