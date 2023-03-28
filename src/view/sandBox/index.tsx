import { Layout, theme } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import SideMenu from '../../component/sandBox/SideMenu'
import TopHeader from '../../component/sandBox/TopHeader'
import './index.scss'
const { Content } = Layout;
import { connect } from 'react-redux'

function SandBox(props: any) {
  const {user} = props

  const navigate = useNavigate()
  const { token: { colorBgContainer }, } = theme.useToken();

  useEffect(() => {
    console.log(user);
    if(!user.username){
      navigate('/login')
    }
  }, [user])

  return (
    <Fragment>
      <Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'auto'
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  )
}

const mapgetUserList = (state: any) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapgetUserList)(SandBox)
