import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import List from '@/components/list/list'
import Details from '@/components/details/details'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/index',
			name: 'index',
			component: index,
			meta: {
				title: '首页'
			}
		},
		{
			path: '/list',
			name: 'list',
			component: List,
			meta: {
				title: '列表页'
			}
		},
		{
			path: '/details',
			name: 'details',
			component: Details,
			meta: {
				title: '测试大图'
			}
		}
	]
})
