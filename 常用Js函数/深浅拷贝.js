/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 13:09:10
 */

// 浅拷贝 只复制指向某个对象的指针，不是复制本身，新旧对象共享一块内存，保持共同的内存地址
let arr = [1, 2]
let arr1 = arr.concat()
let arr2 = arr1.slice()
let arr3 = Object.assign([], arr)
let arr4 = [...arr]

function shallowCopy (arr) {
    let dst = obj instanceof Array ? [] : {}
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            dst[prop] = obj[prop]
        }
    }
    return dst
}

// 深拷贝 拷贝整个空间，如果有引用类型，就new一个，将引用类型的地址指向新new的这个
// 通俗点说，JSON.parse(JSON.stringfy(X))，其中X只能是Number, String, Boolean, Array, 扁平对象，即那些能够被 JSON 直接表示的数据结构
// JSON拷贝问题
// 无法实现对对象中方法的深拷贝
// undifined,任意函数以及symbol值，在序列化过程中会丢失
// 有RegExp(正则表达式的缩写)、Error对象，则序列化的结果将只得到空对象
// Date日期调用了toJSON()将其转换为string字符串，因此会被当做字符串处理
// NaN格式的数值及null，都会别当做null
// 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性
// 如果对象中存在循环引用的情况也无法正确实现深拷贝
JSON.parse(JSON.stringify(arr))
/**
 * @description: 递归拷贝,简单版
 * @param {*} obj 传入的对象
 * @return {*}
 */
function deepClone (obj) {
    let copy = obj instanceof Array ? [] : {}
    for (const i of obj) {
        if (obj.hasOwnProperty(i)) {
            copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }
    return copy
}
/**
 * @description: 复杂版深拷贝，基于简单版上考虑了内置对象如Date,RegExp等对象和函数，
 * 以及解决了循环引用问题
 * @param {*} obj
 * @return {*}
 */
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null

function complexDeepClone (target, map = new WeakMap()) {
    if (map.get(target)) return target //为空
    //获取当前值的构造函数：获取它的类型
    let constructor = target.constructor
    if (/^(RegExp|Date)$/.test(constructor.name)) {
        // 创建一个新的特殊对象（正则类/日期类）的实例
        return new constructor(target)
    }
    if (isObject(target)) {
        map.set(target, true) //为循环引用做标记
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map)
            }
        }
        return cloneTarget
    } else {
        return target
    }
}
