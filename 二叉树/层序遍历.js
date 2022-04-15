/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2021-12-06 16:03:13
 * @LastEditors: 
 * @LastEditTime: 2022-03-25 10:29:30
 */

function v (root) {
    let res = [],
        queue = []
    queue.push(root)
    if (root === null) {
        return res
    }
    while (queue.length !== 0) {
        let len = queue.length
        let level = []
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            level.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        res.push(level)
    }
    return res
}
