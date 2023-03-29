import { useRoutes } from "react-router"
import React from 'react'
import Redirect from './Redirect'
import SandBox from "../view/sandBox"

const MRoute = () => {
  const element = useRoutes([
    {
      path: '/login',
      element: (LazyLoad('login'))
    },
    {
      path: '/sandbox',
      element: (
        <SandBox></SandBox>
      ),
      children: [
        {
          path: '',
          element: (<Redirect to='/sandbox/home'></Redirect>)
        },
        {
          path: 'home',
          element: (LazyLoad('sandBox/home'))
        },
        {
          path: 'right-manage/right/list',
          element: (LazyLoad('sandBox/rightManage/rightList'))
        },
        {
          path: 'right-manage/role/list',
          element: (LazyLoad('sandBox/rightManage/roleList'))
        },
        {
          path: 'user-manage/list',
          element: (LazyLoad('sandBox/userManage/userList'))
        },
      ]
    },
    {
      path: '/',
      element: (<Redirect to='/sandbox'></Redirect>)
    },
    {
      path: '*',
      element: (LazyLoad('NotFound'))
    },

  ])

  return (element)
}

// 封装路由懒加载
const LazyLoad = (path: string) => {
  const Comp = React.lazy(() => import(`../view/${path}`))
  return (
    <React.Suspense fallback={<>加载中...</>}>
      <Comp />
    </React.Suspense>
  )
}


export default MRoute