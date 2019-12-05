import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityDet.less';
import TableList from './component/CommodityDet/Table';
import RecordList from './component/CommodityDet/Record';

const { Title } = Typography;
export default (): React.ReactNode => (
  <PageHeaderWrapper className={styles['main']}>
    <Title level={4}>商品名称(SKU编号)</Title>
    <TableList></TableList>
    <RecordList></RecordList>
  </PageHeaderWrapper>
);
