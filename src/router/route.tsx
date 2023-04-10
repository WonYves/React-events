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
      setRoutList([...res[0].data, ...res[1].data])
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const AuthComponent: React.FC<IAuth> = ({ children, right }) => {
    const isAuth = rights?.includes(right) && routeList.find((item) => item.key === right)?.pagepermisson === 1
    return isAuth ? children :  withLoadingComponent(<NotFound/>)
  }


  const element = useRoutes([
    {
      path: '/login',
      element: withLoadingComponent(<Login/>)
    },
    {
      path: '/sandbox',
      element: withLoadingComponent(<Sandbox/>),
      children: [
        {
          path: '',
          element: (<Redirect to='/sandbox/home'></Redirect>)
        },
        {
          path: 'home',
          element: <AuthComponent right='/home'>{withLoadingComponent(<Home/>)}</AuthComponent >
        },
        {
          path: 'right-manage/right/list',
          element: <AuthComponent right='/right-manage/right/list'>{withLoadingComponent(<RightList/>)}</AuthComponent>
        },
        {
          path: 'right-manage/role/list',
          element: <AuthComponent right="/right-manage/role/list">{withLoadingComponent(<RoleList/>)}</AuthComponent>
        },
        {
          path: 'user-manage/list',
          element: <AuthComponent right="/user-manage/list">{withLoadingComponent(<UserList/>)}</AuthComponent>
        },
        {
          path: 'news-manage/add',
          element:withLoadingComponent(<NewsAdd/>),
        },
        {
          path: 'news-manage/draft',
          element: withLoadingComponent(<NewsDraft/>),
        },
        {
          path: 'news-manage/category',
          element: withLoadingComponent(<NewsCategory/>),
        },
        {
          path: 'audit-manage/audit',
          element: withLoadingComponent(<Audit/>),
        },
        {
          path: 'audit-manage/list',
          element: withLoadingComponent(<AuditList/>),
        },
        {
          path: 'publish-manage/unpublished',
          element: withLoadingComponent(<Unpublished/>),
        },
        {
          path: 'publish-manage/published',
          element: withLoadingComponent(<Published/>),
        },
        {
          path: 'publish-manage/sunset',
          element: withLoadingComponent(<Sunset/>),
        },
      ]
    },
    {
      path: '/',
      element: (<Redirect to='/sandbox'></Redirect>)
    },
    {
      path: '*',
      element:  withLoadingComponent(<NotFound/>),
    },

  ])

  return (element)
}

// 封装路由懒加载
const withLoadingComponent = (comp: JSX.Element) => <Suspense fallback={<div>Loading...</div>}>
        {comp}
</Suspense>

const mapUserList = (state: any) => {
  return {
    rights: state.userReducer?.role?.rights
  }
}


export default connect(mapUserList)(MRoute)