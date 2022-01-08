import LoginLayout from '@/layouts/LoginLayout'
import MainLayout from '@/layouts/MainLayout'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const loginRouteMap = [
  {
    path: '/login',
    name: 'login',
    meta: {title: '登录'},
    component: LoginLayout,
  },
  {
    path: '*', redirect: '/login'
  }
]

/**
 * 基础路由
 * @type { *[] }
 */

export const homeRouterMap = [
  {
    path: '/',
    name: 'index',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {title: '首页', icon: 'home_click_icon'},
      },
      {
        path: '/device',
        name: 'device',
        redirect: '/device/manage',
        component: RouteView,
        meta: {title: '网关配置', icon: 'wanggpz_click_icon'},
        children: [
          {
            path: '/device/manage',
            name: 'device_manage',
            component: () => import('@/views/device/DeviceManage'),
            meta: {title: '设备管理', icon: 'yuan_click_icon'},

          },
          {
            path: '/device/platform/manage',
            name: 'platform_manage',
            component: () => import('@/views/device/PlatformManage'),
            meta: {title: '平台管理', icon: 'yuan_click_icon'},
          },
        ],
      },
      {
        path: '/network',
        name: 'network',
        redirect: '/network/wan',
        component: RouteView,
        meta: {title: '网络配置', icon: 'wanglpz_click_icon'},
        children: [
          {
            path: '/network/wan',
            name: 'network_wan',
            component: () => import('@/views/network/WanSetting'),
            meta: {title: 'WAN配置', icon: 'yuan_click_icon'},
          },
          {
            path: '/network/lan',
            name: 'network_lan',
            component: () => import('@/views/network/LanSetting'),
            meta: {title: 'LAN配置', icon: 'yuan_click_icon'},
          },
          {
            path: '/network/port',
            name: 'network_port',
            component: () => import('@/views/network/NatSetting'),
            meta: {title: '端口映射', icon: 'yuan_click_icon'},
          },
          {
            path: '/network/loop',
            name: 'network_loop',
            component: () => import('@/views/business/LoopSetting'),
            meta: {title: '环网配置', icon: 'yuan_click_icon'},
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        redirect: '/system/time',
        component: RouteView,
        meta: {title: '系统配置', icon: 'xitsz_click_icon'},
        children: [
          {
            path: '/system/log',
            name: 'system_log',
            component: () => import('@/views/system/SystemLog'),
            meta: {title: '系统日志', icon: 'yuan_click_icon'},
          },
          {
            path: '/system/upgrade',
            name: 'system_upgrade',
            component: () => import('@/views/system/SystemUpgrade'),
            meta: {title: '系统升级', icon: 'yuan_click_icon'},
          },
          {
            path: '/system/time',
            name: 'system_time',
            component: () => import('@/views/system/SystemTime'),
            meta: {title: '时间配置', icon: 'yuan_click_icon'},
          },
          {
            path: '/system/restart',
            name: 'system_restart',
            component: () => import('@/views/system/SystemRestart'),
            meta: {title: '系统重启', icon: 'yuan_click_icon'},
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '*', redirect: '/404'
  }
]


