export const state = () => ({
  accessId: '',
  accessKey: ''
})

export const mutations = {
  setuser(state, data) {
    state.accessId = data.accessId
    state.accessKey = data.accessKey
  }
}
export const actions = {
  async setuserFn({ commit }) {
    let user = JSON.parse(localStorage.getItem('user'))
    await commit('setuser', user)
  }
}
