import Vue from 'vue'
import Router from 'vue-router'
import demo1 from 'components/demo1/demo1'
import demo2 from 'components/demo2/demo2'
import demo3 from 'components/demo3/demo3'
import demo4 from 'components/demo4/demo4'
import inform from 'components/inform/inform'
import infoAbout from 'components/inform/info_about/info_about'
import aboutTd from 'components/inform/info_about/about_td'
import aboutStaff from 'components/inform/info_about/about_staff'
import aboutPapers from 'components/inform/info_about/about_papers'
import aboutFrame from 'components/inform/info_about/about_frame'
import infoTerrace from 'components/inform/info_about/info_terrace'
import infoBank from 'components/inform/info_about/info_bank'
import infoBoard from 'components/inform/info_about/info_board'
import infoShare from 'components/inform/info_about/info_share'
import infoGreat from 'components/inform/info_about/info_great'
import infoLaw from 'components/inform/info_law/info_law'
import lawXx from 'components/inform/info_law/law/law_xx'
import lawJd from 'components/inform/info_law/law/law_jd'
import lawZjdj from 'components/inform/info_law/law/law_zjdj'
import lawZjcg from 'components/inform/info_law/law/law_zjcg'
import lawZjyw from 'components/inform/info_law/law/law_zjyw'
import lawDx from 'components/inform/info_law/law/law_dx'
import lawCj from 'components/inform/info_law/law/law_cj'
import lawFx from 'components/inform/info_law/law/law_fx'
import lawGf from 'components/inform/info_law/law/law_gf'
import lawKz from 'components/inform/info_law/law/law_kz'
import lawBl from 'components/inform/info_law/law/law_bl'
import lawFf from 'components/inform/info_law/law/law_ff'
import lawSl from 'components/inform/info_law/law/law_sl'
import lawMj from 'components/inform/info_law/law/law_mj'
import infoSafety from 'components/inform/info_safety/info_safety'
import infoRisk from 'components/inform/info_risk/info_risk'
import infoKnowus from 'components/inform/info_knowus/info_knowus'
import knowTd from 'components/inform/info_knowus/know_td'
import knowPatt from 'components/inform/info_knowus/know_patt'
import knowAdva from 'components/inform/info_knowus/know_adva'
import knowTeam from 'components/inform/info_knowus/know_team'
import knowContact from 'components/inform/info_knowus/know_contact'
import infoOper from 'components/inform/info_oper/info_oper'
import operYiji2016 from 'components/inform/info_oper/oper_2016_1'
import operErji2016 from 'components/inform/info_oper/oper_2016_2'
import operErji2017 from 'components/inform/info_oper/oper_2017_2'
import operSanji2017 from 'components/inform/info_oper/oper_2017_3'
import oper2017M7 from 'components/inform/info_oper/oper_2017_m7'
import oper2017M8 from 'components/inform/info_oper/oper_2017_m8'
import oper2017M10 from 'components/inform/info_oper/oper_2017_m10'
import infoPlatform from 'components/inform/info_platform/info_platform'
import platData from 'components/inform/info_platform/plat_data'
import platInvest from 'components/inform/info_platform/plat_invest'
import platEchart from 'components/inform/info_platform/plat_echart'
import selectBank from 'components/select_bank/select_bank'
import investSift from 'components/invest/invest_sift/investSift'
import siftIntr from 'components/invest/invest_sift/sift_intr'
import siftSafe from 'components/invest/invest_sift/sift_safe'
import siftIssue from 'components/invest/invest_sift/sift_issue'
import siftAddList from 'components/invest/invest_sift/sift_addList'
import addResult from 'components/invest/add_result'
import riskDetails from 'components/invest/risk_details'

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
		},
		{
			path: '/info_safety',
			component: infoSafety
		},
		{
			path: '/info_risk',
			component: infoRisk
		},
		{
			path: '/info_knowus',
			component: infoKnowus,
			redirect: '/know_td',
			children: [
				{
					path: '/know_td',
					component: knowTd
				},
				{
					path: '/know_patt',
					component: knowPatt
				},
				{
					path: '/know_adva',
					component: knowAdva
				},
				{
					path: '/know_team',
					component: knowTeam
				},
				{
					path: '/know_contact',
					component: knowContact
				}
			]
		},
		{
			path: '/info_oper',
			component: infoOper
		},
		{
			path: '/oper_2016_1',
			component: operYiji2016
		},
		{
			path: '/oper_2016_2',
			component: operErji2016
		},
		{
			path: '/oper_2017_2',
			component: operErji2017
		},
		{
			path: '/oper_2017_3',
			component: operSanji2017
		},
		{
			path: '/oper_2017_m7',
			component: oper2017M7
		},
		{
			path: '/oper_2017_m8',
			component: oper2017M8
		},
		{
			path: '/oper_2017_m10',
			component: oper2017M10
		},
		{
			path: '/info_platform',
			component: infoPlatform,
			redirect: '/plat_data',
			children: [
				{
					path: '/plat_data',
					component: platData
				},
				{
					path: '/plat_invest',
					component: platInvest
				},
				{
					path: '/plat_echart',
					component: platEchart
				}
			]
		},
		{
			path: '/select_bank',
			component: selectBank
		},
		{
			path: '/investSift',
			component: investSift,
			redirect: '/sift_intr',
			children: [
				{
					path: '/sift_intr',
					component: siftIntr
				},
				{
					path: '/sift_safe',
					component: siftSafe
				},
				{
					path: '/sift_issue',
					component: siftIssue
				},
				{
					path: '/sift_addList',
					component: siftAddList
				}
			]
		},
		{
			path: '/add_result',
			component: addResult
		},
		{
			path: '/risk_details',
			component: riskDetails
		}
	]
})
