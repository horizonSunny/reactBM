import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { statusFilter } from '@/utils/orderStatusFilter';
import tipsIcon from '@/assets/order/Tips-icon.svg';

@connect(({ inquiry }) => ({
  inquiry,
}))
class Title extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { currentOrder } = this.props.inquiry;
    return (
      <div className={`${styles.title}`}>
        <div className={`${styles.infopart}`}>
          <span>{statusFilter(currentOrder.orderStatus)}</span>
          {currentOrder.surplusTime && (
            <span className={`${styles.timeRemaining}`}>
              剩余{this.state.hour}小时{this.state.minute}分{this.state.second}秒自动关闭
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Title;
