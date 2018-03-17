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

// const logger = createLogger({
//   collapsed: false, // auto-expand logged mutations
//   filter (mutation, stateBefore, stateAfter) {
//     // returns `true` if a mutation should be logged
//     // `mutation` is a `{ type, payload }`
//     return mutation.type !== 'aBlacklistedMutation'
//   },
//   transformer (state) {
//     // transform the state before logging it.
//     // for example return only a specific sub-tree
//     return state.subTree
//   },
//   mutationTransformer (mutation) {
//     // mutations are logged in the format of `{ type, payload }`
//     // we can format it any way we want.
//     return mutation.type
//   },
//   logger: console // implementation of the `console` API, default `console`
// })
