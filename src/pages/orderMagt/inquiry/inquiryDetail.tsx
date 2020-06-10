import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import routerParams from '@/utils/routerParams';
import styles from './inquiryDetail.less';
// import { ReceivingInfo, Prescription CommodityInfo,OrderTime,Refund} from './particularsComponents/index';
import {
  Title,
  DoctorInfo,
  OrderInfo,
  PatientInfo,
  Estimate,
} from './components/inquiryDetail/index';

@connect(({ inquiry }) => ({
  inquiry: inquiry,
}))
class Particulars extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const orderNo = routerParams(location.search);
    // const { queryForm, pagination } = this.props.inquiry;
    let params = {
      orderNo: orderNo.id,
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
              {currentOrder.doctor && <DoctorInfo></DoctorInfo>}
              {currentOrder.estimate && <Estimate></Estimate>}
              {currentOrder.condition && <PatientInfo></PatientInfo>}
              <OrderInfo></OrderInfo>
              {/* <Estimate></Estimate> */}
            </div>
          )}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
