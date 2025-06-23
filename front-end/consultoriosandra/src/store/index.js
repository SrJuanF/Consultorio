import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    tokenExp: null
  },
  mutations: {
    setToken(state, {tokn, exp}) {
      state.token = tokn
      state.tokenExp = exp
    },
    clearToken(state) {
      state.token = null
      state.tokenExp = null
    }
  },
  actions: {
    async login({ commit }, usuario) {
      try {
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(usuario)
        }
        const res = await fetch('http://localhost:3000/login', options);
        const result = await res.json(); 
        const auxToken = result.token;
        const auxExp = result.expiration;
        localStorage.setItem('token', auxToken)
        localStorage.setItem('tokenExp', auxExp)
        const obj = {tokn: auxToken, exp: auxExp}
        commit('setToken', obj)
      } catch (error) {
        console.log(error)
      }
    },
    leerToken({ commit }) {

      if (localStorage.getItem('token')) {
        const aux = localStorage.getItem('token')
        const auxE = localStorage.getItem('tokenExp')
        const obj = {tokn: aux, exp: auxE}
        commit('setToken', obj)
      }
      else {
        commit('clearToken')
      }

      const tokenExpiration = localStorage.getItem('tokenExp')
      if (Date.now() > parseInt(tokenExpiration)) {
        commit('clearToken')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExp')
      }
    },
    logOut({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExp')
      commit('clearToken')
    }
  },
  getters: {

  }
})