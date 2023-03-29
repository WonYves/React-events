import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, theme, Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { outTo } from '../../reducer/actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

const { Header } = Layout;

const TopHeader = (props: any) => {

  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
   console.log(props);
  }, [])

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div>
          {props.user?.role?.roleName}
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div onClick={() => {
          props.outTo('')
        }}>
          退出
        </div>
      ),
    },
  ];

  return (
    <Header style={{ padding: '0 16px', background: colorBgContainer }}>
      {collapsed ? <MenuUnfoldOutlined onClick={handleChange} /> : <MenuFoldOutlined onClick={handleChange} />}

      <div style={{ float: 'right', marginRight:20 }}>
        <span style={{ fontSize: 18  }}>
          Hello
          <span style={{ marginLeft: 5, fontWeight:'bold' }}>
            {props.user?.username}
          </span>
        </span>
        <Dropdown menu={{ items }}>
          <span style={{ marginLeft: 10 }}>
            <Avatar shape="square" src='https://p3-passport.byteimg.com/img/user-avatar/f89b17f66aae7e2c4b176f04bcf2aa65~180x180.awebp' size={50} />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

const mapUserList = (state: any) => {
  return {
    user: state.userReducer
  }
}

const mapdispatchUser = {
  outTo
}

export default connect(mapUserList, mapdispatchUser)(TopHeader)