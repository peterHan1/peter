import * as types from './mutation_types'
export default {
  [types.CREATE_CART] (state, product) {
    state.cartList.push(product)
    state.orderList.push(product)
    state.cartInfos.total_nums = state.cartInfos.total_nums + product.perNum
  },
  [types.ADD_CART] (state) {
    state.cartList[state.curIndex].perNum = parseInt(state.cartList[state.curIndex].perNum)
    state.cartList[state.curIndex].perNum ++
    state.cartInfos.total_nums ++
  },
  [types.REDUCE_CART] (state) {
    state.cartList[state.curIndex].perNum = parseInt(state.cartList[state.curIndex].perNum)
    state.cartList[state.curIndex].perNum --
    state.cartInfos.total_nums --
  },
  [types.CHECK_CART] (state, id) {
    state.curIndex = -1
    let list = state.cartList
    if (list.length) {
      for (let i = 0; i<list.length; i++) {
        if(list[i].id == id){
          state.curIndex = i
          break
        }
      }
    }
  },
  [types.DELETE_CART] (state, id) {
    state.curIndex = -1
    let list = state.cartList
    let perNum = 0
    if (list.length) {
      for (let i = 0; i<list.length; i++) {
        if(list[i].id == id){
          state.curIndex = i
          perNum = parseInt(state.cartList[state.curIndex].perNum)
          break
        }
      }
    }
    state.cartList.splice(state.curIndex, 1)
    state.orderList.splice(state.curIndex, 1)
    state.cartInfos.total_nums = state.cartInfos.total_nums - perNum
  },
 [types.Login] (state) {
   state.login = true
 },
 [types.Logout] (state) {
   state.login = false
 },
 [types.TO_DETAIL](state, url) {
   state.toUrl = url
   console.log(state.toUrl)
 },
 [types.TotalPrice] (state) {
   state.cartInfos.total_price = 0
   let list =state.cartList
   let len = list.length
   for(let  i = 0; i < len ; i++) {
     if(list[i].selected) {
       state.cartInfos.total_price = state.cartInfos.total_price +(list[i].price*list[i].perNum)
     }
   }
 },

 // 购物车的更新
 //先查找到选中并付款的商品 然后进行删除
 [types.UPDATE_CART](state) {
   let index = -1
   let perNum = 0
   let list = state.cartList
   let len = state.cartList.length
   for(let i =0; i < len; i++) {
     if(state.cartList[i].selected === true) {
       index = i
       perNum = parseInt(state.cartList[index].perNum)
       state.cartList.splice(index, 1)
       state.cartInfos.total_nums = state.cartInfos.total_nums - perNum
       i--
     }
   }
 },
 [types.CREATE_ORDER](state) {
   state.orderInfos.good_num = 0
   state.orderInfos.order_price = 0
  let list =state.orderList
  let len = list.length
  for(let  i = 0; i < len ; i++) {
    if(list[i].selected) {
      state.orderInfos.good_num = state.orderInfos.good_num +list[i].perNum
      state.orderInfos.order_price = state.orderInfos.order_price + (list[i].price*list[i].perNum)
    }
  }
   state.order_num ++
 },
 [types.CHANGE_ALL_STATE](state) {
   let list = state.cartList
   let len = list.length
   for(let i = 0; i < len; i++) {
     if(!state.cartList[i].selected) {
       state.cartList[i].selected = !state.cartList[i].selected
     }
   }
 },
 [types.CHANGE_STATE](state) {
   state.cartList[state.curIndex].selected = !state.cartList[state.curIndex].selected
 },
 [types.ADD_BOOK](state, product) {
   state.bookList.push(product)
 },
 [types.CANCEL_BOOK](state, id) {
   state.bookList.splice(id, 1)
 }
}
