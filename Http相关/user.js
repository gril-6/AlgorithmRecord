/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2021-12-02 14:53:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-12 11:34:17
 */
import { queuePostFlushCb } from '@vue/runtime-core'
import myAxios from './axios'
import qs from 'qs'

/**
 * transformRequest允许向服务器发送前，修改请求数据，只能用于'put','post','patch'
 * 并且需要返回一个字符串，或者ArrayBuffer,或者Stream,
 * 还可以在传递then/catch前，允许修改响应式数据
 * @param params
 * @returns
 */
export function login (params) {
    return myAxios(
        {
            url: '/api',
            method: 'post',
            data: params,
            Headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // 序列化
            // 方法一
            transformRequest: [
                (data) => {
                    let result = ''
                    for (let key in data) {
                        result +=
                            encodeURIComponent(key) +
                            '=' +
                            encodeURIComponent(data[key] + '&')
                    }
                    return result.slice(0, result.length - 1)
                },
            ],
        },
        {
            repeat_request_cancel: false,
            loading: true,
        }
    )
    // 方法二
    // 通过qs包
    //   transformRequest:[
    //       (data:any) => {
    //           return qs.stringify(data)
    //       }
    //   ]
}
