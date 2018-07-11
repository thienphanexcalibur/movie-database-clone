import state from './states'
import actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

export default {
  state,
  actions,
  mutations,
  plugins: [createLogger()]
}
