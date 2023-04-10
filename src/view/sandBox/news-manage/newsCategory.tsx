import { getNews } from '../../../api/news'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Table, Button, Switch, Modal, Form, Input, Select, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { connect } from 'react-redux';

function NewsDraft(props: any) {

  const { username } = props.user

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async (username: string, auditState: number) => {
    const res = await getNews(username, auditState)
    setNews(res.data)
  }, [])

  useEffect(() => {
    console.log(username)
    getData(username, 1)
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
            1
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