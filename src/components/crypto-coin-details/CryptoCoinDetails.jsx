import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Tabs } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import LineChart from '../line-chart/LineChart';
import Loader from '../loader/Loader';
import Stats from '../stats/Stats';
import { Exchanges } from '..';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const CryptoCoinDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <div>
      <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </Col>

        <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
          {time.map((date, index) => <Option key={index}>{date}</Option>)}
        </Select>

        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

        <Tabs defaultActiveKey='1'>
          <TabPane tab='Stats' key='1'>
            <Stats stats={stats}>
              <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
              <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </Stats>
          </TabPane>
          <TabPane tab='Other Stats' key='2'>
            <Stats stats={genericStats}>
              <Title level={3} className="coin-details-heading">Other Statistics</Title>
              <p>An overview showing the statistics of all crypto currencies</p>
            </Stats>
          </TabPane>
          <TabPane tab='Exchanges' key='3'>
            <Exchanges coinId={coinId}/>
          </TabPane>
          <TabPane tab='About' key='4'>
            <Row className='coin-desc'>
              <Title level={3} className='coin-details-heading'>What is {cryptoDetails.name}</Title>
              {HTMLReactParser(cryptoDetails.description)}
            </Row>
          </TabPane>
          <TabPane tab='Links' key='5'>
            <Col className="coin-links">
              <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
              {cryptoDetails.links?.map((link, index) => (
                <Row className="coin-link" key={index}>
                  <Title level={5} className="link-name">{link.type}</Title>
                  <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                </Row>
              ))}
            </Col>
          </TabPane>
        </Tabs>
      </Col>
    </div>
  )
};

export default CryptoCoinDetails;
