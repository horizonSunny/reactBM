import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './inquiryDetail.less';
// import { ReceivingInfo, Prescription CommodityInfo,OrderTime,Refund} from './particularsComponents/index';
import { Title, DoctorInfo, OrderInfo, PatientInfo } from './components/inquiryDetail/index';

@connect(({ inquiry }) => ({
  inquiry: inquiry,
}))
class Particulars extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // const { queryForm, pagination } = this.props.inquiry;
    let params = {
      orderNo: 'WO20200609162217165751',
    };
    dispatch({
      type: 'inquiry/getWzOrderDetails',
      payload: params,
    });
  }
  render() {
    const { currentOrder } = this.props.inquiry;

    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          {currentOrder.id && (
            <div className={`${styles.content}`}>
              <Title></Title>
              <DoctorInfo></DoctorInfo>
              <PatientInfo></PatientInfo>
              <OrderInfo></OrderInfo>
            </div>
          )}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
