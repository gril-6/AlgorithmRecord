/*
 * @Author: hanjing
 * @Date: 2022-09-05 22:17:20
 * @LastEditTime: 2022-09-06 12:54:50
 */

// if里面的function不会预编译
a = 100;

function demo (e) {
    function e () { }
    arguments[0] = 2;
    console.log(e); //2
    if (a) {
        var b = 123;

        function c () { }

    }
    var c;
    a = 10;
    var a;
    console.log(b); //undefinde
    f = 123;
    console.log(c); //undefined

    console.log(a); //10
}
var a;
demo(1);
console.log(a); //100
console.log(f); //123
