export const logTo = (payload:any) => {
  return {
    type: 'SignInlogin',
    payload
  }
}
export const outTo = (payload:any) => {
  return {
    type: 'LogOut',
    payload
  }
}