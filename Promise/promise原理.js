
// promise有三种状态
// Pending 等待态
// Fulfilled 执行态
// Rejected 拒绝态
// promise必须为三种状态之一，只有异步操作才能决定当前状态，其他操作无法改变
// 状态只能从Pending变为Fulfilled或者由Pending变为Rejected且改变后不会发生变化，会一直保持这个状态
// Pending变为Fulfilled会得到一个私有value，Pending变为Rejected会得到一个私有reason,当到达这两个状态，执行异步代码会接受到这个value活reason
// class myPromise {
//     constructor() {
//         this.state = 'pending'
//         // 成功的值
//         this.value = undefined
//         // 失败的值
//         this.reason = undefined
//     }
// }
// resolve : 将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)
// reject : 将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)，并抛出错误
// TODO: 原理
//  p1 resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。
//  p2 reject为失败，接收参数reason，状态改变为rejected，不可再次改变。
//  如果executor执行器函数执行报错，直接执行reject
class myPromise {
    constructor(excutor) {
        this.state = 'pending'
        // 成功的值
        this.value = undefined
        // 失败的值
        this.reason = undefined


        // .then立即执行后state为pending,把.then保存起来
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        // 把异步任务交给resolve
        let resolve = value => {
            console.log(value);
            if (this.state === 'pending') {
                console.log('fulfilled状态被执行');
                this.state = 'filfilled'
                this.value = value
                // onFulfilled要执行一次
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
            console.log(reason);
            if (this.state === 'pending') {
                console.log('rejected状态被执行了');
                this.state = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            excutor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }
        let promise2 = new myPromise((resolve, reject) => {
            if (this.state == 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state == 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state == 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2

        // if (this.state === 'pending') {
        //     this.onResolvedCallbacks.push(() => {
        //         onFulfilled(this.value)
        //     })
        //     this.onRejectedCallbacks.push(() => {
        //         onRejected(this.reason)
        //     })
        // }
        // console.log('then');
        // if (this.state == 'fulilled') {
        //     onFulfilled(this.value)
        // }
        // if (this.state == 'rejected') {
        //     onRejected(this.reason)
        // }
    }
    catch (fn) {
        return this.then(null, fn)
    }
}

function resolvePromise (promise, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('chaining'))
    }
    let called
    if (x != null && (typeof x == 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) return
                    called = true
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
// resolve方法
myPromise.resolve = function (val) {
    return new myPromise((resolve, reject) => {
        resolve(val)
    })
}
// reject方法
myPromise.reject = function (val) {
    return new myPromise((resolve, reject) => {
        reject(val)
    })
}

// race方法 第一个成功就成功，如果不成功就失败(就是最先拿到谁的值，就成功) 返回一个Promsie
// 哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
myPromise.race = function (promises) {
    return new myPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}
// 例如
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, "one");
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, "two");
});

Promise.race([p1, p2]).then(function (value) {
    console.log(value); // "two"
    // 两个都完成，但 p2 更快
});

// all方法 获取所有promise,都执行then,把结果放到数组中，一起返回,一个失败就返回失败
myPromise.all = function (promises) {
    let arr = []
    let cur = 0

    function processData (index, data) {
        arr[index] = data
        cur++
        if (cur === promises.length) resolve(arr)
    }
    return new myPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data)
            }, reject)
        }
    })
}
myPromise.all = function (prmises) {
    let arr = []
    let cur = 0
    return new Promise((resolve, reject) => {
        if (!Array.isArray(prmises)) {
            throw Error('传入不是数组')
        }
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then((res) => {
                cur++
                arr.push(res)
                if (cur === arr.length) resolve(arr)
            })
        }
    })
}
// 例如
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values); //[3,42,f00]
});

        // new myPromise((resolve, reject) => {
        //     console.log(0);
        //     setTimeout(() => {
        //         // resolve(10)
        //         reject('JS我不爱你了')
        //         console.log('setTimeout');
        //     }, 1000)
        // }).then(null, (data) => {
        //     console.log(data, '++++++++++');
        // })

        // new myPromise((resolve, reject) => {
        //     console.log(0);
        //     setTimeout(() => {
        //         resolve(10)
        //     }, 1000)
        // })
        // TODO: .then方法
        // 初始化Promise时，执行器已经改变Promise的状态，且执行器函数是同步执行的，异步操作返回数据（成功的值和失败的原因）可以交给.then处理，
        // 实例生成以后，可以用then方法指定【resolved状态】和【rejected状态】的回调函数，【onFulfillled,onRejected】都是可选的，不一定要提供
        // 如果提供，则会分别进入resolved状态和rejected状态执行
        // 任何传给then的方法【非函数类型参数】都会被静默忽略
        // then方法返回一个新的promise对象（实现链式调用关键）
