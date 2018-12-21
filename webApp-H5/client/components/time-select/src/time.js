// 日期在十年里选择
let myDate = []
// 0的目的是获取某月的总天数
function getDay (year, month) {
  let date = new Date(year, month, 0)
  date = date.getDate()
  return date
}
// 数字为个位数是在前方加个0
function addZero (num) {
  if (String(num).length < 2) {
    return '0' + num
  } else {
    return num
  }
}
let today = new Date().getDate()// 当前多少号
let thisyear = new Date().getFullYear()// 当前年份
let thismonth = new Date().getMonth() + 1// 当前月份
let years = 9// 控制日期在十年里选择，可随意定制
// 获取未来10年
for (let i = 0; i <= years; i++) {
  myDate[i] = {}
  myDate[i].year = thisyear + i
  myDate[i].children = []
}
// 获取当前年份剩余月数
for (let i = 0; i <= 12 - thismonth; i++) {
  myDate[0].children[i] = {}
  myDate[0].children[i].month = addZero(thismonth + i)
  myDate[0].children[i].children = []
}
// 获取当前月份剩余天数
for (let i = 0; i <= getDay(thisyear, thismonth) - today; i++) {
  myDate[0].children[0].children.push(addZero(today + i))
}
// 获取当前年份减去当前月份的剩下月份的剩余天数（比如说当前是10月，获取的就是11，12月份的天数）
if (thismonth < 12) {
  for (let i = 1; i <= 12 - thismonth; i++) {
    for (let j = 1; j <= getDay(thisyear, thismonth + i); j++) {
      myDate[0].children[i].children.push(addZero(j))
    }
  }
}
// 初始化未来9年的月份的天数
for (let i = 1; i <= years; i++) {
  for (let j = 0; j <= 11; j++) {
    myDate[i].children[j] = {}
    myDate[i].children[j].children = []
  }
}
// 遍历未来9年的月份
for (let i = 1; i <= years; i++) {
  for (let j = 0; j <= 11; j++) {
    myDate[i].children[j].month = addZero(j + 1)
  }
}
// 遍历每一个满月的天数
function addDay () {
  for (let i = 1; i <= years; i++) {
    for (let j = 0; j <= 11; j++) {
      for (let n = 1; n <= getDay(thisyear + i, j + 1); n++) {
        myDate[i].children[j].children.push(addZero(n))
      }
    }
  }
}
addDay()
export default myDate
