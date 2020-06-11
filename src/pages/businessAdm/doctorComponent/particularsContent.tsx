import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ doctorAdm }) => ({
  doctorAdm: doctorAdm,
}))
class Title extends Component {
  render() {
    const { currentDoctor } = this.props.doctorAdm;
    return (
      <div className={`${styles.infopart} ${styles.content}`}>
        <div className={` ${styles.contentItem}`}>身份证号：{currentDoctor.certNo}</div>
        <div className={` ${styles.contentItem}`}>
          身份证正反面：
          <div>
            <img src={currentDoctor.certFrontImg} alt="" />
            <img src={currentDoctor.certBackImg} alt="" />
          </div>
        </div>
        <div className={` ${styles.contentItem}`}>头衔职称：{currentDoctor.title}</div>
        {currentDoctor.doctorHospitalList &&
          currentDoctor.doctorHospitalList.map(item => {
            return (
              <div className={` ${styles.contentItem}`}>
                医院/科室:{item.hospitalName}/{item.partName}
              </div>
            );
          })}
        <div className={` ${styles.contentItem}`}>个人简介：{currentDoctor.intro}</div>
        <div className={` ${styles.contentItem}`}>擅长疾病：{currentDoctor.beGood}</div>
        <div className={` ${styles.contentItem}`}>
          相关证件(执业证、资格证)：
          <div>
            {currentDoctor.qualifiImgs &&
              currentDoctor.qualifiImgs.map(item => {
                return <img src={item} alt="" />;
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Title;
