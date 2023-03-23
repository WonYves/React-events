import { Layout } from 'antd'
import { Fragment } from 'react'
import { Outlet } from 'react-router'
import SideMenu from '../../component/sandBox/SideMenu'
import TopHeader from '../../component/sandBox/TopHeader'
import './index.scss'
const { Content } = Layout;

export default function SandBox() {
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
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  )
}
