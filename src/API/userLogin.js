import requset from '@/request'
export const userlogin = data =>
  requset({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
export const getAllList = () =>
  requset({
    url: '/v1_0/channels',
    method: 'GET'
  })
// data有两个参数channel_id   timestamp
export const getAllListAPI = (id, time) =>
  requset({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id: id,
      timestamp: time
    }
  })
export const dislikeArticleAPI = target =>
  requset({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: { target }
  })

export const reportArticleAPI = (target, type) =>
  requset({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target,
      type
    }
  })
// 获取用户列表接口/v1_0/user/channels
export const getAllChannelAPI = () =>
  requset({
    url: '/v1_0/user/channels',
    method: 'GET'
  })

// 更新 频道接口/v1_0/user/channels    channels
export const updateUserChannelAPI = data =>
  requset({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: data
    }
  })
// 请求搜索列表 /v1_0/suggestion
export const suggestionAPI = data =>
  requset({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q: data
    }
  })
// 请求搜索结果列表 /v1_0/search

export const searchresultAPI = (q, page) =>
  requset({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      q,
      page
    }
  })
// 请求文章详情/v1_0/articles/:art_id
export const getarticlesInfoAPI = art_id =>
  requset({
    url: `/v1_0/articles/${art_id}`,
    method: 'GET'
  })
