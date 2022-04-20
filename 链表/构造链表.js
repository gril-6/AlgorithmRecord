/*
 * @Descripttion:
 * @version:
 * @Author: hanjing
 * @Date: 2022-04-15 11:15:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-15 14:12:49
 */
class listNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}
class linkedNode {
    constructor() {
        this.head = new listNode('head')
    }
    find (val) {
        let curNode = this.head
        while (curNode.next !== null && curNode.val !== val) {
            curNode = curNode.next
        }
        return curNode
    }
    insert (preVal, val) {
        const newListNode = new listNode(val)
        const preNode = this.find(preVal)
        const nextNode = preNode.next
        preNode.next = newListNode
        newListNode.next = nextNode
    }
    delete (val) {
        const deleteNode = this.find(val)
        let cur = this.head
        while (cur !== deleteNode) {
            if (cur.next === deleteNode) break
            cur = cur.next
        }
        cur.next = deleteNode.next
    }
}
const list = new LinkedList();
list.insert("head", "a");
list.insert("a", "b");
list.insert("b", "c");
list.insert("c", "d");
list.insert("d", "e")