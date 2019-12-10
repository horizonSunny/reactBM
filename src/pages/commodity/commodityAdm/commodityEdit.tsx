import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityDet.less';
import Form from './component/CommodityEdit/Form';
import { connect } from 'dva';

@connect(({ commodity }) => ({ commodity }))
export default class CommodityEdit extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    // 假如id存在则获取数据，没存在就是新建
    if (location.query.id) {
      dispatch({
        type: 'commodity/getProduct',
        payload: {
          id: location.query.id,
        },
      });
    }
  }
  render() {
    return (
      <PageHeaderWrapper className={styles['main']}>
        {/* <Title level={4}>商品编辑</Title> */}
        <Form></Form>
      </PageHeaderWrapper>
    );
  }
}
