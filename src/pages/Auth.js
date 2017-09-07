import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd';
import { withApollo, gql } from 'react-apollo'
import { withRouter } from 'react-router'
import Session from '../lib/Session'


const Container = styled.div`
  width: 300px;
  background: #fff;
  margin: 40px auto;
  padding: 80px 40px;
  text-align: center;
`

class Auth extends React.Component {

  componentDidMount() {
    console.log(this.props)
    const { match } = this.props
    const { params } = match
    const { token } = params
    
    if (!params) {
      // redirect to somewhere
    }

    Session.login(token)
    this.props.client.query({ query: gql`
      query me {
        me {
          id,
          name
        }
      }
    `}
  )
    .then(({ data }) => {
      console.log(data)
      Session.setUser(data.me.id, data.me.name)
      this.props.history.replace('/')
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <Container>
        <Spin tip="Logging in..."/>
      </Container>
    )
  }
}

export default withApollo(withRouter(Auth))