<template>
  <m-modal v-model="visible" title="添加DNS地址" :width="815"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form class="form" ref="mForm" :model="form" :rules="rules" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-form-model-item class="form-item" label="Vlan ID" prop="vid" help="用逗号隔开，用'-'表示范围。如： 2,4-7,9,10-15">
          <a-input v-model="form.vid" allowClear autocomplete="off" style="width: 300px"></a-input>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="模式" prop="mode">
          <m-radio-group v-model="form.mode">
            <a-radio class="radio" :value="0">Tag</a-radio>
            <a-radio class="radio" :value="1">Untag</a-radio>
          </m-radio-group>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="端口" prop="ports">
          <m-checkbox v-model="all" style="margin-right: 8px">全部</m-checkbox>
          <m-checkbox v-for="(item,index) in form.ports" :key="index" v-model="item.value">{{item.name}}</m-checkbox>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'modal-vlan-add',
    props: {
      value: Boolean,
    },
    data(){
      return {
        okButton: false,
        labelCol: { span: 3 },
        wrapperCol: { span: 21},
        form:{
          vid: '',
          mode: 0,
          ports: [],
        },
        rules: {
          vid: [
            { required: true, message: 'Vlan ID不能为空', trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      ...mapState('business',['pvlanConfig']),
      visible: {
        get() {
          return this.value
        },
        set (value) {
          this.$emit('input',value)
        }
      },
      all: {
        get() {
          return this.form.ports.every(item => item.value)
        },
        set (value) {
          this.form.ports = this.form.ports.map(item => {
            item.value = value
            return item
          })
        }
      }
    },
    watch: {
      visible(newValue){
        newValue && this.reset()
      },
    },
    methods: {
      ...mapActions('business',['addVlanConfig']),
      reset(){
        this.okButton = false
        const { content=[] } = this.pvlanConfig
        this.form= {
          vid: '',
          mode: 0,
          ports: content.map((item) => {
            const {Name} = item
            return {name: Name, value: false}
          })
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          const { vid, mode, ports } = this.form
          const portsDesc = ports.reduce((res,item,index) => {
            if (item.value){
              res += item.name+' '
            }
            return res
          },'')
          const Tag = mode===0?portsDesc:''
          const Untag = mode===1?portsDesc:''
          let params ={
            vlan_8021q_config: {
              add: 1,
              vid, Tag, Untag
            }
          }
          this.addVlanConfig(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.$emit('callback')
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
