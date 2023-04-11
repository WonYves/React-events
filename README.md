<a name="eBKno"></a>
### Events 一款基于 React+Ts 的后台管理系统 项目全使用hook语法
<a name="erdGc"></a>
#### 拥有权限管理功能 对不同用户设置不同权限 如超级管理员 战区管理员 战区编辑等拥有不同的权限
<a name="FhEM3"></a>
### 技术栈：
-- React18<br />-- TypeScript<br />-- Antd组件库<br />-- Redux<br />-- React-Redux (connect)<br />-- React-Router-Dom V6版本(useRoutes)<br />-- Echarts<br />-- Sass<br />-- axios
<a name="zHqrc"></a>
#### 封装了路由以及路由权限 项目中使用了route v6 - useRoutes路由表作为驱动
```tsx
// 仅部分
import { useRoutes } from "react-router"
import React, { useEffect, useState, lazy, Suspense } from 'react'
import Redirect from './Redirect'
import axios from "axios"
import { connect } from "react-redux"
const NotFound = lazy(()=> import('../view/NotFound'));
const Login = lazy(()=> import('../view/login'));
const Sandbox = lazy(()=> import('../view/sandBox/index'))
const Home = lazy(()=> import('../view/sandBox/home/index'));
const RightList = lazy(()=> import('../view/sandBox/rightManage/rightList'));
const RoleList = lazy(()=> import('../view/sandBox/rightManage/roleList'));
const UserList = lazy(()=> import('../view/sandBox/userManage/userList'));
const NewsAdd = lazy(()=> import('../view/sandBox/news-manage/newsAdd'));
const NewsCategory = lazy(()=> import('../view/sandBox/news-manage/newsCategory'));
const NewsDraft = lazy(()=> import('../view/sandBox/news-manage/newsDraft'));
const AuditList = lazy(()=> import('../view/sandBox/audit-manage/auditList'));
const Audit = lazy(()=> import('../view/sandBox/audit-manage/audit'));
const Unpublished = lazy(()=> import('../view/sandBox/publish-manage/unpublished'));
const Sunset = lazy(()=> import('../view/sandBox/publish-manage/sunset'));
const Published = lazy(()=> import('../view/sandBox/publish-manage/published'));

//  `````````
```
<a name="Iw3R2"></a>
#### 封装axios 将接口API统一进行管理 
```tsx
import axios from "axios";

const request = axios.create({
  baseURL: 'http://localhost:2222',
  timeout: 20000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default request


// ----------------------------------------------------------

// 仅部分
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
export const changeUserPower = (id: number, rights: Irights) => {
  return request({
    url: `/roles/${id}`,
    method: 'patch',
    data: {
      rights
    }
  })
}
```
<a name="TcKmm"></a>
#### 使用react-redux管理公共状态或多层级数据共享
```tsx
import { legacy_createStore, combineReducers, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import userReducer from "../reducer/userReducer";
import collapsedReducer from "../reducer/collapsedReducer";
import { persistStore, persistReducer } from 'redux-persist'  //持久化1
import storage from 'redux-persist/lib/storage' //持久化2


// 持久化3
const persistConfig = {
  key: 'wiess',  //键值对 键名称
  storage,  //存储在locastorage中
  // whitelist: ['userReducer']  //持久化白名单
}

// 多个 reducer合并
const myReducer = combineReducers({
  userReducer,
  collapsedReducer
})

const MyPersistReducer = persistReducer(persistConfig, myReducer) //持久化4  变为持久化的reducer

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = legacy_createStore(MyPersistReducer, composeEnhancers(applyMiddleware(reduxThunk)))

const persistor = persistStore(store) //持久化6

export  { store, persistor }
```
<a name="R7QqP"></a>
#### 单独配置各项所需reducer 以及 aciton统一管理
```tsx
//  actions 

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

```
```tsx
import deepcopy from "../utils/deepcopy";
// 手写深拷贝

interface IpverState {
  isCollapsed: boolean | null
}

const collapsedReducer = (pverState: IpverState = {
  isCollapsed: false
}, action: Iaction) => {
  let newState = deepcopy(pverState)
  switch (action.type) {
    case 'changeType':
      newState.isCollapsed = !newState.isCollapsed
      return newState
    default:
      return pverState
  }
}

export default collapsedReducer
```
<a name="y2Y8q"></a>
#### 手写深拷贝
```tsx
// 深拷贝
interface Iresult {
  [key:string] : any
}

const deepcopy = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let result:Iresult
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for(let key in obj){
    result[key] = deepcopy(obj[key])
  }
  return result
}

export default deepcopy
```
<a name="yhbCk"></a>
## 以下为项目展示
![reactevents1.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197351123-505e5ee2-6c64-43c3-ac94-20d212805daf.png#averageHue=%2327517c&clientId=u4234de78-d58b-4&from=drop&id=u427f95a1&name=reactevents1.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=1838839&status=done&style=none&taskId=uf49d2d25-9a95-408a-aa0c-85111afc8d0&title=)<br />![reactevents2.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197354851-bf811fb4-4094-45f2-8229-f29da73e68e3.png#averageHue=%23d2bb80&clientId=u4234de78-d58b-4&from=drop&id=u3d1feed5&name=reactevents2.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=110021&status=done&style=none&taskId=u4c18c450-cfe9-4596-894a-8f96dbe9b6a&title=)![reactevents3.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197362564-7863bbbc-36b9-4404-87a0-7bdd592a4294.png#averageHue=%23aaa9a9&clientId=u4234de78-d58b-4&from=drop&id=ub1a9e201&name=reactevents3.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=115567&status=done&style=none&taskId=u374b10c0-5018-4912-8406-0737f9314d9&title=)![reactevents4.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197365099-c762aa11-72df-4126-9ebb-a58083bbc7b5.png#averageHue=%23eae8e8&clientId=u4234de78-d58b-4&from=drop&id=u5b5f1162&name=reactevents4.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=108726&status=done&style=none&taskId=u42cf31f1-6d12-47a0-abde-34b71b8471e&title=)![reactevents5.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197379900-2eae1a4d-fe73-4bac-91a4-0c3a0727a739.png#averageHue=%23ecebeb&clientId=u4234de78-d58b-4&from=drop&id=uec79a0b1&name=reactevents5.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=65621&status=done&style=none&taskId=u3997b46c-0afb-4cfc-a588-0bea3c4f905&title=)![reactevents6.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197387122-44362b36-67d1-4ed9-8856-b84f981dd101.png#averageHue=%23eaeaea&clientId=u4234de78-d58b-4&from=drop&id=uae78d003&name=reactevents6.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=94707&status=done&style=none&taskId=u7be526d8-6718-4b53-b645-88bfa40dbb3&title=)![reactevents7.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197390729-8f705719-956a-4c8b-8627-83623186a4ac.png#averageHue=%23eae9e9&clientId=u4234de78-d58b-4&from=drop&id=u50b649b4&name=reactevents7.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=108383&status=done&style=none&taskId=u1c6d9540-117d-4fef-845d-404547e158c&title=)![reactevents8.png](https://cdn.nlark.com/yuque/0/2023/png/32841606/1681197394190-65938ae0-8d3e-4463-8d97-2c333f23e2f5.png#averageHue=%23eae8e7&clientId=u4234de78-d58b-4&from=drop&id=u93caff24&name=reactevents8.png&originHeight=1029&originWidth=1929&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=114937&status=done&style=none&taskId=u945ab1bb-4b34-453e-b964-2785e26e3fd&title=)
