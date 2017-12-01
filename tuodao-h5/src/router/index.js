import Vue from 'vue'
import Router from 'vue-router'
import share from 'components/invite/invite_share'
import rule from 'components/invite/invite_rule'
import friends from 'components/invite/invite_friends'
import record from 'components/invite/invite_record'
import center from 'components/member/member_center'
import rules from 'components/member/member_rule'
import privilege from 'components/member/member_privilege'
import lotteryRule from 'components/lottery/lottery_rule'
import lotterys from 'components/lottery/lottery_lotterys'
import prize from 'components/lottery/lottery_prize'
import inform from 'components/inform/inform'
import infoAbout from 'components/inform/info_about/info_about'
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
import infoOper from 'components/inform/info_oper/info_oper'
import operYiji2016 from 'components/inform/info_oper/oper_2016_1'
import operErji2016 from 'components/inform/info_oper/oper_2016_2'
import operErji2017 from 'components/inform/info_oper/oper_2017_2'
import operSanji2017 from 'components/inform/info_oper/oper_2017_3'
import oper2017M7 from 'components/inform/info_oper/oper_2017_m7'
import oper2017M8 from 'components/inform/info_oper/oper_2017_m8'
import oper2017M10 from 'components/inform/info_oper/oper_2017_m10'
import infoPlatform from 'components/inform/info_platform/info_platform'
import selectBank from 'components/select_bank/select_bank'
import investSift from 'components/invest/invest_sift/investSift'
import entrust from 'components/invest/invest_sift/entrust'
import addResult from 'components/invest/add_result'
import riskDetails from 'components/invest/risk_details'
import investScatter from 'components/invest/invest_scatter/investScatter'
import protocol from 'components/invest/invest_scatter/protocol_s'
import investBond from 'components/invest/invest_bond/investBond'
import bondProtocol from 'components/invest/invest_bond/protocol_b'
import newComer from 'components/newComer/newComer'
import noticeDynamic from 'components/noticeDynamic/noticeDynamic'
import rechargeExplain from 'components/rechargeExplain/rechargeExplain'
import transferExplain from 'components/transferExplain/transferExplain'
import couponExplain from 'components/couponExplain/couponExplain'
import pointExplain from 'components/myPoint/pointExplain'
import pointTask from 'components/myPoint/pointTask'
import feedback from 'components/helpCenter/feedback'
import rates from 'components/helpCenter/rates'
import blankDeposit from 'components/helpCenter/blankDeposit'
import excellentPlan from 'components/helpCenter/excellentPlan'
import investBack from 'components/helpCenter/investBack'
import loginRegister from 'components/helpCenter/loginRegister'
import menberSystem from 'components/helpCenter/menberSystem'
import newRequire from 'components/helpCenter/newRequire'
import normal from 'components/helpCenter/normal'
import obligations from 'components/helpCenter/obligations'
import pointCoupon from 'components/helpCenter/pointCoupon'
import prizes from 'components/helpCenter/prizes'
import rechargeCash from 'components/helpCenter/rechargeCash'
import selfInvest from 'components/helpCenter/selfInvest'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/inform',
			component: inform
		},
		{
			path: '/info_about',
			component: infoAbout
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
			component: infoKnowus
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
			component: infoPlatform
		},
		{
			path: '/select_bank',
			component: selectBank
		},
		{
			path: '/investSift',
			component: investSift
		},
		{
			path: '/add_result',
			component: addResult
		},
		{
			path: '/risk_details',
			component: riskDetails
		},
		{
			path: '/entrust',
			component: entrust
		},
		{
			path: '/investScatter',
			component: investScatter
		},
		{
			path: '/protocol_s',
			component: protocol
		},
		{
			path: '/investBond',
			component: investBond
		},
		{
			path: '/protocol_b',
			component: bondProtocol
		},
		{
			path: '/newComer',
			component: newComer
		}, {
			path: '/noticeDynamic',
			component: noticeDynamic
		}, {
			path: '/rechargeExplain',
			component: rechargeExplain
		}, {
			path: '/transferExplain',
			component: transferExplain
		}, {
			path: '/couponExplain',
			component: couponExplain
		}, {
			path: '/pointExplain',
			component: pointExplain
		}, {
			path: '/pointTask',
			component: pointTask
		}, {
			path: '/rates',
			component: rates
		}, {
			path: '/blankDeposit',
			component: blankDeposit
		}, {
			path: '/excellentPlan',
			component: excellentPlan
		}, {
			path: '/investBack',
			component: investBack
		}, {
			path: '/loginRegister',
			component: loginRegister
		}, {
			path: '/menberSystem',
			component: menberSystem
		}, {
			path: '/newRequire',
			component: newRequire
		}, {
			path: '/normal',
			component: normal
		}, {
			path: '/obligations',
			component: obligations
		}, {
			path: '/pointCoupon',
			component: pointCoupon
		}, {
			path: '/prizes',
			component: prizes
		}, {
			path: '/rechargeCash',
			component: rechargeCash
		}, {
			path: '/selfInvest',
			component: selfInvest
		},
		{
			path: '/share',
			component: share
		},
		{
			path: '/rule',
			component: rule
		},
		{
			path: '/friends',
			component: friends
		},
		{
			path: '/record',
			component: record
		},
		{
			path: '/feedback',
			component: feedback
		},
		{
			path: '/rates',
			component: rates
		},
		{
			path: '/center',
			component: center
		},
		{
			path: '/rules',
			component: rules
		},
		{
			path: '/privilege',
			component: privilege
		},
		{
			path: '/lotteryRule',
			component: lotteryRule
		},
		{
			path: '/lotterys',
			component: lotterys
		},
		{
			path: '/prize',
			component: prize
		}
	]
})

