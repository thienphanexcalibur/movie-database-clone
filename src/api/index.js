import { http } from '../services/http'
import { APIKey } from '../constant'
import configurations from './configurations'
/**
 * @param {void}
 * @returns {Promise} [] List now showing movies
 */
export default {
  fetchNowShowingList (page = 1) {
    const url = `/movie/now_playing?language=en-US&region=&page=${page}`
    return http.get(url)
  },
  fetchUpcomingList (page = 1) {
    const url = `/movie/upcoming?language=en-US&page=${page}`
    return http.get(url)
  },
  /**
   *
   * @param {String} query [] query to be searched
   * @returns {Promise} [] List movies in Objects
   */
  searchWithQueries (query) {
    const url = `/search/movie?query=${query}`
    return http.get(url)
  },

  fetchMovieDetails (id) {
    const url = `/movie/${id}?append_to_response=videos`
    return http.get(url)
  },

  fetchMovieCredits (id) {
    const url = `/movie/${id}/credits?api_key=${APIKey}`
    return http.get(url)
  },
  ...configurations
}
