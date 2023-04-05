import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Steps, Button, Form, Input, Select, message } from 'antd';
import style from './newadd.module.scss'
import { getCategories, saveContent } from '../../../api/news'
import NewsEditor from '../../../component/news-manage/newsEditor'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

function NewsAdd(props: any) {

  const navigete = useNavigate()
  const { user } = props

  let [stepsCurrent, setStepsCurrent] = useState(0)  //步骤条进度
  const [categoryList, setCategoryList] = useState([]) //分类数据
  const [inputValue, setInputValue] = useState<INewsParams>(); //分类和标题内容
  const [quillvalue, setQuillValue] = useState(''); //富文本内容
  const EventsForm: any = useRef(null) //事件input

  // 分类接口数据
  const getData = useCallback(async () => {
    const res = await getCategories()
    setCategoryList(res.data)
  }, [])


  // 提交审核&保存草稿
  const saveData = useCallback(async (params: INewsParams) => {
    const res = await saveContent(params)
    console.log(res.data)
    params.auditState ? message.success('已提交审核') : message.success('已保存至草稿箱')
    setTimeout(() => {
      params.auditState ? navigete('/sandbox/audit-manage/list') : navigete('/sandbox/news-manage/draft')
    }, 1000)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  //下一步
  const handleNext = () => {
    if (stepsCurrent === 0) {
      EventsForm && EventsForm.current?.validateFields()
        .then((res: INewsParams) => {
          setInputValue(res)
          setStepsCurrent(stepsCurrent + 1)
        }).catch((err: any) => {
          console.log(err);
        })
    } else {
      console.log(quillvalue)
      if (quillvalue == '' || quillvalue.trim() === "<p><br></p>") {
        message.error('事件内容不能为空')
      } else {
        setStepsCurrent(stepsCurrent + 1)
      }
    }
  }

  const handleSave = (auditState: number) => {
    const { title, categoryId } = (inputValue as INewsParams)
    saveData({
      title,
      categoryId,
      content: quillvalue,
      region: (user.region || '全球'),
      author: user.username,
      roleId: user.roleId,
      auditState,
      publishState: 0,
      createTime: Date.now(),
      star: 0,
      view: 0
    })
  }


  const Citems = [
    {
      title: '基本信息',
      description: '事件标题，事件分类',
    },
    {
      title: '事件内容',
      description: '事件主体内容',
      // subTitle: 'Left 00:00:08',
    },
    {
      title: '事件提交',
      description: '保存草稿或提交审核',
    },
  ]

  return (
    <div style={{ padding: 30 }}>
      <header style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 30 }}>撰写事件</header>
      <Steps
        current={stepsCurrent}
        items={Citems}
      />

      <div className={stepsCurrent === 0 ? '' : `${style.hidden}`} style={{ marginTop: 30 }}>
        <Form
          ref={EventsForm}
        >
          <Form.Item label='事件标题' name='title' rules={[{ required: true, message: '请输入事件标题!' }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label='事件分类' name='categoryId' rules={[{ required: true, message: '请选择事件分类!' }]} >
            <Select
              options={(categoryList || []).map((item: regionsType) => ({
                value: item.value,
                label: item.title,
              }))}
            >
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className={stepsCurrent === 1 ? '' : `${style.hidden}`} style={{ marginTop: 30 }}>
        <NewsEditor getEditor={(value: any) => {
          setQuillValue(value)
        }}></NewsEditor>
      </div>
      <div className={stepsCurrent === 2 ? '' : `${style.hidden}`} style={{ marginTop: 30 }}>
        3
      </div>

      <div style={{ margin: 20 }}>
        {stepsCurrent === 2 && <Button type='primary' size='large' style={{ marginRight: 20 }} onClick={() => handleSave(0)
        }>保存草稿</Button>}

        {stepsCurrent === 2 && <Button type='primary' size='large' danger style={{ marginRight: 20 }} onClick={() => handleSave(1)
        }>提交审核</Button>}

        {stepsCurrent < 2 && <Button type='primary' size='large' style={{ marginRight: 20 }} onClick={handleNext}>下一步</Button>}

        {stepsCurrent > 0 && <Button size='large' onClick={() => setStepsCurrent(stepsCurrent - 1)}>上一步</Button>}
      </div>
    </div>
  )
}

const mapGetUser = (state: any) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapGetUser)(NewsAdd)