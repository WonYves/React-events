interface INewsParams {
  title:string,
  categoryId:number,
  content:string,
  [key:string]:any
}

type IgetNews  = {
  username:string,
  auditState:number
}