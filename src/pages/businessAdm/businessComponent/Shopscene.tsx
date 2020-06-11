import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
@connect(({ businessAdm }) => ({
  businessAdm: businessAdm
}))
class Shopscene extends Component {
  render() {
    const { currentRecord } = this.props.businessAdm
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>店铺实景</div>
        <div className={`${styles.picList}`}>
          {currentRecord.storeLive && currentRecord.storeLive.map((item,index) => {
            return (
              <div className={`${styles.picItem}`} key={index}>
                <img src={item} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Shopscene;
