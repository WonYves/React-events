import React, { useState, useEffect, useCallback } from 'react'
import { Table, Button, Tag, Modal, Spin, Popover, Switch } from 'antd'
import { getMenu, deleteMenu, deleteChildren, changeItem, changeItemChildren } from '../../../api/menuList'
import type { ColumnsType } from 'antd/es/table';
import {  FormOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal;

const RightList = () => {

  const [dataSource, setdataSource] = useState([]) //表格数据
  const [loading, setLoading] = useState(false) //加载框

  // 表格数据
  const getData = useCallback(async () => {
    setLoading(true)
    const res = await getMenu()
    const newlist = res.data
    newlist.forEach((item: DataType) => {
      if (item.children?.length === 0) {
        item.children = ''
      }
    })
    setdataSource(newlist)
    setLoading(false)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  // 表格
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      align: 'center'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      align: 'center',
      render: (path) => (
        <Tag color={'volcano'}>{path}</Tag>
      )
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => {
        return (
          <div>
            <Button danger type='primary' icon={<CloseCircleOutlined />} onClick={handleConfirm.bind(null, record)} style={{ marginRight: 10 }} />
            {record.pagepermisson === undefined ?
              <Button type='primary' disabled icon={<FormOutlined />} />
              :
              <Popover content={content(record)} title="页面配置项" style={{ textAlign: 'center' }}>
                <Button type='primary' icon={<FormOutlined />} />
              </Popover>
            }
          </div>
        )
      }
    },
  ]

  // 开关器
  const content = (record: DataType) => {
    return (
      <Switch checked={Boolean(record.pagepermisson)} onChange={() => handleCheck(record)} />
    )
  }

  // 开关接口
  const handleCheck = (record: DataType) => {
    record.pagepermisson = record.pagepermisson === 0 ? 1 : 0
    if (record.grade === 1) {
      change(record.id, record.pagepermisson)
    } else {
      changeChildren(record.id, record.pagepermisson)
    }
  }

  // 删除弹窗
  const handleConfirm = (record: DataType) => {
    confirm({
      title: '确定要删除吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        if (record.grade === 1) {
          deleteItem(record.id)
        } else {
          deleteChildrenItem(record.id)
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 删除接口
  const deleteItem = useCallback(async (id: number) => {
    setLoading(true)
    const res = await deleteMenu(id)
    console.log(res.data)
    getData()
    setLoading(false)
  }, [])
  // 删除子级接口
  const deleteChildrenItem = useCallback(async (id: number) => {
    setLoading(true)
    const res = await deleteChildren(id)
    getData()
    setLoading(false)
  }, [])
  // 配置接口
  const change = useCallback(async (id: number, pagepermisson: number) => {
    setLoading(true)
    const res = await changeItem(id, pagepermisson)
    console.log(res.data)
    getData()
    setLoading(false)
  }, [])
  // 配置子级接口
  const changeChildren = useCallback(async (id: number, pagepermisson: number) => {
    setLoading(true)
    const res = await changeItemChildren(id, pagepermisson)
    getData()
    setLoading(false)
  }, [])

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        key='id'
        loading={loading}
        pagination={{
          pageSize: 5
        }}
      />
    </div>
  )
}


export default RightList