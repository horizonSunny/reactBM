import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Modal } from 'antd';
import { statusFilter } from '@/utils/orderStatusFilter';
import tipsIcon from '@/assets/order/Tips-icon.svg';

@connect(({ inquiry }) => ({
  inquiry,
}))
class PatientInfo extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {}

  componentWillUnmount() {}
  // 点击查看商品图放大
  showModal = e => {
    if (e.target.nodeName === 'IMG') {
      // 判断img 节点
      this.setState({
        visible: true,
        imgSrc: e.target.src,
      });
    }
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { currentOrder } = this.props.inquiry;
    const { condition } = currentOrder;
    console.log('condition_', condition);

    let imgParams = condition.conditionImg.split(',');
    imgParams[imgParams.length - 1] === '' && imgParams.pop();
    console.log('imgParams_', imgParams);

    return (
      <frameElement>
        <div className={`${styles.title} `} style={{ marginTop: '20px' }}>
          <div className={`${styles.infopart}`}>咨询内容</div>
        </div>
        <div className={`${styles.patient}`}>
          <div className={`${styles.patientItem}`}>
            <span className={`${styles.patientLabel}`}>患者信息:</span>
            <span>
              {condition.name} {condition.sex === 1 ? '男' : '女'} {condition.age}
            </span>
          </div>
          <div className={`${styles.patientItem}`}>
            <span className={`${styles.patientLabel}`}>病情描述:</span>
            <span>{condition.conditionDesc}</span>
          </div>
          <div className={`${styles.patientItem}`}>
            <span className={`${styles.patientLabel}`}>病情图片:</span>
            {imgParams.map(item => {
              return <img src={item} alt="" width="80" height="80" onClick={this.showModal} />;
            })}
          </div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            centered
            maskClosable
          >
            <img style={{ width: '100%' }} alt="" onClick={this.handleOk} src={this.state.imgSrc} />
          </Modal>
        </div>
      </frameElement>
    );
  }
}

export default PatientInfo;
