import React from 'react'
import { Layout, Card } from 'antd';
const { Content } = Layout;


const CampaignItem = () => {
  return (
    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
      <div className="custom-image">
        <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      </div>
      <div className="custom-card">
        <h3>Europe Street beat</h3>
        <p>www.instagram.com</p>
      </div>
    </Card>
  )
}

export default class Browse extends React.Component {
  render() {
    return (
      <Content style={{ padding: '50px 50px', display: 'flex', direction: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: 12 }).map((i, index) => {
          return <CampaignItem key={index} />
        })}
      </Content>
    )
  }
}