import Cookie from 'js-cookie'
const timestamp = Math.round(new Date() / 1000)
const commenParams = {
  deviceType: '',
  version: '1.0.0',
  type: 'h5',
  accessId: '',
  timestamp: timestamp,
  accessKey: ''
}
commenParams.accessId = Cookie.get('accessId')
commenParams.accessKey = Cookie.get('accessKey')
console.log('/api-配置文件/')
console.log(commenParams.accessKey)
export { commenParams }
