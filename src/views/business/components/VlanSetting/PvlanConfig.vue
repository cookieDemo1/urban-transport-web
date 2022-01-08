<template>
  <card-container>
    <card-item>
      <card-title>端口配置</card-title>
      <a-button type="primary" style="margin-bottom: 20px" :loading="settingButton" @click="handleSetting">设置</a-button>
      <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getPortGet">
        <div slot="Name" slot-scope="{text,record}">
          <template v-if="text === '*'">*</template>
          <template v-else>
            {{text}}
          </template>
        </div>
        <div slot="vid" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-input-number class="input" size="small" v-model="firstRowValue.vid" :min="1" :max="4094" @change="handleInputChange('vid',firstRowValue.vid)"></m-input-number>
          </template>
          <template v-else>
            <m-input-number class="input" size="small" v-model="record.vid" :min="1" :max="4094"></m-input-number>
          </template>
        </div>
        <div slot="discard" slot-scope="{text,record}">
          <template v-if="text === '*'">
            <m-select size="small" class="select" v-model="firstRowValue.discard" @change="handleSelectChange('discard',firstRowValue.discard)">
              <a-select-option v-for="(item,index) in discardOptions" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
          </template>
          <template v-else>
            <m-select size="small" class="select" v-model="record.discard">
              <a-select-option v-for="(item,index) in discardOptions.slice(1)" :key="index" :value="item.value">
                {{ item.name }}
              </a-select-option>
            </m-select>
          </template>
        </div>
      </m-table>
    </card-item>
  </card-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'pvlan-config',
    data(){
      return {
        settingButton: false,
        columns: [
          {dataIndex: 'Name', title: '端口', align: 'center', scopedSlots: { customRender: 'Name' },},
          {dataIndex: 'vid', title: 'Pvlan', align: 'center', scopedSlots: { customRender: 'vid' },},
          {dataIndex: 'discard', title: '入口丢弃', align: 'center', scopedSlots: { customRender: 'discard' },},
        ],
        firstRowValue: {},
        list: [],
        discardOptions: [
          {name:"*",value: "*"},
          {name:"None",value: 0},
          {name:"All",value: 1},
          {name:"Untag",value: 2},
          {name:"Tag",value: 3},
        ],
      }
    },
    computed:{
      ...mapState('business',['loading','pvlanConfig']),
    },
    watch: {
      pvlanConfig(newValue){
        if (newValue){
          const { content=[] } = newValue
          this.firstRowValue = {"Name":"*", "vid": "*", "discard":"*"},
            this.list = [
              {"Name":"*", "vid":"*", "discard":"*", key: "*"}
            ].concat(content.map((item,index) => ({...item,key:index})))
        }
      },
    },
    created(){
      this.getPvlanConfig()
    },
    methods: {
      ...mapActions('business',['getPvlanConfig','setPvlanConfig']),
      handleSelectChange(key,value){
        if (value === '*'){
          return;
        }
        let checked = value
        this.list.forEach((item,index) => {
          if (index !== 0){
            item[key] = checked
          }
        })
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
          pvlan_config: {
            content: this.list.map((item) => {
              const {key,...rest} = item
              return {...rest}
            }).slice(1)
          }
        }
        this.setPvlanConfig(params).then((res) => {
          this.settingButton = false
          if (res.code === 200){
            this.getPvlanConfig()
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

</style>
