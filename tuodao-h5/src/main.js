import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// 300毫秒延迟
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
Vue.use(VueResource)
Vue.http.headers.common['requestType'] = 'APP'
Vue.http.headers.common['sign'] = 'NO'
Vue.http.options.headers = {
	'Content-Type': 'application/text; charset=UTF-8'
}
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
