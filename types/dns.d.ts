interface DNS {
  ip: string
  version: string
  tcp_support: boolean
  tls_support: boolean
  https_support: boolean
  edns_support: boolean
  udp_max_size: number
  dnssec_support: boolean
  validity: number
  accuracy: number
  confidence: number
  location: string
  isp: string
}
