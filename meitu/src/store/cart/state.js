module.exports = {
  cartInfos: {
    total_price: 0,   //购物车商品总价
    total_nums: 0    //购物车加购商品总数
  },
  orderInfos: {
    good_num: 0,
    order_price:0
  },
  cartList: [],    //用来暂存加购购物车的商品数组
  orderList:[],    //支付生成订单的商品
  bookList:[],    //预约商品
  curIndex: -1,    //当前操作的商品的下标  先查找定位
  order_num: 0,
  login: false,   //标识用户的登录状态  登录状态 true  登出状态 false
  toUrl:''

}
