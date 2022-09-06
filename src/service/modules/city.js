import yyRequest from '../request/index'

export function getCityAll() {
  return yyRequest.get({
    url: '/city/all'
  })
}