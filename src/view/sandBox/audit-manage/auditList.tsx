import { getNews, deleteNews } from '../../../api/news'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Table, Button, Switch, Modal, Form, Input, Select, message, Tag } from 'antd'
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


  useEffect(() => {
    getData(username, 1)
  }, [username])

  const columns: ColumnsType<any> = [
    {
      title: '事件标题',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '作者',
      align: 'center',
      dataIndex: 'author',
    },
    {
      title: '事件分类',
      dataIndex: 'categoryId',
      align: 'center'
    },
    {
      title: '审核状态',
      align: 'center',
      render: (record) => {
        return (
          <div>
            {record.auditState === 1 && <Tag color='green'>已通过</Tag>}
            {record.auditState === 2 && <Tag color='orange'>审核中</Tag>}
            {record.auditState === 3 && <Tag color='red'>未通过</Tag>}
          </div>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => {
        return (
          <div>
            <div>
              {record.auditState === 1 && <Button type='primary'>发布</Button>}
              {record.auditState === 2 && <Button type='primary'>撤销</Button>}
              {record.auditState === 3 && <Button type='primary'>更新</Button>}
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