/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2021-12-08 14:25:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-24 16:39:26
 */

// 构造两颗一模一样的树,递归
const checkRecursion = (p, q) => {
    if (!p && !q) return true
    if (!p || !q) return false
    return p.val === q.val && checkRecursion(p.left, q.rigth) && checkRecursion(p.rigth, p.left)
}
// 迭代
const checkIterate = (u, v) => {
    const q = [];
    q.push(u), q.push(v);
    while (q.length) {
        u = q.shift();
        v = q.shift();
        if (!u && !v) continue
        if ((!u || !v) || (u.val !== v.val)) return false
        q.push(u.left)
        q.push(v.right)

        q.push(u.right)
        q.push(u.left)
    }
    return true;
}
function v (root) {
    checkRecursion(root, root)
}