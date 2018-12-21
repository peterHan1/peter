var transitionProp = typeof document.documentElement.style.transform === 'string' ? 'transform' : 'webkitTransform'
var extend = function (dst, src) {
  let property
  if (!src) src = {}
  for (property in src) {
    if (src.hasOwnProperty(property)) {
      dst[property] = src[property]
    }
  }
  return dst
}
var inherit = function (subClass, superClass) {
  var F = function () {}
  F.prototype = superClass.prototype
  subClass.prototype = new F()
  subClass.prototype.constructor = subClass
  subClass.superclass = superClass.prototype
  if (superClass.prototype.constructor === Object.prototype.constructor) {
    superClass.prototype.constructor = superClass
  }
}
var Calendar = function (container, date, sliderCallback, toggleCallback) {
  let nowDate = new Date()
  this.td = date === null ? '没有传值' : '传值了'
  date = date === null ? new Date() : new Date(date)
  this.container = container
  this.date = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
  this.nowDate = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    day: nowDate.getDate()
  }
  this.isSigned = false
  this.sliderCallback = sliderCallback
  this.toggleCallback = toggleCallback
  this.monthClass = new CompositeMonth()
  this.activeView = this.monthClass
}
Calendar.prototype = {
  init: function () {
    var _this = this
    this.monthClass.init(this)
    this.touchClass = new TouchClass(this.container, {
      touchstart: function (e, touch) {
        touch.draging = true
        delete touch.goView
        _this.container.classList.remove('calendar-transition')
      },
      touchmove: function (e, touch) {
        if (touch.direction === 3 || touch.direction === 4) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        var x = touch.distance
        _this.activeView.container.style[transitionProp] = 'translate3d(' + x + 'px,0,0)'
      },
      touchend: function (e, touch) {
        if (touch.direction === 3 || touch.direction === 4) {
          return
        }
        _this.container.classList.add('calendar-transition')
        if (touch.distance > 50) {
          touch.goView = 'a'
          _this.activeView.container.style[transitionProp] = 'translate3d(' + _this.width + 'px,0,0)'
        } else if (-touch.distance > 50) {
          touch.goView = 'c'
          _this.activeView.container.style[transitionProp] = 'translate3d(' + -_this.width + 'px,0,0)'
        } else {
          touch.goView = 'b'
          _this.activeView.container.style[transitionProp] = 'translate3d(0,0,0)'
        }
      }
    })
    this.touchClass.init()
    this.activeView.render()
    this.expand()
    this.resize()
    this.sliderCallback(this, this.activeView.getDateRange())
  },
  setTime: function (year, month) {
    this.monthClass.setTime(year, month)
    this.activeView.render()
  },
  getMonth: function () {
    var time = this.activeView.currentTime
    return {
      year: time.year,
      month: time.month,
      day: time.day || 1
    }
  },
  sign: function () {
    this.isSigned = true
    var today = this.activeView.viewB.container.getElementsByClassName('i-today')
    if (today[0]) {
      today[0].classList.add('i-signed')
    }
  },
  render: function () {
    this.activeView.render()
  },
  update: function (schedules) {
    this.activeView.viewB.update(schedules)
  },
  refresh: function () {
    this.render()
    this.sliderCallback(this, this.activeView.getDateRange())
  },
  resize: function () {
    this.width = this.container.offsetWidth
    this.activeView.resize(true)
  },
  goNext: function () {
    this.container.classList.add('calendar-transition')
    this.touchClass.goView = 'c'
    this.activeView.container.style[transitionProp] = 'translate3d(' + -this.width + 'px,0,0)'
  },
  goPrev: function () {
    this.container.classList.add('calendar-transition')
    this.touchClass.goView = 'a'
    this.activeView.container.style[transitionProp] = 'translate3d(' + this.width + 'px,0,0)'
  },
  expand: function () {
    if (this.activeView.name === 'month') {
      this.monthClass.container.parentNode.style.display = 'block'
    } else if (this.activeView.name === 'week') {
      this.monthClass.container.parentNode.style.display = 'none'
    }
  },
  toggle: function () {
    if (this.activeView.name === 'month') {
    } else if (this.activeView.name === 'week') {
      this.activeView = this.monthClass
    }
    this.expand()
    this.activeView.reset(this.date)
    this.activeView.render()
    this.activeView.resize(true)
    this.sliderCallback(this, this.activeView.getDateRange())
    this.toggleCallback(this)
  },
  destroy: function () {
    this.monthClass.destroy()
    this.touchClass.destroy()
  },
  tdClick: function (e, callback) {
    var dateTime
    var tdArr = document.getElementById('calendar_month').getElementsByTagName('td')
    dateTime = e.getAttribute('data-time')
    if (dateTime) {
      for (var i = 0; i < tdArr.length; i++) {
        tdArr[i].classList.remove('on')
      }
      e.classList.add('on')
      callback(dateTime)
    }
  }
}

