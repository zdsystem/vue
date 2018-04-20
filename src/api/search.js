import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// 封装获取jsonp数据的函数
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export function getStarPic() {
  const url = 'https://y.gtimg.cn/music/photo_new'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export function search(searchTxt, page) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    w: searchTxt,
    p: page,
    catZhida: 1,
    zhidaqu: 1,
    notice: 0,
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    remoteplace: 'txt.mqq.all'
  })
  return jsonp(url, data, options)
}
