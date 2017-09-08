import React from 'react'
import { Spin } from 'antd'

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40}}>
      <Spin size="large" />
    </div>
  )
}

export default Loading