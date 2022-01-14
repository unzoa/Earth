export const get = (path, params) => {
  let keys = Object.keys(params)
  let urlStr = ''

  for (let i = 0; i < keys.length; i++) {
    urlStr += keys[i] + '=' + params[keys[i]] + '&'
  }
  urlStr = urlStr.slice(0, urlStr.length - 1)
  return fetch(path + '?' + urlStr, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {
    return res.json()
  })
}

export const post = (path, params) => {
  return fetch(path, {
    method: 'POST',
    body: params,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {
    return res.json()
  })
}
