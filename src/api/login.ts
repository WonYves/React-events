import request from "../utils/request"

export const ApiLogin = (username:string,password:string) => {
  return request({
    url:`users?username=${username}&password=${password}&roleState=${true}&_expand=role`
  })
}