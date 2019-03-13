/**
 * https://github.com/wusfen/q.js
 * wushufen
 * 20171115
 * 20171118
 */
/**

$('selector')
    .each()
    .closest()
    .parent()
    .find()
    .addClass()
    .removeClass()
    .show()
    .hide()
    .css()
    .on() // 使用代理实现，新添加的元素也能处理事件
    .delay()
    .then()
    .animate() // todo

 */
$ = function(selector) {
    if (!(this instanceof $)) {
        return new $(selector)
    }
    this.selector = selector
    this.callbacks = []

    if (typeof selector == 'string') {
        var nodeList = document.querySelectorAll(selector)
        nodeList = this.slice.call(nodeList)
        this.splice.apply(this, [0, 0].concat(nodeList))
    } else if (selector) {
        this.push(selector)
    }
}
$.fn = $.prototype = []

$.fn.each = function(cb, isThen) {
    if (!isThen) {
        for (var i = 0; i < this.length; i++) {
            cb.call(this[i], i, this[i])
        }
    } else {
        this.then(function(next) {
            this.each(cb)
            next()
        })
    }
    return this
}
$.fn.parent = function() {
    var els = new $
    this.each(function() {
        var parentNode = this.parentNode
        if (parentNode && els.indexOf(parentNode) == -1) {
            els.push(this.parentNode)
        }
    })
    return els
}
$.fn.closest = function(selector) {
    var _els = $(selector)
    var els = new $
    this.each(function() {
        (function loop(node) {
            if (!node) return
            if (_els.indexOf(node) != -1) {
                els.push(node)
            } else {
                loop(node.parentNode)
            }
        })(this)
    })
    return els
}
$.fn.find = function(selector) {
    var _els = $(selector)
    var els = new $
    this.each(function() {
        (function loop(node) {
            var childNodes = node.childNodes
            for (var i = 0; i < childNodes.length; i++) {
                var node = childNodes[i]
                if (_els.indexOf(node) != -1) {
                    els.push(node)
                }
                loop(node)
            }
        })(this)
    })
    return els
}
$.fn.addClass = function(className) {
    if (typeof className != 'string') return this

    var classNames = className.trim().split(/ +/)

    return this.each(function() {
        var classList = this.classList
        for (var i = 0; i < classNames.length; i++) {
            classList && classList.add(classNames[i])
        }
    })
}
$.fn.removeClass = function(className) {
    if (typeof className != 'string') return this

    var classNames = className.trim().split(/ +/)
    return this.each(function() {
        var classList = this.classList
        for (var i = 0; i < classNames.length; i++) {
            classList && classList.remove(classNames[i])
        }
    })
}
$.fn.css = function(arg, val) {
    var item = this[0]
    if (!item) return

    if (val !== undefined) {
        var key = arg
        arg = {}, arg[key] = val
    }
    // set
    if (typeof arg == 'object') {
        return this.each(function() {
            var style = this.style
            for (var name in arg) {
                style['-webkit-' + name] = arg[name]
                style['-moz-' + name] = arg[name]
                style['-ms-' + name] = arg[name]
                style['-0-' + name] = arg[name]
                style[name] = arg[name]
            }
        })
    }
    // get
    else {
        var style = getComputedStyle(item, null)
        return arg ?
            style['-webkit-' + arg] ||
            style['-moz-' + arg] ||
            style['-ms-' + arg] ||
            style['-o-' + arg] ||
            style[arg] :
            style
    }

}
$.fn.show = function(className) {
    this.each(function() {
        $(this).css('display', '')
        if ($(this).css('display') == 'none') {
            $(this).css('display', 'block')
        }
    })
    if (className) {
        this.addClass(className).delay(this.css('animation-duration'), function() {
            this.removeClass(className)
        })
    }
    return this
}
$.fn.hide = function(className) {
    if (className) {
        return this.addClass(className).delay(this.css('animation-duration'), function() {
            this.removeClass(className).css('display', 'none')
        })
    }
    return this.css('display', 'none')
}
$.fn.on = function(eventType, cb) {
    var _this = this
    var eventTypes = eventType.trim().split(/[, ]+/)

    for (var i = 0; i < eventTypes.length; i++) {
        var eventType = eventTypes[i]
        addEventListener(eventType, function(e) {
            var el = $(e.target).closest(_this.selector)[0]
            if (el) {
                cb.call(el, e)
            }
        })
    }

    return this
}

$.fn.then = function(cb) {
    var self = this
    if (!self.callbacks.length) {
        setTimeout(function() {
            next()
        }, 0)
    }

    this.callbacks.push(cb)

    function next() {
        var cb = self.callbacks.shift()
        cb && cb.call(self, next)
    }
    return this
}
$.fn.delay = function(time, cb) {
    var self = this
    if (String(time).match('s')) {
        time = parseFloat(time) * 1000
    }
    return this.then(function(next) {
        setTimeout(function() {
            next()
            cb && cb.call(self)
        }, time)
    })
}