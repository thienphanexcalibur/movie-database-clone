import { http } from '../services/http'
import configurations from './configurations'
import { APIKey } from "../constant"

export default {
  /**
   * Fetch Now Showing List
   * @param page
   * @returns {*|Promise<*>}
   */
  fetchNowShowingList (page = 1) {
    const url = `movie/now_playing?language=en-US&region=&page=${page}`
    return http.get(url)
  },

  /**
   * Fetch Upcoming List
   * @param page
   * @returns {*|Promise<*>}
   */
  fetchUpcomingList (page = 1) {
    const url = `movie/upcoming?language=en-US&page=${page}`
    return http.get(url)
  },
  /**
   *
   * @param {String} query [] query to be searched
   * @returns {Promise} [] List movies in Objects
   */
  searchWithQueries (query) {
    const url = `search/movie?query=${query}`
    return http.get(url)
  },

  /**
   * Fetch Movie Details
   * @param id
   * @returns {*|Promise<*>}
   */
  fetchMovieDetails (id) {
    const url = `movie/${id}?append_to_response=videos`
    return http.get(url)
  },

  /**
   * Fetch Movie Credits
   * @param id
   * @returns {*|Promise<*>}
   */
  fetchMovieCredits (id) {
    const url = `movie/${id}/credits?api_key=${APIKey}`
    return http.get(url, false)
  },
  ...configurations
}
