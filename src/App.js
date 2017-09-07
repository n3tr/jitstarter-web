import 'antd/dist/antd.css'
import enUS from 'antd/lib/locale-provider/en_US';
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
import NewCampaign from './pages/NewCampaign'
import CampaignDetail from './pages/CampaignDetail'

import { Layout, Menu, LocaleProvider } from 'antd';
const { Header, Footer } = Layout;


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Session.isLoggedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <LocaleProvider locale={enUS}>
          <Layout className="layout">
            <AppHeader />
            <PrivateRoute path="/" exact component={Browse} />
            <Route exact path="/login" exact component={Login} />
            <Route exact path="/auth/:token" exact component={Auth} />
            <Route path="/" exact component={Browse} />
            <Route path="/newCampaign" exact component={NewCampaign} />
            <Route path="/campaignDetail" exact component={CampaignDetail} />

            <Footer style={{ textAlign: 'center' }}>
              Jitstarter
          </Footer>
          </Layout>
        </LocaleProvider>
      </BrowserRouter>
    );
  }
}

export default App;
