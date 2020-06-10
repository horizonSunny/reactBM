import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Modal } from 'antd';
import activeStar from '@/assets/estimate/star_sel.svg';
import deactiveStar from '@/assets/estimate/star_nl.svg';

@connect(({ inquiry }) => ({
  inquiry,
}))
class PatientInfo extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { currentOrder } = this.props.inquiry;
    const { estimate } = currentOrder;
    console.log(' estimate_', estimate);
    let starInfo = [];
    for (let a = 0; a < 5; a++) {
      if (a > estimate.score) {
        starInfo.push(deactiveStar);
      } else {
        starInfo.push(activeStar);
      }
    }
    console.log('starInfo_', starInfo);

    return (
      <frameElement>
        <div className={`${styles.title} `} style={{ marginTop: '20px' }}>
          <div className={`${styles.infopart}`}>评价</div>
        </div>
        <div className={`${styles.patient}`}>
          <div className={`${styles.patientItem}`}>
            <span className={`${styles.patientLabel}`}>满意度:</span>
            <span>
              {/* <img src={activeStar} alt="" width="20" height="20" />
              <img src={activeStar} alt="" width="20" height="20" />
              <img src={activeStar} alt="" width="20" height="20" />
              <img src={deactiveStar} alt="" width="20" height="20" />
              <img src={deactiveStar} alt="" width="20" height="20" /> */}
              {starInfo.map(item => {
                return (
                  <img
                    src={item}
                    alt=""
                    width="20"
                    height="20"
                    style={{ border: '0px', marginTop: '3px' }}
                  />
                );
              })}
            </span>
          </div>
          <div className={`${styles.patientItem}`}>
            <span>{estimate.content}</span>
          </div>
        </div>
      </frameElement>
    );
  }
}

export default PatientInfo;
