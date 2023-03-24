import request from "../utils/request";

// 获取角色列表
export const getUser = () => {
  return request({
    url: `/roles`
  })
}
// 删除角色
export const deleteUser = (id:number) => {
  return request({
    url: `/roles/${id}`,
    method:'delete'
  })
}

// 权限控制
export const changeUserPower = (id:number,  rights:[]) => {
  return request({
    url: `/roles/${id}`,
    method:'patch',
    data:{
      rights
    }
  })
}