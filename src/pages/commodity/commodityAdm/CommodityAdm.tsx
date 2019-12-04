import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityAdm.less';

//传入组件
import AdvancedSearchForm from './component/CommodityAdm/searchForm';

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <AdvancedSearchForm />
  </PageHeaderWrapper>
);
