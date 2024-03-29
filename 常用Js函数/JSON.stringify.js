/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 13:04:19
 */

// JSON.stringify()  方法将一个 JavaScript 对象或值转换为 JSON 字符串  
// JSON.stringify(value[, replacer [, space]])
// replacer:
// 1.如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
// 2.如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
// 3.如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
// 特性：
// undefined、任意的函数以及symbol值，出现在非数组对象的属性值中时在序列化过程中会被忽略
// undefined、任意的函数以及symbol值出现在数组中时会被转换成 null。
// undefined、任意的函数以及symbol值被单独转换时，会返回 undefined
// NaN 和 Infinity 格式的数值及 null 都会被当做 null。
// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

// 手写实习
const jsonstringify = (data) => {
    const isCyclic = (obj) => {
        let stackSet = new Set()
        let detected = false

        const detect = (obj) => {
            if (obj && typeof obj !== 'object') {
                return
            }
            if (stackSet.has(obj)) {
                return detected = true
            }
            stackSet.add(obj)
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    detect(obj[key])
                }
            }
            stackSet.detect(obj)
        }
        detect(obj)
    }
    return detected
}
