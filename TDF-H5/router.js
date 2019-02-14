import Vue from 'vue'
import Router from 'vue-router'
const interopDefault = function(promise) {
  return promise.then(m => m.default || m)
}
import Home from '~/view/home.vue'
import Project from '~/view/project/index.vue'
import Details from '~/view/project/free/details.vue'
const scrollBehavior = function(to, from, savedPosition) {
  if (savedPosition || typeof savedPosition == 'undefined') {
    //从第二页返回首页时savePosition为undefined
    //只处理设置了路由元信息的组件
    from.meta.isKeepAlive = typeof from.meta.isKeepAlive == 'undefined' ? undefined : false
    to.meta.isKeepAlive = typeof to.meta.isKeepAlive == 'undefined' ? undefined : true
    if (savedPosition) {
      return savedPosition
    }
  } else {
    from.meta.isKeepAlive = typeof from.meta.isKeepAlive == 'undefined' ? undefined : true
    to.meta.isKeepAlive = typeof to.meta.isKeepAlive == 'undefined' ? undefined : false
  }
}
Vue.use(Router)
export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior(to, from, savePosition) {
      // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
      console.log(to) // to：要进入的目标路由对象，到哪里去
      console.log(from) // from：离开的路由对象，哪里来
      console.log(savePosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
      // console.log(to.document.documentElement.scrollTop)
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      {
        path: '/',
        component: () => interopDefault(import('~/view/home.vue'))
      },
      {
        path: '/project',
        component: () => interopDefault(import('~/view/project/index.vue')),
        meta: { isKeepAlive: true }
      },
      {
        path: '/project/details',
        component: () => interopDefault(import('~/view/project/free/details.vue')),
        meta: {
          keepAlive: true
        }
      }
    ]
  })
}



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
