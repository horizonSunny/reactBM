import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ hospitalAdm }) => ({
  hospitalAdm: hospitalAdm,
}))
class Content extends Component {
  render() {
    const { currentHospital } = this.props.hospitalAdm;
    return (
      <div className={`${styles.infopart} ${styles.content}`}>
        <div className={` ${styles.contentSeparate}`}>
          <img src={currentHospital.picImg} alt="" style={{ margin: '0px' }} />
          <div className={` ${styles.separateInfo}`}>
            <div style={{ fontSize: '18px', fontWeight: 'blod', color: '#000' }}>
              {currentHospital.name ? currentHospital.name : '暂无'}
            </div>
            <div>{currentHospital.name ? currentHospital.name : '暂无'}</div>
            <div>{currentHospital.name ? currentHospital.name : '暂无'}</div>
          </div>
        </div>
        <div className={` ${styles.contentItem}`}>医院概况：{currentHospital.hospitalDesc}</div>
        <div className={` ${styles.contentItem}`}>
          资质：
          <div>
            {currentHospital.qualifiImgs &&
              currentHospital.qualifiImgs.map(item => {
                return <img src={item} alt="" />;
              })}
            {/* <img src={currentHospital.certFrontImg} alt="" />
            <img src={currentHospital.certBackImg} alt="" /> */}
          </div>
        </div>
        <div className={` ${styles.contentItem}`}>管理员：{currentHospital.doctorName}</div>
        <div className={` ${styles.contentItem}`}>身份证号：{currentHospital.certNo}</div>
        <div className={` ${styles.contentItem}`}>手机号：{currentHospital.phone}</div>
      </div>
    );
  }
}

export default Content;
