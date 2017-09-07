import React from 'react'
import { Layout } from 'antd';
const { Content } = Layout;

export default class Browse extends React.Component {
  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
      </Content>
    )
  }
}