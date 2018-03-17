import { http } from '../services/http'

/**
 * @param {void}
 * @returns {Promise} [] List now showing movies
 */

export async function fetchNowShowingList (page) {
  const url = `/movie/now_playing?language=en-US&region=&page=${page}`
  return http.get(url)
}
