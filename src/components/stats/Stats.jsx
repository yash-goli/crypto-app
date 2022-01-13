import React from 'react';
import { Col, Typography } from 'antd';

const { Text } = Typography;

const Stats = ({stats, children}) => {
  return (
    <>
      <Col className="coin-value-statistics">
        <Col className="coin-value-statistics-heading">
          {children}
        </Col>
        {stats.map(({ icon, title, value }, index) => (
          <Col className="coin-stats" key={index}>
            <Col className="coin-stats-name">
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className="stats">{value}</Text>
          </Col>
        ))}
      </Col>
    </>
  )
};

export default Stats;
