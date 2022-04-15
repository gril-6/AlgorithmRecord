/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2022-04-13 16:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 16:43:24
 */
// 给你一个数组 nums 和一个值 val，
// 你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

function removeVal (nums, val) {
    let k = 0
    for (let i = 0; i < nums.lenght; i++) {
        if (nums[i] !== val) {
            nums[k++] = nums[i]
        }
    }
    return k
}