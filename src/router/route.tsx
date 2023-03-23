import { useRoutes } from "react-router"
import React from 'react'
import Redirect from './Redirect'

interface Iprops {
  children: any
}

const MRoute = () => {
  const element = useRoutes([
    {
      path: '/login',
      element: (LazyLoad('login'))
    },
    {
      path: '/register',
      element: (LazyLoad('register'))
    },
    {
      path: '/sandbox',
      element: (
        <AuthComponent>
          {LazyLoad('sandBox')}
        </AuthComponent>
      ),
      children: [
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
      element: (<Redirect to='/sandBox/home'></Redirect>)
    },
    {
      path: '*',
      element: (LazyLoad('NotFound'))
    },

  ])

  return (element)
}

// 封装路由拦截
const AuthComponent = (props: Iprops) => {
  const isLogin = localStorage.getItem('token')
  return isLogin ? props.children : <Redirect to='/login'></Redirect>
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