import Vue from 'vue'
import Router from 'vue-router'
import demo1 from 'components/demo1/demo1'
import demo2 from 'components/demo2/demo2'
import demo3 from 'components/demo3/demo3'
import demo4 from 'components/demo4/demo4'
import inform from 'components/inform/inform'
import infoAbout from 'components/info_about/info_about'
import aboutTd from 'components/info_about/about_td'
import aboutStaff from 'components/info_about/about_staff'
import aboutPapers from 'components/info_about/about_papers'
import aboutFrame from 'components/info_about/about_frame'
import infoTerrace from 'components/info_terrace/info_terrace'
import infoBank from 'components/info_bank/info_bank'
import infoBoard from 'components/info_board/info_board'
import infoShare from 'components/info_share/info_share'
import infoGreat from 'components/info_great/info_great'
import infoLaw from 'components/info_law/info_law'
import lawXx from 'components/law/law_xx'
import lawJd from 'components/law/law_jd'
import lawZjdj from 'components/law/law_zjdj'
import lawZjcg from 'components/law/law_zjcg'
import lawZjyw from 'components/law/law_zjyw'
import lawDx from 'components/law/law_dx'
import lawCj from 'components/law/law_cj'
import lawFx from 'components/law/law_fx'
import lawGf from 'components/law/law_gf'
import lawKz from 'components/law/law_kz'
import lawBl from 'components/law/law_bl'
import lawFf from 'components/law/law_ff'
import lawSl from 'components/law/law_sl'
import lawMj from 'components/law/law_mj'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/demo1'
		},
		{
			path: '/demo1',
			component: demo1
		},
		{
			path: '/demo2',
			component: demo2
		},
		{
			path: '/demo3',
			component: demo3
		},
		{
			path: '/demo4',
			component: demo4
		},
		{
			path: '/inform',
			component: inform
		},
		{
			path: '/info_about',
			component: infoAbout,
			redirect: '/about_td',
			children: [
				{
					path: '/about_td',
					component: aboutTd
				},
				{
					path: '/about_staff',
					component: aboutStaff
				},
				{
					path: '/about_papers',
					component: aboutPapers
				},
				{
					path: '/about_frame',
					component: aboutFrame
				}
			]
		},
		{
			path: '/info_terrace',
			component: infoTerrace
		},
		{
			path: '/info_bank',
			component: infoBank
		},
		{
			path: '/info_board',
			component: infoBoard
		},
		{
			path: '/info_share',
			component: infoShare
		},
		{
			path: '/info_great',
			component: infoGreat
		},
		{
			path: '/info_law',
			component: infoLaw
		},
		{
			path: '/law_xx',
			component: lawXx
		},
		{
			path: '/law_jd',
			component: lawJd
		},
		{
			path: '/law_zjdj',
			component: lawZjdj
		},
		{
			path: '/law_zjcg',
			component: lawZjcg
		},
		{
			path: '/law_zjyw',
			component: lawZjyw
		},
		{
			path: '/law_dx',
			component: lawDx
		},
		{
			path: '/law_cj',
			component: lawCj
		},
		{
			path: '/law_fx',
			component: lawFx
		},
		{
			path: '/law_gf',
			component: lawGf
		},
		{
			path: '/law_kz',
			component: lawKz
		},
		{
			path: '/law_bl',
			component: lawBl
		},
		{
			path: '/law_ff',
			component: lawFf
		},
		{
			path: '/law_sl',
			component: lawSl
		},
		{
			path: '/law_mj',
			component: lawMj
		}
	]
})
