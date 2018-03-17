import * as types from '../types'

export default {
  [types.FETCH_NOW_SHOWING] (state, payload) {
    state.nowShowingList = payload
  }
}
