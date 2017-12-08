import Vue from 'vue'
import Router from 'vue-router'
import share from 'components/invite/invite_share'
import rule from 'components/invite/invite_rule'
import friends from 'components/invite/invite_friends'
import record from 'components/invite/invite_record'
import download from 'components/invite/invite_download'
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
import oper2017M11 from 'components/inform/info_oper/oper_2017_m11'
import infoPlatform from 'components/inform/info_platform/info_platform'
import selectBank from 'components/select_bank/select_bank'
import investSift from 'components/invest/invest_sift/investSift'
import protocolC from 'components/invest/invest_sift/protocol_c'
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
import memberSystem from 'components/helpCenter/memberSystem'
import newRequire from 'components/helpCenter/newRequire'
import normal from 'components/helpCenter/normal'
import obligations from 'components/helpCenter/obligations'
import pointCoupon from 'components/helpCenter/pointCoupon'
import tjReward from 'components/helpCenter/tjReward'
import rechargeCash from 'components/helpCenter/rechargeCash'
import selfInvest from 'components/helpCenter/selfInvest'
import encyclopedia from 'components/helpCenter/encyclopedia'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/inform',
			component: inform,
			meta: {
				title: '信息披露'
			}
		},
		{
			path: '/info_about',
			component: infoAbout,
			meta: {
				title: '关于拓道'
			}
		},
		{
			path: '/info_terrace',
			component: infoTerrace,
			meta: {
				title: '关于拓道'
			}
		},
		{
			path: '/info_bank',
			component: infoBank,
			meta: {
				title: '关于拓道'
			}
		},
		{
			path: '/info_board',
			component: infoBoard,
			meta: {
				title: '关于拓道'
			}
		},
		{
			path: '/info_share',
			component: infoShare,
			meta: {
				title: '关于拓道'
			}
		},
		{
			path: '/info_great',
			component: infoGreat,
			meta: {
				title: '关于拓道'
			}
		},
		{
			path: '/info_law',
			component: infoLaw,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_xx',
			component: lawXx,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_jd',
			component: lawJd,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_zjdj',
			component: lawZjdj,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_zjcg',
			component: lawZjcg,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_zjyw',
			component: lawZjyw,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_dx',
			component: lawDx,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_cj',
			component: lawCj,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_fx',
			component: lawFx,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_gf',
			component: lawGf,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_kz',
			component: lawKz,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_bl',
			component: lawBl,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_ff',
			component: lawFf,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_sl',
			component: lawSl,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/law_mj',
			component: lawMj,
			meta: {
				title: '法律文件'
			}
		},
		{
			path: '/info_safety',
			component: infoSafety,
			meta: {
				title: '安全保障'
			}
		},
		{
			path: '/info_risk',
			component: infoRisk,
			meta: {
				title: '风险管理'
			}
		},
		{
			path: '/info_knowus',
			component: infoKnowus,
			meta: {
				title: '了解我们'
			}
		},
		{
			path: '/info_oper',
			component: infoOper,
			meta: {
				title: '运营报告'
			}
		},
		{
			path: '/oper_2016_1',
			component: operYiji2016,
			meta: {
				title: '拓道金服 2016年第一季度'
			}
		},
		{
			path: '/oper_2016_2',
			component: operErji2016,
			meta: {
				title: '拓道金服 2016年第二季度'
			}
		},
		{
			path: '/oper_2017_2',
			component: operErji2017,
			meta: {
				title: '拓道金服 2017年第二季度'
			}
		},
		{
			path: '/oper_2017_3',
			component: operSanji2017,
			meta: {
				title: '拓道金服 2017年第三季度'
			}
		},
		{
			path: '/oper_2017_m7',
			component: oper2017M7,
			meta: {
				title: '拓道金服 2017年7月份'
			}
		},
		{
			path: '/oper_2017_m8',
			component: oper2017M8,
			meta: {
				title: '拓道金服 2017年8月份'
			}
		},
		{
			path: '/oper_2017_m10',
			component: oper2017M10,
			meta: {
				title: '拓道金服 2017年10月份'
			}
		},
		{
			path: '/oper_2017_m11',
			component: oper2017M11,
			meta: {
				title: '拓道金服 2017年11月份'
			}
		},
		{
			path: '/info_platform',
			component: infoPlatform,
			meta: {
				title: '平台数据'
			}
		},
		{
			path: '/select_bank',
			component: selectBank,
			meta: {
				title: '选择银行'
			}
		},
		{
			path: '/investSift',
			component: investSift,
			meta: {
				title: '项目详情'
			}
		},
		{
			path: '/add_result',
			component: addResult,
			meta: {
				title: '加入结果'
			}
		},
		{
			path: '/risk_details',
			component: riskDetails,
			meta: {
				title: '风险提示书'
			}
		},
		{
			path: '/protocol_c',
			component: protocolC,
			meta: {
				title: '精选计划授权委托书'
			}
		},
		{
			path: '/investScatter',
			component: investScatter,
			meta: {
				title: '项目详情'
			}
		},
		{
			path: '/protocol_s',
			component: protocol,
			meta: {
				title: '借款协议'
			}
		},
		{
			path: '/investBond',
			component: investBond,
			meta: {
				title: '项目详情'
			}
		},
		{
			path: '/protocol_b',
			component: bondProtocol,
			meta: {
				title: '债权转让及受让协议'
			}
		},
		{
			path: '/newComer',
			component: newComer,
			meta: {
				title: '新手专区'
			}
		},
		{
			path: '/noticeDynamic',
			component: noticeDynamic,
			meta: {
				title: '详情'
			}
		},
		{
			path: '/rechargeExplain',
			component: rechargeExplain,
			meta: {
				title: '充值说明'
			}
		},
		{
			path: '/transferExplain',
			component: transferExplain,
			meta: {
				title: '转让说明'
			}
		},
		{
			path: '/couponExplain',
			component: couponExplain,
			meta: {
				title: '优惠券使用说明'
			}
		},
		{
			path: '/pointExplain',
			component: pointExplain,
			meta: {
				title: '积分说明'
			}
		},
		{
			path: '/pointTask',
			component: pointTask,
			meta: {
				title: '我要积分'
			}
		},
		{
			path: '/blankDeposit',
			component: blankDeposit,
			meta: {
				title: '银行存管'
			}
		},
		{
			path: '/excellentPlan',
			component: excellentPlan,
			meta: {
				title: '精选计划'
			}
		},
		{
			path: '/investBack',
			component: investBack,
			meta: {
				title: '投资回款'
			}
		},
		{
			path: '/loginRegister',
			component: loginRegister,
			meta: {
				title: '注册登录'
			}
		},
		{
			path: '/memberSystem',
			component: memberSystem,
			meta: {
				title: '会员体系'
			}
		},
		{
			path: '/newRequire',
			component: newRequire,
			meta: {
				title: '新手必读'
			}
		},
		{
			path: '/normal',
			component: normal,
			meta: {
				title: '常见问题'
			}
		},
		{
			path: '/obligations',
			component: obligations,
			meta: {
				title: '债权转让'
			}
		},
		{
			path: '/pointCoupon',
			component: pointCoupon,
			meta: {
				title: '积分和优惠券'
			}
		},
		{
			path: '/tjReward',
			component: tjReward,
			meta: {
				title: '推荐奖励'
			}
		},
		{
			path: '/rechargeCash',
			component: rechargeCash,
			meta: {
				title: '充值提现'
			}
		},
		{
			path: '/selfInvest',
			component: selfInvest,
			meta: {
				title: '自动投标'
			}
		},
		{
			path: '/encyclopedia',
			component: encyclopedia,
			meta: {
				title: '理财百科'
			}
		},
		{
			path: '/share',
			component: share,
			meta: {
				title: '分享链接'
			}
		},
		{
			path: '/rule',
			component: rule,
			meta: {
				title: '邀请规则'
			}
		},
		{
			path: '/friends',
			component: friends,
			meta: {
				title: '邀请好友'
			}
		},
		{
			path: '/record',
			component: record,
			meta: {
				title: '邀请记录'
			}
		},
		{
			path: '/feedback',
			component: feedback,
			meta: {
				title: '帮助与反馈'
			}
		},
		{
			path: '/rates',
			component: rates,
			meta: {
				title: '收费标准'
			}
		},
		{
			path: '/center',
			component: center,
			meta: {
				title: '会员中心'
			}
		},
		{
			path: '/rules',
			component: rules,
			meta: {
				title: '会员规则'
			}
		},
		{
			path: '/privilege',
			component: privilege,
			meta: {
				title: '了解等级特权'
			}
		},
		{
			path: '/lotteryRule',
			component: lotteryRule,
			meta: {
				title: '活动规则'
			}
		},
		{
			path: '/lotterys',
			component: lotterys,
			meta: {
				title: '积分抽奖'
			}
		},
		{
			path: '/prize',
			component: prize,
			meta: {
				title: '我的奖品'
			}
		},
		{
			path: '/download',
			component: download,
			meta: {
				title: 'app下载页'
			}
		}
	]
})

