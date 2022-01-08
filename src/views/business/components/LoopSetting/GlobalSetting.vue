<template>
  <m-spin :spinning="loading.getMstp || loading.getMstpCist">
    <card-container>
      <card-item>
        <card-title>全局配置</card-title>
        <m-form ref="mForm" :model="form" :rules="rules">
          <a-form-model-item class="form-item" label="模式" prop="Mode">
            <m-radio-group v-model="form.Mode">
              <a-radio class="radio" :value="1">stp</a-radio>
              <a-radio class="radio" :value="2">rstp</a-radio>
              <a-radio class="radio" :value="3">mstp</a-radio>
            </m-radio-group>
          </a-form-model-item>
          <a-form-model-item class="form-item" label="优先级" prop="Priority">
            <m-input-number v-model="form.Priority" :min="0" :max="61440"></m-input-number>
            <div class="form-item-extra">范围：0~61440，默认：32768</div>
          </a-form-model-item>
          <a-form-model-item class="form-item" label="Max age" prop="MaxAge">
            <m-input-number v-model="form.MaxAge" :min="6" :max="40">
            </m-input-number>
            <div class="form-item-extra">范围：6~40，默认：20秒</div>
          </a-form-model-item>
          <a-form-model-item class="form-item" label="Hello time" prop="HelloTime">
            <m-input-number v-model="form.HelloTime" :min="1" :max="10">
            </m-input-number>
            <div class="form-item-extra">范围：1~10，默认：2秒</div>
          </a-form-model-item>
          <a-form-model-item class="form-item" label="Forward delay" prop="ForwardDelay">
            <m-input-number v-model="form.ForwardDelay" :min="4" :max="30">
            </m-input-number>
            <div class="form-item-extra">范围：4~30，默认：15秒</div>
          </a-form-model-item>
          <a-form-model-item class="form-item" label="Max hop" prop="MaxHops">
            <m-input-number v-model="form.MaxHops" :min="1" :max="40">
            </m-input-number>
            <div class="form-item-extra">范围：1~40，默认：20秒</div>
          </a-form-model-item>
          <a-form-model-item class="form-item" label="Revison" prop="Revison">
            <m-input-number v-model="form.Revison" :min="0" :max="65535">
            </m-input-number>
            <div class="form-item-extra">范围：0~65535</div>
          </a-form-model-item>
          <a-form-model-item class="form-item" label="Name" prop="Name">
            <a-input v-model="form.Name" allowClear autocomplete="off">
            </a-input>
          </a-form-model-item>

          <a-form-model-item class="form-item">
            <a-button class="save-button" type="primary" :loading="saveButton" @click="handleSave">保存</a-button>
          </a-form-model-item>
        </m-form>
      </card-item>

      <card-item>
        <card-title>CIST状态</card-title>
        <a-row :gutter="[16,16]">
          <a-col :span="8" v-for="(item,index) in list" :key="index">
            <a-row class="info-item" :gutter="[10,0]" >
              <a-col class="name" :span="13">{{item.name}}：</a-col>
              <a-col class="value" :span="11">{{item.value}}</a-col>
            </a-row>
          </a-col>
        </a-row>
      </card-item>
    </card-container>
  </m-spin>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {checkIPMask} from "@/utils";
  export default {
    name: 'global-setting',
    data(){
      return {
        saveButton: false,
        form: {
          Mode: 0,
          Priority: 32768,
          MaxAge: 20,
          HelloTime: 2,
          ForwardDelay: 15,
          MaxHops: 20,
          Revison: 0,
          Name: "",
        },
        rules: {
          Priority: [
            { required: true, message: '优先级不能为空', trigger: 'blur'},
          ],
          MaxAge: [
            { required: true, message: 'Max age不能为空', trigger: 'blur'},
          ],
          HelloTime: [
            { required: true, message: 'Hello time不能为空', trigger: 'blur'},
          ],
          ForwardDelay: [
            { required: true, message: 'Forward delay不能为空', trigger: 'blur'},
          ],
          MaxHops: [
            { required: true, message: 'Max hop不能为空', trigger: 'blur'},
          ],
          Revison: [
            { required: true, message: 'Revison不能为空', trigger: 'blur'},
          ],
          Name: [
            { required: true, message: 'Name不能为空', trigger: 'blur'},
          ],
        },
        list: [
          {name: 'Bridge id', key:"BridgeId", value: '-'},
          {name: 'Max hops', key:"MaxHops", value: '-'},
          {name: 'TIMEsince topo change(s)', key:"TSTC", value: '-'},
          {name: 'Designated root', key:"DesignatedRoot", value: '-'},
          {name: 'Root port', key:"RootPort", value: '-'},
          {name: 'Topo change count', key:"TCC", value: '-'},
          {name: 'Regional root', key:"RegionalRoot", value: '-'},
          {name: 'Inter path cost', key:"InternalPathCost", value: '-'},
        ]
      }
    },
    computed:{
      ...mapState('network',['loading','mstp','mstpCist',]),
    },
    watch:{
      mstp(newValue){
        if (newValue){
          this.form = {...newValue}
        }
      },
      mstpCist(newValue){
        if (newValue){
          this.list = this.list.map(item => ({...item,value: newValue[item.key]}))
        }
      }
    },
    created(){
      this.getMstp()
      this.getMstpCist()
    },
    methods: {
      ...mapActions('network',['getMstp','setMstp','getMstpCist',]),
      handleSave(){
        this.saveButton = true
        this.$refs.mForm.$refs.form.validate((valid,values) => {
          if (!valid) {
            this.saveButton = false
            return
          }
          const params = {
            mstp_config: {
              ...this.form
            }
          }
          this.setMstp(params).then((res) => {
            this.saveButton = false
            if (res.code === 200){
              this.getMstp()
            }
          }).catch(() => {
            this.saveButton = false
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">


  .info-item{
    .name{
      /*width: 70px;*/
      /*margin-right: 26px;*/
      text-align: right;
      color: @primaryColor;
    }

    .value{
      .text-hidden();
    }
  }




</style>
