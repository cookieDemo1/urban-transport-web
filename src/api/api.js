

const api = {
  login: '/action/login/',
  logout: '/action/logout',
  upgradeSystem: '/action/update_system',
  upgradeStatus: '/cgi-bin/j.cgi?upgrade_conf',

  upgradeApp: '/action/update_app',
  upgradeAppInfo: '/cgi-bin/sys_upd',

  sysInfo: '/cgi-bin/sys_info',
  devCfg: '/cgi-bin/dev_cfg',
  envStatus: '/cgi-bin/env_status',
  lightCtrl: '/cgi-bin/light_ctrl',
  volCtrl: '/cgi-bin/vol_ctrl',
  srvCfg: '/cgi-bin/srv_cfg',
  sysLog: '/cgi-bin/sys_log',
  sysUpd: '/cgi-bin/sys_upd',
  upload: '/cgi-bin/upload',
  timeSet: '/cgi-bin/time_set',
  testServer: '/cgi-bin/test_server',


  jcgi: '/cgi-bin/j.cgi',
  wan: '/cgi-bin/j.cgi?GetWanConf',
  lan: '/cgi-bin/j.cgi?GetLanConf',
  mstp: '/cgi-bin/j.cgi?GetStpConf',
  nat: '/cgi-bin/j.cgi?GetNatConf',
  ntp: '/cgi-bin/j.cgi?GetNtpConf',
  time: '/cgi-bin/j.cgi?GetSysTime',


  route: '/cgi-bin/j.cgi?static_route_config',
  dns: '/cgi-bin/j.cgi?dns_config',
  mstpCist: '/cgi-bin/j.cgi?mstp_cist_info',
  mstpPort: '/cgi-bin/j.cgi?mstp_port_config',
  mstpMsti: '/cgi-bin/j.cgi?mstp_msti_config',
  mstpInstPort: '/cgi-bin/j.cgi?mstp_inst_port_config',

  portGet: '/cgi-bin/j.cgi?port_get',
  ifrateSummary: '/cgi-bin/j.cgi?ifrate_summary',
  ifstatsSummary: '/cgi-bin/j.cgi?ifstats_summary',
  pvlanConfig: '/cgi-bin/j.cgi?pvlan_config',
  vlanConfig: '/cgi-bin/j.cgi?vlan_8021q_config',

  visitConfig: '/cgi-bin/j.cgi?visit_config',
  systemConfig: '/cgi-bin/j.cgi?GetAppVersion'
}


export default api
