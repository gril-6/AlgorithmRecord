/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2022-02-24 13:50:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-24 16:09:10
 */
Array.prototype.myReduce = function (func, init) {
    var arr = Array.prototype.slice.call(this);
    arr.map((item, index, arr) => {
        init = func(init, item, index, arr)
    })
    return init
}
console.log([1, 2, 3].myReduce((pre, cur) => cur + pre, 0));

Array.prototype.mymap = function (func) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, cur, index, arr) => {
        pre.push(func(cur, index, arr));
        return pre;
    }, [])
}

console.log([1, 2, 3].mymap(item => item + 1));
Array.prototype.Ruduce = function (func, start) {
    const init = Array.prototype.slice.call(this)
    init.map((item, index, arr) => {
        start = func(init, item, index, arr)
    })
    return start
}

Array.prototype.Map = function (func) {
    const init = Array.prototype.slice.call(this)
    const arr = init.reduce((acc, cur, index, arr) => {
        return acc.push(func(cur, index, arr))
    }, [])
    return arr
}