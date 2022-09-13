/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 13:04:38
 */

const jsonp = ({
    url,
    params,
    callbackName
}) => {
    const generaterUrl = () => {
        let dataSrl = ''
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                dataSrl += `${key}=${params[key]}&`
            }
        }
        dataSrl += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement('script')
        scriptEle.src = generaterUrl()
        document.body.appendChild(scriptEle)
        // 全局函数 由script请求后台，被调用的函数，只有后台成功响应后才调用函数
        window[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptEle)
        }
    })
}
