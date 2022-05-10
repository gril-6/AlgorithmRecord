/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2021-12-01 11:35:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-29 16:20:19
 */
// 基于一个事件/主题， 希望接受通知的对象 
// 通过自定义事件订阅主题
// 被激活的对象通过发布主题的方式被激活
// 多对多

class EventEmitter {
    constructor() {
        this.cache = {}
    }
    on (name, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }
    off (name, fn) {
        let tasks = this.cache[name]
        if (tasks) {
            //findIndex 返回数组中满足提供测试函数的第一个元素的索引。若没有返回-1
            const index = tasks.findIndex(f => f === fn || f.callback === fn)
            if (index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }
    emit (name, once = false, ...args) {
        if (this.cache[name]) {
            let tasks = this.cache[name].slice()
            for (const fn of tasks) {
                fn(...args)
            }
            if (once) {
                delete this.cache[name]
            }
        }
    }
}
let eventBus = new EventEmitter()
let fn1 = function (name, age) {
    console.log(`${name} ${age}`)
}
let fn2 = function (name, age) {
    console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aa', fn2) //添加事件
eventBus.off('aaa', fn1) //取消事件
eventBus.emit('aaa', false, '布兰', 12) //订阅事件
