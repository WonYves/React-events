// 登录
export const logTo = (payload:any) => {
  return {
    type: 'SignInlogin',
    payload
  }
}

//退出
export const outTo = (payload:any) => {
  return {
    type: 'LogOut',
    payload
  }
}
// 收放侧边栏
export const changeType = () => {
  return {
    type: 'changeType'
  }
}
