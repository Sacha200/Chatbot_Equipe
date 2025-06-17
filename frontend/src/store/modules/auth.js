import axios from 'axios'

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token')
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    state.isAuthenticated = !!token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
  SET_USER(state, user) {
    state.user = user
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }
}

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials)
      const { token, role } = response.data
      
      commit('SET_TOKEN', token)
      commit('SET_USER', { role })
      
      // Configuration d'axios pour inclure le token dans les requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      return response
    } catch (error) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
      throw error
    }
  },

  logout({ commit }) {
    commit('SET_TOKEN', null)
    commit('SET_USER', null)
    delete axios.defaults.headers.common['Authorization']
  }
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  isAdmin: state => state.user?.role === 'admin'
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}