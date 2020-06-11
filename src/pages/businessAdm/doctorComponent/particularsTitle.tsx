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
      <div className={`${styles.infopart} ${styles.title}`}>
        <div className={`${styles.item}`}>
          <img src={currentDoctor['icon']} alt="" />
        </div>
        <div
          className={`${styles.item}`}
          style={{
            borderRight: '2px solid #ddd',
          }}
        >
          <div>姓名：{currentDoctor['name']} </div>
          <div>电话：{currentDoctor['phone']} </div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.itemCount}`}>
            {currentDoctor['attentionNum'] ? currentDoctor['attentionNum'] : 0}{' '}
          </div>
          <div>关注量</div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.itemCount}`}>
            {currentDoctor['medicineNum'] ? currentDoctor['medicineNum'] : 0}{' '}
          </div>
          <div>服务患者</div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.itemCount}`}>
            {currentDoctor['goodEstimate'] ? currentDoctor['goodEstimate'] : 0}{' '}
          </div>
          <div>好评率</div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.itemCount}`}>
            {currentDoctor['avgReply'] ? currentDoctor['avgReply'] : 0}{' '}
          </div>
          <div>平均回复</div>
        </div>
      </div>
    );
  }
}

export default Title;
