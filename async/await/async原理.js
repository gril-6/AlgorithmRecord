/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2021-11-24 14:47:11
 * @LastEditors: 
 * @LastEditTime: 2022-05-12 11:37:25
 */

// 最好写在try catch中，好抛出异常，不然会中断执行
// 尽管Promise通过链式调用取代了回调嵌套，
// 但过多的链式调用可读性仍然不佳，流程控制也不方便，
// ES7 提出的async 函数，终于让 JS 对于异步操作有了终极解决方案，简洁优美地解决了以上两个问题
// async/await实际上是对Generator（生成器）的封装，
// ES6 新引入了 Generator 函数，可以通过 yield 关键字，把函数的执行流挂起，
// 通过next()方法可以切换到下一个状态，为改变执行流程提供了可能，从而为异步编程提供解决方案。

// async一个语法糖
// async 函数实现原理，将Generator函数和自动执行器，包装在一个函数里
// esm模块加载器支持顶层await,即await命令可以不放在async函数里面，直接使用
// await命令只能用在async函数之中，如果用在forEach之类的函数里，有问题
// 原因是await是并发执行，也就是同时进行，不是继发执行
async function fn (args) {
    // ...
}

// 等同于

function fn (args) {
    return spawn(function* () {
        // ...
    });
}
// 所有的async函数都可以写成第二种形式，其中spawn函数就是自动执行器
function spawn (genF) {
    return new Promise(function (resolve, reject) {
        const gen = genF()

        function step (nextF) {
            let next
            try {
                next = nextF()
            } catch (err) {
                return reject(e)
            }
            if (next.done) {
                return resolve(next.value)
            }
            Promise.resolve(next.value).then(function (v) {
                step(function () {
                    return gen.next(v)
                })
            }, function (e) {
                step(function () {
                    return gen.throw(e)
                })
            })
        }
        step(function () {
            return gen.next(undefined)
        })
    })
}
