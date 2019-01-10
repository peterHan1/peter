// import { request } from "http";

const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  return err
}

export default function({ $axios, redirect }) {
  $axios.defaults.timeout = 10000
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  $axios.onResponse(res => {
    // return res
    if (res.data.code === 100000) {
      return res.data
    }
    if (res.data.code === 100001) {
      return Promise.reject(createError(res.data.code, res.data.msg))
    }
    // return res
    // console.log(res)
  })
  $axios.onError(error => {
    // console.log(error)
    // if (error === 100001) {
    //   alert('xxx')
    // }
    // if()
    // const code = parseInt(error.response && error.response.status)
    // // console.log(error.response.status)
    // switch (code) {
    //   case 400:
    //     redirect('/errors/nofound')
    //     break
    //   case 500:
    //     redirect('/errors/server')
    //     break
    //   case 333:
    //     console.log('xxxx')
    //   default:
    //     console.log('未知错误')
    // }
  })
}

// export const xx = async function({ $axios }) {
//   const ip = await $axios.get('http://icanhazip.com')
//   console.log(11111)
// }
// 发送请求
// export default function(app) {
//   let axios = app.$axios
//   // // 基本配置
//   // axios.defaults.timeout = 10000
//   // axios.defaults.headers.post['Content-Type'] =
//   //   'application/x-www-form-urlencoded'
//   // // 请求回调
//   axios.onRequest(config => {
//     console.log(config)
//   })
//   // // 返回回调
//   // axios.onResponse(res => {
//   //   console.log(res)
//   // })
//   // // 错误回调
//   // axios.onError(error => {
//   //   console.log(error)
//   // })
// }
