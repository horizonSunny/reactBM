import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityDet.less';
import Form from './component/CommodityEdit/Form';

const { Title } = Typography;
export default (): React.ReactNode => (
  <PageHeaderWrapper className={styles['main']}>
    {/* <Title level={4}>商品编辑</Title> */}
    <Form></Form>
  </PageHeaderWrapper>
);
