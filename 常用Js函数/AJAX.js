/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 13:03:56
 */

const getJson = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp')
        // 同步执行
        xhr.open('GET', url, false)
        xhr.setRequestHeader('Accept', 'application/json');
        // xhr状态变化事件处理函数
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return
            // 加载完成
            if (xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText)
            } else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send()
    })
}
