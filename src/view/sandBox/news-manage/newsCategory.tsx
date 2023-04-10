import { getCategories } from '../../../api/news';
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Table, Button, Switch, Modal, Form, Input, Select, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { connect } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';

function NewsDraft(props: any) {

  const { username } = props.user

  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)

  // 分类接口数据
  const getData = useCallback(async () => {
    const res = await getCategories()
    console.log(res.data)
    setCategoryList(res.data)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '栏目名称',
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '操作',
      align: 'center',
      render: (record) => {
        return (
          <div>
            <Button type='primary' danger icon={<CloseCircleOutlined />} style={{ marginRight: 10 }}></Button>
          </div>
        )
      }
    },
  ]

  return (
    <Fragment>
      <Table
        dataSource={categoryList}
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