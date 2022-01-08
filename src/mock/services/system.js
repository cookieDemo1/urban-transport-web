import Mock from 'mockjs2'
import api from '@/api/api'

const wan = {
  "code": 200,
  "message": "interface_ip_list",
  "data": {
    "content": [
      {
        "IpAddr": "192.168.2.254/24",
        "Mask": "192.168.2.254/24",
        "GateWay": "192.168.2.254/24",
        "DNS1": "192.168.2.254/24",
        "DNS2": "192.168.2.254/24"
      }
    ],
    "size": {
      "ArraySize": 1
    }
  }
}
const lan = {
  "code": 200,
  "message": "interface_ip_list",
  "data": {
    "content": [
      {
        "IpAddr": "192.168.1.254/24",
        "Mask": "192.168.1.254/24"
      },
      {
        "IpAddr": "192.168.5.22/24",
        "Mask": "192.168.5.22/24"
      },
      {
        "IpAddr": "172.16.13.12/24",
        "Mask": "172.16.13.12/24"
      }
    ],
    "size": {
      "ArraySize": 3
    }
  }
}
const mstp = {
  "code": 200,
  "message": "mstp_config",
  "data": {
    "content": [
      {
        "Name": "LAN1",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      },
      {
        "Name": "LAN2",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      },
      {
        "Name": "LAN3",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      },
      {
        "Name": "LAN4",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      },
      {
        "Name": "LAN5",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      },
      {
        "Name": "LAN6",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      },
      {
        "Name": "WAN1",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      },
      {
        "Name": "WAN2",
        "AdminPathCost": 0,
        "Priority": 128,
        "AdminPTPMAC": 2,
        "AdminEdgePort": false,
        "Enable": true
      }
    ],
    "install": {
      "Priority": 32768,
      "HelloTime": 2,
      "ForwardDelay": 15,
      "MaxAge": 20
    }
  }
}
const nat = {
  "code": 200,
  "message": "nat_entry_config",
  "data": {
    "content": [
      {
        "Type": 0,
        "Name": "5444",
        "DstPort1": "6606",
        "DstPort2": "-",
        "SrcPort1": "8808",
        "SrcPort2": "-",
        "DstIp": "192.168.2.253/32",
        "SrcIp": "192.168.1.254/32",
        "Protocol": "tcp",
        "enable": "true"
      }
    ],
    "size": {
      "ArraySize": 1
    }
  }
}

// Mock.mock(/.*?interface_ip_list&type=2/,  wan)
// Mock.mock(/.*?interface_ip_list&type=1/,  lan)
// Mock.mock(/.*?mstp_config&msti=0/,  mstp)
// Mock.mock(/.*?nat_entry_config/,  nat)
