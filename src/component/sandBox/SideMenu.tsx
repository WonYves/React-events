import { useEffect, useState, useCallback } from 'react'
import {
  HomeOutlined,
  MenuOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  AppstoreAddOutlined,
  ClusterOutlined,
  LaptopOutlined,
 } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import style from './sidMenu.module.scss'
import { useNavigate } from 'react-router';
import { getMenu } from '../../api/menuList'
const { Sider } = Layout;

interface IMenuList {
  children?: [],
  grade: number
  id: number
  key: string
  label: string
  pagepermisson: number
}
const { SubMenu } = Menu

export default function SideMenu() {


  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<any[]>([])
  const navigate = useNavigate()
  // 侧边栏列表
  const getList = useCallback(async () => {
    const res = await getMenu()
    console.log(res.data)
    setMenuList(res.data)
  }, [])

  useEffect(() => {
    console.log(location.pathname)
    getList()
  }, [])

  //点击侧边栏
  const handleMenu = (item: IMenuList) => {
    console.log(item);
    navigate(`/sandbox${item.key}`)
  }

  const iconList:any = {
    '/home':<HomeOutlined />,
    '/user-manage/list':<MenuOutlined />,
    '/right-manage/right/list':<MenuOutlined />,
    '/right-manage/role/list':<MenuOutlined />,
    '/user-manage':<TeamOutlined />,
    '/right-manage':<DeploymentUnitOutlined />,
    '/news-manage':<AppstoreAddOutlined />,
    '/audit-manage':<ClusterOutlined />,
    '/publish-manage':<LaptopOutlined />,
  }

  //渲染侧边栏
  const RenderMenu = (menuList: Array<any>) => {

    return (
      menuList.map(item => {
        if (item.children?.length > 0 && item.pagepermisson) {
          return (
            <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
              {RenderMenu(item.children)}
            </SubMenu>
          )
        } else {
          return (
            item.pagepermisson && <Menu.Item key={item.key} icon={iconList[item.key]}   onClick={handleMenu.bind(null, item)}>
              <span>{item.title}</span>
            </Menu.Item>
          )
        }
      })
    )
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{display:'flex',height:'100%',flexDirection:'column'}}>
        <div className={style.logo}>React-Events</div>
        <div style={{flex:1, overflow:'auto'}}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['']}
            defaultOpenKeys = {[location.pathname]}
          >
            {RenderMenu(menuList)}
          </Menu>
        </div >
      </div >
    </Sider>
  )
}
