import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Space } from 'antd';
import style from './App.module.scss'
const App = (props: any) => {

  const [time, setTime] = useState(0)

  useEffect(() => {
    console.log(props.state.userReducer.timer)
    setTime(props.state.userReducer.timer)

  }, [])
  return (
    <div>
       <ul>
        <li className={style.item}>22</li>
        <li>22</li>
        <li>22</li>
       </ul>
    </div>
  )
}

export default connect((state) => {
  return {
    a: 1,
    b: 2,
    state
  }
})(App)