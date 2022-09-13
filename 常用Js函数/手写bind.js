/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 12:28:09
 */


/**
* @description: bind接受多个参数，第一个bind返回值是一个函数上下文this，不会立即执行，返回一个函数
* 参数可以分开传，bind后的参数默认排列在原函数参数后边
* @param {*}
* @return {*}
*/
Function.prototype.MyBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    console.log(arguments);
    const args = Array.from(arguments).slice(1)
    const _this = this
    return function F () {
        if (this instanceof F) {
            return _this(...args, ...arguments)
        } else {
            console.log(arguments);
            return _this.apply(context, args.concat(...arguments))
        }
    }
}
// 普通函数
function test (...age) {
    // new 的方式调用 bind 参数输出换做 [...arguments]
    console.log(this.name + age);
}
// 自定义对象
const obj = {
    name: 'PJ'
}
// 调用函数的 call 方法
let Fs = test.MyBind(obj, 1, 2, 3)(1, 2)
// Fs(1, 3);

// 返回对象