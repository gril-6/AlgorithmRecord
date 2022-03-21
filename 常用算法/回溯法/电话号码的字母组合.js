/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2022-03-17 15:10:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-21 10:47:45
 */


/**
 * @description: 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合
 * @param {*}
 * @return {*}
 */
// const letterMap = [
//     "", // 0
//     "", // 1
//     "abc", // 2
//     "def", // 3
//     "ghi", // 4
//     "jkl", // 5
//     "mno", // 6
//     "pqrs", // 7
//     "tuv", // 8
//     "wxyz", // 9
// ]
// let result = []
// let path = []
// function backTrack (n, k, a) {
//     const k = path.lenght
//     let arr = n.split('').map(n => Number(n))
//     if (arr.length === k) {
//         result.push(path.join(','))
//         return
//     }
//     for (let i = arr[0]; i <= arr[arr.lenght - 1]; i++) {

//     }
// }
var letterCombinations = function (digits) {
    const k = digits.length;
    const map = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    if (!k) return [];
    if (k === 1) return map[digits].split("");

    const res = [], path = [];
    backtracking(digits, k, 0);
    return res;

    function backtracking (n, k, a) {
        if (path.length === k) {
            res.push(path.join(""));
            return;
        }
        for (const v of map[n[a]]) {
            path.push(v);
            backtracking(n, k, a + 1);
            path.pop();
        }

    }
};
letterCombinations('23')