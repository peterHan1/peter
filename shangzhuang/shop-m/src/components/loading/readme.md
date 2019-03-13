### Loading 使用介绍

#### 用途: 加载中提示遮罩，用于类似异步请求过程中等待返回数据时显示，joy-ui-loading元素遮盖全屏，可避免用户再次操作

#### 使用方法:
```javascript
var Loading = require('components/loading/loading');

// 显示遮罩

Loading.show(string);

// string参数为字符串，可配可不配。默认值：加载中...

// 隐藏遮罩

Loading.hide();

```