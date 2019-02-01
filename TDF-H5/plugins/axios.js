import TDUI from '~/components/index'

const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  return err
}
export default function({ $axios, redirect }) {
  $axios.defaults.timeout = 10000
  $axios.onRequest(config => {
    TDUI.load.Load()
    // testFn('请求中')
    // if (process.browser) {
    //   vm.$loading()
    // }
    console.log('Making request to ' + config.url)
    // console.log(config.data)
  })
  $axios.onResponse(res => {
    TDUI.load.Close()
    // return res
    // console.log(res)
    // testFn('请求完')
    // this.$Msg('这是错误信息', 2000)
    if (res.data.code !== 100000) {
      TDUI.Msg(res.data.msg)
      return Promise.reject(createError(res.data.code, res.data.msg))
    }
    return res
  })
  $axios.onError(err => {
    TDUI.load.Close()
    const errInfo = `错误号： ${err.code};错误信息：${err.message}`
    if (err.response.status == 504) {
      TDUI.Msg('服务器出错')
    } else {
      TDUI.Msg(err.message)
    }
  })
}
