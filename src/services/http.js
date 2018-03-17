const originURL = 'https://api.themoviedb.org/3'
const APIKey = 'a5877c35b31089df53f6fd35be35ffde'

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
