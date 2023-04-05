import request from "../utils/request";

// 事件分类
export const getCategories = () => {
  return request({
    url:'/categories'
  })
}

export const saveContent = (params:INewsParams) => {
  return request({
    url:'/news',
    method:'post',
    data:params
  })
}