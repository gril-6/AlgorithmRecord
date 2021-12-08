/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2021-12-02 14:41:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-02 17:28:08
 */
import axios from 'axios'
// 等待请求
const pendingMap = new Map()
// Loading效果
const LoadingInstance = {
  _target: null,
  _count: 0,
}

// 添加拦截器
function myAxios(axiosConfig: any, customOptions: any) {
  const service = axios.create({
    baseURL: 'http',
    timeout: 1000,
  })
  //  自定义配置是否重复请求
  let custom_option = Object.assign(
    //是否开启重复请求,是否开启loading层，默认false,是否开启接口错误i信息提示，默认true
    { repeat_request_cancel: true, loading: false, error_message_show: true },
    customOptions
  )
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config)
      custom_option.repeat_request_cancel && addPending(config)
      //   创建loading实例
      if (custom_option.loading) {
        LoadingInstance._count++
        if (LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service() //请求效果
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response) => {
      removePending(response.config)
      custom_option.loading && closeLoding(custom_option) //关闭loading
      return response
    },
    (error) => {
      error.config && removePending(error.config)
      custom_option.error_message_show && httpErrorStatusHandle(error)
      custom_option.loading && closeLoding(custom_option)
      return Promise.reject(error)
    }
  )
  return service(axiosConfig)
}
/**
 * @description: 生成每个请求唯一的键
 * @param {*} config
 * @return {*}
 */
function getPendingKey(config: any) {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
/**
 * @description: 存储每个请求的唯一值，也就是cancel()方法，用于取消请求
 * @param {any} config
 * @return {*}
 */
function addPending(config: any) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel: any) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}
/**
 * @description: 删除重复请求
 * @param {any} config
 * @return {*}
 */
function removePending(config: any) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}
/**
 * @description: 关闭Loading实例
 * @param {any} _options
 * @return {*}
 */
function closeLoding(_options: any) {
  if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--
  if (LoadingInstance._count === 0) {
    LoadingInstance._target.close() //关闭请求效果
    LoadingInstance._target = null
  }
}
/**
 * @description: 处理异常
 * @param {any} error
 * @return {*}
 */
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error('请求的重复请求：' + error.message)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network'))
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  // element中弹出错误信息
  ElMessage({
    type: 'error',
    message,
  })
}
export default myAxios
