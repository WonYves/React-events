import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Select, Button, Modal } from 'antd'
import { addUsers } from '../../../../api/userList';

interface IUserporps {
  regionList: any;
  roleList: any;
  close: Function;
  getData: Function;
  ItemRecord?: any;
}

type valueType = {
  password: string;
  region: string;
  roleId: number;
  username: string;
}
export default function UserForm(props: IUserporps) {

  const { regionList, roleList, close, getData, ItemRecord } = props
  const [isDisabled, setIsDisabled] = useState(false)
  // 提交表单
  const onFinish = (value: valueType, id?: number) => {
    close()
    addData(value)
  }

  const [form] = Form.useForm()

  const addData = useCallback(async (params: IadduserType) => {
    const res = await addUsers(params)
    form.resetFields()
    getData()
  }, [])

  useEffect(() => {
    console.log(ItemRecord);
    if(ItemRecord && ItemRecord.length !== 0){
      form.setFieldsValue({
        username: ItemRecord.username,
        password: ItemRecord.password,
        region:ItemRecord.region,
        roleId:ItemRecord.role.roleName,
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
          rules={[{ required: true, message: '请输入用户名!' }]}
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
          rules={isDisabled ? [] : [{ required: true, message: '请选择区域!' }]}
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
          rules={[{ required: true }]}
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
          <Button onClick={() => close()}>
            取消
          </Button>
          <Button style={{ marginLeft: 20 }} type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item >
      </Form>
    </div>
  )
}
