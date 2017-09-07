import 'antd/dist/antd.css'
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import Browse from './pages/Browse'
import AppHeader from './components/AppHeader'

import { Layout, Menu } from 'antd';
const { Header, Footer } = Layout;


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
          <AppHeader />
          <Route path="/" exact component={Browse} />

          <Footer style={{ textAlign: 'center' }}>
            Jitstarter
          </Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
