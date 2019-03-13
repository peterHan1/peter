### wxshare 使用介绍

#### 用途: 达人店工程 通用微信分享组件

#### 使用方法:
```javascript
var Wxshare = require('components/wxshare/wxshare');

// 使用默认分享内容
Wxshare();

// 自定义分享内容添加
var shareData = {
    title: '自定义',
    desc: '自定义',
    link: '自定义',
    imgUrl: '自定义'
  };
Wxshare(shareData);

```
```javascript

// 未注册店铺时针对开店流程页面的分享
// @param{shopId}  shopId,获取不到则传0，这个在函数内部也做了非空字符串判断。
// @param{dev} 测试环境或预发环境，'.net'或者'.com'，由fecomponent/mobi-detect-ua做判断。
 
Wxshare.unRegisterShare(dev,shopId);

```