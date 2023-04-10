import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  HomeOutlined,
  MenuOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  AppstoreAddOutlined,
  ClusterOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';
import style from './sidMenu.module.scss'
import { useNavigate } from 'react-router';
import { getMenu } from '../../api/menuList'
const { Sider } = Layout;
import { connect } from 'react-redux';
interface IMenuList {
  children?: [],
  grade: number
  id: number
  key: string
  title: string
  pagepermisson: number
}
const { SubMenu } = Menu

function SideMenu(props: any) {


  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState<any[]>([])
  const navigate = useNavigate()
  // 侧边栏列表
  const getList = useCallback(async () => {
    const res = await getMenu()
    setMenuList(res.data)
  }, [])

  useEffect(() => {
    getList()
    console.log(props.isCollapsed);
  }, [])

  //点击侧边栏
  const handleMenu = (item: IMenuList) => {
    console.log(item);
    navigate(`/sandbox${item.key}`)
  }

  //侧边栏图标
  const iconList: any = {
    '/home': <HomeOutlined />,
    '/user-manage/list': <MenuOutlined />,
    '/right-manage/right/list': <MenuOutlined />,
    '/right-manage/role/list': <MenuOutlined />,
    '/user-manage': <TeamOutlined />,
    '/right-manage': <DeploymentUnitOutlined />,
    '/news-manage': <AppstoreAddOutlined />,
    '/audit-manage': <ClusterOutlined />,
    '/publish-manage': <LaptopOutlined />,
  }

  //渲染侧边栏
  const RenderMenu = (menu: Array<IMenuList>) => {

    return (
      menu.map((item: IMenuList) => {
        // 没有子级和子级的长度为零和有分页的

        const roleList = props.user.userReducer?.role?.rights
        if (item.children && item.children.length > 0 && item.pagepermisson && roleList?.includes(item.key) ) {
          return (
            <SubMenu theme='dark'   key={item.key} title={item.title} icon={iconList[item.key]}>
              {RenderMenu(item.children)}
            </SubMenu>
          )
        } else {
          return (
            (Boolean(item.pagepermisson) && roleList?.includes(item.key)) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={handleMenu.bind(null, item)}>
              <span>{item.title}</span>
            </Menu.Item>
          )
        }
      })
    )
  }

  const selectKey = [location.pathname.replace('/sandbox', '')]
  const openKey = ['/' + location.pathname.split('/')[2]]

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className={style.logo}>
          <Avatar size={30} src='https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'></Avatar>
          {props.isCollapsed || <div className={style.title}>ReactEvents</div>}
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKey}
            defaultOpenKeys={openKey}
          >
            {RenderMenu(menuList)}
          </Menu>
        </div >
      </div >
    </Sider>
  )
}

const mapgetUser = (state:any) => {
  return {
    user : state,
    isCollapsed: state.collapsedReducer.isCollapsed
  }
}

export default connect(mapgetUser)(SideMenu)