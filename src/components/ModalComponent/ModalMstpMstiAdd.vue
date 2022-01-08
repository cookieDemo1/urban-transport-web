<template>
  <m-modal v-model="visible" title="添加MSTP instance" :width="450"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form class="form" ref="mForm" :model="form" :rules="rules">
        <a-form-model-item class="form-item" label="MSTI ID" prop="Msti">
          <m-select v-model="form.Msti">
            <a-select-option v-for="(item,index) in options" :key="index" :value="item.value">
              {{item.name}}
            </a-select-option>
          </m-select>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="优先级" prop="Priority" help="Defauit is 32768">
          <m-input-number v-model="form.Priority" :min="0" :max="61440"></m-input-number>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="Vlan Mapped" prop="VlanRange" help="用逗号隔开, 用＂-＂表示范围, 如：2,4-7,9,10-15">
          <a-input v-model="form.VlanRange" allowClear autocomplete="off"></a-input>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'
  import {checkIPMask} from "@/utils";

  export default {
    name: 'modal-mstp-msti-add',
    props: {
      value: Boolean,
    },
    data(){
      return {
        okButton: false,
        //todo
        options: Array(64).fill(0).map((item,index) => ({name:index, value: index})),
        form:{
          Msti: 0,
          Priority: 32768,
          VlanRange: ""
        },
        rules: {
          Priority: [
            { required: true, message: '优先级不能为空', trigger: 'blur'},
          ],
          VlanRange: [
            { required: true, message: 'Vlan Mapped不能为空', trigger: 'blur'},
            { validator: checkIPMask, trigger: 'blur'},
          ],
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
      ...mapActions('network',['getMstpMsti','setMstpMsti']),
      reset(){
        this.okButton = false
        this.form= {
          Msti: 1,
          Priority: 32768,
          VlanRange: ""
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          let params = {
            mstp_msti_config: {
                ...this.form
            }
          }
          this.setMstpMsti(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.getMstpMsti()
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
