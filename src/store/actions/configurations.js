import api from '../../api'
import * as types from '../types'

export default {
  async getConfigurations ({ commit }) {
    const response = await api.getConfigurations()
    commit(types.CONFIGURATIONS, response)
  }
}
