import React, { useCallback, useEffect, useState } from 'react'
import { getUserList, getRegions, getUser, deleteUsers, changeUsers } from '../../../api/userList'
import { Table, Button, Switch, Modal, Form, Input, Select, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons'
import type { SelectProps } from 'antd';
import UserForm from './components/userForm';

const { confirm } = Modal

const UserList = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState([])
  const [roleList, setroleList] = useState<SelectProps['options']>([])
  const [regionList, setregionList] = useState<SelectProps['options']>([])
  const [loading, setloading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShoWUp, setIsShowUp] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [itemRecord, setItemRecord] = useState({})

  // 用户
  const getData = useCallback(async () => {
    setloading(true)
    const res = await getUserList()
    setUser(res.data)
    console.log(res.data)
    setloading(false)
  }, [])

  // 区域
  const getDate = useCallback(async () => {
    setloading(true)
    const res = await getRegions()
    setregionList(res.data)
    setloading(false)
  }, [])

  // 角色
  const getResData = useCallback(async () => {
    setloading(true)
    const res = await getUser()
    setroleList(res.data)
    setloading(false)
  }, [])

  // 删除角色
  const deleteData = useCallback(async (id: number) => {
    const res = await deleteUsers(id)
    getData()
  }, [])

  // 更改角色状态
  const changeData = useCallback(async (id: number, roleState: boolean) => {
    const res = await changeUsers(id, roleState)
    messageApi.info('修改成功！')
    getData()
  }, [])


  const handleDelete = (id: number) => {
    confirm({
      title: '确定要删除吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteData(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  useEffect(() => {
    getData()
  }, [])

  // 用户状态
  const onChange = (record: PeopleType) => {
    console.log(record)
    record.roleState = !record.roleState
    changeData(record.id, record.roleState)
  }

  //编辑用户信息
  const handleUpdate = (record: PeopleType) => {
    console.log(record);
    getDate()
    getResData()
    setItemRecord(record)
    setIsShowUp(true)
    record.roleId === 1? setIsDisabled(true): setIsDisabled(false)
  }

  // 表格
  const columns: ColumnsType<PeopleType> = [
    {
      title: '区域',
      dataIndex: 'region',
      align: 'center',
      render: (region) => {
        return (
          <div style={{fontWeight:'bold'}}>{region === '' ? '全球' : region}</div>
        )
      }
    },
    {
      title: '角色名称',
      align: 'center',
      render: (record) => {
        return record.role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      align: 'center',
      render: (ischeck, record) => (
        <Switch checked={ischeck} disabled={record.default} onChange={onChange.bind(null, record)} />
      )
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => {
        return (
          <div>
            <Button type='primary' onClick={() => handleDelete(record.id)}
              danger icon={<CloseCircleOutlined />} disabled={record.default} style={{ marginRight: 10 }} ></Button>
            <Button type='primary' icon={<FormOutlined />} disabled={record.default} onClick={() => handleUpdate(record)}></Button>
          </div>
        )
      }
    },
  ]

  return (
    <div>
      <div style={{ float: 'right' }}>
        <Button style={{ margin: 10 }} type='primary' onClick={() => {
          getDate()
          getResData()
          setIsModalOpen(true)
        }}>添加用户</Button>
      </div>
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
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        title='添加用户信息'
      >
        <UserForm regionList={regionList} roleList={roleList} close={() => setIsModalOpen(false)} getData={getData}></UserForm>
      </Modal>

      <Modal
        open={isShoWUp}
        footer={null}
        onCancel={() => setIsShowUp(false)}
        title='更新用户信息'
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          close={() => setIsShowUp(false)}
          getData={getData}
          ItemRecord={itemRecord}
          isforbidden={isDisabled}
        ></UserForm>
      </Modal>
      {contextHolder}
    </div>
  )
}


export default UserList
