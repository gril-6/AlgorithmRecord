/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 13:07:57
 */

//电梯第一个进来后，15秒后准时运送一次
/**
* @description: n秒内只运行一次，若在n秒内重复触发，只有一次生效
* @param {*} func
* @param {*} wait
* @return {*}
*/
function throttle (func, wait) {
    let timeout
    return function () {
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null
                func()
            }, wait)
        }
    }
}