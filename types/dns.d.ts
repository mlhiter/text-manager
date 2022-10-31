interface DNS {
  ip: string
  version: string
  tcp_support: boolean
  tls_support: boolean
  https_support: boolean
  edns_support: boolean
  udp_max_size: number
  dnssec_support: boolean
  type: keyof DNSDist
  root_delay_ms: number
  cn_delay_ms: number
  com_delay_ms: number
  validity: number
  accuracy: number
  confidence?: number
  location?: string
  isp?: string
}

interface DNSDist {
  forward: number
  recursive: number
  'forward&recursive': number
  direct: number
}

interface WSMessage {
  type: string
  status?: number
  message?: string
  data?: DNS[]
}
