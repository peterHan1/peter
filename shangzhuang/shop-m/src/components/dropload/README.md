## dropLoad上拉加载
----------
移动端上拉加载更多的插件。

----------
### 使用方法

```
var DropLoad = require('components/dropload/dropload'); 
```

```
new DropLoad('.j_Container', { //初始化的对象为包含内容的div，下面介绍
    scrollArea : window,
    loadDownFn : function(me){
        
        //业务逻辑，在菊花出现后异步请求数据，渲染页面
        $.ajax({
            type: 'GET',
            url: '',
            dataType: 'json',
            success: function(data){
                // 必须 请求到初始屏数据后解锁 
                me.unlock()
                
                alert(data);
                
                //在判断没有更多内容后必须锁定
                me.lock();
                
                // 成功或失败最后必须重置
                me.resetload();
            },
            error: function(xhr, type){
                alert('Ajax error!');
                me.resetload();
            }
        });
    }
});
```

### 参数

scrollArea（必选）

```
scrollArea 若滑动的区域为window，则必选window属性
```

domDown（选填）

```
domDown : {
    domContent: '<div style="position: fixed;bottom:0;width:375px;height:35px; line-height:35px; text-align:center" class="j_FixedBottom"><img style="display:block;width:32px;height:32px;margin:0 auto" class="" src="//cdn1.showjoy.com/images/gif/5-121204193R5-50.gif"></div>',
    domClass: 'j_FixedBottom'
            }
说明：domContent是菊花区块样式的html，内嵌style。domClass是菊花区块的js钩子
```

distance（选填）

```
distance : 50,  // 拉动距离 在距离屏幕最低端多远开始加载内容
```

loadDownFn （必选）

```
loadDownFn: function(me) {
    
    $.ajax({}).done(function () {
        // 必须 请求到初始屏数据后解锁 
        me.unlock()


        //在判断没有更多内容后必须锁定
        me.lock();
        
        // 代码执行后必须重置
        me.resetload();
    })
}
说明：在异步加载过程中需要判断当前加载来的内容是不是为空，如空，则lock，关闭掉下拉的逻辑。
resetload()在业务逻辑的最底部一定加上，初始化一些参数。
```
initLoadFn （选填）

```
initLoadFn: function (me) {
    $.ajax({}).done(function () {
        // 必须 请求到初始屏数据后解锁 
        me.unlock()
    
    
        xxx
    
        //在判断没有更多内容后必须锁定
        me.lock();  

        // 代码执行后必须重置
        me.resetload();
    })
}
```
### initLoadFn和loadDownFn回调函数中me参数

`me.lock()`

判断当前服务端返回的数据条数小于请求的设定值时，锁定。

`me.unlock()`

initLoadFn和loadDownFn中异步请求成功后进行解锁。

`me.append(html)`

append数据

`me.html(html)`

使用zepto的html方法

`me.resetload()`

loadDownFn中调用，重置状态（在回调中的末尾调用）

`me.$domResult`

菊花处的dom，可以改变此处的dom结构样式等。

### HTML

```
<div class="container j_Container">
  <div class="list-box j_ListBox">
    <p></p>
    <p></p>
    <p></p>
    ...
  </div>
</div>

说明：一定要有一个包含div(j_Container),没有实际作用，用来初始化调用插件。里面还要有一个包含lists的div，用来在异步加载内容时作为append的主体。
```