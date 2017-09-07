import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd';


const Container = styled.div`
  width: 300px;
  background: #fff;
  margin: 40px auto;
  padding: 80px 40px;
  text-align: center;
`

export default class Auth extends React.Component {
  render() {
    return (
      <Container>
        <Spin tip="Logging in..."/>
      </Container>
    )
  }
}