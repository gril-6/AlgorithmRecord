/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2022-03-17 15:10:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-24 18:39:46
 */

/**
 * @description: 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合
 * @param {*}
 * @return {*}
 */
// const letterCombinations = function (digits) {
//     const k = digits.length;
//     const map = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
//     if (!k) return [];
//     if (k === 1) return map[digits].split("");

//     const res = [], path = [];
//     backtracking(digits, k, 0);
//     return res;

//     function backtracking (n, k, a) {
//         if (path.length === k) {
//             res.push(path.join(""));
//             return;
//         }
//         for (const v of map[n[a]]) {
//             path.push(v);
//             backtracking(n, k, a + 1);
//             path.pop();
//         }

//     }
// };
// letterCombinations('234')
// BFS解法
const letterCombinations = (digits) => {
    if (digits.length == 0) return [];
    const map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
    const queue = [];
    queue.push('');
    for (let i = 0; i < digits.length; i++) { // bfs的层数，即digits的长度
        const levelSize = queue.length;         // 当前层的节点个数
        for (let j = 0; j < levelSize; j++) {   // 逐个让当前层的节点出列
            const curStr = queue.shift();         // 出列

            const letters = map[digits[i]];

            for (const l of letters) {
                queue.push(curStr + l); // 生成新的字母串入列
            }
        }
    }
    return queue; // 队列中全是最后一层生成的字母串
};
letterCombinations('234')