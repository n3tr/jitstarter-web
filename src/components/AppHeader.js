import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Layout, Menu, Button, Icon } from 'antd';

const { Header } = Layout;

const AppHeader = (props) => (
  <Header style={{ background: '#fff'}}>
    <Menu
        onClick={this.handleClick}
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >        
        <Menu.Item key="alipay">
          <Link to="/" >Explore</Link>
        </Menu.Item>
        <Menu.Item key="new">
          <Button type="primary" onClick={() => props.history.push('/newCampaign')}>New Campaign</Button>
        </Menu.Item>
      </Menu>      
  </Header>
)

export default withRouter(AppHeader)