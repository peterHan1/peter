import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import 'common/js/base.js'
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 接口地址
axios.defaults.baseURL = 'http://pub.51tuodao.com/'
router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0)
	window.document.title = to.meta.title
	next()
})
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})