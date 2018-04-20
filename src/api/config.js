// 请求数据接口通用的一些参数配置
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

// 配置通用param 通用的options qq接口一致
export const options = {
  param: 'jsonpCallback'
  // prefix: 'playlistinfoCallback'
}

export const ERR_OK = 0