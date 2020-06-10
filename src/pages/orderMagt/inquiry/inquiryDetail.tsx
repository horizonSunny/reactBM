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
  render() {
    const { currentRecord } = this.props.inquiry;

    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Title></Title>
            <DoctorInfo></DoctorInfo>
            <OrderInfo></OrderInfo>
            <PatientInfo></PatientInfo>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
