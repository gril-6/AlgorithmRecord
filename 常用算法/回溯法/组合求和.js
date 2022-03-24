/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2022-03-21 14:23:56
 * @LastEditors: 
 * @LastEditTime: 2022-03-21 14:25:10
 */
/**
 * @description: 给定一个无重复元素的数组 candidates 和一个目标数 target 
 * 找出 candidates 中所有可以使数字和为 target 的组合。
 * @param {*} candidates
 * @param {*} target
 * @return {*}
 */
var combinationSum = function (candidates, target) {
    const path = []
    const result = []
    candidates.sort()
    function backTrack (sum, startIndex) {
        if (sum > target) return
        if (sum === target) {
            result.push(Array.from(path))
            return
        }
        for (let i = startIndex; i < candidates.length; i++) {
            const n = candidates[i];
            if (n > target - sum) continue;
            path.push(n)
            sum += n
            backTrack(sum, i)
            path.pop()
            sum -= n
        }
    }
    backTrack(0, 0)
    return result
};