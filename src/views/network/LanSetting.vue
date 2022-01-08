<template>
  <full-container>
      <card-container>
        <m-spin :spinning="loading.getLan">
          <card-item>
            <card-title>LAN配置</card-title>
            <m-form ref="form" :model="form" :rules="rules" >
              <a-form-model-item class="form-item" label="网络地址" prop="IP">
                <a-input v-model="form.IP" allowClear autocomplete="off">
                </a-input>
              </a-form-model-item>
              <a-form-model-item class="form-item" label="子网掩码" prop="NM">
                <a-input v-model="form.NM" allowClear autocomplete="off">
                </a-input>
              </a-form-model-item>
              <a-form-model-item class="form-item">
                <a-button class="save-button" type="primary" :loading="okButton" @click="handleOk">配置</a-button>
              </a-form-model-item>
            </m-form>
          </card-item>
          <card-item>
            <card-title>添加地址</card-title>
            <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false">
          <span slot="action" slot-scope="{text,record}">
            <a-button class="text-button text-danger-button" type="link" size="small" @click="handleDelete(record)">删除</a-button>
          </span>
            </m-table>
            <a-button type="primary" style="margin-top: 20px" @click="handleAdd">添加</a-button>
          </card-item>
        </m-spin>
      </card-container>
    <modal-lan-add v-model="showAdd"></modal-lan-add>
    <modal-lan-delete v-model="showDelete" :item="item"></modal-lan-delete>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalLanAdd from '@/components/ModalComponent/ModalLanAdd'
  import ModalLanDelete from '@/components/ModalComponent/ModalLanDelete'
  import {checkIP} from "@/utils";
  export default {
    name: 'lan-setting',
    components: {ModalLanAdd,ModalLanDelete},
    data(){
      return {
        okButton: false,
        form: {
          "IP": "",
          "NM": "",
        },
        rules: {
          IP: [
            { required: true, message: '网络地址不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
          NM: [
            { required: true, message: '子网掩码不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
        },
        columns: [
          {dataIndex: 'IP', title: '网络地址', align: 'center'},
          {dataIndex: 'NM', title: '子网掩码', align: 'center'},
          {dataIndex: 'action', title: '操作', align: 'center', scopedSlots: { customRender: 'action' },},
        ],
        list: [],

        showAdd: false,
        showDelete: false,
        item: null,
      }
    },
    computed:{
      ...mapState('network',['loading','lan']),
    },
    watch:{
      lan(newValue){
        if (newValue){
          const item = newValue.find(item => {
            const {Type} = item
            return  Type === 'Primary'
          })
          this.form = {...item}
          this.list = newValue.filter(item => {
            const {Type} = item
            return Type !== 'Primary'
          }).map((item,index) => ({...item,key:index}))
        }
      }
    },
    created(){
      this.getLan()
    },
    methods: {
      ...mapActions('network',['getLan', 'addLan']),
      handleAdd(){
        this.showAdd = true
      },
      handleDelete(record){
        this.showDelete = true
        this.item = record
      },
      handleOk(){
        this.okButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          const {IP, NM} = this.form
          let params = {
              "id":"1",
              "jsonrpc":"2.0",
              "method":"SetPrimaryLanConf",
              "params":[{
                IP, NM
              }]
          }
          this.addLan(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.getLan()
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


</style>
