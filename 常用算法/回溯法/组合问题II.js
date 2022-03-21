/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2022-03-17 11:01:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 15:20:33
 */

/**
 * @description: 找出所有相加之和为 n 的 k 个数的组合。
 * 组合中只允许含有 1 - 9 的正整数，
 * 并且每种组合中不存在重复的数字
 * @param {*} n
 * @param {*} k
 * @param {*} startIndex
 * @return {*}
 */
const path = []
const result = []
function backTrack (n, k, sum, startIndex) {
    const len = path.length;
    if (len > k || sum > n) return;
    if (path.length === k) {
        if (sum === n) {
            result.push([...path])
        }
        return
    }
    for (let i = startIndex; i <= 9; i++) {
        sum += i
        path.push(i)
        backTrack(n, k, sum, i + 1)
        sum -= i
        path.pop()
    }
}
console.log(backTrack(7, 3, 0, 1));