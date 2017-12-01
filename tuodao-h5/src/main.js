import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// 300毫秒延迟
import fastclick from 'fastclick'
import 'common/stylus/index.styl'

Vue.use(VueResource)
Vue.http.headers.common['requestType'] = 'APP'
Vue.http.headers.common['accessId'] = ' 0b33346e448cb2e5d3c8a743e7088377'
Vue.http.headers.common['accessKey'] = 'yjc0nwu0nwm4otvim2zhmzjhzjc1n2rjnmi3owq4zmy='
Vue.http.headers.common['sign'] = 'NO'
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
	console.log(this)// 此处this为请求所在页面的Vue实例
	// continue to next interceptor
	next((response) => { // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
		if (response.body.code === 401) { // 与后台约定登录失效的返回码
			parent.location.href = '/login.vue'
		} else {
			return response
		}
	})
})
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
