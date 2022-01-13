import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { NavBar, CryptoCoinDetails, CryptoCoins, Exchanges, News, HomePage } from './components';

import './App.css';

const App = () => {
  return (
    <div>
      <div className='app'>
        <div className='navbar'>
          <NavBar />
        </div>
        <div className='main'>
          <Layout>
            <div className='routes'>
              <Routes>
                <Route exact path='/' element={<HomePage />}></Route>
                {/* <Route exact path='/exchanges' element={<Exchanges />}></Route> */}
                <Route exact path='/crypto-coins' element={<CryptoCoins />}></Route>
                <Route exact path='/crypto-coins/:coinId' element={<CryptoCoinDetails />}></Route>
                <Route exact path='/news' element={<News />}></Route>
              </Routes>
            </div>
          </Layout>
          <div className='footer'>
            <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
              Crypto App <br /> All rights reserved
            </Typography.Title>
            <Space>
              <Link to='/'>Home</Link>
              <Link to='/exchanges'>Exchanges</Link>
              <Link to='/news'>News</Link>
            </Space>
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;
