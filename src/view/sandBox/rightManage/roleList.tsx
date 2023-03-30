import React, { useState, useEffect, useCallback } from 'react'
import { Table, Button, Tag, Modal, Tree, Popover, Switch } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { getUser, deleteUser, changeUserPower } from '../../../api/userList';
import { getMenu } from '../../../api/menuList';
import { UnorderedListOutlined, CloseCircleOutlined } from '@ant-design/icons'

interface Icheck {
  checked: [];
  [key: string]: any;
}

const { confirm } = Modal

export default function RoleList() {

  const [user, setUser] = useState([])  //角色数据
  const [menu, setMenu] = useState([])  //导航栏数据
  const [rightList, setRightList] = useState([])  //权限角色包含的数据
  const [rightId, setRightId] = useState<Number>() //权限角色的id
  const [loading, setLoading] = useState(false) //加载
  const [isModalOpen, setIsModalOpen] = useState(false); //Modal

  // 角色数据
  const getDate = useCallback(async () => {
    setLoading(true)
    const res = await getUser()
    console.log(res.data)
    setUser(res.data)
    setLoading(false)
  }, [])
  // 导航栏数据
  const getData = useCallback(async () => {
    setLoading(true)
    const res = await getMenu()
    setMenu(res.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    getDate()
    getData()
  }, [])

  // 表格
  const columns: ColumnsType<UserType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '角色名称  ',
      dataIndex: 'roleName',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => {
        return (
          <div>
            <Button type='primary' danger icon={<CloseCircleOutlined />} style={{ marginRight: 10 }} onClick={handleConfirm.bind(null, record)}></Button>
            <Button type='primary' icon={<UnorderedListOutlined />} onClick={showModal.bind(null, record)}></Button>
          </div>
        )
      }
    },
  ]

  //角色删除
  const handleConfirm = (record: UserType) => {
    confirm({
      title: '确定要删除吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteIt(record.id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 角色删除
  const deleteIt = useCallback(async (id: number) => {
    setLoading(true)
    const res = await deleteUser(id)
    setLoading(false)
    getDate()
  }, [])
  // 更改权限 
  const changeIt = useCallback(async (id: number, rights:any) => {
    setLoading(true)
    const res = await changeUserPower(id, rights)
    setLoading(false)
    getDate()
  }, [])
  // 打开Modal
  const showModal = (record: UserType) => {
    setIsModalOpen(true);
    setRightList(record.rights)
    setRightId(record.id)
  };
  // 确认更改
  const handleOk = () => {
    changeIt((rightId as number), rightList)
    setIsModalOpen(false);
  };
  // 关闭弹窗
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 选中的树节点
  const onCheck: any = (checkedKeys: Icheck) => {
    setRightList(checkedKeys.checked);
  }

  return (
    <div>
      <Table
        dataSource={user}
        columns={columns}
        rowKey='id'
        loading={loading}
        pagination={{
          pageSize: 5
        }}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel} okText="确认"
        cancelText="取消">
        <Tree
          defaultExpandAll={true}
          checkable
          checkedKeys={rightList}
          treeData={menu}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>
    </div>
  )
}
