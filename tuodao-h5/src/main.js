import Vue from 'vue'
import App from './App'
import router from './router'
// 300毫秒延迟
import fastclick from 'fastclick'

import 'common/stylus/index.styl'
import 'common/js/base.js'

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
