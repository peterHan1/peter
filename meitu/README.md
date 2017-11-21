# vue2.0仿手机版美图官网
看着各位大神的vue项目泉涌而出,本阶段正在学习Vue的小小白也打算亲自操起键盘来感受一把Vue世界的美好~~

**线上体验** <br>
   [在线demo](https://zsqio.github.io/vue-meitu-demo/vuex-meitu-demo/index.html#/) （切换到移动端模式预览效果更佳~）<br>
   [Github源码](https://github.com/zsqio/vue-meitu)  <br>

**技术栈** <br>
  * vue2.0
  * vue-router     spa开发
  * vuex           专为 Vue.js 应用程序开发的状态管理模式,集中式存储管理应用的所有组件的状态
  * axios          一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端
  * mint-ui        基于vue.js的移动端组件库 帮助快速搭建页面
  * easy-mock      前后端分离，提供数据接口
  * html5 css3  <br>
  
**页面预览** <br>
![image](https://github.com/zsqio/vue-meitu-demo/blob/master/vuex-meitu-demo/demo-images/7.gif) <br>
![image](https://github.com/zsqio/vue-meitu-demo/blob/master/vuex-meitu-demo/demo-images/1.gif) <br>

 ## 主要实现功能 <br>
  **商品信息展示**  <br>
  * 轮播图
  * mint-ui navbar 切换商品信息，产品参数
  * Toast 用户提醒信息
  * 主页面展示 <br>
  
  **手机预约** <br>
  预约功能的实现主要在state中添加一个预约商品数组，当预约了商品后就使用数组的push方法将商品加入预约数组中，然后再我的预约页面就可以查看你预约的商品，同时你也可以取消预约，这就更简单了，直接将预约数组清空，当然这只只有一条预约消息的情况下，如果有多条记录，就可以借助splice方法进行数组切割。详细实现可以参考代码。 <br>  
  
  ### 购物车 <br>
  * **加入购物车** <br>
  包括两种状态: <br>
  1. 加入的商品在购物车中已经存在， 该商品已经存在购物车中,此时商品数量+1即可 <br>
  2. 商品不在购物车,将新加入的商品信息push进cartList    <br>
  * **删除商品**  <br>
  根据根据选中即将删除商品的id在cartList中遍历出该商品并给予删除,因为我在state里是一个数组暂存购物车中的商品， <br>
  所以可以使用数组的splice方法将指定下标的某个商品删除,即 cartList.splice(index, 1) <br>
  * **商品支付** <br>
  根据用户选中前往支付的商品动态的显示需要支付的总金额,此时购物车中的商品如同一个个复选按钮，可选可不选，可单选可多选, <br>
  使用户的购物体验更好,这些共享状态之间相互切换，来及时驱动界面的渲染
  * **用户登录状态判断** <br>  
  在提交订单和立即购买时,需要对用户的登录状态进行判断 <br>
  通过return this.$store.state.login 来获取登录状态
  * **用户收货地址生成**    <br>
  提交订单时 若用户未生成收货地址 前往设置收货地址 <br>
  此处我借用localstorage来存储收货地址信息，当用户再次登录时,则不需要再次设置收货地址 <br>
  * **生成订单** <br>
  用户选中商品后生成相应订单 <br>
  commit mutations ['CREATE_ORDER']  <br>
  * **查看订单** <br>
  支付操作完成后，在登录的情况下用户可在个人中心查看我的订单 <br>
  * **购物车更新** <br>
  已经支付生成订单的商品从购物车中“消失”,已经加入购物车但还未支付的商品继续保留其原有的状态 <br>
  这些状态间的切换，以及组件的更新都仰仗Vuex的响应式状态存储
      
      
  ## 小结 
   1. 采用rem 自适应布局，移动端必备,但使用时需注意rem是相对于根元素<html>,建议项目初期就严格使用rem进行布局，会减少后期的适配工作
   2. 初学vue,使用methods和computed可能会存在一定误区，首先需要明白computed是计算属性，实时响应数据的更新，而methods是方法，必须有一定条件去触发，可能这样说上去还是不够清晰明了，那么就请仔细阅读下面这段话：
     计算属性是基于它的依赖缓存。计算属性只有在它的相关依赖发生改变时才会重新取值。这就意味着只要 message 没有发生改变，
     多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。每当重新渲染的时候，method 调用总会执行函数。
     也就是说只要不是直接使用浏览器刷新页面，当我们改变数据、DOM操作等引起页面重新渲染时，计算属性会直接使用缓存，不会重新执行函数。
     适合那些计算量很大且改变频率很低的属性；如果使用methods，每次页面重新渲染时都会重新执行methods函数。
   3. v-if 和 v-show 的使用,两者都是动态的显示DOM元素,但两者存在区别,性能消耗也不同，若是频繁的切换状态建议使用v-show
   4. vuex使用：
     - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化,
     那么相应的组件也会相应地得到高效更新。
     - 我们不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。<br>
     关于Vuex你想了解更多？一起去看文档吧（https://vuex.vuejs.org/zh-cn/） 这样你离大牛又进了一步~
   5. 本项目需要继续完善的模块： <br>
   * 搜索功能 现在已经可以搜索了，主要是依赖easy-mock 构造假数据，然后根据输入的关键字匹配，axios异步请求数据，再将数据渲染到页面上
   * 手机预约 这个功能也已经初步实现，但还略显粗糙，会进一步完善~  毕竟学习永远没有尽头，就像喝了脉动一样，根本停不下来~~~  <br>
   

   ## Build Setup

    ```
    bash
    # install dependencies
    npm install

    # serve with hot reload at localhost:8080
    npm run dev

    # build for production with minification
    npm run build

    # build for production and view the bundle analyzer report
    npm run build --report
    ```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


