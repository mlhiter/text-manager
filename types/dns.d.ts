interface DNS {
  ip: string
  version: string
  tcp_support: boolean
  tls_support: boolean
  https_support: boolean
  edns_support: boolean
  udp_max_size: number
  dnssec_support: boolean
  type: 'forward' | 'recursive' | 'forward&recursive' | 'direct'
  validity: number
  accuracy: number
  confidence: number
  location: string
  isp: string
}

interface WSMessage {
  type: string
  status?: number
  message?: string
  data?: DNS[]
}
