/*
 * @Descripttion: 
 * @version: 
 * @Author: hanjing
 * @Date: 2022-05-12 11:25:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-12 11:32:56
 */
let xml = new XMLHttpRequest()
xml.open(get, url, true)
xml.send()
//if是post请求,加上请求头
xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
xhr.onreadystatechange = function () {
    if (xml.readyState = 4) {
        if (xml.status = 200) {
            const response = xhr.responseText;
            success(response);
        }
        else {
            const error = xhr.status + xhr.statusText;
            fail(error);
        }
    }
}
// 封装成函数
var $ = {};
$.ajax = ajax;
function ajax (options) {
    // 解析参数
    options = options || {};
    if (!options.url) return;
    options.type = options.type || 'get';
    options.timeout = options.timeout || 0;
    // 1 创建ajax
    if (window.XMLHttpRequest) {
        // 高级浏览器和ie7以上
        var xhr = new XMLHttpRequest();
    } else {
        //ie6,7,8
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 2 连接
    var str = jsonToUrl(options.data);
    if (options.type === 'get') {
        xhr.open('get', `${options.url}?${str}`, true);
        // 3 发送
        xhr.send();
    } else {
        xhr.open('post', options.url, true);
        // 请求头
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // 3 发送
        xhr.send();
    }
    // 接收
    xhr.onreadystatechange = function () {
        // 完成
        if (xhr.readyState === 4) {
            // 清除定时器
            clearTimeout(timer);
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                // 成功
                options.success && options.success(xhr.responseText);
            } else {
                options.error && options.error(xhr.status);
            }
        }
    };
    // 超时
    if (options.timeout) {
        var timer = setTimeout(function () {
            alert("超时了");
            xhr.abort(); // 终止
        }, options.timeout);
    }
}

// json转url
function jsonToUrl (json) {
    var arr = [];
    json.t = Math.random();
    for (var name in json) {
        arr.push(name + '=' + encodeURIComponent(json[name]));
    }
    return arr.join('&');
}