import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
Vue.component('svg-icon', SvgIcon)

const req = require.context('@/assets/svg', false, /\.svg$/)
req.keys().map(req)


import MModal from '@/components/AntdComponent/MModal'
import MModalForm from '@/components/AntdComponent/MModalForm'
import MTable from '@/components/AntdComponent/MTable'
import MForm from '@/components/AntdComponent/MForm'
import MSelect from '@/components/AntdComponent/MSelect'
import MCheckbox from '@/components/AntdComponent/MCheckbox'
import MSwitch from '@/components/AntdComponent/MSwitch'
import MDatePicker from '@/components/AntdComponent/MDatePicker'
import MTimePicker from '@/components/AntdComponent/MTimePicker'
import MSlider from '@/components/AntdComponent/MSlider'
import MUploadDragger from '@/components/AntdComponent/MUploadDragger'
import MSpin from '@/components/AntdComponent/MSpin'
import MTooltip from '@/components/AntdComponent/MTooltip'
import MRadioGroup from '@/components/AntdComponent/MRadioGroup'
import MProgress from '@/components/AntdComponent/MProgress'
import MInputNumber from '@/components/AntdComponent/MInputNumber'

Vue.component('m-modal', MModal)
Vue.component('m-modal-form', MModalForm)
Vue.component('m-table', MTable)
Vue.component('m-form', MForm)
Vue.component('m-select', MSelect)
Vue.component('m-checkbox', MCheckbox)
Vue.component('m-switch', MSwitch)
Vue.component('m-date-picker', MDatePicker)
Vue.component('m-time-picker', MTimePicker)
Vue.component('m-slider', MSlider)
Vue.component('m-upload-dragger', MUploadDragger)
Vue.component('m-spin', MSpin)
Vue.component('m-tooltip', MTooltip)
Vue.component('m-radio-group', MRadioGroup)
Vue.component('m-progress', MProgress)
Vue.component('m-input-number', MInputNumber)




import EmptyContent from '@/components/EmptyContent'
import IconButton from '@/components/IconButton'
Vue.component('empty-content', EmptyContent)
Vue.component('icon-button', IconButton)



import FullContainer from '@/components/LayoutComponent/FullContainer'
import CardContainer from '@/components/LayoutComponent/CardContainer'
import CardItem from '@/components/LayoutComponent/CardItem'
import CardTitle from '@/components/LayoutComponent/CardTitle'
import CardSubTitle from '@/components/LayoutComponent/CardSubTitle'
Vue.component('full-container', FullContainer)
Vue.component('card-container', CardContainer)
Vue.component('card-item', CardItem)
Vue.component('card-title', CardTitle)
Vue.component('card-sub-title', CardSubTitle)



