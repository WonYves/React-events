import request from "../utils/request";

// 事件分类
export const getCategories = () => {
  return request({
    url: '/categories'
  })
}

// 发布事件
export const saveContent = (params: INewsParams) => {
  return request({
    url: '/news',
    method: 'post',
    data: params
  })
}

// 事件数据
export const getNews = (username:string, auditState:number) => {
  return request({
    url: `/news?author=${username}&auditState=${auditState}&_expand=category`
  })
}