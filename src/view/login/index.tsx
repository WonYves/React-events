import { Fragment, useCallback } from 'react'
import style from './login.module.scss'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, message } from 'antd';
import { useNavigate } from 'react-router';
import { ApiLogin } from '../../api/login';
const Login = () => {

  const navigate = useNavigate()

  const Login = useCallback(async (username: string, password: string) => {
    const res = await ApiLogin(username, password)
    console.log(res.data);
    if (res.data.length === 0) {
      message.error('登录失败')
    } else {
      message.success('登录成功!')
      // navigate('/sandbox')
    }
  }, [])

  const onFinish = (value: { username: string; password: string }) => {
    Login(value.username, value.password)
  }

  return (
    <Fragment>
      <div className={style.bigBox}>
        <div className={style.formInpBox}>
          <div className={style.inFormBox}>
            <span className={style.title}>
              Events
            </span>
            <Form
              onFinish={onFinish}
            >
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input placeholder='请输入用户名' prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password placeholder='请输入密码' name="password" prefix={<LockOutlined />} />
              </Form.Item>
              <Button htmlType='submit' className={style.btn} type='primary'>登录</Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
