import React from 'react';
import { Col, Row, Card } from 'antd';
import millify from 'millify';

import { useGetCryptoCoinExchangesQuery } from '../../services/cryptoApi';
import Loader from '../loader/Loader';

const Echanges = ({ coinId }) => {
  const { data, isFetching } = useGetCryptoCoinExchangesQuery({ coinId, limit: 25 });
  const exchanges = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {exchanges?.map((exchange) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={exchange.uuid}>
            <Card
              title={`${exchange.rank}. ${exchange.name}`}
              extra={<img className='crypto-image' src={exchange.iconUrl} alt='exchange'/>}
            >
              <p>Price: {millify(exchange.price)}</p>
              <p>Markets: {millify(exchange.numberOfMarkets)}</p>
              <p>24h Volume: {millify(exchange['24hVolume'])}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
};

export default Echanges;
