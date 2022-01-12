import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Typography, Avatar } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../../images/cryptocurrency.png';

const NavBar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Crypto App</Link>
        </Typography.Title>
        {/* <Button className='menu-control-container'></Button> */}
      </div>
      <Menu theme='dark'>
        <Menu.Item icon={<MenuOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to='/crypto-coins'>Crypto Coins</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to='/exchanges'>Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
};

export default NavBar;
