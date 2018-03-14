import Vue from 'vue'
import state from './states'
import actions from './actions'
import mutations from './mutations'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions
})

