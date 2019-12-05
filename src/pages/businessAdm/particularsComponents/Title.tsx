import React, { Component } from 'react';
import styles from './index.less';

class Title extends Component {
  render() {
    return (
      <div className={`${styles.infopart} ${styles.company}`}>
        <img src="../../../assets/banner.png" alt="" />
        <span className={`${styles.companyName}`}>企业名称(企业编号)</span>
      </div>
    );
  }
}

export default Title;
