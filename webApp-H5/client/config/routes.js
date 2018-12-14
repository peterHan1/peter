export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/infoShow',
    component: () => import('views/info-show/index.vue')
  },
  {
    path: '/infoShow/about',
    component: () => import('views/info-show/about.vue'),
    children: [
      {
        path: 'platform',
        component: () => import('views/info-show/platform.vue')
      },
      {
        path: 'organize',
        component: () => import('views/info-show/organize.vue')
      },
      {
        path: 'personnel',
        component: () => import('views/info-show/personnel.vue')
      },
      {
        path: 'papers',
        component: () => import('views/info-show/papers.vue')
      },
      {
        path: 'corporation',
        component: () => import('views/info-show/corporation.vue')
      }
    ]
  },
  {
    path: '/exam',
    component: () => import('views/inform/exam.vue')
  },
  {
    path: '/inform',
    component: () => import('views/inform/inform.vue')
  },
  {
    path: '/inform/about',
    component: () => import('views/inform/about.vue')
  },
  {
    path: '/inform/about/info',
    component: () => import('views/inform/about/info.vue')
  },
  {
    path: '/inform/about/bank',
    component: () => import('views/inform/about/bank.vue')
  },
  {
    path: '/inform/about/board',
    component: () => import('views/inform/about/board.vue')
  },
  {
    path: '/inform/about/shareholder',
    component: () => import('views/inform/about/shareholder.vue')
  },
  {
    path: '/inform/about/record',
    component: () => import('views/inform/about/record.vue')
  },
  {
    path: '/inform/about/great',
    component: () => import('views/inform/about/great.vue')
  },
  {
    path: '/inform/platfrom',
    component: () => import('views/inform/platfrom.vue')
  },
  {
    path: '/inform/oper-report',
    component: () => import('views/inform/oper-report.vue')
  },
  {
    path: '/inform/oper-report/oper-2016-q1',
    component: () => import('views/inform/oper/oper-2016-q1.vue')
  },
  {
    path: '/inform/oper-report/oper-2016-q2',
    component: () => import('views/inform/oper/oper-2016-q2.vue')
  },
  {
    path: '/inform/oper-report/oper-2016-q3',
    component: () => import('views/inform/oper/oper-2016-q3.vue')
  },
  {
    path: '/inform/oper-report/oper-2016-q4',
    component: () => import('views/inform/oper/oper-2016-q4.vue')
  },
  {
    path: '/inform/oper-report/oper-2016',
    component: () => import('views/inform/oper/oper-2016.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-q1',
    component: () => import('views/inform/oper/oper-2017-q1.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-q2',
    component: () => import('views/inform/oper/oper-2017-q2.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-q3',
    component: () => import('views/inform/oper/oper-2017-q3.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-m07',
    component: () => import('views/inform/oper/oper-2017-m07.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-m08',
    component: () => import('views/inform/oper/oper-2017-m08.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-m10',
    component: () => import('views/inform/oper/oper-2017-m10.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-m11',
    component: () => import('views/inform/oper/oper-2017-m11.vue')
  },
  {
    path: '/inform/oper-report/oper-2017-m12',
    component: () => import('views/inform/oper/oper-2017-m12.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m01',
    component: () => import('views/inform/oper/oper-2018-m01.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m02',
    component: () => import('views/inform/oper/oper-2018-m02.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m03',
    component: () => import('views/inform/oper/oper-2018-m03.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m04',
    component: () => import('views/inform/oper/oper-2018-m04.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m05',
    component: () => import('views/inform/oper/oper-2018-m05.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m06',
    component: () => import('views/inform/oper/oper-2018-m06.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m07',
    component: () => import('views/inform/oper/oper-2018-m07.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m08',
    component: () => import('views/inform/oper/oper-2018-m08.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m09',
    component: () => import('views/inform/oper/oper-2018-m09.vue')
  },
  {
    path: '/inform/oper-report/oper-2018-m10',
    component: () => import('views/inform/oper/oper-2018-m10.vue')
  },
  {
    path: '/inform/audit-report',
    component: () => import('views/inform/audit-report.vue')
  },
  {
    path: '/inform/audit-report/audit-report-2017',
    component: () => import('views/inform/audit-report/audit-report-2017.vue')
  },
  {
    path: '/inform/audit-report/audit-report-2018',
    component: () => import('views/inform/audit-report/audit-report-2018.vue')
  },
  {
    path: '/inform/audit-report/audit-report-2018-2',
    component: () => import('views/inform/audit-report/audit-report-2018-2.vue')
  },
  {
    path: '/inform/law-file',
    component: () => import('views/inform/law-file.vue')
  },
  {
    path: '/inform/law-file/law-pl',
    component: () => import('views/inform/law/law-pl.vue')
  },
  {
    path: '/inform/law-file/law-xx',
    component: () => import('views/inform/law/law-xx.vue')
  },
  {
    path: '/inform/law-file/law-jd',
    component: () => import('views/inform/law/law-jd.vue')
  },
  {
    path: '/inform/law-file/law-zjdj',
    component: () => import('views/inform/law/law-zjdj.vue')
  },
  {
    path: '/inform/law-file/law-zjcg',
    component: () => import('views/inform/law/law-zjcg.vue')
  },
  {
    path: '/inform/law-file/law-dx',
    component: () => import('views/inform/law/law-dx.vue')
  },
  {
    path: '/inform/law-file/law-cj',
    component: () => import('views/inform/law/law-cj.vue')
  },
  {
    path: '/inform/law-file/law-fx',
    component: () => import('views/inform/law/law-fx.vue')
  },
  {
    path: '/inform/law-file/law-gf',
    component: () => import('views/inform/law/law-gf.vue')
  },
  {
    path: '/inform/law-file/law-kz',
    component: () => import('views/inform/law/law-kz.vue')
  },
  {
    path: '/inform/law-file/law-bl',
    component: () => import('views/inform/law/law-bl.vue')
  },
  {
    path: '/inform/law-file/law-ff',
    component: () => import('views/inform/law/law-ff.vue')
  },
  {
    path: '/inform/law-file/law-sl',
    component: () => import('views/inform/law/law-sl.vue')
  },
  {
    path: '/inform/law-file/law-mj',
    component: () => import('views/inform/law/law-mj.vue')
  },
  {
    path: '/inform/risk',
    component: () => import('views/inform/risk.vue')
  },
  {
    path: '/inform/know-us',
    component: () => import('views/inform/know-us.vue')
  },
  {
    path: '/found',
    component: () => import('views/found/found.vue')
  },
  {
    path: '/found/my-point',
    component: () => import('views/found/my-point.vue')
  },
  {
    path: '/found/get-point',
    component: () => import('views/found/get-point.vue')
  },
  {
    path: '/found/point-rule',
    component: () => import('views/found/point-rule.vue')
  },
  {
    path: '/found/point-exchange',
    component: () => import('views/found/point-exchange.vue')
  },
  {
    path: '/found/my-coupon',
    component: () => import('views/found/my-coupon.vue')
  },
  {
    path: '/found/my-coupon-used',
    component: () => import('views/found/my-coupon-used.vue')
  },
  {
    path: '/found/my-coupon-useless',
    component: () => import('views/found/my-coupon-useless.vue')
  },
  {
    path: '/found/jxq-exchange',
    component: () => import('views/found/jxq-exchange.vue')
  },
  {
    path: '/found/exchange-success',
    component: () => import('views/found/exchange-success.vue')
  },
  {
    path: '/found/contact',
    component: () => import('views/found/contact.vue')
  },
  {
    path: '/found/member-lev',
    component: () => import('views/found/member-lev.vue')
  },
  {
    path: '/found/help',
    component: () => import('views/found/help.vue')
  },
  {
    path: '/found/help/help-free',
    component: () => import('views/found/help/help-free.vue')
  },
  {
    path: '/login',
    component: () => import('views/login/login.vue')
  },
  {
    path: '/loginPwd',
    component: () => import('views/login/login-pwd.vue')
  },
  {
    path: '/forgetPwd',
    component: () => import('views/login/forget-pwd.vue')
  },
  {
    path: '/register',
    component: () => import('views/login/register.vue')
  },
  {
    path: '/index',
    component: () => import('views/index/index.vue')
  },
  {
    path: '/myCenter',
    component: () => import('views/my-center/my-center.vue')
  },
  {
    path: '/totalIncome',
    component: () => import('views/my-center/total-income.vue')
  },
  {
    path: '/totalMoney',
    component: () => import('views/my-center/total-money.vue')
  },
  {
    path: '/ucSet',
    component: () => import('views/my-center/uc-set/uc-set.vue')
  },
  {
    path: '/bankCard',
    component: () => import('views/my-center/uc-set/bank-card.vue')
  },
  {
    path: '/ucAutonym',
    component: () => import('views/my-center/uc-set/uc-autonym.vue')
  },
  {
    path: '/setPwd',
    component: () => import('views/my-center/uc-set/set-pwd.vue')
  },
  {
    path: '/deposit',
    component: () => import('views/my-center/uc-set/xw-deposit.vue')
  },
  {
    path: '/accredit',
    component: () => import('views/my-center/uc-set/xw-accredit.vue')
  },
  {
    path: '/accreditExplain',
    component: () => import('views/my-center/uc-set/xw-accredit-explain.vue')
  },
  {
    path: '/tdAbout',
    component: () => import('views/my-center/uc-set/td-about.vue')
  },
  {
    path: '/appraisal/index',
    component: () => import('views/my-center/appraisal/index.vue')
  },
  {
    path: '/appraisal/list',
    component: () => import('views/my-center/appraisal/list.vue')
  },
  {
    path: '/appraisal/result',
    component: () => import('views/my-center/appraisal/result.vue')
  },
  {
    path: '/appraisal/explain',
    component: () => import('views/my-center/appraisal/explain.vue')
  },
  {
    path: '/autoLoan',
    component: () => import('views/my-center/auto-loan/auto-loan.vue')
  }
]
