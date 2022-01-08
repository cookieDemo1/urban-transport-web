<template>
  <full-container>
    <card-container>
      <m-spin :spinning="loading.getMstp">
        <card-item>
          <card-title>环网基本配置</card-title>
          <m-form ref="form" :model="form" :rules="rules">
            <a-form-model-item class="form-item" label="优先级" prop="Priority">
              <m-input-number v-model="form.Priority" :min="0" :max="61440"></m-input-number>
              <div class="form-item-extra">范围：0~61440，默认：32768</div>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="轮询间隔时间" prop="Interval">
              <m-input-number v-model="form.Interval" :min="1" :max="10">
              </m-input-number>
              <div class="form-item-extra">范围：1~10，默认：2秒</div>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="转发延迟时间" prop="ForwardDelay">
              <m-input-number v-model="form.ForwardDelay" :min="4" :max="30">
              </m-input-number>
              <div class="form-item-extra">范围：4~30，默认：15秒</div>
            </a-form-model-item>
            <a-form-model-item class="form-item" label="地址生存时间" prop="MaxAge">
              <m-input-number v-model="form.MaxAge" :min="6" :max="40">
              </m-input-number>
              <div class="form-item-extra">范围：6~40，默认：20秒</div>
            </a-form-model-item>
          </m-form>

        </card-item>
        <card-item>
          <card-title>环网配置列表</card-title>
          <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false">
            <div slot="PathCost" slot-scope="{text,record}">
              <m-input-number class="input" size="small" v-model="record.PathCost" :min="0" :max="200000000"></m-input-number>
            </div>
            <div slot="Priority" slot-scope="{text,record}">
              <m-input-number class="input" size="small" v-model="record.Priority" :min="0" :max="240"></m-input-number>
            </div>
            <div slot="P2pMode" slot-scope="{text,record}">
              <m-select size="small" class="p2p-select" v-model="record.P2pMode">
                <a-select-option v-for="(item,index) in ptpOptions" :key="index" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </m-select>
            </div>
            <div slot="Edged" slot-scope="{text,record}">
              <m-checkbox v-model="record.Edged"></m-checkbox>
            </div>
            <div slot="Enable" slot-scope="{text,record}">
              <m-checkbox v-model="record.Enable"></m-checkbox>
            </div>
          </m-table>
          <a-button type="primary" style="margin-top: 20px" :loading="okButton" @click="handleOk">保存</a-button>
        </card-item>
      </m-spin>
    </card-container>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'loop-setting',
    data(){
      return {
        okButton: false,
        form: {
          Priority: 32768,
          Interval: 2,
          ForwardDelay: 15,
          MaxAge: 20,
        },
        rules: {
          Priority: [
            { required: true, message: '优先级不能为空', trigger: 'blur'},
          ],
          Interval: [
            { required: true, message: '轮询间隔时间不能为空', trigger: 'blur'},
          ],
          ForwardDelay: [
            { required: true, message: 'Forward delay不能为空', trigger: 'blur'},
          ],
          MaxAge: [
            { required: true, message: 'Max age不能为空', trigger: 'blur'},
          ],
        },
        columns: [
          {dataIndex: 'Index', title: '端口号', align: 'center'},
          {dataIndex: 'PathCost', title: '端口路径开销', align: 'center', scopedSlots: { customRender: 'PathCost' },},
          {dataIndex: 'Priority', title: '端口优先级', align: 'center', scopedSlots: { customRender: 'Priority' },},
          {dataIndex: 'P2pMode', title: '点到点网络连接', align: 'center', scopedSlots: { customRender: 'P2pMode' },},
          {dataIndex: 'Edged', title: '直接连接终端', align: 'center', scopedSlots: { customRender: 'Edged' },},
          {dataIndex: 'Enable', title: '参与生成树结构', align: 'center', scopedSlots: { customRender: 'Enable' },},
        ],
        list: [],
        ptpOptions: [
          {name:"Auto",value: "auto"},
          {name:"Force True",value: "ForceTrue"},
          {name:"Force False",value: "ForceFalse"},
        ],
      }
    },
    computed: {
      ...mapState('network',['loading','mstp']),
    },
    watch: {
      mstp(newValue){
        if (newValue){
          const { Basic, Port } = newValue
          this.form = {...Basic}
          this.list = Port.map((item,index) => ({...item,key: index}))
        }
      },
    },
    created(){
      this.getMstp()
    },
    methods: {
      ...mapActions('network',['getMstp', 'setMstp']),
      handleOk(){
        this.okButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          let params = {
            "id": "1",
            "jsonrpc": "2.0",
            "method": "SetStpConf",
            "params": [{
              "Basic": {
                ...this.form
              },
              "Port": this.list.map((item) => {
                const {key, ...rest} = item
                return {...rest}
              }),
            }]
          }
          this.setMstp(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.getMstp()
            }
          }).catch(() => {
            this.okButton = false
          })
        });
      }
    }
  }
</script>

<style scoped lang="less">

  .input{
    width: 80px!important;
  }

</style>
