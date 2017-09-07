import 'antd/dist/antd.css'
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'

import Browse from './pages/Browse'
import Login from './pages/Login'
import Auth from './pages/Auth'
import AppHeader from './components/AppHeader'
import Session from './lib/Session'

import { Layout, Menu } from 'antd';
const { Header, Footer } = Layout;


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Session.isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
          <AppHeader />
          <PrivateRoute path="/" exact component={Browse} />
          <Route exact path="/login" exact component={Login} />
          <Route exact path="/auth/:token" exact component={Auth} />
          <Footer style={{ textAlign: 'center' }}>
            Jitstarter
          </Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
