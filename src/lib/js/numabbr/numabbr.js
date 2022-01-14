import { NumberAbbreviate } from 'numabbr'

export default function numabbr (num, option = {
  precision: 1,
  commatize: { division: 1 }
}, rule = {
  '千': 1000,
  '万': 10000,
  // '十万': 100000,
  // '百万': 1000000,
  // '千万': 10000000,
  '亿': 100000000,
  '十亿': 1000000000,
  '百亿': 10000000000
}) {
  return new NumberAbbreviate(rule).abbreviate(num, option)
}
