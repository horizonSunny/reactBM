import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { statusFilter } from '@/utils/orderStatusFilter';
import tipsIcon from '@/assets/order/Tips-icon.svg';

@connect(({ inquiry }) => ({
  inquiry,
}))
class OrderInfo extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { currentOrder } = this.props.inquiry;
    const { orderNo, createTime } = currentOrder;
    return (
      <frameElement>
        <div className={`${styles.title} `} style={{ marginTop: '20px' }}>
          <div className={`${styles.infopart}`}>订单信息</div>
        </div>
        <div className={`${styles.patient}`}>
          <div className={`${styles.patientItem}`}>
            <span className={`${styles.patientLabel}`}>订单号码:</span>
            <span>{orderNo}</span>
          </div>
          <div className={`${styles.patientItem}`}>
            <span className={`${styles.patientLabel}`}>创建时间:</span>
            <span>{createTime}</span>
          </div>
        </div>
      </frameElement>
    );
  }
}

export default OrderInfo;
