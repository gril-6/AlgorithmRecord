/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2021-11-25 17:42:07
 * @LastEditors: 
 * @LastEditTime: 2022-05-12 11:37:49
 */

// 正则表达式是匹配模式，要么匹配字符，要么匹配位置

// ^ 脱字符， 匹配行的开头
let string = 'hello'
console.log('^', string.replace(/^/, '1')); //1hello

// $美元符号， 匹配行的结尾
console.log('$', string.replace(/$/, '1')); //hello1

// \w 匹配包括下划线的任何单词字符
// \W 匹配任何非单词
// \s 只要出现空白就匹配
// \S 不是空白就匹配  

// \B 非单词的边界,\b反着来的意思
// \w与\w之间的位置
// \W与\W之间的位置
// ^与\W之间的位置
// \W与$之间的位置

// ?=p 符合p子模式前面那个位置
console.log('?p', string.replace(/(? = he)/g, 'bh')); //bhhello

// 例如
// 将 123456789 转化为 123,456,789
let str = '123456789'
console.log('转化', str.replace(/(?!^)(?=(\d{3})+$)/, ',')); // 123,456,789