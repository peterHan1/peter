import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Phone from '@/components/phone/phone'
import Goods from '@/components/good/goods'
import Services from '@/components/service/services'
import Login from '@/components/user/login'
import Cart from '@/components/cart/cart'
import Club from '@/components/club/club'
import Detail from '@/components/good/detail'
import List1 from '@/components/good/list1'
import List2 from '@/components/good/list2'
import List3 from '@/components/good/list3'
import List4 from '@/components/good/list4'
import ListError from '@/components/good/listError'
import User from '@/components/user/user'
import CheckOrder from '@/components/cart/checkorder'
import Payment from '@/components/cart/payment'
import Address from '@/components/cart/address'
import Search from '@/components/public/search'
import PhoneInfo from '@/components/phone/phoneInfo'
import Rush from '@/components/phone/rush'
import Myorder from '@/components/order/myorder'
import Allorder from '@/components/order/allorder'
import Notpaid from '@/components/order/notPaid'
import Delivered from '@/components/order/delivered'
import Success from '@/components/order/success'
import Summary from '@/components/phone/summary'
import Photo from '@/components/phone/photo'
import Param from '@/components/phone/param'
import Book from '@/components/phone/book'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/phone',
      component: Phone
    },
    {
      path: '/goods',
      component: Goods,
      children: [
        {
          path: '/lists',
          component: List1
        },
        {
          path: '/list2',
          component: List2
        },
        {
          path: '/list3',
          component: List3
        },
        {
          path: '/listError',
          component: ListError
        },
        {
          path: '/list4',
          component: List4
        }
      ]
    },
    {
      path: '/services',
      component: Services
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/club',
      component: Club
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/checkorder',
      component: CheckOrder
    },
    {
      path: '/payment',
      component: Payment
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/phoneInfo',
      component: PhoneInfo,
      children: [
        {
          path:'/summary',
          component: Summary
        },
        {
          path: '/photo',
          component: Photo
        },
        {
          path:'/param',
          component: Param
        }
      ]
    },
    {
      path: '/rush',
      component: Rush
    },
    {
      path: '/myorder',
      component: Myorder,
      children: [
        {
          path: '/allorder',
          component:Allorder
        },
        {
          path: '/notPaid',
          component:Notpaid
        },
        {
          path: '/delivered',
          component: Delivered
        },
        {
          path: '/success',
          component: Success
        }
      ]
    },
    {
      path: '/book',
      component: Book
    }
  ]
})
