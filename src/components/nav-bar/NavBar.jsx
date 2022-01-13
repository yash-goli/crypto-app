import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Typography, Avatar } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../../images/cryptocurrency.png';

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Crypto App</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item icon={<MenuOutlined />} key='1'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key='2'>
            <Link to='/crypto-coins'>Crypto Coins</Link>
          </Menu.Item>
          {/* <Menu.Item icon={<MoneyCollectOutlined />} key='3'>
            <Link to='/exchanges'>Exchanges</Link>
          </Menu.Item> */}
          <Menu.Item icon={<BulbOutlined />} key='3'>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
};

export default NavBar;
