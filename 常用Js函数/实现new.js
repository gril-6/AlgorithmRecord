/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-05 22:51:14
 */

/**
 * @description: 
 * 创建一个对象
 * 对象继承构造函数的原型链【链接到原型】
 * 将构造函数的this指向这个对象
 * 执行构造函数内部代码
 * 根据构造函数的返回值返回结果【返回对象引用】
 * @param {*}
 * @return {*}
 */
function myNew (func) {
    // 创建空对象
    let res = {}
    if (func.prototype !== null) {
        // 将构造函数的原型绑定到新创的对象实例上
        res.__proto__ = func.prototype
    }
    console.log(Array.prototype.slice.call(arguments));
    let ret = func.apply(res, Array.prototype.slice.call(arguments, 1))
    if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
        return ret
    }
    return res
}

function A (...num) {
    console.log(num);
}

myNew(A, 1, 2)
