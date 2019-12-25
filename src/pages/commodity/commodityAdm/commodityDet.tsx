import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Button } from 'antd';
import styles from './CommodityDet.less';
import TableList from './component/CommodityDet/Table';
import RecordList from './component/CommodityDet/Record';
import { connect } from 'dva';
import router from 'umi/router';

const { Title } = Typography;
@connect(({ commodity }) => ({ commodity }))
export default class CommodityDet extends React.Component {
  handleEdit() {
    router.push('/businessAdm/enter');
  }
  handleBack() {
    router.push('/businessAdm/enter');
  }
  render() {
    const commodity = this.props.commodity.product.productSku;
    return (
      <PageHeaderWrapper className={styles['main']}>
        <Title level={4}>商品名称(SKU编号:{commodity})</Title>
        <TableList></TableList>
        <RecordList></RecordList>
        <div className={`${styles.operation}`}>
          <Button type="primary" onClick={this.handleEdit}>
            编辑
          </Button>
          <Button icon="left" className={`${styles.back}`} onClick={this.handleBack}>
            返回
          </Button>
        </div>
      </PageHeaderWrapper>
    );
  }
}
