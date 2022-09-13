/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 13:05:45
 */

// 电梯第一个人进来后，等待15秒。如果过程又有人进来，15秒等待重新计时，直到15秒后开始运送
/**
 * @description: n秒后执行该事件，若n秒内被重复触发，重新计时
 * @param {*} func
 * @param {*} wait
 * @return {*}
 */
function debounce (func, wait) {
    let timeout
    return function () {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            func()
        }, 1000)
    }
}
