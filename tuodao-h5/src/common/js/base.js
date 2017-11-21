let deviceWidth = document.documentElement.clientWidth
if (deviceWidth > 414) deviceWidth = 414
document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
