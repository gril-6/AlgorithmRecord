/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 12:15:52
 */

/**
 * @description:  call接受多个参数，第一个为函数上下文也就是this,后边参数为函数本身参数
 * @param {*}
 * @return {*}
 */
Function.prototype.MyCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    // 不传参数默认为window
    context = context || window
    // 新增fn属性，将值设置为需要调用的函数
    context.fn = this
    // 将arguments转化为需要调用的函数
    const args = Array.from(arguments).slice(1)
    // 传参调用函数
    const result = context.fn(...args)
    delete context.fn
    return result
}
const obj = {
    name: 'hj'
}

function test (age) {
    console.log(this.name + " " + age);
}
test.MyCall(obj, 11)
