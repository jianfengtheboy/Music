import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 500,
        pagenum: 5,
        g_tk: 1993580951,
        needNewCode: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        platform: 'yqq'
    })
    return jsonp(url,data,options)
}

export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
        hostUin : 0,
        needNewCode : 0,
        platform : 'yqq',
        order : 'listen',
        begin : 0,
        num : 100,
        songstatus : 1,
        g_tk : 1664029744,
        singermid : singerId
    })
    return jsonp(url,data,options)
}
