import { login } from '../plugins/api'
import Cookie from 'js-cookie'
// console.log(this)
export const state = () => ({
  token: Cookie.get('token') ? Cookie.get('token') : '',
  phone: '',
  password: ''
})

export const mutations = {
  add(state, n) {
    state.count += n
  },
  setToken(state, token) {
    state.token = token
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // commit(setToken, '123456')
    // console.log(12121)
    commit('setToken', Cookie.get('token'))
    // if (req.session && req.session.authUser) {
    //   commit('setToken', req.session.authUser)
    // }
  },
  addAction(context, payload) {
    // console.log(this.redirect)
    login(this.$axios, payload).then(res => {
      if (res) {
        Cookie.set('token', res.data.content)
        // this.$cookies.set('accid', userInfo.accessId)
        let userInfo = res.data.content
        context.commit('setToken', res.data.content)
        this.$router.push({ path: '/' })
      }
      // console.log(res)
      // console.log('88888')
    })
  }
}
