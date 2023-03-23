import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface Iprops{
  to:string
}

const Redirect = (props:Iprops) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(props.to, { replace: true })
  }, [])
  return null
}

export default Redirect