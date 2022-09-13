/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 13:08:48
 */

// 将使用多个参数的函数转换成一系列的函数的技术，

// 额外知识
// function.length  获取的是形参的长度   而在函数内部定义的argument.length 获取的是 实参的长度
function a (x, y) { }
a.length // 2

function b (x, y = 2, z) { }
b.length // 1

function c (x, ...args) { }
c.length //1

// 方式一
function curry (fn) {
    let judge = (...args) => {
        if (args.length === fn.length) return fn(...args)
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
// 方式二
const curry = (fn, arr = []) => (...args) => (
    arg => arg.length === fn.length ?
        fn(...arg) :
        curry(fn, arg)
)([...arr, ...args])

function add (a, b, c) {
    return a + b + c
}
let addCurry = curry(add)
console.log(addCurry);
addCurry(1)(2)(3)
