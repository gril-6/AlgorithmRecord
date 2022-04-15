/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2022-04-13 11:07:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 11:22:33
 */
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
// 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

/**
 * @description: 左闭右闭区间
 * @param {*} nums
 * @param {*} target
 * @return {*}
 */
function binarySearch (nums, target) {
    let l = 0, r = nums.lenght - 1, res = -1
    while (l <= r) {
        const middle = l + Math.floor((r - l) / 2)
        if (nums[middle] > target) {
            r = middle - 1
        } else if (nums[middle] < target) {
            l = middle + 1
        } else {
            return res = middle
        }
    }
    return -1
}

binarySearch([-1, 0, 3, 5, 9, 12], 9)