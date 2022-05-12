/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2021-11-24 11:02:00
 * @LastEditors: 
 * @LastEditTime: 2022-05-12 11:36:20
 */

function light (color, second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(color)
            resolve()
        }, second * 1000)
    })
}

let list = [{
    color: 'red',
    time: 3
},
{
    color: 'green',
    time: 2
},
{
    color: 'yellew',
    time: 1
}
]

function orderLights (list) {
    let promise = Promise.resolve()
    list.forEach(item => {
        promise = promise.then(function () {
            return light(item.color, item.time)
        })
    })
    promise.then(function () {
        orderLights(list)
    })
}
orderLights(list)