// import { camelize } from '../lang/string'

function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function(item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}
function Cookie2Json(cookie) {
  console.log(cookie)
  if (cookie) {
    let result = ''
    let reg = /=/i
    let cookieArr = cookie.split(';')
    for (let i = 0; i < cookieArr.length; i++) {
      let key = cookieArr[i]
        .replace(reg, '|')
        .split('|')[0]
        .trim()
      let val = cookieArr[i].replace(reg, '|').split('|')[1]
      // result += `${key}:${val}`
      result += ',"' + key + '":"' + val + '"'
      // console.log(`${key}:${val}`)
    }
    // console.log(result)
    cookie = JSON.parse('{' + result.substr(1).replace('\\', '') + '}')
    result = cookie
    return result
  }
}
// const isFunc = judgeTypeFnCreator('Function')
// const isUndef = judgeTypeFnCreator('Undefined')
// const isArray = judgeTypeFnCreator('Array')
// const isString = judgeTypeFnCreator('String')
// const isObject = judgeTypeFnCreator('Object')
// const isNumber = judgeTypeFnCreator('Number')

export { findIndex, Cookie2Json }
