import * as types from '../types'
import api from '../../api'
import configurations from './configurations'

export default {
  async fetchUpcomingList ({ commit }, page) {
    const response = await api.fetchUpcomingList(page)
    const data = Object.assign({}, {
      movies: response.results,
      totalPages: response.total_pages,
      currentPage: page
    })
    commit(types.FETCH_UPCOMING_LIST, data)
  },
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
  },
  async fetchMovieCredits ({ commit }, id) {
    const response = await api.fetchMovieCredits(id)
    commit(types.FETCH_MOVIE_CREDITS, response)
  },
  ...configurations
}
