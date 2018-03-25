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
    list.nextUpdated = response.dates.maximum
    commit(types.FETCH_NOW_SHOWING, list)
  },
  async searchMovies ({ commit }, query) {
    let response = {}
    if (query) {
      response = await api.searchWithQueries(query)
      commit(types.SEARCH_MOVIES, response)
    } else {
      commit(types.SEARCH_MOVIES, response)
    }
  },
  async fetchMovieDetails ({ commit }, id) {
    const response = await api.fetchMovieDetails(id)
    commit(types.FETCH_MOVIE_DETAILS, response)
  }
}
