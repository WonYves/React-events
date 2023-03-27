import request from "../utils/request";

// 获取角色列表
export const getUser = () => {
  return request({
    url: `/roles`
  })
}
// 删除角色
export const deleteUser = (id: number) => {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}
// 权限控制
export const changeUserPower = (id: number, rights: []) => {
  return request({
    url: `/roles/${id}`,
    method: 'patch',
    data: {
      rights
    }
  })
}
// 用户列表
export const getUserList = () => {
  return request({
    url: `/users?_expand=role`
  })
}

//区域列表
export const getRegions = () => {
  return request({
    url: `/regions`
  })
}

//区域列表
export const addUsers = (params:IadduserType) => {
  return request({
    url: `/users`,
    method: 'post',
    data: {
      ...params,
      roleState:true,
      defalut:false
    }
  })
}