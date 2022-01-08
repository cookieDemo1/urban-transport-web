<template>
  <m-modal v-model="visible" title="添加端口映射" :width="450"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form class="form" ref="form" :model="form" :rules="rules" >
        <a-form-model-item class="form-item" label="服务名称" prop="Service">
          <a-input v-model="form.Service" allowClear autocomplete="off"></a-input>
        </a-form-model-item>

        <a-form-model-item class="form-item form-item-port" label="外部端口" prop="DstPort">
          <a-form-model-item prop="DstPort1" class="port-item">
            <a-input v-model="form.DstPort1" allowClear autocomplete="off"></a-input>
          </a-form-model-item>
          <span class="port-line">-</span>
          <a-form-model-item prop="DstPort2" class="port-item">
            <a-input v-model="form.DstPort2" allowClear autocomplete="off"></a-input>
          </a-form-model-item>
        </a-form-model-item>
        <a-form-model-item class="form-item form-item-port" label="内部端口" prop="SrcPort">
          <a-form-model-item prop="SrcPort1" class="port-item">
            <a-input v-model="form.SrcPort1" allowClear autocomplete="off"></a-input>
          </a-form-model-item>
          <span class="port-line">-</span>
          <a-form-model-item prop="SrcPort2" class="port-item">
            <a-input v-model="form.SrcPort2" allowClear autocomplete="off"></a-input>
          </a-form-model-item>
        </a-form-model-item>

        <a-form-model-item class="form-item" label="内部服务器IP" prop="DstAddr">
          <a-input v-model="form.DstAddr" allowClear autocomplete="off"></a-input>
        </a-form-model-item>

        <a-form-model-item class="form-item" label="端口类型" prop="Protocol">
          <m-select v-model="form.Protocol">
            <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
              {{item.name}}
            </a-select-option>
          </m-select>
        </a-form-model-item>

        <a-form-model-item class="form-item" label="是否启用" prop="Enable">
          <m-switch size="small" v-model="form.Active"></m-switch>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {checkIP, checkPort} from "@/utils";
  export default {
    name: 'modal-nat-add',
    props: {
      value: Boolean,
    },
    data(){
      return {
        okButton: false,
        options: [
          {name: 'tcp', value: 'tcp'},
          {name: 'udp', value: 'udp'},
          {name: 'any', value: 'any'},
        ],
        rules: {
          Service: [
            {required: true, message: '服务名称不能为空', trigger: 'blur'},
          ],
          DstPort1: [
            {required: true, message: '外部端口1不能为空', trigger: 'blur'},
            {validator: checkPort, trigger: 'blur'},
          ],
          DstPort2: [
            {required: true, message: '外部端口2不能为空', trigger: 'blur'},
            {validator: checkPort, trigger: 'blur'},
          ],
          SrcPort1: [
            {required: true, message: '内部端口1不能为空', trigger: 'blur'},
            {validator: checkPort, trigger: 'blur'},
          ],
          SrcPort2: [
            {required: true, message: '内部端口2不能为空', trigger: 'blur'},
            {validator: checkPort, trigger: 'blur'},
          ],
          DstAddr: [
            {required: true, message: 'IP地址不能为空', trigger: 'blur'},
            {validator: checkIP, trigger: 'blur'},
          ],
        },
        form:{
          Service: "",
          DstPort1: "",
          DstPort2: "",
          SrcPort1: "",
          SrcPort2: "",
          DstAddr: "",
          Protocol: "tcp",
          Active: true,
        },
      }
    },
    computed: {
      visible: {
        get() {
          return this.value
        },
        set (value) {
          this.$emit('input',value)
        }
      },
    },
    watch: {
      visible(newValue){
        newValue && this.reset()
      },
    },
    methods: {
      ...mapActions('network',['getWan', 'getNat','addNat']),
      reset(){
        this.okButton = false
        this.form= {
          Service: "",
          DstPort1: "",
          DstPort2: "",
          SrcPort1: "",
          SrcPort2: "",
          DstAddr: "",
          Protocol: "tcp",
          Active: true,
        }
      },
      checkPortNum(){
        let {DstPort1, DstPort2, SrcPort1, SrcPort2} = this.form
        DstPort1 = parseInt(DstPort1), DstPort2 = parseInt(DstPort2), SrcPort1 = parseInt(SrcPort1), SrcPort2 = parseInt(SrcPort2)
        return (DstPort2 - DstPort1) ===  (SrcPort2 - SrcPort1)
      },
      handleOk(){
        this.okButton = true
        this.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          if (!this.checkPortNum()){
            this.$message.error('内外部端口数量不匹配')
            return
          }
          const {
            DstPort1,
            DstPort2,
            SrcPort1,
            SrcPort2,
            ...rest
          } = this.form

          let params = {
            "id": "1",
            "jsonrpc": "2.0",
            "method":"AddNatConf",
            "params": [{
              SrcPort: `${SrcPort1}-${SrcPort2}`,
              DstPort: `${DstPort1}-${DstPort2}`,
              ...rest
            }]
          }
          this.addNat(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.getNat()
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


  .form-item-port{
    margin-bottom: 0;

    .port-item{
      display: inline-block;
      width: calc(50% - 5px);
    }
    .port-line{
      display: inline-block;
      width: 10px;
      text-align: center;
    }
  }


</style>
