/**
 * Created by yongyuehuang on 2017/4/19.
 */
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import VueResource from 'vue-resource';

Vue.use(VueResource); //http请求注册
Vue.use(VueRouter); //路由注册
// 实例化路由
const router = new VueRouter({
    // mode: 'history', //H5 路由模式，需要服务端做渲染防止404错误
    base: __dirname,
    linkActiveClass: 'on',
    routes
})

let render = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});

render;

// if (module.hot) {
//     非必须
//     module.hot.accept('./App.vue', () => render);
// }
