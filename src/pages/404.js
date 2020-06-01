import React from 'react';
import { Row, Col } from 'antd';
import router from 'umi/router';
import nothing from '@/assets/img_404.png';

let goback = () => {
  router.go(-1);
};

export default () => {
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ width: '100%', height: 600, background: '#f6f6f6', flexDirection: 'column' }}
    >
      <Col>
        <img src={nothing} alt="404" style={{ width: 405, height: 280 }} />
      </Col>
      <Col>
        <div>
          页面找不到啦，<a onClick={goback}>返回上一级</a>
        </div>
      </Col>
    </Row>
  );
};
