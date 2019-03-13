### Countly 埋点监控

#### 使用方法
```javascript
var Countly = require('components/countly/countly.js');

$('.j_AddBtn').on('click', function(e) {
  // ····
  Countly.clickEvent('addbtn', '添加按钮', '.j_AddBtn');
  // options
  Countly.clickEvent('addbtn', '添加按钮', '.j_AddBtn', {
    'test1': 111,
    'test2': 222
  });
});
```

其中clickEvent(type, className, desc, options)方法需要传3个参数,options参数选填：
type: string类型，必填参数，用于区分是什么事件操作
className: string类型，选填参数，点击元素的className，能够方便查找是页面中具体某一元素被点击
desc: string类型，选填参数，点击元素的描述，直观了解用户做了什么操作
options: Object类型，选填参数，针对某些特殊元素传特定字段

#### 其他相关
在shop-view工程foot.html文件中添加埋点代码

```javascript
  var Countly = Countly || {};
  Countly.q = Countly.q || [];
  Countly.app_key = 'c6e643a01e3c16fa81ca2296f5abb4592749bfba';
  Countly.url = 'http://mobile-analytics.showjoy.net/'; 
  
  (function() {
    var cly = document.createElement('script');
    cly.type = 'text/javascript';
    cly.async = true;
    cly.src = 'https://mobile-analytics.showjoy.net/sdk/web/countly.min.js'; 
    cly.onload = function(){
      Countly.init()
    };
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(cly, s);
  })();
  
  Countly.q.push(['track_sessions']); // 自动跟踪用户会话
  Countly.q.push(['track_pageview']); // 跟踪页面浏览数
  Countly.q.push(['track_clicks']); // 自动化跟踪最后点击并显示在热图，企业版可用，暂不可用
  Countly.q.push(['track_errors']); // 跟踪Javascript错误
  Countly.q.push(['track_links']); // 跟踪链接点击
  Countly.q.push(['track_forms']); // 跟踪表单提交

```
