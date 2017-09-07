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
        <a href={`https://jitstarter-server.herokuapp.com/auth/google?redirectUrl=${process.env.REACT_APP_HOST}`}>Login with Google Account</a>
      </Container>
    )
  }
}