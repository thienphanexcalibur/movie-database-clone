import * as types from '../types'
import * as api from '../../api'

export default {
  async fetchNowShowingList ({ commit }, page) {
    const response = await api.fetchNowShowingList(page)
    const list = {
      movie: [],
      totalPages: null,
      page: null,
      totalRecords: 20
    }
    response.results.forEach((result) => {
      list.movie.push(Object.assign({}, {
        ...result
      }))
    })
    if (response.total_pages) {
      list.totalPages = response.total_pages
    }
    if (response.page) {
      list.page = response.page
    }
    commit(types.FETCH_NOW_SHOWING, list)
  }
}
