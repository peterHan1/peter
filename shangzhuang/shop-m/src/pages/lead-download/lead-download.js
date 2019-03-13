//  模块外面不用包一层define，dev和build时工具会自动加上，遵循CommonJS规范，像node一样写就可以了，如下

'use strict';


// 支持在项目文件中使用基于src根目录下的绝对路径
// var Common = require('components/abc/abc');
// 使用 fecomponent 组件
// var say = require('fecomponent/mobi-say');

var dialog = require('components/dialog/dialog');

dialog.toast('达人店近期进行账号升级，为了保证店主们更好使用体验，请打开达人店APP继续使用。', 5000);

setTimeout(function () {
  window.location.href = 'http://m.showjoy.com/shop/app/download.html?v=' + new Date().getTime();
}, 5500)


