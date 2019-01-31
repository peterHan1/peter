import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _3a5c667e = () => interopDefault(import('../pages/api.js' /* webpackChunkName: "pages/api" */))
const _7a876560 = () => interopDefault(import('../pages/project/index.vue' /* webpackChunkName: "pages/project/index" */))
const _2f359c41 = () => interopDefault(import('../pages/appraisal/explain.vue' /* webpackChunkName: "pages/appraisal/explain" */))
const _a56cf4f2 = () => interopDefault(import('../pages/appraisal/indexs.vue' /* webpackChunkName: "pages/appraisal/indexs" */))
const _ac70ad78 = () => interopDefault(import('../pages/appraisal/list.vue' /* webpackChunkName: "pages/appraisal/list" */))
const _5d9fddc3 = () => interopDefault(import('../pages/appraisal/result.vue' /* webpackChunkName: "pages/appraisal/result" */))
const _0d9a3327 = () => interopDefault(import('../pages/errors/notfound.vue' /* webpackChunkName: "pages/errors/notfound" */))
const _22450fdb = () => interopDefault(import('../pages/errors/server.vue' /* webpackChunkName: "pages/errors/server" */))
const _7332b977 = () => interopDefault(import('../pages/myCenter/center.vue' /* webpackChunkName: "pages/myCenter/center" */))
const _795f736b = () => interopDefault(import('../pages/nmb/nmb.vue' /* webpackChunkName: "pages/nmb/nmb" */))
const _68fcc9e2 = () => interopDefault(import('../pages/tuodao/td.vue' /* webpackChunkName: "pages/tuodao/td" */))
const _861612f0 = () => interopDefault(import('../pages/user/forgetPwd.vue' /* webpackChunkName: "pages/user/forgetPwd" */))
const _627d0b61 = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _3cd11dcc = () => interopDefault(import('../pages/user/loginPwd.vue' /* webpackChunkName: "pages/user/loginPwd" */))
const _183f744a = () => interopDefault(import('../pages/user/register.vue' /* webpackChunkName: "pages/user/register" */))
const _0af7879f = () => interopDefault(import('../pages/user/registerAgreement.vue' /* webpackChunkName: "pages/user/registerAgreement" */))
const _cc085550 = () => interopDefault(import('../pages/user/registerResult.vue' /* webpackChunkName: "pages/user/registerResult" */))
const _11e51b22 = () => interopDefault(import('../pages/xwDeposit/deposit.vue' /* webpackChunkName: "pages/xwDeposit/deposit" */))
const _2114f46e = () => interopDefault(import('../pages/xwDeposit/result.vue' /* webpackChunkName: "pages/xwDeposit/result" */))
const _9ff15052 = () => interopDefault(import('../pages/xwDeposit/transit.vue' /* webpackChunkName: "pages/xwDeposit/transit" */))
const _358e51a9 = () => interopDefault(import('../pages/myCenter/bond/myBond.vue' /* webpackChunkName: "pages/myCenter/bond/myBond" */))
const _756b34e9 = () => interopDefault(import('../pages/myCenter/discount/myDiscount.vue' /* webpackChunkName: "pages/myCenter/discount/myDiscount" */))
const _358e31ea = () => interopDefault(import('../pages/myCenter/fund/cash.vue' /* webpackChunkName: "pages/myCenter/fund/cash" */))
const _1d1d7fc8 = () => interopDefault(import('../pages/myCenter/fund/cashExplain.vue' /* webpackChunkName: "pages/myCenter/fund/cashExplain" */))
const _2da63cbc = () => interopDefault(import('../pages/myCenter/fund/cashRecord.vue' /* webpackChunkName: "pages/myCenter/fund/cashRecord" */))
const _407a5af0 = () => interopDefault(import('../pages/myCenter/fund/cashResult.vue' /* webpackChunkName: "pages/myCenter/fund/cashResult" */))
const _69c0a72c = () => interopDefault(import('../pages/myCenter/fund/rachargeRecord.vue' /* webpackChunkName: "pages/myCenter/fund/rachargeRecord" */))
const _ec3a9f02 = () => interopDefault(import('../pages/myCenter/fund/recharge.vue' /* webpackChunkName: "pages/myCenter/fund/recharge" */))
const _5e84b4fc = () => interopDefault(import('../pages/myCenter/fund/rechargeResult.vue' /* webpackChunkName: "pages/myCenter/fund/rechargeResult" */))
const _888d6dfc = () => interopDefault(import('../pages/myCenter/invest/creditorList.vue' /* webpackChunkName: "pages/myCenter/invest/creditorList" */))
const _3bc8ce2e = () => interopDefault(import('../pages/myCenter/invest/myInvest.vue' /* webpackChunkName: "pages/myCenter/invest/myInvest" */))
const _79e0cc4c = () => interopDefault(import('../pages/myCenter/invest/scatterDetails.vue' /* webpackChunkName: "pages/myCenter/invest/scatterDetails" */))
const _f90060f4 = () => interopDefault(import('../pages/myCenter/invest/siftDetails.vue' /* webpackChunkName: "pages/myCenter/invest/siftDetails" */))
const _136586db = () => interopDefault(import('../pages/myCenter/invite/inviteList.vue' /* webpackChunkName: "pages/myCenter/invite/inviteList" */))
const _25201bce = () => interopDefault(import('../pages/myCenter/invite/inviteRecord.vue' /* webpackChunkName: "pages/myCenter/invite/inviteRecord" */))
const _b22c649e = () => interopDefault(import('../pages/myCenter/invite/onList.vue' /* webpackChunkName: "pages/myCenter/invite/onList" */))
const _7040877c = () => interopDefault(import('../pages/myCenter/invite/yetList.vue' /* webpackChunkName: "pages/myCenter/invite/yetList" */))
const _1e7a2f95 = () => interopDefault(import('../pages/myCenter/record/moneyRecord.vue' /* webpackChunkName: "pages/myCenter/record/moneyRecord" */))
const _31d79624 = () => interopDefault(import('../pages/myCenter/set/about.vue' /* webpackChunkName: "pages/myCenter/set/about" */))
const _4f7fc46a = () => interopDefault(import('../pages/myCenter/set/setPwd.vue' /* webpackChunkName: "pages/myCenter/set/setPwd" */))
const _5fc11b34 = () => interopDefault(import('../pages/myCenter/set/ucAutonym.vue' /* webpackChunkName: "pages/myCenter/set/ucAutonym" */))
const _005bee56 = () => interopDefault(import('../pages/myCenter/set/ucSet.vue' /* webpackChunkName: "pages/myCenter/set/ucSet" */))
const _f2d450ae = () => interopDefault(import('../pages/myCenter/set/xwAccredit.vue' /* webpackChunkName: "pages/myCenter/set/xwAccredit" */))
const _ec7756b4 = () => interopDefault(import('../pages/myCenter/set/xwAccreditResult.vue' /* webpackChunkName: "pages/myCenter/set/xwAccreditResult" */))
const _5a9f1aea = () => interopDefault(import('../pages/project/details/free.vue' /* webpackChunkName: "pages/project/details/free" */))
const _5d2bf05f = () => interopDefault(import('../pages/project/free/list.vue' /* webpackChunkName: "pages/project/free/list" */))
const _77e87d3b = () => interopDefault(import('../pages/project/list/free.vue' /* webpackChunkName: "pages/project/list/free" */))
const _7bd26e8d = () => interopDefault(import('../pages/project/transfer/transfer.vue' /* webpackChunkName: "pages/project/transfer/transfer" */))
const _ce5ab46c = () => interopDefault(import('../pages/myCenter/discount/src/interest-list.vue' /* webpackChunkName: "pages/myCenter/discount/src/interest-list" */))
const _76430ff8 = () => interopDefault(import('../pages/myCenter/discount/src/voucher-list.vue' /* webpackChunkName: "pages/myCenter/discount/src/voucher-list" */))
const _26a3ae82 = () => interopDefault(import('../pages/myCenter/invest/src/list-scatter.vue' /* webpackChunkName: "pages/myCenter/invest/src/list-scatter" */))
const _407ea73a = () => interopDefault(import('../pages/myCenter/invest/src/list-scatter-on.vue' /* webpackChunkName: "pages/myCenter/invest/src/list-scatter-on" */))
const _569aa8c6 = () => interopDefault(import('../pages/myCenter/invest/src/list-scatter-yet.vue' /* webpackChunkName: "pages/myCenter/invest/src/list-scatter-yet" */))
const _105aace0 = () => interopDefault(import('../pages/myCenter/invest/src/list-sift.vue' /* webpackChunkName: "pages/myCenter/invest/src/list-sift" */))
const _2ab0296c = () => interopDefault(import('../pages/myCenter/invest/src/list-sift-on.vue' /* webpackChunkName: "pages/myCenter/invest/src/list-sift-on" */))
const _30b16fab = () => interopDefault(import('../pages/myCenter/invest/src/list-sift-yet.vue' /* webpackChunkName: "pages/myCenter/invest/src/list-sift-yet" */))
const _1d1bd324 = () => interopDefault(import('../pages/project/free/details/investAdd.vue' /* webpackChunkName: "pages/project/free/details/investAdd" */))
const _d5927406 = () => interopDefault(import('../pages/project/free/details/scatterResult.vue' /* webpackChunkName: "pages/project/free/details/scatterResult" */))
const _5662b4cf = () => interopDefault(import('../pages/project/free/details/siftResult.vue' /* webpackChunkName: "pages/project/free/details/siftResult" */))
const _7ff050be = () => interopDefault(import('../pages/project/free/details/add/discount-list.vue' /* webpackChunkName: "pages/project/free/details/add/discount-list" */))
const _35849f0d = () => interopDefault(import('../pages/project/free/details/add/list-interest.vue' /* webpackChunkName: "pages/project/free/details/add/list-interest" */))
const _96534aca = () => interopDefault(import('../pages/project/free/details/add/list-voucher.vue' /* webpackChunkName: "pages/project/free/details/add/list-voucher" */))
const _7524ebf9 = () => interopDefault(import('../pages/project/free/details/scatterDetails/big-img.vue' /* webpackChunkName: "pages/project/free/details/scatterDetails/big-img" */))
const _5087dbbc = () => interopDefault(import('../pages/project/free/details/scatterDetails/details1.vue' /* webpackChunkName: "pages/project/free/details/scatterDetails/details1" */))
const _5095f33d = () => interopDefault(import('../pages/project/free/details/scatterDetails/details2.vue' /* webpackChunkName: "pages/project/free/details/scatterDetails/details2" */))
const _50a40abe = () => interopDefault(import('../pages/project/free/details/scatterDetails/details3.vue' /* webpackChunkName: "pages/project/free/details/scatterDetails/details3" */))
const _036b67ae = () => interopDefault(import('../pages/project/free/details/scatterDetails/indexs.vue' /* webpackChunkName: "pages/project/free/details/scatterDetails/indexs" */))
const _cf95c194 = () => interopDefault(import('../pages/project/free/details/scatterDetails/scatter-details.vue' /* webpackChunkName: "pages/project/free/details/scatterDetails/scatter-details" */))
const _ef00554c = () => interopDefault(import('../pages/project/free/details/scatterDetails/scatter-details-next.vue' /* webpackChunkName: "pages/project/free/details/scatterDetails/scatter-details-next" */))
const _cc8627e4 = () => interopDefault(import('../pages/project/free/details/siftDetails/details1.vue' /* webpackChunkName: "pages/project/free/details/siftDetails/details1" */))
const _cc69f8e2 = () => interopDefault(import('../pages/project/free/details/siftDetails/details2.vue' /* webpackChunkName: "pages/project/free/details/siftDetails/details2" */))
const _cc4dc9e0 = () => interopDefault(import('../pages/project/free/details/siftDetails/details3.vue' /* webpackChunkName: "pages/project/free/details/siftDetails/details3" */))
const _ae273700 = () => interopDefault(import('../pages/project/free/details/siftDetails/indexs.vue' /* webpackChunkName: "pages/project/free/details/siftDetails/indexs" */))
const _43862478 = () => interopDefault(import('../pages/project/free/details/siftDetails/sift-details.vue' /* webpackChunkName: "pages/project/free/details/siftDetails/sift-details" */))
const _40a9c958 = () => interopDefault(import('../pages/project/free/details/siftDetails/sift-details-next.vue' /* webpackChunkName: "pages/project/free/details/siftDetails/sift-details-next" */))
const _6506a4c6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/api",
      component: _3a5c667e,
      name: "api"
    }, {
      path: "/project",
      component: _7a876560,
      name: "project"
    }, {
      path: "/appraisal/explain",
      component: _2f359c41,
      name: "appraisal-explain"
    }, {
      path: "/appraisal/indexs",
      component: _a56cf4f2,
      name: "appraisal-indexs"
    }, {
      path: "/appraisal/list",
      component: _ac70ad78,
      name: "appraisal-list"
    }, {
      path: "/appraisal/result",
      component: _5d9fddc3,
      name: "appraisal-result"
    }, {
      path: "/errors/notfound",
      component: _0d9a3327,
      name: "errors-notfound"
    }, {
      path: "/errors/server",
      component: _22450fdb,
      name: "errors-server"
    }, {
      path: "/myCenter/center",
      component: _7332b977,
      name: "myCenter-center"
    }, {
      path: "/nmb/nmb",
      component: _795f736b,
      name: "nmb-nmb"
    }, {
      path: "/tuodao/td",
      component: _68fcc9e2,
      name: "tuodao-td"
    }, {
      path: "/user/forgetPwd",
      component: _861612f0,
      name: "user-forgetPwd"
    }, {
      path: "/user/login",
      component: _627d0b61,
      name: "user-login"
    }, {
      path: "/user/loginPwd",
      component: _3cd11dcc,
      name: "user-loginPwd"
    }, {
      path: "/user/register",
      component: _183f744a,
      name: "user-register"
    }, {
      path: "/user/registerAgreement",
      component: _0af7879f,
      name: "user-registerAgreement"
    }, {
      path: "/user/registerResult",
      component: _cc085550,
      name: "user-registerResult"
    }, {
      path: "/xwDeposit/deposit",
      component: _11e51b22,
      name: "xwDeposit-deposit"
    }, {
      path: "/xwDeposit/result",
      component: _2114f46e,
      name: "xwDeposit-result"
    }, {
      path: "/xwDeposit/transit",
      component: _9ff15052,
      name: "xwDeposit-transit"
    }, {
      path: "/myCenter/bond/myBond",
      component: _358e51a9,
      name: "myCenter-bond-myBond"
    }, {
      path: "/myCenter/discount/myDiscount",
      component: _756b34e9,
      name: "myCenter-discount-myDiscount"
    }, {
      path: "/myCenter/fund/cash",
      component: _358e31ea,
      name: "myCenter-fund-cash"
    }, {
      path: "/myCenter/fund/cashExplain",
      component: _1d1d7fc8,
      name: "myCenter-fund-cashExplain"
    }, {
      path: "/myCenter/fund/cashRecord",
      component: _2da63cbc,
      name: "myCenter-fund-cashRecord"
    }, {
      path: "/myCenter/fund/cashResult",
      component: _407a5af0,
      name: "myCenter-fund-cashResult"
    }, {
      path: "/myCenter/fund/rachargeRecord",
      component: _69c0a72c,
      name: "myCenter-fund-rachargeRecord"
    }, {
      path: "/myCenter/fund/recharge",
      component: _ec3a9f02,
      name: "myCenter-fund-recharge"
    }, {
      path: "/myCenter/fund/rechargeResult",
      component: _5e84b4fc,
      name: "myCenter-fund-rechargeResult"
    }, {
      path: "/myCenter/invest/creditorList",
      component: _888d6dfc,
      name: "myCenter-invest-creditorList"
    }, {
      path: "/myCenter/invest/myInvest",
      component: _3bc8ce2e,
      name: "myCenter-invest-myInvest"
    }, {
      path: "/myCenter/invest/scatterDetails",
      component: _79e0cc4c,
      name: "myCenter-invest-scatterDetails"
    }, {
      path: "/myCenter/invest/siftDetails",
      component: _f90060f4,
      name: "myCenter-invest-siftDetails"
    }, {
      path: "/myCenter/invite/inviteList",
      component: _136586db,
      name: "myCenter-invite-inviteList"
    }, {
      path: "/myCenter/invite/inviteRecord",
      component: _25201bce,
      name: "myCenter-invite-inviteRecord"
    }, {
      path: "/myCenter/invite/onList",
      component: _b22c649e,
      name: "myCenter-invite-onList"
    }, {
      path: "/myCenter/invite/yetList",
      component: _7040877c,
      name: "myCenter-invite-yetList"
    }, {
      path: "/myCenter/record/moneyRecord",
      component: _1e7a2f95,
      name: "myCenter-record-moneyRecord"
    }, {
      path: "/myCenter/set/about",
      component: _31d79624,
      name: "myCenter-set-about"
    }, {
      path: "/myCenter/set/setPwd",
      component: _4f7fc46a,
      name: "myCenter-set-setPwd"
    }, {
      path: "/myCenter/set/ucAutonym",
      component: _5fc11b34,
      name: "myCenter-set-ucAutonym"
    }, {
      path: "/myCenter/set/ucSet",
      component: _005bee56,
      name: "myCenter-set-ucSet"
    }, {
      path: "/myCenter/set/xwAccredit",
      component: _f2d450ae,
      name: "myCenter-set-xwAccredit"
    }, {
      path: "/myCenter/set/xwAccreditResult",
      component: _ec7756b4,
      name: "myCenter-set-xwAccreditResult"
    }, {
      path: "/project/details/free",
      component: _5a9f1aea,
      name: "project-details-free"
    }, {
      path: "/project/free/list",
      component: _5d2bf05f,
      name: "project-free-list"
    }, {
      path: "/project/list/free",
      component: _77e87d3b,
      name: "project-list-free"
    }, {
      path: "/project/transfer/transfer",
      component: _7bd26e8d,
      name: "project-transfer-transfer"
    }, {
      path: "/myCenter/discount/src/interest-list",
      component: _ce5ab46c,
      name: "myCenter-discount-src-interest-list"
    }, {
      path: "/myCenter/discount/src/voucher-list",
      component: _76430ff8,
      name: "myCenter-discount-src-voucher-list"
    }, {
      path: "/myCenter/invest/src/list-scatter",
      component: _26a3ae82,
      name: "myCenter-invest-src-list-scatter"
    }, {
      path: "/myCenter/invest/src/list-scatter-on",
      component: _407ea73a,
      name: "myCenter-invest-src-list-scatter-on"
    }, {
      path: "/myCenter/invest/src/list-scatter-yet",
      component: _569aa8c6,
      name: "myCenter-invest-src-list-scatter-yet"
    }, {
      path: "/myCenter/invest/src/list-sift",
      component: _105aace0,
      name: "myCenter-invest-src-list-sift"
    }, {
      path: "/myCenter/invest/src/list-sift-on",
      component: _2ab0296c,
      name: "myCenter-invest-src-list-sift-on"
    }, {
      path: "/myCenter/invest/src/list-sift-yet",
      component: _30b16fab,
      name: "myCenter-invest-src-list-sift-yet"
    }, {
      path: "/project/free/details/investAdd",
      component: _1d1bd324,
      name: "project-free-details-investAdd"
    }, {
      path: "/project/free/details/scatterResult",
      component: _d5927406,
      name: "project-free-details-scatterResult"
    }, {
      path: "/project/free/details/siftResult",
      component: _5662b4cf,
      name: "project-free-details-siftResult"
    }, {
      path: "/project/free/details/add/discount-list",
      component: _7ff050be,
      name: "project-free-details-add-discount-list"
    }, {
      path: "/project/free/details/add/list-interest",
      component: _35849f0d,
      name: "project-free-details-add-list-interest"
    }, {
      path: "/project/free/details/add/list-voucher",
      component: _96534aca,
      name: "project-free-details-add-list-voucher"
    }, {
      path: "/project/free/details/scatterDetails/big-img",
      component: _7524ebf9,
      name: "project-free-details-scatterDetails-big-img"
    }, {
      path: "/project/free/details/scatterDetails/details1",
      component: _5087dbbc,
      name: "project-free-details-scatterDetails-details1"
    }, {
      path: "/project/free/details/scatterDetails/details2",
      component: _5095f33d,
      name: "project-free-details-scatterDetails-details2"
    }, {
      path: "/project/free/details/scatterDetails/details3",
      component: _50a40abe,
      name: "project-free-details-scatterDetails-details3"
    }, {
      path: "/project/free/details/scatterDetails/indexs",
      component: _036b67ae,
      name: "project-free-details-scatterDetails-indexs"
    }, {
      path: "/project/free/details/scatterDetails/scatter-details",
      component: _cf95c194,
      name: "project-free-details-scatterDetails-scatter-details"
    }, {
      path: "/project/free/details/scatterDetails/scatter-details-next",
      component: _ef00554c,
      name: "project-free-details-scatterDetails-scatter-details-next"
    }, {
      path: "/project/free/details/siftDetails/details1",
      component: _cc8627e4,
      name: "project-free-details-siftDetails-details1"
    }, {
      path: "/project/free/details/siftDetails/details2",
      component: _cc69f8e2,
      name: "project-free-details-siftDetails-details2"
    }, {
      path: "/project/free/details/siftDetails/details3",
      component: _cc4dc9e0,
      name: "project-free-details-siftDetails-details3"
    }, {
      path: "/project/free/details/siftDetails/indexs",
      component: _ae273700,
      name: "project-free-details-siftDetails-indexs"
    }, {
      path: "/project/free/details/siftDetails/sift-details",
      component: _43862478,
      name: "project-free-details-siftDetails-sift-details"
    }, {
      path: "/project/free/details/siftDetails/sift-details-next",
      component: _40a9c958,
      name: "project-free-details-siftDetails-sift-details-next"
    }, {
      path: "/",
      component: _6506a4c6,
      name: "index"
    }],

    fallback: false
  })
}
