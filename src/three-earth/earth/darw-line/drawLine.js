/* eslint-disable */

import InitFlyLine from './line-tool'

export default (earth, data) => {
  const lt = new InitFlyLine(earth)

  const halfData = data.map(({arcid, info}) => {
    return {
      info: info
        .slice(0, Math.ceil(info.length / 2))
        .map(i => {
          return {
            h: i.hgt / 1000,
            lat: i.lat,
            lon: i.lon
          }
        }),
      arcid
    }
  })

  lt.init(halfData)

  return lt
}
