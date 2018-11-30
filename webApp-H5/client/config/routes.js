export default [
  {
    path: '/',
    redirect: '/infoShow'
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
    path: '/infoShow/data',
    component: () => import('views/info-show/data.vue')
  },
  {
    path: '/infoShow/report',
    component: () => import('views/info-show/report.vue')
  },
  {
    path: '/infoShow/auditRep',
    component: () => import('views/info-show/auditRep.vue')
  },
  {
    path: '/infoShow/lowFile',
    component: () => import('views/info-show/lowFile.vue')
  },
  {
    path: '/infoShow/risk',
    component: () => import('views/info-show/risk.vue')
  },
  {
    path: '/infoShow/know',
    component: () => import('views/info-show/know.vue')
  },
  {
    path: '/login',
    component: () => import('views/login/login.vue')
  },
  {
    path: '/forgetPwd',
    component: () => import('views/login/forgetPwd.vue')
  }
]
