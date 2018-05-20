export const appRouter = [{
  path: '/',
  name: 'index',
  component: () =>
    import ('@/views/home/index.vue'),
  meta: {
    title: '悠游随身wifi',
    keepAlive: true,
    auth: true
  }
}, {
  path: '/purse',
  name: 'purse',
  component: () =>
    import ('@/views/home/purse.vue'),
  meta: {
    title: '我的钱包',
    keepAlive: true,
    auth: true
  }
}, {
  path: '/orderDetails',
  name: 'orderDetails',
  component: () =>
    import ('@/views/home/orderDetails.vue'),
  meta: {
    title: '我的订单',
    keepAlive: true,
    auth: true
  }
}, {
  path: '/coupons',
  name: 'coupons',
  component: () =>
    import ('@/views/home/coupons.vue'),
  meta: {
    title: '优惠券',
    keepAlive: true,
    auth: true
  }
}, {
  path: '/help',
  name: 'help',
  component: () =>
    import ('@/views/home/help.vue'),
  meta: {
    title: '常见问题',
    keepAlive: true,
    auth: true
  }
}, {
  path: '/auth',
  name: 'auth',
  component: () =>
    import ('@/views/auth/index.vue'),
  children: [{
    path: 'bind',
    name: 'bind',
    component: () =>
      import ('@/views/auth/bind.vue'),
    meta: {
      title: '绑定手机',
      keepAlive: true,
      auth: true
    }
  }]
}, {
  path: '/payment',
  name: 'payment',
  component: () =>
    import ('@/views/payment/index.vue'),
  children: [{
    path: 'deposit',
    name: 'deposit',
    component: () =>
      import ('@/views/payment/deposit.vue'),
    meta: {
      title: '押金充值',
      keepAlive: true,
      auth: true
    }
  }, {
    path: 'balance',
    name: 'balance',
    component: () =>
      import ('@/views/payment/balance.vue'),
    meta: {
      title: '余额充值',
      keepAlive: true,
      auth: true
    }
  }, {
    path: 'borrowPay',
    name: 'borrowPay',
    component: () =>
      import ('@/views/payment/borrowPay.vue'),
    meta: {
      title: '借支付',
      keepAlive: true,
      auth: true
    }
  }, {
    path: 'payNow',
    name: 'payNow',
    component: () =>
      import ('@/views/payment/payNow.vue'),
    meta: {
      title: '借支付',
      keepAlive: true,
      auth: true
    }
  }, {
    path: 'payNow',
    name: 'payNow',
    component: () =>
      import ('@/views/payment/payNow.vue'),
    meta: {
      title: '借支付',
      keepAlive: true,
      auth: true
    }
  }, {
    path: 'detail',
    name: 'detail',
    component: () =>
      import ('@/views/payment/detail.vue'),
    meta: {
      title: '使用详情',
      keepAlive: true,
      auth: true
    }
  }, {
    path: 'details',
    name: 'details',
    component: () =>
      import ('@/views/payment/details.vue'),
    meta: {
      title: '更换套餐使用详情',
      keepAlive: true,
      auth: true
    }
  }]
}]

export const routers = [
  ...appRouter
]