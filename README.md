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

```
react-news
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 00
│  │  │  ├─ 0a2279dbc92713da2d3b340f7eee0de723b4dc
│  │  │  └─ f558446b9886295679a321800880af3ba56329
│  │  ├─ 02
│  │  │  ├─ 62aa0434046abdb71b81e205e8d73a6a280d1a
│  │  │  ├─ 96f0a5125468f4a215d4882087daa93aa9d185
│  │  │  └─ a6f607dcd912db79e13c4e69d14f25cc29fc02
│  │  ├─ 03
│  │  │  ├─ 13d5f9df89763a0e0f10a81a1cfff3d81f05fb
│  │  │  └─ d309149e6d9ab18e483a1496d2c8eb93843b3d
│  │  ├─ 04
│  │  │  └─ 262ef4321d9a3279d002f934a545d8fa15dea0
│  │  ├─ 05
│  │  │  ├─ 22104265f9c5f4c53bf3cc72eace7d09902182
│  │  │  └─ 81a0aab9fb118c748e0d40827fc419ddfa724b
│  │  ├─ 06
│  │  │  ├─ 2d0e0b447b27dc0477fdd26d19b01a4278aeac
│  │  │  ├─ 3024800d2a7f386ee0fbedd489e8d21e9c3cc4
│  │  │  └─ 6004c4e7a456029cad56ede3036523b0e9bf38
│  │  ├─ 07
│  │  │  ├─ 5224a113a531b8ac9208a35662dd755587c306
│  │  │  └─ 8474946098693306c1b5aaa6b5c1f65757627e
│  │  ├─ 09
│  │  │  ├─ 3a66abcc614e6273df05ad4f2e79b39d330469
│  │  │  └─ 8692cae71a3abea86610a7329671a6e07852aa
│  │  ├─ 0b
│  │  │  ├─ 20d3dda862f4aa7c5e6847a3b29d55c6b3442e
│  │  │  ├─ 55eb4af780f95cc6faf66f420abf6a686bebb0
│  │  │  └─ a214b341c1c9a1726971cc2ad84b7f804c6033
│  │  ├─ 0c
│  │  │  ├─ 58d4699164c2f93c6d27c204470e6522a315fd
│  │  │  ├─ 6b00925b6ab557fa6d056884d8a0563df2889c
│  │  │  ├─ dcb99dc8d75334c941b955047f3c79d5280cf8
│  │  │  └─ f8a343c328b342723afec671eb079f907e5cc4
│  │  ├─ 0d
│  │  │  ├─ 1de3401f8f16e6b1cf6ed6560f198686b3126b
│  │  │  └─ de7b63deaa9c163900667148d5c41e2b2a03b9
│  │  ├─ 0e
│  │  │  ├─ 5dd77882cf8d132b9cfdd23804a8adab352644
│  │  │  └─ dfb02d573ddb60420e879cd6fdbb3dcf568b77
│  │  ├─ 0f
│  │  │  ├─ 2ec779530441663553d85329920e4e58f5e97a
│  │  │  └─ 73c679bac65fcf668c02497d37572d33141a81
│  │  ├─ 10
│  │  │  ├─ 5aa134a62b4033a0a60cec46aec9fd84ce99f7
│  │  │  ├─ 88939f555aaf7f01b4b34811821eb67a93b7bd
│  │  │  └─ a87f33765cd5e0ad84e287eb89ecad42ece7d4
│  │  ├─ 11
│  │  │  ├─ c29483a70ad2c8ad82b771bedf2fa802d795cb
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 12
│  │  │  └─ 74878eb41d0480b3c8c747c33eaca221decccd
│  │  ├─ 13
│  │  │  ├─ 4cc2f9b2f32032a572009b3fc80ee557a685b4
│  │  │  └─ ce293476426a35a96b617ce29230fd645271ac
│  │  ├─ 14
│  │  │  ├─ 10808061fb54f5856d82d6650911ead0f62e4e
│  │  │  ├─ 95b17c517a9911c465c1aeb868a8989e18251c
│  │  │  ├─ 9abad0547aeddbce83f9b6385f5a29bd4cf90e
│  │  │  └─ e0c35b404d3ef68dfe2020dbe3b375c52c1c4d
│  │  ├─ 15
│  │  │  ├─ d0ed210ab1c4faf2adc6eebb5dc1a0142bb2b0
│  │  │  └─ f08f03e74fd638be4549721025bddd5c2bda4f
│  │  ├─ 16
│  │  │  ├─ 25683956f5865fb32df40258ed0b4aa255d6dd
│  │  │  ├─ bc30aad3c357a9713bece7ab35c9499ba61c31
│  │  │  └─ dfb1ae5213bcc020f1e98be86b30870deba753
│  │  ├─ 17
│  │  │  ├─ 37be432d76fc143e8d794b5c5e2b8a29082568
│  │  │  ├─ 42d9ef6a558ecbb462f4b5c74f7de539edb144
│  │  │  └─ a54e907c528a36de26a7cc5a937db8a1a5b3c6
│  │  ├─ 18
│  │  │  ├─ 655a5c54a3b82335ef18c504538f8a5ba59426
│  │  │  └─ be49f51eee5d3095133c980555d0b1a75cb19b
│  │  ├─ 1a
│  │  │  └─ 7adfd0cab31afdbac9f035677a90396a2aa69d
│  │  ├─ 1b
│  │  │  ├─ 08ec1aa0bebd164297b0002638f5d5b00a833d
│  │  │  └─ bc62704d50e150415791a444fec79df207e9b4
│  │  ├─ 1c
│  │  │  └─ 45ee2a83d8b9de887dd6e0db82dcc73051e529
│  │  ├─ 1d
│  │  │  ├─ 1edb06951dab0b71034312475e4a9e84c32adf
│  │  │  └─ 28fbcb81db437db3fb3970667191b55c64f4b0
│  │  ├─ 1e
│  │  │  ├─ 86e2b3a0d3c6ca00e5eea6d120de561151e6f7
│  │  │  └─ d04460c2b8a5a59e71e7b6bbc1629f59c7ecae
│  │  ├─ 1f
│  │  │  ├─ 37cf7519c950b38ee67277b4a4cda7bb897579
│  │  │  ├─ 4052006801ba1b568c75c899250a5ded2cae99
│  │  │  ├─ 881801118ca9de7f1121a22faa1d2f95cc4649
│  │  │  ├─ b3d21765904def4e48dc3c72d318701f9a6d00
│  │  │  └─ f4c965385ef18f0eb6d20f1ac3d6edd60c005b
│  │  ├─ 20
│  │  │  ├─ 6bcc0dbee89026b224c18849023c46211fd8cf
│  │  │  └─ 7470cbee5781437756c540ad6153ead02504ba
│  │  ├─ 21
│  │  │  └─ 62725b2dd824181a6113864c884c7f5a1fc50f
│  │  ├─ 22
│  │  │  ├─ 10a1071a09a7d7ec37231198f038dfbf57133b
│  │  │  ├─ 7a273550e88adc7f0975a380bef2f205616c20
│  │  │  └─ c12ea2af3843883926a82e3c91325b6da54f35
│  │  ├─ 23
│  │  │  └─ bf60cd229cb8f16a39eb0be6cff4f6db73e93a
│  │  ├─ 24
│  │  │  ├─ 2c3fc5cb444f632fef4a1f3de682d22c73572b
│  │  │  └─ 48fae1eadfb47add3ad6b7afb27c61f8869483
│  │  ├─ 25
│  │  │  ├─ 78c71f5eb6b19ecd51b5eb728f33199490d09c
│  │  │  └─ a8931f0736cb45224cb9060a2239fd39943d2f
│  │  ├─ 2c
│  │  │  ├─ 3fac689c7c4680cfb84bc0746512858b90b908
│  │  │  ├─ a56cad69452d44f3936501e6b8c6def8325cbc
│  │  │  └─ ed75ecf5449856fccf9cf857a6724ee060f4da
│  │  ├─ 2e
│  │  │  ├─ 1444a0125fe945448a20d30c6b4deb21bd29f4
│  │  │  └─ 4a912c1713517d11cc10bee8a300fe2e2549a3
│  │  ├─ 30
│  │  │  └─ 65928d75752ccc102faae41079f1a6b57cad8f
│  │  ├─ 32
│  │  │  └─ b674ddc13d365ea2ec817efb6203f9b6d0390f
│  │  ├─ 33
│  │  │  ├─ bdeb4b1bc7c5a8c747ce668690a5e845ee0696
│  │  │  └─ f553dd3a473dd008c82ac72fbd6205a83e0912
│  │  ├─ 34
│  │  │  ├─ 6d4ddc39c96749b9920699a027d429a346ddaa
│  │  │  └─ c4ccc7706f83e2eeef97789688628a03be3147
│  │  ├─ 36
│  │  │  └─ cf25203ed160f620f9f3629e58402ca02d13a2
│  │  ├─ 37
│  │  │  └─ 5ac9956332f121f9ec13551ec8cfec8cbf6d9e
│  │  ├─ 38
│  │  │  ├─ 71b69567f0d103fa6901713e71a7e1ff5d3868
│  │  │  ├─ 7b94c6d4e98235722b37a58eb49cce6279ace5
│  │  │  └─ f6ce3ac8288c53870068631725b64ec7acdfa2
│  │  ├─ 39
│  │  │  └─ 9d45716cfc4063358f0503c220ffde7ab702f2
│  │  ├─ 3b
│  │  │  ├─ 129140f0347f94383a7c0532e2a6d3dd2591c1
│  │  │  ├─ 4e00d4a8ee7360f6f1c0a82f9e78848e2b1483
│  │  │  ├─ 569f8181118e853fad02079b628bc76fab1fd3
│  │  │  └─ 6814756acccaf675a9e6abaf312c1a459f24d8
│  │  ├─ 3d
│  │  │  ├─ 08a53de4d0567bfa3bec988af6788f55bc3de8
│  │  │  ├─ 0a51a86e202419758206adb6effe775229ba38
│  │  │  └─ d82348ca65f6954afb4d91b7963c4b01899c2d
│  │  ├─ 3e
│  │  │  ├─ 1e3164edfb7c97137057941f3b2c4fa2e31fb7
│  │  │  └─ 6b3f88d084eb3e44ef30dcd0e60464380f3dad
│  │  ├─ 3f
│  │  │  ├─ 9f612703afe7d68fde096749b8c464aab33d0d
│  │  │  └─ ef5246038f29967b187f8b21ab50b4e47fd03f
│  │  ├─ 40
│  │  │  └─ ce52b3939a2942e13c8bb043d7378ad511f0c1
│  │  ├─ 41
│  │  │  └─ 6ebc094184109be8cfc7544506b9e8acd1d031
│  │  ├─ 43
│  │  │  ├─ 59aa3bbf53fed3a62069a2077d90bf3466ef39
│  │  │  └─ 79be6ce9cda27dc61431f1f4cdcf92530c1df7
│  │  ├─ 44
│  │  │  ├─ 02251b3622d76eecc50b5ff46b0215d77991fc
│  │  │  └─ 81db0bf2edc32441cd651412df9ad70280db60
│  │  ├─ 45
│  │  │  └─ e759622c5c337301c3e2c239299a068f1532c7
│  │  ├─ 46
│  │  │  ├─ 5a6ebb3217718af5b13e6ffa715a6a7cd2bb6f
│  │  │  ├─ d4749ab627564afdae8b69293140958988ebbf
│  │  │  └─ f854f594f86c7ab0c21e5f24518b946172f813
│  │  ├─ 48
│  │  │  └─ 8b88b128c1227965f6de2fbfa4c7d05d5d03b3
│  │  ├─ 49
│  │  │  ├─ 4bc7daf91cfaabd51455bbeac86a8c3a6eb0d7
│  │  │  ├─ 80d3c835d0af40f640f447215f4772efa12d3b
│  │  │  └─ e82b43e2664340ec00a795e565c9588e7dff74
│  │  ├─ 4a
│  │  │  ├─ f76ec927c99c1928a8426253bfaf27d4abab7a
│  │  │  └─ faaa590fc4665546f3f62b24233577fcfeabea
│  │  ├─ 4b
│  │  │  ├─ 0a305a218f5b83a7922f0f6e4ae59d2ac2279b
│  │  │  ├─ 15dc9ea8d694d45eafcb76c957a2403bc33f98
│  │  │  ├─ 6bde7961bc08359ef094243ea935f246e2d195
│  │  │  ├─ 807f8aa5aa99e46215f8fddf554805ce3d4d6c
│  │  │  └─ e897362bd81f1d46892071fc9916f7063ed7c7
│  │  ├─ 4e
│  │  │  ├─ 0846d326cafb52201599b4d9105313123398c3
│  │  │  └─ 47d705ce6dbaba1e4b892838769f8913b40837
│  │  ├─ 4f
│  │  │  └─ cc785723294ba20b448184cd12a7ab56f33b28
│  │  ├─ 50
│  │  │  ├─ 2a6744e8ddcdb6df6be5c2892dac7f7210cc19
│  │  │  ├─ 2fc42558f95010d7f1f9a4caeb7373d1c951a6
│  │  │  ├─ b16f7145b7de3e44166d67a939cfb74984f1b5
│  │  │  ├─ c139bd7a02a533f8deef3bd08edacce0e17277
│  │  │  └─ ed6cccd12f649cf7c74aed7a8fc165e3c7d6a0
│  │  ├─ 51
│  │  │  ├─ 37855cab36b04ef7c5310fa230318dfa6fb6f6
│  │  │  ├─ 6e280e58d40a5a09f1e33d885af8b757b03b4e
│  │  │  └─ a27cb535c9b8a747333da458c0a76326c2d865
│  │  ├─ 52
│  │  │  └─ 3897ee7ee06b7cc38efae82553269c16b2a6ab
│  │  ├─ 53
│  │  │  ├─ 0f5a624910b0f7bdc23aae5f815a56643f2d8b
│  │  │  ├─ 48c7ec0c0d97c324fc8a1117b3466334f22062
│  │  │  └─ 83f80f12c40e466adfba7e29011985064b25de
│  │  ├─ 54
│  │  │  ├─ 4dedb2b7b55fa7e06b2847986ce2408f84087a
│  │  │  └─ 8fbc28f9b4b2e0dc536f2feb734cf22af71089
│  │  ├─ 55
│  │  │  ├─ 4ab475782d246717e1352f2b55c6a4a761cd65
│  │  │  ├─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  │  ├─ bb2097431e9e0aca214f48b9b485006ddbd436
│  │  │  └─ cb70f00531da0dc3caf545e5ac4d3b8b800bc4
│  │  ├─ 56
│  │  │  ├─ 7289d2ef23002f1f28b1b73c5b462f395046bd
│  │  │  ├─ ec1f363b74634f2f093b5e120e185f7124b421
│  │  │  └─ f39d7b839b4932dbadb3f2b65ee8a5f218a61d
│  │  ├─ 59
│  │  │  ├─ 7b0b02b100ff7c7a65b5756d488b670c611842
│  │  │  └─ d31f9befaaebb019ee307a1492ee7c6498d207
│  │  ├─ 5a
│  │  │  └─ 33944a9b41b59a9cf06ee4bb5586c77510f06b
│  │  ├─ 5b
│  │  │  └─ 474f36009dc5daa4e491d47ea17a640310009b
│  │  ├─ 5c
│  │  │  ├─ 040987bc61762907f1d1935cb97961da57ce9c
│  │  │  ├─ 2d0fa03b5e40209ef8a559efad784c8863e76d
│  │  │  └─ c14dd4521ed1fe952f8d1665b692ac0045ca74
│  │  ├─ 5d
│  │  │  └─ cd7d4c139c824e7eff7f4d68df8fbcb4e45cb8
│  │  ├─ 5f
│  │  │  └─ 04f5716ba0e344552a91fbadd663dc1a5ed140
│  │  ├─ 60
│  │  │  └─ b97e933268db9e15853026d2612c8edc4861b8
│  │  ├─ 61
│  │  │  ├─ 3156340755933ccde0203a59b4a67a49d02241
│  │  │  └─ a739313e27e7218559b25f631d701dc649b02f
│  │  ├─ 62
│  │  │  ├─ 0bb24cd94629ede76ff1bb86655ffb79d71aee
│  │  │  └─ 8901b3b8c45c6331bcacc7f27cddc968bd0887
│  │  ├─ 63
│  │  │  └─ 7ed67b70fb9703e84561923ebf618c6bc65047
│  │  ├─ 64
│  │  │  ├─ 24f9d99aa0c9a8076a0315c3937f0b975edb81
│  │  │  ├─ 810194fb11ad2fc42f71b5dcf094774d356a13
│  │  │  └─ 81b8492cb198456cbd71d0a0cd270f364a56fe
│  │  ├─ 65
│  │  │  └─ cae428eceadf28fb1770522e2a690869e11f0d
│  │  ├─ 67
│  │  │  └─ a6dd202ebd23d46532a500121bbd611eb25c73
│  │  ├─ 68
│  │  │  └─ 08dc0284fae34ff70b75a3959fe8d141578970
│  │  ├─ 6a
│  │  │  └─ 572a4fbbfe10f85eaa14c2f3db369475665da4
│  │  ├─ 6b
│  │  │  └─ 28017e01909324d3d78842e442ebacf5897942
│  │  ├─ 6c
│  │  │  ├─ 01d1d921d60b897a8ea92327c9db23f2f3a585
│  │  │  ├─ 15e1b5351d631b88867eb796c357df29ffd0b1
│  │  │  ├─ 71aece27f26cd6290e473e8930434e3a443406
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 6d
│  │  │  └─ 40bdcb75967764e680138a3642ea8c315eead4
│  │  ├─ 6e
│  │  │  └─ aa44fe53a84670b6dcf87772e2cd1cbe6f86f8
│  │  ├─ 6f
│  │  │  ├─ 3dc5621326116615b509c77c4d00dec0e2fd13
│  │  │  ├─ 5924d8cbef581b11a46428eeee89fff5ffccfb
│  │  │  └─ fe8d7817879973a29227a2750e37911060d691
│  │  ├─ 70
│  │  │  ├─ c577a9841367f237c742ea5f2e64354ea60259
│  │  │  ├─ dd9b0bddc026b02f081d03da9e09b775233064
│  │  │  └─ e68716e316326662fccc94cc079bf167d5d217
│  │  ├─ 71
│  │  │  └─ fd6155ce2196196a6897181077fe5fb6472c5b
│  │  ├─ 72
│  │  │  ├─ 0280216ed8dedb821482d765390551e5f47850
│  │  │  ├─ 58da89b5d9b7c9a412d365f8f2eff2f745a299
│  │  │  ├─ b5c4cc3f39b1db0b7db222d5b30d6b53621ce2
│  │  │  └─ e02598dff041104a408ba5de48552599a06ba4
│  │  ├─ 73
│  │  │  └─ 0274aee63c4ff0efc97d6fac91285b5b5a311f
│  │  ├─ 74
│  │  │  ├─ c739695c0864852e8bfcd218c52c8e390eca4c
│  │  │  └─ f3eedf5adeecff43e400475e4f71aa9501898a
│  │  ├─ 75
│  │  │  └─ 391a9e72d9e158d953dc7d48324b48acfae0da
│  │  ├─ 76
│  │  │  └─ 05392060187db5d2f83cb641525fa534bb3bb6
│  │  ├─ 77
│  │  │  ├─ 4d1add6aeec1412c7df23ddcef94f07b6e883a
│  │  │  ├─ 6eaa027ab01e9770d454fff29b0eba226be617
│  │  │  └─ e3686a14a1c46d30053aafb2ea154c3526e704
│  │  ├─ 78
│  │  │  └─ 84153bec1b5b41005f1d8c706c02775df44edc
│  │  ├─ 79
│  │  │  ├─ 1f139e242c70933e036ead54c9c25de43caf82
│  │  │  ├─ 52bf8e3fcb5ef094d9848f2addea73cf32333f
│  │  │  └─ a0deae458701ed5a8ebc58d580fa4455bade7a
│  │  ├─ 7a
│  │  │  ├─ 764ff675121bac8e8a803220b2f086afa36bf2
│  │  │  └─ 89e810fc1f754bbfdcb324f3d84ee7325ca965
│  │  ├─ 7b
│  │  │  └─ 65a1f2de5aa78e2915da441a15e8ff6c7869bc
│  │  ├─ 7c
│  │  │  ├─ 7549ed897e0d81c5bc615838fb753b708e0ecb
│  │  │  └─ 8d411e8387dfc101d908716f31c275b1cd4a5d
│  │  ├─ 7d
│  │  │  ├─ 3914a752809895261ad124a183c7594a269c73
│  │  │  └─ 8cf84cd6d935d0e9b0d3bd7cd7efccf85a6ff9
│  │  ├─ 7e
│  │  │  └─ 2a113b3c0b62e2c51c4359c912a0fd2297df4b
│  │  ├─ 80
│  │  │  ├─ 3e5a750af712d4cb42de696dad9c77f1cdb156
│  │  │  └─ 4633fc7084060ea58a3fa7eca1791de4646ac1
│  │  ├─ 81
│  │  │  └─ 1c96d31f21e7d14e996ecf46e047901f3ae1ac
│  │  ├─ 82
│  │  │  ├─ 4dedf196dc587e232a8a68bdf6af3aa390d002
│  │  │  └─ ed46a081788fe5bb0acb5b8e98aeaa2b6efe52
│  │  ├─ 83
│  │  │  ├─ 61dd2ba367966afcc40ab7390368a8bc4ba6be
│  │  │  └─ b878176b487ef491249ee5fa509f0959c2138d
│  │  ├─ 84
│  │  │  ├─ 0350cf1df600d4fafd7194b80cb3a9f335d4bb
│  │  │  └─ c81bf09ca31ab203b84c5ad2fefa91ea2587b7
│  │  ├─ 86
│  │  │  ├─ 1cb86f9efbdd830ef05e4bfee1c29f158e73a7
│  │  │  ├─ 7458f26624e71c67d4d354059bd609dd0a44b3
│  │  │  └─ a58b58e8011e047345c0851f899dc68642f7e5
│  │  ├─ 87
│  │  │  ├─ 04f728acd642569ab91630b4458809488127ef
│  │  │  ├─ b23d9ac2cdaf5874ff1a461192522cd74e9924
│  │  │  └─ befbcef6962286945716a0e1409234e13c272e
│  │  ├─ 88
│  │  │  ├─ 365bb0c9f86d0ed4656a3ae01d7f0c8e2d4528
│  │  │  └─ e5699a63eecd48667cac9c1ea3024988f6f3b4
│  │  ├─ 89
│  │  │  ├─ 23cbba9e0bd9e509046b9ee4ccc8d77c5166c9
│  │  │  └─ 8f842d16439659d60921c5a7f53b979edd01dc
│  │  ├─ 8a
│  │  │  └─ 4bfa89e6fdc979b3961a50e2fe5f84a50f05f2
│  │  ├─ 8b
│  │  │  ├─ 13b844044fd35d18e8109289c9713962b41e76
│  │  │  └─ db53ee5200c565ff715e9f3ac94a0d35838391
│  │  ├─ 8c
│  │  │  └─ e01fb32880fde7c8bbcd01fb69b7f81b2a9bca
│  │  ├─ 8d
│  │  │  └─ 87ea789dc794b09f167fd3c8d9e7aab1122f9e
│  │  ├─ 8e
│  │  │  └─ 615b4a02bf5127d8a2d561a46188494dd01778
│  │  ├─ 8f
│  │  │  └─ b5815e2bd0d4823f1aa91a9d98fbbf3e423901
│  │  ├─ 90
│  │  │  ├─ 10bffc5ea5cf469b5cc2fc550ca6da763df4e1
│  │  │  └─ 728ad1b42fae99cccdcb213a90aee9ee0e9101
│  │  ├─ 91
│  │  │  └─ 3bcb6bac3fe6e598e66d342c7e546cbc7d1b1a
│  │  ├─ 92
│  │  │  └─ cc78c20752bfaad84bcf9d459a004b8551b77a
│  │  ├─ 93
│  │  │  ├─ 5e22d98591ba54fb8381cdf0f38277e9fa81cf
│  │  │  └─ e9e630e96ad4f13764990e4071301a741b29f5
│  │  ├─ 94
│  │  │  ├─ 15dc2ef8ef1fe5c7203cfbcf1f07890d1e7f89
│  │  │  ├─ ab57d46506b4664533a0394147eba09cd135e7
│  │  │  ├─ be710e7f143aea7c367e5dcf5330392ef485a4
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 95
│  │  │  └─ e9205b59c91c5e834964cba0e91980a03d341e
│  │  ├─ 96
│  │  │  └─ 8d24062ed1e8181f85f69c9eeb34cb5478747b
│  │  ├─ 97
│  │  │  ├─ 2d8cc1c99d16bd6ef9eae207d8a716e720f53b
│  │  │  └─ 58a4c553cb773fcce3f8929329586b1afddb91
│  │  ├─ 99
│  │  │  └─ b7b86785876ea529aa2c1ebee6e880636a0e75
│  │  ├─ 9a
│  │  │  ├─ 8b701668d537f3280cd478a5608f5c82378b9e
│  │  │  ├─ c86509499dbbb19fc26062e52525320717bbb4
│  │  │  └─ cbcf929c317dc4490d7907a1c9ec98960dccaf
│  │  ├─ 9b
│  │  │  └─ 8a9edadbf8f1502dfe141c862f8665400a9f0e
│  │  ├─ 9c
│  │  │  └─ 2b085c46b642dc91257dc86c38627656d75508
│  │  ├─ 9d
│  │  │  ├─ 31e2aed93c876bc048cf2f863cb2a847c901e8
│  │  │  ├─ adb1a1276e30654c4e2a0ebb737dfb36ec24a9
│  │  │  └─ f61189b737a02282c6c20462e21c2940e0f723
│  │  ├─ 9e
│  │  │  ├─ 0d5e5bc1ce4092ee3b29f66ea7cdf2a5a1f33e
│  │  │  ├─ 2ec27ae8916eac09d0ec3ef765c599fa76ec72
│  │  │  ├─ 80a2b931809856c2b4a59ba14274698b3e88a9
│  │  │  └─ 987386a0eed2867d54351c5cf6431ac87c8444
│  │  ├─ a0
│  │  │  └─ 50cea6bc58ed15193d42517a1149fa4af8e5ca
│  │  ├─ a1
│  │  │  ├─ 61aa16938b9f844889ebc39bfba412112f63ca
│  │  │  └─ ff78f1cba26370c684f22194567872ad1294e1
│  │  ├─ a2
│  │  │  └─ 8d2d28ca1b2e9df4a2956b57acc1c8007d2112
│  │  ├─ a5
│  │  │  ├─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  │  ├─ 957e13c1b1f96cb5c95730799d02d2c7fc30e7
│  │  │  └─ b4e3c7f933499165e37beaaf684d7da77cbc85
│  │  ├─ a9
│  │  │  ├─ 3f1fa99bd163d832175fabbf0e39d8b219dab1
│  │  │  └─ d8cf04e3bf68b5668cd6c8ae19c8ad83a04211
│  │  ├─ aa
│  │  │  ├─ 002e638f19128b97fa62d55aec40b391848104
│  │  │  ├─ 37897e7204737b51558cd38bab20f85cff9f68
│  │  │  ├─ 52f1fb22ca95539240659902f6c3dd41443a67
│  │  │  ├─ aeffa918eb09d9b9d1342988dd0c4e50b9dc18
│  │  │  └─ f94ac9dfce582a80bddf29cb12134b12a358ae
│  │  ├─ ac
│  │  │  ├─ 97e4f845e2c4effbbc3a85826c1ebca9ea815b
│  │  │  └─ bf5da2676028c4b5e17357c5937237984600c6
│  │  ├─ ae
│  │  │  └─ 1be753c624fe6ce770498fb0f58396c24d8e63
│  │  ├─ af
│  │  │  ├─ 02def1b463b1093bca65a7914b29408aba512b
│  │  │  ├─ 36b4a6ed0ed9998661719a59f3fc38ada77c9b
│  │  │  └─ ca8ebb5dcb96d226c3ce2074a2a89bdcdae56f
│  │  ├─ b0
│  │  │  └─ 41eddebc12afd59ef0b3263f9093a585d4c71a
│  │  ├─ b3
│  │  │  ├─ 1f1525a8de13b2579abdfa4e43a661f05265c1
│  │  │  ├─ 5b1d928b640a8312ea0211dcfee1d9dc58bfe3
│  │  │  ├─ d2001d4970653bc36004656a4027b4902287f2
│  │  │  └─ f9fb7cbaaeee1a7513060514fdc1c061079a60
│  │  ├─ b4
│  │  │  ├─ 2704d2e9a19d4650d7dec3d5731d3db4103ba8
│  │  │  ├─ 921ed4f2604722a5afd4d15137e3d3ce1abc92
│  │  │  └─ f92d6e81eca2fc0b5f3f4df4bde47ad49e8f47
│  │  ├─ b5
│  │  │  └─ b7a6234575362875f6f9656028f6cd52831eb2
│  │  ├─ b6
│  │  │  ├─ 197d101d90b565aa65339c568f075de86549cf
│  │  │  ├─ cb9fd404a1d2a3aa477ea70a3a3434fd8e08e7
│  │  │  └─ d3c5154f2a655b0816117fb38ca908cd62e45c
│  │  ├─ b7
│  │  │  └─ 144712000de96db8184cf83418854107a38a65
│  │  ├─ b9
│  │  │  ├─ 66c7f05d22358573e9e174186123070422b76c
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ ba
│  │  │  └─ ae7da56fda2431f5bf5b993aa5ffc07be55edf
│  │  ├─ bb
│  │  │  ├─ 8bc62b13ba96eb04dba9583d831c4f1bb0c9c0
│  │  │  ├─ b879aa3a7651957b5c9a97f0fe8bbac3c7ae87
│  │  │  └─ dec8c07fbfa6179a7fa0f56633e57a9f5f7ca5
│  │  ├─ bc
│  │  │  ├─ 042ec759009bbd6d72de320721adde56ffba40
│  │  │  ├─ 238b10d0d3e8df7a791d48e54b7b10d155556a
│  │  │  └─ 37e082822149e95c45b55604b47da97f1dfa6f
│  │  ├─ bd
│  │  │  └─ 3150aef7beab19405fb8dca6c8fe715b77e2c0
│  │  ├─ be
│  │  │  └─ 86f2c090ffb025bf4b4a140a176835a4efb06a
│  │  ├─ bf
│  │  │  ├─ 934ddcde56f1a9cbbf084a5ba4fdb0d0192626
│  │  │  └─ de5c6d00df0414e248f40c1cda15cd80fcddc6
│  │  ├─ c0
│  │  │  └─ 67a31d859788d96227a72b297747401e2e290f
│  │  ├─ c2
│  │  │  ├─ 30aa90f597eb172607eb6f1bca3363b5f665c7
│  │  │  ├─ 5d7ccd85758ff7f1476d2238ef559d8da97c4a
│  │  │  └─ a6f2ccb99ff44fbaec74ddc7f894fbbccb2202
│  │  ├─ c3
│  │  │  └─ e0f6de7e579e9bb046e3b20e52583337c1538e
│  │  ├─ c5
│  │  │  └─ e1ada1df1cb59807992b88c76fc155e104e7aa
│  │  ├─ c6
│  │  │  └─ b14d1ccc1b563c665d9076f660bc8a62e9ec91
│  │  ├─ c8
│  │  │  ├─ 68959c75e8632f2db7d16321db969184ac8518
│  │  │  └─ af8e99aa5d5a5afe0539c15a1ef8d4a8fece5c
│  │  ├─ ca
│  │  │  └─ 97382b3ab147dcbffc26a4f0eec87e901720ed
│  │  ├─ cb
│  │  │  └─ e6e5eb2983318d5224b055188a7fbd34be7250
│  │  ├─ cc
│  │  │  ├─ 294a0b3a5859527b53474f2fbb07f42bdba743
│  │  │  ├─ 5fa50ea2aa27f0df68ea055ed97808501923e1
│  │  │  └─ 958ab6d1467a9730173def92156c4cee7c6f07
│  │  ├─ cd
│  │  │  ├─ 2ab1e05c6207f6859b27b230b79c0c9dfc7e33
│  │  │  └─ 7e01c67304226b8e0e376276904772a6a1833e
│  │  ├─ ce
│  │  │  └─ c7fd3fe5fe46a5c62f9d40f42d4e1d4f66e3a0
│  │  ├─ d0
│  │  │  ├─ 6b31083dd549ff5938b53756f1e4652fee545a
│  │  │  └─ c8d7592e79a6035a519020b844f3c67b67127a
│  │  ├─ d1
│  │  │  ├─ 20c7833fd13f31897b38b471b3a5b149e951f9
│  │  │  └─ 2eed18fcbaef145335bbf76ad27fde1bb44ebd
│  │  ├─ d2
│  │  │  ├─ a5adc556db377e78ef503418924637806fe6f7
│  │  │  ├─ b48be3c3c5cb333c5daebf8df2d5ef032c33b9
│  │  │  └─ cbd43e5eebf737c2bb9767cb43f3a5d218dffc
│  │  ├─ d3
│  │  │  ├─ 78d32e2d1a19f5c3d265988bf7e987473ff98b
│  │  │  ├─ 84364a36a2df88b895af26a197e6aeaf698095
│  │  │  └─ c0dd5ada2d7e2a601e0fa37072fd0eaa070704
│  │  ├─ d4
│  │  │  ├─ 7b335d1c54f7edd4f0e674b5a153a8df810ca8
│  │  │  ├─ 7efa791621aa184e218bc0f7296d0e2e0a295a
│  │  │  ├─ e3c796450bdf7d8d9e978744c9fca07b07eedd
│  │  │  └─ f0f36072c619c773dc601a7bc247dd907f8064
│  │  ├─ d5
│  │  │  └─ cf927a7cd3e484167a4c0872ac44482a6cff60
│  │  ├─ d6
│  │  │  └─ 047feba4daf6d19b212b0937548787901c2608
│  │  ├─ d7
│  │  │  ├─ 0e7505f5c1d8e233be7f0afb283e8f2b897414
│  │  │  ├─ 5242b6b8d64acffb6acc58166a135ad1618fa8
│  │  │  └─ b92bd845da06787423d670bb942c8965e12dff
│  │  ├─ d8
│  │  │  ├─ 9421b05918cbdbe7398ca1e9bd21c225f4ac5d
│  │  │  └─ fe85d866414b4da075276ba51e24603164e886
│  │  ├─ da
│  │  │  ├─ 8dc6263da9bca3fce79a19aafd3bee0a74f237
│  │  │  └─ ca2e5a5b717fea14199b4a48a81025d8fe0736
│  │  ├─ db
│  │  │  └─ 477550bda09a4b1b319f10912254a079bd8cd2
│  │  ├─ dc
│  │  │  ├─ 81b0954a7052965056a44c225d982dba67c260
│  │  │  └─ e67e8f0281270ec173700fdcd91a2f3abfc337
│  │  ├─ dd
│  │  │  └─ cb8822ec62640c198fff167cb53ff0e8e02696
│  │  ├─ de
│  │  │  └─ f9be8e88bff054ed14cd6c554929bf26f1a9db
│  │  ├─ e0
│  │  │  ├─ 432907283b2b433e3721d123f868349d886292
│  │  │  ├─ 87d191b1c7fbbfef7bd24edba936d5b1011e4d
│  │  │  ├─ 935bc20cdf381ab1f701eeb898287329215dc0
│  │  │  └─ d1c840806ee7f517c3d9774be4bcf9c4e889db
│  │  ├─ e2
│  │  │  ├─ 4d4355c88c6d66af7bab4f6beac8fcb630d790
│  │  │  ├─ 8225af9d9c9ebb0eacae6ced5ae9d4627f42e5
│  │  │  └─ 97d3db4610d0e63d4719540178cea193980876
│  │  ├─ e3
│  │  │  ├─ 04677cad07e6e6d600f0103b4155555ccf5c84
│  │  │  └─ 4a1b452eb003a46b6d16454145c5c86b6bfad5
│  │  ├─ e4
│  │  │  ├─ 2f94f3b890d65d04352a163c162a038a452d7b
│  │  │  ├─ 54a5c726c235feddcd8595952b765e566ceb7e
│  │  │  └─ 6e89615f30bf3b7beee4cd4679de37aee5cfc6
│  │  ├─ e5
│  │  │  ├─ 4ffecf966d109b03defcd5ed964f363dd62112
│  │  │  ├─ 6fd0a916d633e15168a5af16a5627986b520e2
│  │  │  └─ f2075b095d1a3d5da1e0d540a31f0f5b79b1ba
│  │  ├─ e6
│  │  │  ├─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  │  └─ a1a699e8809dd59337d29558eccf9071b696e2
│  │  ├─ e7
│  │  │  ├─ b4e4c4293f83b9081e5209a32970b2b1c46f95
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ e8
│  │  │  ├─ 11ef8003f2c43ed6e1b98033499388e5b16c58
│  │  │  └─ 907e9e4c7f6eabe6036d053e86b33f7d59ef05
│  │  ├─ e9
│  │  │  └─ 4cabf2f3db440bb5f1022aa1ca7e05ca337866
│  │  ├─ ea
│  │  │  └─ 61f4aded204492913c0a87cc43e445052207a3
│  │  ├─ eb
│  │  │  ├─ 7d89338bbd66605150e07ae3054bf520551cfa
│  │  │  └─ effcf33c6aebe22ae4eeb86b746b4811f6fd0d
│  │  ├─ ec
│  │  │  ├─ 3dde372c47ad8b0e110b94dff6bec399dc2862
│  │  │  └─ f52abb3de0791ca50df28f1a39ef617d18a44f
│  │  ├─ ee
│  │  │  ├─ 075395eaf22c11d7e15ca7513ee8e8b3039908
│  │  │  ├─ 3bd2724bfd5a64535144baf1f3c9c37c7667e4
│  │  │  └─ 83c64e593a3693a10bea622cc0bf16d871fca5
│  │  ├─ ef
│  │  │  ├─ 1cb98118c3cb72af74290976e804256bf0f484
│  │  │  ├─ 96b865f243cf8c7c325dd07b2b5d69a36b155f
│  │  │  └─ a126731926fd93367b077042c6a720b38c7ee1
│  │  ├─ f1
│  │  │  ├─ 7c29788fbd81140b725e9323906d482e9cd701
│  │  │  └─ 8c4f8986358b6b659d6689bc778fad72e2d136
│  │  ├─ f2
│  │  │  └─ 33598c5daf01b8339ef59319380e314f528ddd
│  │  ├─ f3
│  │  │  └─ ea7f87894c448eb718054e2eccc79792803d88
│  │  ├─ f4
│  │  │  └─ 79677c2c786ececa90793607ec684ae55ca736
│  │  ├─ f5
│  │  │  ├─ e2e9ac9b41cb6b0428bf719ab4edde3ef5883b
│  │  │  └─ f7fdeab5e3e260a325207a2172c6db7ca9fb39
│  │  ├─ f7
│  │  │  └─ cdc20b37de55c016a567943f6799a2b8e92fa5
│  │  ├─ f8
│  │  │  ├─ 014a5ac1995292d544749f69f1084afb751bc8
│  │  │  └─ 360317537e30be93f9b7e42879340a4f2306c5
│  │  ├─ f9
│  │  │  └─ aa1ff1403812f725090e18035f037eb16545b6
│  │  ├─ fa
│  │  │  ├─ 10ef480eccbbd3d32e788f18a6419f23e4f1a6
│  │  │  ├─ a3070720b7d1fe651cecd2c3d3f3bc6d220c0e
│  │  │  └─ c3d716d973ef8177cbccfb49e54d53b97466d7
│  │  ├─ fb
│  │  │  ├─ 89697f57a357ec083e41c5155ead19b50108ca
│  │  │  ├─ 9907d00f776052160a5c74c3a4552eba4000df
│  │  │  └─ e7fa325d9840daeab042e45c7ad35dbd3230d9
│  │  ├─ fc
│  │  │  ├─ 3d4e2fd261e9ce54153dc3d8cc2e7b9161d0f6
│  │  │  ├─ 57c55c6d625ff7609e369337de83bb878c2917
│  │  │  └─ dd28bb7bc7524bdf4a3bea5874782f163e79ba
│  │  ├─ fe
│  │  │  └─ e2c9ff2bcfdd38cbf4feac47b6c9e31f49d1e3
│  │  ├─ ff
│  │  │  └─ 94541da3b787a8176663d02c77ca99a9527e87
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ master
│     └─ tags
├─ .gitignore
├─ globals.d.ts
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ apiType
│  │  │  ├─ news.d.ts
│  │  │  └─ users.d.ts
│  │  ├─ login.ts
│  │  ├─ menuList.ts
│  │  ├─ news.ts
│  │  └─ userList.ts
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ 20140518045130307.jpg
│  │  ├─ 20201011011357445.jpg
│  │  ├─ back.jpg
│  │  └─ dog.jpg
│  ├─ component
│  │  ├─ news-manage
│  │  │  └─ newsEditor.tsx
│  │  └─ sandBox
│  │     ├─ SideMenu.tsx
│  │     ├─ sidMenu.module.scss
│  │     └─ TopHeader.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ reast.css
│  ├─ reducer
│  │  ├─ actions.ts
│  │  ├─ collapsedReducer.ts
│  │  └─ userReducer.ts
│  ├─ router
│  │  ├─ Redirect.tsx
│  │  └─ route.tsx
│  ├─ store
│  │  └─ index.ts
│  ├─ types
│  │  ├─ actions.d.ts
│  │  ├─ menu.d.ts
│  │  └─ user.d.ts
│  ├─ utils
│  │  ├─ deepcopy.ts
│  │  └─ request.ts
│  ├─ view
│  │  ├─ login
│  │  │  ├─ index.tsx
│  │  │  └─ login.module.scss
│  │  ├─ NotFound
│  │  │  └─ index.tsx
│  │  └─ sandBox
│  │     ├─ audit-manage
│  │     │  ├─ audit.tsx
│  │     │  └─ auditList.tsx
│  │     ├─ home
│  │     │  └─ index.tsx
│  │     ├─ index.scss
│  │     ├─ index.tsx
│  │     ├─ news-manage
│  │     │  ├─ newadd.module.scss
│  │     │  ├─ newsAdd.tsx
│  │     │  ├─ newsCategory.tsx
│  │     │  └─ newsDraft.tsx
│  │     ├─ publish-manage
│  │     │  ├─ published.tsx
│  │     │  ├─ sunset.tsx
│  │     │  └─ unpublished.tsx
│  │     ├─ rightManage
│  │     │  ├─ rightList.tsx
│  │     │  └─ roleList.tsx
│  │     └─ userManage
│  │        ├─ components
│  │        │  └─ userForm.tsx
│  │        └─ userList.tsx
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ yarn.lock

```