import { getNews, deleteNews } from '../../../api/news'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Table, Button, Switch, Modal, Form, Input, Select, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { connect } from 'react-redux';
import { FormOutlined, CloseCircleOutlined, CloudUploadOutlined } from '@ant-design/icons'

const { confirm } = Modal

function NewsDraft(props: any) {

  const { username } = props.user

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async (username: string, auditState: number) => {
    const res = await getNews(username, auditState)
    setNews(res.data)
  }, [])

  const deleteData = useCallback(async (id: number) => {
    const res = await deleteNews(id)
    message.success('删除成功')
    getData(username, 0)
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
    getData(username, 0)
  }, [username])

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '事件标题',
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      align: 'center'
    },
    {
      title: '事件分类',
      dataIndex: 'categoryId',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => {
        return (
          <div>
            <div>
              <Button type='primary' danger icon={<CloseCircleOutlined />} style={{ marginRight: 10 }} onClick={() => handleDelete(record.id)} ></Button>
              <Button type='primary' icon={<FormOutlined />} style={{ marginRight: 10 }}></Button>
              <Button icon={<CloudUploadOutlined />} ></Button>
            </div>
          </div>
        )
      }
    },
  ]

  return (
    <Fragment>
      <Table
        dataSource={news}
        columns={columns}
        rowKey='id'
        loading={loading}
        pagination={{
          pageSize: 5
        }}
      />
    </Fragment>
  )
}

const mapGetUser = (state: any) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapGetUser)(NewsDraft)