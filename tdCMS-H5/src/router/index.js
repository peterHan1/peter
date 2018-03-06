import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import List from '@/components/list/list'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/index',
			component: index,
			meta: {
				title: '首页'
			}
		},
		{
			path: '/list',
			component: List,
			meta: {
				title: '列表页'
			}
		}
	]
})
