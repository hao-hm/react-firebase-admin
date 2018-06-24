import React from 'react';
// import logo from './logo.svg';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import {Layout, Menu, Breadcrumb} from 'antd';
const {Header, Content, Footer} = Layout;
import HomePage from './home/HomePage'
import RoomPage from './room/components/RoomPage'
import FloorPage from './floor/components/FloorPage'
import CustomerPage from './customer/components/CustomerPage'
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const App = (props) => {
  return (
    <LocaleProvider locale={enUS}>
      <Router>
        <Layout className="layout" style={{height: '100%'}}>
          <Header>
            <div className="logo"/>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{lineHeight: '64px'}}
            >
              <Menu.Item key="dashboard"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="customer"><Link to="/customer">Customer</Link></Menu.Item>
              <Menu.Item key="room"><Link to="/room">Room</Link></Menu.Item>
              <Menu.Item key="floor"><Link to="/floor">Floor</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{padding: '0 50px'}}>
            <Breadcrumb style={{margin: '12px 0'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{background: '#fff', padding: 24, minHeight: 280}}>
              <Route exact path="/" component={HomePage}/>
              <Route path="/customer" component={CustomerPage}/>
              <Route path="/room" component={RoomPage}/>
              <Route path="/floor" component={FloorPage}/>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            TMA Design ©2017 Created by Hao HM
          </Footer>
        </Layout>
      </Router>
    </LocaleProvider>
  )
};


export default App;
