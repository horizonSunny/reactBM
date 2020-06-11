import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ businessAdm }) => ({
  businessAdm: businessAdm
}))
class Title extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm
    return (
      <div className={`${styles.infopart} ${styles.company}`}>
        {/* <img src="../../../assets/banner.png" alt="" /> */}
        <img src={ currentRecord.tenantLogo } alt="" height="50px"/>
        <span className={`${styles.companyName}`}>{currentRecord.tenantName}({currentRecord.tenantCode})</span>
      </div>
    );
  }
}

export default Title;
