import TDUI from '~/components/index'

const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  return err
}
export default function({ $axios, redirect }) {
  $axios.defaults.timeout = 10000
  $axios.onRequest(config => {
    // console.log(config.data)
    // console.log('Making request to ' + config.url)
  })
  $axios.onResponse(res => {
    if (res.data.code !== 100000) {
      // TDUI.Msg(res.data.msg)
      return Promise.reject(createError(res.data.code, res.data.msg))
    }
    // console.log(res)
    return res.data
  })
  $axios.onResponseError(err => {
    if (err.code == 'ECONNABORTED') {
      return Promise.reject(createError(err.code, '链接超市'))
    }
  })
  $axios.onError(err => {
    // if (err.response.status === 504) {
    //   err.code = 504
    //   redirect('/504')
    // }
    const errShow = `错误号：${err.code};错误信息：${err.message}`
    // console.log(errShow)
    return err
  })
}
