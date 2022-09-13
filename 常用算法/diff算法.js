
/*
虚拟DOM: 是一个对象,一个用来表示真实DOM的对象,
虚拟DOM比真实DOM快错的,或者不严谨,
虚拟DOM算法操作真实DOM,性能高于直接操作真实DOM,虚拟DOM和虚拟DOM算法是两种概念
虚拟DOM算法 = 虚拟DOM + Diff算法
Diff算法就是一种对比算法, 对比就虚拟DOM和新虚拟DOM, 对比那个虚拟急待你更改了,找出虚拟节点,只更新这个节点
实现精准更新真实DOM,进而提高效率
使用虚拟DOM算法的损耗计算： 总损耗 = 虚拟DOM增删改+（与Diff算法效率有关）真实DOM差异增删改+（较少的节点）排版与重绘
直接操作真实DOM的损耗计算： 总损耗 = 真实DOM完全增删改+（可能较多的节点）排版与重绘
*/

/**
 * 优点：复杂情况下提升渲染性能，可以精准找到DOM变化地方减少DOM操作

 /*
 新旧虚拟DOM比对,只会同级比较,所以是深度优先算法, 复杂度O(n)
 当数据改变时,会触发setter,并且通过Dep.notifiy去通知所有订阅者,订阅者会调用patch方法, 给真实DOM打补丁,更新相应视图
 */

/*
patch:对比当前同层的虚拟节点是否为同一种类型标签
是:继续执行patchVnode方法进行深层对比
否:没必要对比了,直接整个节点替换成新虚拟节点
*/

function patch (oldVnode, newVnode) {
    // 比较是否为一个类型的节点
    if (sameVnode(oldVnode, newVnode)) {
        // 是 继续深层比较
        patchVnode(oldVnode, newVnode)
    } else { // 如果类型不一样 删除老的 创建新的
        // 否
        const oldEl = oldVnode.el //旧虚拟节点的真实DOM
        const parentEle = api.parentNode(oldEl) //获取父节点
        if (parentEle !== null) {
            api.insertBefore(parentEle, createEle(newVnode), api.nextSibling(oldEl)) //将新元素添加父元素
            api.removeChild(parentEle, oldVnode.el) // 移除以前的旧节点
            oldVnode = null // 清空,释放内存
        }
    }
    return newVnode
}

/*
sameVnode方法：判断是否为同一类型节点
*/
function sameVnode (oldVnode, newVnode) {
    return (
        oldVnode.key === newVnode.key &&
        oldVnode.tagName === newVnode.tagName &&
        oldVnode.isComment === newVnode.isComment &&
        isDef(oldVnode.data) === isDef(newVnode.data) &&
        sameInputType(oldVnode, newVnode) //比较input的type是不是同一个类型
    )
}
/*
sameInputType:比较input的type是不是同一个类型
*/

function sameInputType (oldVnode, newVnode) {
    if (oldVnode.tagName !== 'input') return true
    const typeA = oldVnode.data.atrrs.type
    const typeB = newVnode.data.atrrs.type
    return typeA === typeB
}

/*
patchVnode:找到真实DOM（el），判断newVnode和odVnode是否指向同一个对象，是就return
如果文本节点不相等，将el的文本节点设置为newVnode的文本节点
如果oldVnode有子节点而newVnodde没有，删除el的子节点
oldVnode没有子节点而newVnode有，将newVnode的子节点真实化之后添加el
如果二者都有子节点，则执行updataChildren函数比较子节点
*/
function patchVnode (oldVnode, newVnode) {
    const el = newVnode.el = oldVnode.el //获取真实DOM
    //获取新旧虚拟节点的子节点数组
    const oldCh = oldVnode.children,
        newCh = newVnode.children
    //如果新旧虚拟节点是文本节点，则终止
    if (oldVnode === newVnode) return
    if (oldVnode.text !== null && newVnode.text !== null && oldVnode.text !== newVnode.text) {
        //将真实DOM文本节点更新为新虚拟节点文本
        api.setTexContent(el, newVnode.text)
    } else {
        if (oldCh && newCh && oldCh !== newCh) {
            //新旧虚拟节点都有子节点，且子节点不一样
            //对比子节点更新
            updateChildren(el, oldCh, newCh)
        } else if (newCh) {
            //新虚拟节点有子节点，旧虚拟节点没有
            //创建新虚拟节点的子节点，并更新到真实DOM上去
            createEle(newVnode)
        } else if (oldVnode) {
            //旧节点有子节点，新虚拟节点没有
            //直接删除真实DOM里面对应子节点
            api.removeChild(el)
        }
    }
}
/**
 * @description: 新旧虚拟节点的子节点对比，首位指针法
 * @param {*} parentElm
 * @param {*} oldCh
 * @param {*} newCh
 * @return {*}
 */
function updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0,
        newStartIdx = 0
    let oldEndIdx = oldCh.lenght - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.lenght - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let insert
    while ((oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx)) {
        if (oldStartVnode == null) {
            oldStartVnode = oldCh(++oldStartIdx)
        } else if (oldEndVnode === null) {
            oldEndVnode = oldCh[--oldEndVnode]
        } else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null) {
            newEndVnode == newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            api.insertBefore(parentElm, oldEndVnode.el, oldEndVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 使用key时比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
            }
            idxInOld = oldKeyToIdx[newStartVnode.key]
            if (!idxInOld) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            } else {
                elmToMove = oldCh[idxInOld]
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                } else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null
                    api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
