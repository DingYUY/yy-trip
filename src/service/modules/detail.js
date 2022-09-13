import yyRequest from '../request/index'

export function getDetailInfos(houseId) {
  return yyRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}