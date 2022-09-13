/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 12:52:23
 */

class B { }
class A {
    constructor() {
        console.log(b);
    }
}
const b = new B();
// 将B的实例注入到a中
const a = new A(b);
