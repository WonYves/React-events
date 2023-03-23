import request from "../utils/request";

export const getMenu = () => {
  return request({
    url:'/rights?_embed=children',
    method:'get'
  })
}