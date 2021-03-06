import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import Loader from '../loader/Loader';

const CryptoCoins = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm);
    });
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  
  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input 
            placeholder='Search Crypto Coins' 
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.uuid}>
            <Link to={`/crypto-coins/${coin.uuid}`}>
              <Card 
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className='crypto-image' src={coin.iconUrl} alt='coin'/>}
                hoverable
                >
                  <p>Price: {millify(coin.price)}</p>
                  <p>Market Cap: {millify(coin.marketCap)}</p>
                  <p>Daily Change: {millify(coin.change)}</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
};

export default CryptoCoins;
