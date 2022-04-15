/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2021-11-25 11:23:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-24 18:51:23
 */

// 将上一次结果缓存起来，当下次调用时，如果遇到相同参数，直接返回缓存中的数据
// let memoize = function (func) {
//     let cache = {}
//     return function (key) {
//         if (!cache[key] || (typeof cache[key] === 'number' && !!cache[key])) {
//             cache[key] = func.apply(this, arguments)
//         }
//         return cache[key]
//     }
// }
// hasher也是函数，是为了计算key，如果传入了hasher，就用hasher函数计算key
// 否则就用memoize函数传入的第一个参数，接着就去判断如果这个key没有被求值过，就去执行，最后将对象返回
let memoize = function (func, hasher) {
    let memoize = function (key) {
        let cache = memoize.cache
        let address = '' + (hasher ? hasher.apply(this, arguments) : key)
        if (!cache[address] || (typeof cache[key] === 'number' && !!cache[key])) {
            cache[address] = func.apply(this, arguments)
        }
        return cache[address]
    }
    memoize.cache = {}
    return memoize
}
// 斐波那契数列
const fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
// 使用缓存函数会少执行次数
memoize(fibonacci)(10)