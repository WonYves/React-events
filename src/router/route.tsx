import { useRoutes } from "react-router"
import React, { useEffect, useState } from 'react'
import Redirect from './Redirect'
import SandBox from "../view/sandBox"
import axios from "axios"
import { connect } from "react-redux"

interface IRight {
  key: string
  label: string
  id: number
  grade: number
  children?: IRight[]
  pagepermisson?: number
  rightId?: number
}

interface IAuth {
  children: JSX.Element
  right: string
}

const MRoute = (props: any) => {

  const { rights } = props

  const [routeList, setRoutList] = useState<IRight[]>([])

  function getData() {
    Promise.all([
      axios.get('http://localhost:2222/rights'),
      axios.get('http://localhost:2222/children')
    ]).then(res => {
      // console.log([...res[0].data, ...res[1].data])
      setRoutList([...res[0].data, ...res[1].data])
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const AuthComponent: React.FC<IAuth> = ({ children, right }) => {
    const isAuth = rights?.includes(right) && routeList.find((item) => item.key === right)?.pagepermisson === 1
    return isAuth ? children : LazyLoad('NotFound')
  }


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
          element: <AuthComponent right='/home'>{(LazyLoad('sandBox/home'))}</AuthComponent >
        },
        {
          path: 'right-manage/right/list',
          element: <AuthComponent right='/right-manage/right/list'>{(LazyLoad('sandBox/rightManage/rightList'))}</AuthComponent>
        },
        {
          path: 'right-manage/role/list',
          element: <AuthComponent right="/right-manage/role/list">{(LazyLoad('sandBox/rightManage/roleList'))}</AuthComponent>
        },
        {
          path: 'user-manage/list',
          element: <AuthComponent right="/user-manage/list">{(LazyLoad('sandBox/userManage/userList'))}</AuthComponent>
        },
        {
          path: 'news-manage/add',
          element: LazyLoad('sandBox/news-manage/newsAdd'),
        },
        {
          path: 'news-manage/draft',
          element: LazyLoad('sandBox/news-manage/newsDraft'),
        },
        {
          path: 'news-manage/category',
          element: LazyLoad('sandBox/news-manage/newsCategory'),
        },
        {
          path: 'audit-manage/audit',
          element: LazyLoad('sandBox/audit-Manage/audit'),
        },
        {
          path: 'audit-manage/list',
          element: LazyLoad('sandBox/audit-manage/auditList'),
        },
        {
          path: 'publish-manage/unpublished',
          element: LazyLoad('sandBox/publish-manage/unpublished'),
        },
        {
          path: 'publish-manage/published',
          element: LazyLoad('sandBox/publish-manage/published'),
        },
        {
          path: 'publish-manage/sunset',
          element: LazyLoad('sandBox/publish-manage/sunset'),
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
    <React.Suspense fallback={<>加载中....</>}>
      <Comp />
    </React.Suspense>
  )
}

const mapUserList = (state: any) => {
  return {
    rights: state.userReducer?.role?.rights
  }
}


export default connect(mapUserList)(MRoute)