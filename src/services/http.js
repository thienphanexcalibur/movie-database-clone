import { APIKey, originURL } from '../constant'

export const http = {
  async get (url, apiKey = true) {
    let response = {}
    await fetch(`${originURL}/${url}${apiKey ? `&api_key=${APIKey}` : ``}`).then((res) => {
      response = res.json()
    }, (err) => console.log(err))
    return response
  },
  async post (url, obj) {}
}
