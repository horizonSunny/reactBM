import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { statusFilter } from '@/utils/orderStatusFilter';
import tipsIcon from '@/assets/order/Tips-icon.svg';

@connect(({ inquiry }) => ({
  inquiry,
}))
class Doctor extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { currentOrder } = this.props.inquiry;
    const { doctor } = currentOrder;
    return (
      <frameElement>
        <div className={`${styles.title} `} style={{ marginTop: '20px' }}>
          <div className={`${styles.infopart}`}>咨询医生</div>
        </div>
        <div className={`${styles.doctor}`}>
          <img src="" alt="" />
          <div className={`${styles.doctorDetails}`}>
            <div>
              {doctor.name} {doctor.title} {doctor.departments}
            </div>
            <div>{doctor.hospital}</div>
            <div>{doctor.phone}</div>
          </div>
        </div>
      </frameElement>
    );
  }
}

export default Doctor;
