/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-05 22:52:01
 */

/**
 * @description: apply接受2个参数，第一个为函数上下文this，第二个为参数通过一个数组形式传入
 * @param {*}
 * @return {*}
 */
Function.prototype.MyApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    console.log(context.fn, 'fn');
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}
// 普通函数
function test (age, age2, age3) {
    console.log(this.name + " " + age + " " + age2 + " " + age3);
}
// 自定义对象
const obj = {
    name: 'hj'
}
// 调用函数的 call 方法
test.MyApply(obj, [18, 22, 39])
