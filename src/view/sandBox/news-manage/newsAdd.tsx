import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Steps, Button, Form, Input, Select } from 'antd';
import style from './newadd.module.scss'
import { getCategories } from '../../../api/news'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function newsAdd() {

  let [stepsCurrent, setStepsCurrent] = useState(0)  //步骤条进度
  const [categoryList, setCategoryList] = useState([]) //分类数据
  const [quillvalue, setQuillValue] = useState('');
  const EventsForm: any = useRef(null) //事件input

  // 分类接口数据
  const getData = useCallback(async () => {
    const res = await getCategories()
    console.log(res.data)
    setCategoryList(res.data)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  //下一步
  const handleNext = () => {
    if (stepsCurrent === 0) {
      EventsForm && EventsForm.current?.validateFields()
        .then((res: regionsType) => {
          console.log(res)
          setStepsCurrent(stepsCurrent + 1)
        }).catch((err: any) => {
          console.log(err);
        })
    }
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
      <div className={stepsCurrent === 1 ? '' : `${style.hidden}`}>
        <ReactQuill theme="snow" value={quillvalue} onChange={setQuillValue} />;
      </div>
      <div className={stepsCurrent === 2 ? '' : `${style.hidden}`}>
        3
      </div>

      <div style={{ margin: 20 }}>
        {stepsCurrent === 2 && <Button type='primary' size='large' style={{ marginRight: 20 }} onClick={() => console.log(111)
        }>保存草稿</Button>}

        {stepsCurrent === 2 && <Button type='primary' size='large' danger style={{ marginRight: 20 }} onClick={() => console.log(111)
        }>提交审核</Button>}

        {stepsCurrent < 2 && <Button type='primary' size='large' style={{ marginRight: 20 }} onClick={handleNext}>下一步</Button>}

        {stepsCurrent > 0 && <Button size='large' onClick={() => setStepsCurrent(stepsCurrent - 1)}>上一步</Button>}
      </div>
    </div>
  )
}
