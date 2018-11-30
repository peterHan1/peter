// let deviceWidth = document.documentElement.clientWidth
// if (deviceWidth > 414) {
//   deviceWidth = 414
// }
// document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'

const resizes = () => {
  let deviceWidth = document.documentElement.clientWidth
  console.log(deviceWidth + 'x1')
  if (deviceWidth > 414) {
    deviceWidth = 414
  }
  console.log(deviceWidth + 'x2')
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
}

window.onresize = resizes()

// window.onresize = () => {
//   return (() => {

//     if (deviceWidth > 414) {
//       deviceWidth = 414
//     }
//     document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
//   })()
// }
