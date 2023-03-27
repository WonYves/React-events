import React, { useCallback, useEffect, useState } from 'react'
import { getUserList, getRegions, getUser } from '../../../api/userList'
import { Table, Button, Switch, Modal, Form, Input, Select } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons'
import type { SelectProps } from 'antd';
import UserForm from './components/userForm';

type PeopleType = {
  id: number;
  default: boolean;
  password: number;
  region: string;
  role: UserType;
  roleState: boolean;
  username: string;
}

const UserList = () => {

  const [user, setUser] = useState([])
  const [roleList, setroleList] = useState<SelectProps['options']>([])
  const [regionList, setregionList] = useState<SelectProps['options']>([])
  const [loading, setloading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    console.log(res.data)
    setloading(false)
  }, [])

  // 角色
  const getResData = useCallback(async () => {
    setloading(true)
    const res = await getUser()
    setroleList(res.data)
    console.log(res.data)
    setloading(false)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  // 用户状态
  const onChange = (ischeck: boolean) => {
    console.log(ischeck)
  }

  // 表格
  const columns: ColumnsType<PeopleType> = [
    {
      title: '区域',
      dataIndex: 'region',
      align: 'center',
      render: (region) => {
        return (
          <div>{region === '' ? '全球' : region}</div>
        )
      }
    },
    {
      title: '角色名称',
      align: 'center',
      render: (record) => {
        return record.role.roleName
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
        <Switch checked={ischeck} disabled={record.default} onChange={onChange.bind(null, ischeck)} />
      )
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => {
        return (
          <div>
            <Button type='primary' danger icon={<CloseCircleOutlined />} disabled={record.default} style={{ marginRight: 10 }} ></Button>
            <Button type='primary' icon={<FormOutlined />} disabled={record.default}></Button>
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
        <UserForm regionList={regionList} roleList={roleList} close={() => setIsModalOpen(false)}></UserForm>
      </Modal>
    </div>
  )
}


export default UserList
