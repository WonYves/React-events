import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Select, Button, Modal, message } from 'antd'
import { addUsers, UpUsers } from '../../../../api/userList';

interface IUserporps {
  regionList: any;
  roleList: any;
  close: Function;
  getData: Function;
  ItemRecord?: any;
  isforbidden?: boolean;
}

type valueType = {
  password: string;
  region: string;
  roleId: number;
  username: string;
}
export default function UserForm(props: IUserporps) {

  const { regionList, roleList, close, getData, ItemRecord, isforbidden } = props
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)
  const [eventId, setEventId] = useState<number>()

  // 提交表单
  const onFinish = (value: valueType) => {
    isChange ? upData((eventId as number), value) : addData(value)
  }

  const [form] = Form.useForm()

  //添加角色
  const addData = useCallback(async (params: IadduserType) => {
    await addUsers(params)
    form.resetFields()
    message.success('添加成功')
    close()
    setIsChange(false)
    getData()
  }, [])

  //修改角色
  const upData = useCallback(async (id: number, params: IadduserType) => {
    await UpUsers(id, params)
    form.resetFields()
    message.success('更新成功')
    close()
    setIsChange(false)
    getData()
  }, [])


  useEffect(() => {
    setIsDisabled((isforbidden) as boolean)
  }, [isforbidden])

  useEffect(() => {
    console.log(ItemRecord);
    if (ItemRecord && ItemRecord.length !== 0) {
      setIsChange(true)
      setEventId(ItemRecord.id)
      form.setFieldsValue({
        username: ItemRecord.username,
        password: ItemRecord.password,
        region: ItemRecord.region,
        roleId: ItemRecord.roleId,
      })
    }
  }, [ItemRecord])

  return (
    <div>
      <Form
        form={form}
        style={{ margin: 20 }}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="区域"
          name="region"
          rules={isDisabled? []:[{ required: true, message: '请选择区域!' }]}
        >
          <Select disabled={isDisabled}
            options={(regionList || []).map((item: regionsType) => ({
              value: item.value,
              label: item.title,
            }))}
          />
        </Form.Item>
        <Form.Item
          label='角色'
          name="roleId"
          rules={[{ required: true, message: '请选择角色!' }]}
        >
          <Select onChange={(value) => {
            if (value === 1) {
              setIsDisabled(true)
              form.setFieldValue('region', '')
            } else {
              setIsDisabled(false)
            }
          }}
            options={(roleList || []).map((item: UserType) => ({
              value: item.id,
              label: item.roleName,
            }))}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button onClick={() => {
            setIsChange(false)
            form.resetFields()
            close()
          }}>
            取消
          </Button>
          <Button style={{ marginLeft: 20 }} type="primary" htmlType="submit">
            {isChange ? '更新' : '确定'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
