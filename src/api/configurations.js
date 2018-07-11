import { APIKey } from '../constant'
import { http } from '../services/http'

export default {
  getConfigurations () {
    const url = `/configuration?api_key=${APIKey}`
    return http.get(url)
  }
}
