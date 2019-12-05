import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityAdm.less';

//传入组件
import SearchForm from './component/CommodityAdm/SearchForm';
import TableList from './component/CommodityAdm/TableList';

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <SearchForm />
    <TableList />
  </PageHeaderWrapper>
);
