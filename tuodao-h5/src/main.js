import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// 300毫秒延迟
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
Vue.use(VueResource)

router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0)
	window.document.title = to.meta.title
	next()
})

Vue.http.options.root = 'http://72.127.2.140:8080'
Vue.http.headers.common['requestType'] = 'APP'
Vue.http.headers.common['sign'] = 'NO'
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
