<template>
  <full-container class="device-manage">
    <card-container>
      <card-item>
        <card-title>设备列表</card-title>
        <m-table tableLayout="fixed" :columns="columns" :data-source="list" :pagination="false" :loading="loading.getDevCfg">
          <span slot="model" slot-scope="{text,record}">
            {{getModelDesc(text)}}
          </span>
          <span slot="ip" slot-scope="{text,record}">
            {{text ==='0.0.0.0'?'':text}}
          </span>
          <span slot="action" slot-scope="{text,record}">
            <a-button class="text-button" type="link" size="small" @click="handleEdit(record)">修改</a-button>
          </span>
        </m-table>
      </card-item>
    </card-container>

    <modal-device-edit v-model="showEdit" :item="item"></modal-device-edit>
  </full-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import ModalDeviceEdit from '@/components/ModalComponent/ModalDeviceEdit'
  import {getModelDesc} from '@/utils'

  export default {
    name: 'device-manage',
    components: {ModalDeviceEdit},
    data(){
      return {
        columns: [
          {dataIndex: 'name', title: '设备类型', align: 'center'},
          {dataIndex: 'model', title: '品牌', align: 'center', scopedSlots: { customRender: 'model' },},
          {dataIndex: 'ip', title: '参数', align: 'center', scopedSlots: { customRender: 'ip' },},
          {dataIndex: 'action', title: '操作', align: 'center', scopedSlots: { customRender: 'action' },},
        ],
        list: [],

        showEdit: false,
        item: {},
      }
    },
    computed:{
      ...mapState('device',['loading','devCfg',]),
    },
    watch: {
      devCfg(newValue){
        if (newValue){
          let res = [
            {name: '主摄像头', icon: 'shext_icon', ipKey: 'CameraIp', ip: '0.0.0.0', modelKey: 'CameraModel', model: '', statusKey: 'CamRunStatus', status: 'none'},
            {name: '次摄像头', icon: 'shext_icon', ipKey: 'MiniCameraIp', ip: '0.0.0.0', modelKey: 'MiniCamRunModel', model: '', statusKey: 'MiniCamRunStatus', status: 'none'},
            {name: '显示屏', icon: 'xiansp_icon', ipKey: 'DisplayIp', ip: '0.0.0.0', modelKey: 'DisplayModel', model: '', statusKey: 'DisplayRunStatus', status: 'none'},
            {name: '广播音柱', icon: 'guangbyz_icon', ipKey: 'RadioIp', ip: '0.0.0.0', modelKey: 'RadioModel', model: '', statusKey: 'RadioRunStatus', status: 'none'},
            {name: '智慧电源', icon: 'zhihdy_icon', ipKey: 'PowerIp', ip: '0.0.0.0', modelKey: 'PowerModel', model: '', statusKey: 'PowerRunStatus', status: 'none'},
            {name: '微波雷达', icon: 'weibld_icon', ipKey: 'RadarIp', ip: '0.0.0.0', modelKey: 'RadarModel', model: '', statusKey: 'RadarRunStatus', status: 'none'},
            {name: '防雷模块', icon: 'fanglmk_icon', ipKey: 'LightningProtectionIp', ip: '0.0.0.0', modelKey: 'LightningProtectionModel', model: '', statusKey: 'LightningProtectionRunStatus', status: 'none'},
            {name: '一键报警', icon: 'sos_icon', ipKey: 'SosIp', ip: '0.0.0.0', modelKey: 'SosModel', model: '', statusKey: 'SosRunStatus', status: 'none'},
            {name: 'AP设备', icon: 'apsheb_icon',ipKey: 'ApIp', ip: '0.0.0.0', modelKey: 'ApModel', model: '', statusKey: 'ApRunStatus', status: 'none'},
            {name: '环境传感器', icon: 'huanjcgq_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'EnvironmentModel', model: '', statusKey: 'EnvironmentRunStatus', status: 'none'},
            {name: '智能门锁', icon: 'zhinmens_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'LockModel', model: '', statusKey: 'LockRunStatus', status: 'none'},
            {name: '数据采集器', icon: 'shujcjq_icon',ipKey: '', ip: '0.0.0.0', modelKey: 'DataAcquisitionModuleModel', model: '', statusKey: 'DataAcquisitionModuleRunStatus', status: 'none'},
            {name: '倾角传感器', icon: 'qinjcg_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'InclinationSensorModel', model: '', statusKey: 'InclinationRunStatus', status: 'none'},
            {name: '水尺传感器', icon: 'shuiccg_icon', ipKey: '', ip: '0.0.0.0', modelKey: 'DraftSensorModel', model: '', statusKey: 'DraftSensorRunStatus', status: 'none'},
          ]
          const {IpConfig, DevicesModel, RunStatus} = newValue
          this.list = res.map((item, index) => {
            const {ipKey, modelKey, statusKey} = item
            let ip = IpConfig[ipKey] || '0.0.0.0', model = DevicesModel[modelKey] || '', status = RunStatus[statusKey] || 'none'
            status = (model && status !== 'none') ? (status === 'Online' ? 'online' : 'error') : 'none'
            return {
              ...item, key: index, ip, model, status
            }
          })
        }
      }
    },
    created(){
      this.getDevCfg()
    },
    methods: {
      ...mapActions('device',['getDevCfg','setDevCfg']),
      getModelDesc,
      handleEdit(item){
        this.showEdit = true
        this.item = item
      }
    }
  }
</script>

<style scoped lang="less">


</style>
