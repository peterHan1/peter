# dialog 弹框组件使用说明

## 组件引用方法

```javascript
var dialog = require('components/dialog/dialog');
```

>说明：dialog组件使用不需要重复定义弹出框消失函数，已集成至组件中。

## dialog组件类型与使用方法
### pop弹出框
![](//cdn1.showjoy.com/images/7f/7f4aed62efcd4032afcf0da7287eaa44.png)

**参数说明**
- @param {[string]} title [提示标题]
- @param {[string]} message [提示内容]
- content: [{string 自定义html | zepto dom 对象}]

使用示例：

```javascript
Dialog.pop(‘收益规则说明’, null, 'contentHTML');
```

### confirm弹出框
![](//cdn1.showjoy.com/images/91/915065d96328414a92c111422fe99504.png)

**参数说明**
@param {[object]} {}
- title: [{string} 提示标题]
- [subtitle: [{string} 副提示内容]] (可选)
- btntext: [{string} 按钮文案]
- [callback: [{function} 回调]] (可选)
- content: [{string 自定义html | zepto dom 对象}]


使用示例：

```javascript
Dialog.confirm({
  title: '地址保存成功',
  btntext: '确认',
  content: 'content = '<div class="dialog-option-container">' + htmlWithdraw + htmlOpenShop + '</div>';'
  callback: function() {
    $('#J_AddressAllIn').submit();
  }
});
```

### iconConfirm弹出框
![](//cdn1.showjoy.com/images/ba/ba8fd97c73fe47c5922f2387b2d39302.png)

**参数说明**
@param {[object]}
- icon: [{string} icon字符编码]
- message: [{string} 提示内容]
- btntext: [{string} 按钮文案]
- [callback: [{function} 回调]] (可选)


使用示例：

```javascript
Dialog.iconConfirm({
  icon: '&#xe608;',
  message: '你已经开过店了哦',
  btntext: '确认'
});
```

### iconConfirm弹出框
![](//cdn1.showjoy.com/images/47/47c8138632fe4d2a83ebd2c851771b01.png)

**参数说明**
@param {[object]}
- title: [{string} 提示标题]
- btn: [{Array} 按钮数组]（有且只能有2个）
	- {btntext: [{string} 按钮信息], callback: [{function} 回调}] (callback可选)
	- {btntext: [{string} 按钮信息], callback: [{function} 回调}] (callback可选)

使用示例：

```javascript
Dialog.alert({
	title: '是否确认收货？',
	btn: [{
		btntext: '取消',
	}, {
		btntext: '确定',
		callback: function() {}
	}]
});
```

### toast弹出框 - 自动消失提示框

**参数说明**
- @param  {[string]} message [提示消息]
- @param  {[number]} time    [消失时间, 默认3000] (可选)

使用示例：

```javascript
Dialog.toast(‘example’);
```

### wxShare弹出框
![](//cdn1.showjoy.com/images/c3/c3e224af0918421781476b3f30d331f5.png)

使用示例：
```javascript
Dialog.wxShare();
```

### select浮出层选项
![](//cdn1.showjoy.com/images/25/25d34be1e6434db09c59eab1c999f3ab.png)
使用实例：
 dialog.select({
    items: [
      {
        text: '1',
        datas: '2222',
        callback: function() {
          alert(0);
        }
      },
      {
        text: '2',
        datas: '2222',
        callback: function() {
          alert(1);
        }
      }
    ]
  });

