// 检测购物车中是否存在某商品
export const CHECK_CART = 'CHECK_CART'
// 添加商品到购物车
export const CREATE_CART = 'CREATE_CART'
// 已经存在购物车的商品数量+1
export const ADD_CART = 'ADD_CART'
// 给购物车数量-1
export const REDUCE_CART = 'REDUCE_CART'
//删除购物车商品
export const DELETE_CART = 'DELETE_CART'
// 登录
export const Login = 'Login'
//登出
export const Logout = 'Logout'
//计算购物车商品总价
export const TotalPrice = 'TotalPrice'
// 购物车商品选中状态的切换
export const CHANGE_STATE = 'CHANGE_STATE'
//购物车商品全选状态的切换
export const CHANGE_ALL_STATE = 'CHANGE_ALL_STATE'
//支付后将购物车中的内容加入到订单列表中 并且用户订单数+1
export const CREATE_ORDER = 'CREATE_ORDER'
//支付完成后 删除购物车中已经完成支付的商品 更新购物车
export const UPDATE_CART = 'UPDATE_CART'
//切换商品详情
export const  TO_DETAIL  = 'TO_DETAIL'

// 添加预约商品
export const ADD_BOOK = 'ADD_BOOK'
//取消预约
export const CANCEL_BOOK = 'CANCEL_BOOK'
