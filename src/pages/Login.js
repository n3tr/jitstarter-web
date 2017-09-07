import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 400px;
  margin: 30px auto;
  padding: 24px;
  background: #fff;
  border: 1px solid #ddd;
`

export default class Login extends React.Component {
  render() {
    return (
      <Container>
        <a href="https://jitstarter-server.herokuapp.com/auth/google?redirectUrl=http://localhost:3000/auth">Login with Google Account</a>
      </Container>
    )
  }
}