const timestamp = Math.round(new Date() / 1000)
const commenParams = {
  deviceType: 'iPhone 5',
  version: '1.0.0',
  type: 'h5',
  accessId: '',
  timestamp: timestamp,
  accessKey: ''
}
const handleReq = reqst => {
  return reqst.catch(err => {
    console.log(err.message)
  })
}

// 判断用户是否注册
export const orRegister = async ($axios, phone, password) => {
  return await handleReq(
    $axios.post('/hanapp/login/OrRegister', { phone, password, commenParams })
  )
}

export const login = async ($axios, phone) => {
  return await handleReq(
    $axios.post('/hanapp/login/OrRegister', { phone, commenParams })
  )
}
// export default api
