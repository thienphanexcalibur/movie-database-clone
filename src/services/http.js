import { APIKey, originURL } from '../constant'

export const http = {
  async get (url) {
    let response = {}
    await fetch(`${originURL}${url}&api_key=${APIKey}`).then((res) => {
      response = res.json()
    }, (res) => res)
    return response
  },
  async post (url, obj) {}
}
