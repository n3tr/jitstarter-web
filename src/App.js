import 'antd/dist/antd.css'
import enUS from 'antd/lib/locale-provider/en_US';
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import Browse from './pages/Browse'
import AppHeader from './components/AppHeader'
import NewCampaign from './pages/NewCampaign'

import { Layout, Menu, LocaleProvider } from 'antd';
const { Header, Footer } = Layout;


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <LocaleProvider locale={enUS}>
          <Layout className="layout">
            <AppHeader />
            <Route path="/" exact component={Browse} />
            <Route path="/newCampaign" exact component={NewCampaign} />

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
