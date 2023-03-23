import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, theme, Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';

const { Header } = Layout;

export default function TopHeader() {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div>
          超级管理员
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div>
          退出
        </div>
      ),
    },
  ];

  return (
    <Header style={{ padding: '0 16px', background: colorBgContainer }}>
      {collapsed ? <MenuUnfoldOutlined onClick={handleChange} /> : <MenuFoldOutlined onClick={handleChange} />}

      <div style={{ float: 'right' }}>
        <span style={{ fontSize: 16 }}>
          Hello
          <span style={{ color: 'skyblue', marginLeft: 5 }}>
            admin
          </span>
        </span>
        <Dropdown menu={{ items }}>
          <span style={{ marginLeft: 10 }}>
            <Avatar shape="square" size={42} icon={<UserOutlined />} />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}
