import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ hospitalAdm }) => ({
  hospitalAdm: hospitalAdm,
}))
class Content extends Component {
  render() {
    const { currentHospital } = this.props.hospitalAdm;
    return <div className={`${styles.infopart} ${styles.content}`}></div>;
  }
}

export default Content;
