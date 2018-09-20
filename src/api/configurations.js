import { http } from '../services/http'
import { APIKey } from "../constant"

export default {
  getConfigurations () {
    const url = `configuration?api_key=${APIKey}`
    return http.get(url, false)
  }
}