function CalendarUnit () {}
CalendarUnit.prototype = {
  getMaxDay: function (year, month) {
    var monthDays
    if (month === 2 && this.isLearYear(year)) {
      return 29
    } else {
      monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      return monthDays[month - 1]
    }
  },
  isLearYear: function (year) {
    return year > 0 && !(year % 4) && (year % 100 || !(year % 400))
  },
  getFirstDay: function (year, month) {
    return new Date(year, month - 1, 1).getDay()
  },
  update: function (schedules) {
    if (!this.tds) return
    let tds = this.tds
    let td = null
    for (var i = 0, l = tds.length; i < l; i++) {
      td = this.tds[i]
      var x
      for (x in schedules) {
        if (schedules[x].repayTime.substr(0, 10) === td.getAttribute('data-time')) {
          td.firstChild.innerHTML = schedules[x].repayNum + '笔'
          td.classList.add('return_num')
        }
      }
      if (schedules[i] === tds[i].getAttribute('data-time')) {
      }
    }
  },
  addClass: function (originalYear, originalMonth, originalDay, year, month, day, isSigned) {
    var classname = 'i-after'
    if (year === originalYear) {
      if (month === originalMonth) {
        if (originalDay === day) {
          classname = isSigned ? 'i-signed i-today' : 'i-today'
        }
      } else if (month < originalMonth) {
      }
    }
    return classname
  },
  weekNames: ['日', '一', '二', '三', '四', '五', '六', '日', '一', '二', '三', '四', '五', '六']
}
var CompositeMonth = function () {
  this.name = 'month'
  this.container = document.getElementById('calendar_month')
  this.viewA = new CalendarMonth('viewA', document.getElementById('month_viewA'))
  this.viewB = new CalendarMonth('viewB', document.getElementById('month_viewB'))
  this.viewC = new CalendarMonth('viewC', document.getElementById('month_viewC'))
}
CompositeMonth.prototype = {
  init: function (parent) {
    this.parent = parent
    this.currentTime = {
      year: parent.date.year,
      month: parent.date.month
    }
    this.setTime(this.currentTime.year, this.currentTime.month)
    this.viewA.init(this)
    this.viewB.init(this)
    this.viewC.init(this)
    this.add()
  },
  setTime: function (year, month) {
    if (month > 12) {
      month -= 12
      year++
    }
    if (month < 1) {
      month += 12
      year--
    }
    let currentYear = year
    let currentMonth = month
    let prevYear = year
    let prevMonth = month - 1
    let nextYear = year
    let nextMonth = month + 1
    if (prevMonth < 1) {
      prevMonth += 12
      prevYear++
    }
    if (nextMonth > 12) {
      nextMonth -= 12
      nextYear++
    }
    this.currentTime.year = currentYear
    this.currentTime.month = currentMonth

    this.viewA.setTime(prevYear, prevMonth)
    this.viewB.setTime(currentYear, currentMonth)
    this.viewC.setTime(nextYear, nextMonth)
  },
  add: function () {
    this.container.addEventListener('webkitTransitionEnd', this.transitionEnd(this))
    this.container.addEventListener('transitionEnd', this.transitionEnd(this))
  },
  off: function () {
    this.container.removeEventListener('webkitTransitionEnd', this.transitionEndHandler)
    this.container.removeEventListener('transitionEnd', this.transitionEndHandler)
    this.transitionEndHandler = null
  },
  render: function () {
    this.viewA.render()
    this.viewB.render(true)
    this.viewC.render()
  },
  goNext: function () {
    this.parent.container.classList.add('calendar-transition')
    this.parent.touchClass.goView = 'c'
    this.container.style[transitionProp] = 'translate3d(' + -this.parent.width + 'px,0,0)'
  },
  goPrev: function () {
    this.parent.container.classList.add('calendar-transition')
    this.parent.touchClass.goView = 'a'
    this.container.style[transitionProp] = 'translate3d(' + this.parent.width + 'px,0,0)'
  },
  transitionEnd: function (self) {
    return (self.transitionEndHandler = function () {
      var goView = self.parent.touchClass.goView
      if (goView === 'b') return
      if (goView === 'c') {
        self.currentTime.month++
      }
      if (goView === 'a') {
        self.currentTime.month--
      }
      self.setTime(self.currentTime.year, self.currentTime.month)
      self.render()
      self.parent.container.classList.remove('calendar-transition')
      self.container.style[transitionProp] = 'translate3d(0,0,0)'
      self.resize()
      self.parent.sliderCallback(self.parent, self.getDateRange())
    })
  },
  resize: function (isOnResize) {
    if (isOnResize) {
      this.headerHeight = document.getElementById('month_head').offsetHeight
    }
    this.parent.container.style.height = this.viewB.container.offsetHeight + this.headerHeight + 'px'
  },
  getDateRange: function () {
    let y = this.currentTime.year
    let m = this.currentTime.month
    return {
      start: {year: y, month: m, day: 1},
      end: {year: y, month: m, day: this.viewB.time.maxDay}
    }
  },
  reset: function (date) {
    this.setTime(date.year, date.month)
  },
  transitionEndHandler: null,
  destroy: function () {
    this.off()
    this.viewA = null
    this.viewB = null
    this.viewC = null
  }
}
var CalendarMonth = function (name, container) {
  this.name = name
  this.container = container
  this.time = {}
  this.tds = null
}
inherit(CalendarMonth, CalendarUnit)
extend(CalendarMonth.prototype, {
  init: function (parent) {
    this.parent = parent
  },
  setTime: function (year, month) {
    this.time.year = year
    this.time.month = month
  },
  render: function (boole) {
    let year = this.time.year
    let month = this.time.month
    let day = 0
    let firstDay = this.getFirstDay(year, month)
    let maxDay = this.time.maxDay = this.getMaxDay(year, month)
    let row = Math.ceil((firstDay + maxDay) / 7)
    let html = '<table><tr>'
    let isSigned = this.parent.parent.isSigned
    var i = 0
    let j = 0
    let nowYear = this.parent.parent.nowDate.year
    let nowMonth = this.parent.parent.nowDate.month
    let nowDay = this.parent.parent.nowDate.day
    for (; i < 7; i++) {
      html += '<th>' + this.weekNames[i] + '</th>'
    }
    html += '</tr>'
    i = 0
    for (; i < row; i++) {
      html += '<tr>'
      for (j = 0; j < 7; j++) {
        day = i * 7 + j - firstDay + 1
        if (day > 0 && day <= maxDay) {
          let d = day
          let txt = day
          let m = month
          let bTxt = '<b day=' + txt + '>' + (txt = nowYear === year && nowMonth === month && day === nowDay ? '今' : day) + '</b>'
          html += '<td data-time="' + year + '-' + (m = month < 10 ? '0' + m : m) + '-' + (d = day < 10 ? '0' + d : d) + '" class="' + this.addClass(nowYear, nowMonth, nowDay, year, month, day, isSigned) + '"><span></span>' + bTxt + '</td>'
        } else {
          html += '<td></td>'
        }
      }
      html += '</tr>'
    }
    html += '</table>'
    this.container.innerHTML = html

    if (boole) this.tds = this.container.querySelectorAll('td[data-time]')
  }
})
var TouchClass = function (container, opts) {
  this.container = container
  this.draging = false
  this.pos = {
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0
  }
  this.distance = 0
  this.direction = 0
  this.isslider = false
  this.opts = {
    touchstart: opts.touchstart,
    touchmove: opts.touchmove,
    touchend: opts.touchend
  }
}
TouchClass.prototype = {
  init: function () {
    this.timeStamp = 0
    this.on()
  },
  on: function () {
    this.container.addEventListener('touchstart', this.touchStart(this))
    this.container.addEventListener('touchmove', this.touchMove(this))
    this.container.addEventListener('touchend', this.touchEnd(this))
  },
  off: function () {
    this.container.removeEventListener('touchstart', this.touchStartHandler)
    this.container.removeEventListener('touchmove', this.touchMoveHandler)
    this.container.removeEventListener('touchend', this.touchEndHandler)
  },
  touchStart: function (touch) {
    return (touch.touchStartHandler = function (e) {
      var point = e.touches[0]
      touch.pos.startX = touch.pos.targetX = point.clientX
      touch.pos.startY = touch.pos.targetY = point.clientY
      touch.opts.touchstart(e, touch)
    })
  },
  touchMove: function (touch) {
    return (touch.touchMoveHandler = function (e) {
      if (!touch.draging) return
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      let level
      let vertical
      let d = 0
      if (touch.pos.startX !== x || touch.pos.startY !== y) {
        touch.timeStamp = e.timeStamp | 0
        if (touch.direction === 0) {
          level = x > touch.pos.startX ? 2 : 1
          vertical = y < touch.pos.startY ? 3 : 4
          d = Math.abs(x - touch.pos.startX) > Math.abs(y - touch.pos.startY) ? 0 : 1
          touch.direction = d === 0 ? level : vertical
        }
        touch.pos.targetX = x
        touch.pos.targetY = y
        touch.distance = x - touch.pos.startX
        if (touch.direction === 1 || touch.direction === 2) {
          touch.pos.targetY = 0
        } else if (touch.direction === 3 || touch.direction === 4) {
          touch.pos.targetX = 0
        }

        touch.opts.touchmove(e, touch)
      } else {
        e.preventDefault()
        e.stopPropagation()
      }
    })
  },
  touchEnd: function (touch) {
    return (touch.touchEndHandler = function (e) {
      touch.draging = false
      touch.isslider = (e.timeStamp | 0) - touch.timeStamp < 20
      touch.opts.touchend(e, touch)
      touch.pos.startX = touch.pos.startY = touch.pos.targetX = touch.pos.targetY = touch.distance = touch.direction = touch.timeStamp = 0
      touch.isslider = false
    })
  },
  touchStartHandler: null,
  touchMoveHandler: null,
  touchEndHandler: null
}
export {Calendar}
