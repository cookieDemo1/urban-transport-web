<template>
  <m-modal v-model="visible" title="添加静态路由" :width="388"
           :confirmLoading="okButton" ok-text="保存" @ok="handleOk">
    <template slot="content">
      <m-modal-form class="form" ref="mForm" :model="form" :rules="rules">
        <a-form-model-item class="form-item" label="目的地址" prop="IpAddr">
          <a-input v-model="form.IpAddr" allowClear autocomplete="off"></a-input>
          <template slot="help">
            <div>例如：10.1.1.0/24 or 2000::3/64</div>
            <div>不填：代表默认网关（0.0.0.0/0）</div>
          </template>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="网关" prop="Gate" help="例如：20.1.1.3 or 2002::4">
          <a-input v-model="form.Gate" allowClear autocomplete="off"></a-input>
        </a-form-model-item>
        <a-form-model-item class="form-item" label="距离" prop="Distance" help="范围：1~255">
          <m-input-number v-model="form.Distance" :min="1" :max="255"></m-input-number>
        </a-form-model-item>
      </m-modal-form>
    </template>
  </m-modal>
</template>

<script>
  import {mapActions} from 'vuex'
  import {checkEmptyOrIPMask, checkIP} from "@/utils";

  export default {
    name: 'modal-route-add',
    props: {
      value: Boolean,
    },
    data(){
      return {
        okButton: false,
        form:{
          IpAddr: '',
          Gate: '',
          Distance: 1,
        },
        rules: {
          IpAddr: [
            { validator: checkEmptyOrIPMask, trigger: 'blur'},
          ],
          Gate: [
            { required: true, message: '网关不能为空', trigger: 'blur'},
            { validator: checkIP, trigger: 'blur'},
          ],
          Distance: [
            { required: true, message: '距离不能为空', trigger: 'blur'},
          ],
        }
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
      ...mapActions('network',['getRoute','addRoute']),
      reset(){
        this.okButton = false
        this.form= {
          IpAddr: '',
          Gate: '',
          Distance: 1,
        }
      },
      handleOk(){
        this.okButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.okButton = false
            return
          }
          const { IpAddr, Gate, Distance } = this.form
          let params = {
            static_route_config:
              {
                Add: true,
                IpAddr: IpAddr.length?IpAddr:'0.0.0.0/0',
                Gate,
                Distance,
              }
          }
          this.addRoute(params).then((res) => {
            this.okButton = false
            if (res.code === 200) {
              this.visible = false
              this.getRoute()
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
