import React from 'react';
import { Table, Button, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './findList.less';
import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class FindList extends React.Component {
  render() {
    return (
      <PageHeaderWrapper className={styles['main']}>
        {/* <Title level={4}>商品编辑</Title> */}
        <div>123</div>
      </PageHeaderWrapper>
    );
  }
}
