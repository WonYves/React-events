import { useRoutes } from "react-router"
import React from 'react'

const MRoute = () => {
  const element = useRoutes([
    {
      path:'/login',
      element:(LazyLoad('login'))
    },
    {
      path:'/register',
      element:(LazyLoad('register'))
    },
    {
      path:'/sandBox',
      element:(LazyLoad('sandBox'))
    },

  ])

  return (element)
}

// 封装路由懒加载
const LazyLoad = (path:string) => {
  const Comp = React.lazy(() => import(`../view/${path}`))
  return (
    <React.Suspense fallback={<>加载中...</>}>
      <Comp />
    </React.Suspense>
  )
}


export default MRoute