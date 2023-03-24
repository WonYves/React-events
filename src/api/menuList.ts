import request from "../utils/request";

// 获取路由列表
export const getMenu = () => {
  return request({
    url: `/rights?_embed=children`
  })
}
// 删除路由父级
export const deleteMenu = (id?:number) => {
  return request({
    url: `/rights/${id}`,
    method:'delete'
  })
}
// 删除路由子级
export const deleteChildren = (id?:number) => {
  return request({
    url: `/children/${id}`,
    method:'delete'
  })
}
// 配置路由父级
export const changeItem = (id:number, pagepermisson:number) => {
  return request({
    url: `/rights/${id}`,
    method:'patch',
    data:{
      pagepermisson
    }
  })
}
// 配置路由子级
export const changeItemChildren = (id:number,  pagepermisson:number) => {
  return request({
    url: `/children/${id}`,
    method:'patch',
    data:{
      pagepermisson
    }
  })
}