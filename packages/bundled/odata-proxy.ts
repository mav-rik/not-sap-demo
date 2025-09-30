import type { ProxyOptions } from 'vite'

const commonProxyOptions: ProxyOptions = {
  target: 'https://services.odata.org',
  changeOrigin: true,
  secure: false,
}

export const proxy: Record<string, string | ProxyOptions> = {
  '/V2/Northwind': commonProxyOptions,
  '/V4/Northwind': commonProxyOptions,
}

export default proxy
