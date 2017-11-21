import Vue from 'vue'
import Router from 'vue-router'
import demo1 from 'components/demo1/demo1'
import demo2 from 'components/demo2/demo2'
import demo3 from 'components/demo3/demo3'
import demo4 from 'components/demo4/demo4'
import inform from 'components/inform/inform'
import infoAbout from 'components/info_about/info_about'
import infoTerrace from 'components/info_terrace/info_terrace'
import infoBank from 'components/info_bank/info_bank'
import infoBoard from 'components/info_board/info_board'

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
    }
  ]
})
