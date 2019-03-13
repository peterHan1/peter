## m-picker使用文档

### 简介

**m-picker** 是一款模拟 *ios* 移动端选择框的组件,既可以实现普通选择器的效果,也可以扩展为地址选择器,日期时间选择器.基于zepto,所以必须事先
引入zepto.js

### 用法

使用之前需要一个input框,选择过程中值得变化是实时展示在input中
```
  <input type="text" id="J_Picker">
```


```
var picker = require("fecomponent/mobi-m-picker");
var myPicker = new picker(); //一个对象对应一个选择器

myPicker.init(ele,type,params);
myPicker.setValue(["北京","西城区"]);
myPicker.close();
myPicker.open();
```

#### 普通选择器

```
var picker = require("fecomponents/m-picker/index");

var myPicker = new picker();

myPicker.init($("#J_Picker"),"normal",{
  toolbarTemplate: '<header class="bar bar-nav">'+
  '<button class="button button-link pull-left">按钮</button>'+
  '<button class="button button-link pull-right close-picker">确定</button>'+
  '<h1 class="title">标题</h1>'+
  '</header>',
  cols: [
    {
      textAlign: 'center',
      values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
    }
  ]
});
```

![image](//cdn1.showjoy.com/images/49/490997a524304669b80f6d60bbd103c7.png)

#### 多列选择器

```
var picker = require("fecomponents/m-picker/index");

var myPicker = new picker();

myPicker.init($("#J_Picker"),"normal",{
  toolbarTemplate: '<header class="bar bar-nav">'+
  '<button class="button button-link pull-right close-picker">确定</button>'+
  '<h1 class="title">请选择称呼</h1>'+
  '</header>',
  cols: [
    {
      textAlign: 'center',
      values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
      //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
    },
    {
      textAlign: 'center',
      values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
    },
    {
      textAlign: 'center',
      values: ['先生', '小姐']
    }
  ]
});
```

![image](//cdn1.showjoy.com/images/88/885e0376a39c48819d28c6d724ba4321.png)


#### 地址选择器
**使用默认** 

```
var picker = require("fecomponents/m-picker/index");

var myPicker = new picker();

myPicker.init($("#J_Picker"),"city");
```

**可自定义头部** 


```
var picker = require("fecomponents/m-picker/index");

var myPicker = new picker();

myPicker.init($("#J_Picker"),"city",{
  toolbarTemplate: '<header class="bar bar-nav">'+
    '<button class="button button-link pull-right close-picker">确定</button>'+
    '<h1 class="title">选择收货地址</h1>'+
    '</header>'
});
```

![image](//cdn1.showjoy.com/images/7b/7b5f044f93184c9b982f71006382bdec.png)

#### 时间选择器

```
myPicker.init($("#J_Picker"),"date",{
    value: ['1985', '12', '04', '9', '34']
});
```


## 所有方法

```init(args)``` 函数包括三个参数:

* **ele** 是一个zepto元素对象
* **type** 决定是普通选择器还是城市选择器，可选为其下两者之一
  * **"normal"** 普通
  * **"city"** 城市
* **params** 你可以通过设置 toolbarTemplate 参数来自定义工具栏模板。在 cols 参数中可以传入多列值，所有参数如下：

![image](//cdn1.showjoy.com/images/cb/cbf3abbf4b784b0bbd8a7c23349ae602.png)

```setValue(args)``` 包含一个参数，参数为一个数组，用来设置input中的值。

```
myPicker.setValue(["北京","西城区"]);

```

```open()``` 打开选择器  //直接点击input框即可打开选择器，这个方法是用来手动触发打开事件。

```
myPicker.open();
```

```close()``` 关闭选择器

```
myPicker.close();
```