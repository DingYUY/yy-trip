import yyRequest from '../request/index'

export function getHomeHotSuggests() {
  return yyRequest.get({
    url: '/home/hotSuggests'
  })
}

export function getHomeCategories() {
  return yyRequest.get({
    url: '/home/categories'
  })
}

export function getHomeHouseList(currentPage) {
  return yyRequest.get({
    url: '/home/houselist',
    params: {
      page: currentPage
    }
  })
}