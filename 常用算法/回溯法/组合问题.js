/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2022-03-15 16:48:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 11:26:24
 */

/**
 * @description: 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合
 * @param {*} n 长度
 * @param {*} k 组合大小
 * @param {*} startIndex 每次递归的起始位置
 * @return {*} 
 */
const path = []
const result = []
function backTrack (n, k, startIndex) {
    const len = path.length;
    if (path.length === k) {
        result.push([...path])
        return
    }
    for (let i = startIndex; i <= n + len - k + 1; i++) {
        path.push(i)
        backTrack(n, k, i + 1)
        path.pop()
    }
}
console.log(backTrack(6, 2, 1));