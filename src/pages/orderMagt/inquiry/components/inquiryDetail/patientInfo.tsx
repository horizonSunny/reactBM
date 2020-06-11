import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Modal } from 'antd';
import { statusFilter } from '@/utils/orderStatusFilter';
import { getMessageByOrderNo } from '@/services/orderMagt';
import routerParams from '@/utils/routerParams';

@connect(({ inquiry }) => ({
  inquiry,
}))
class PatientInfo extends Component {
  state = {
    visible: false,
    magnifyVisible: false,
    filterMsgInfo: [],
  };

  componentDidMount() {}

  componentWillUnmount() {}
  // 查看聊天详情
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
  // 查看商品图放大
  showMagnifyModal = e => {
    if (e.target.nodeName === 'IMG') {
      // 判断img 节点
      this.setState({
        magnifyVisible: true,
        imgSrc: e.target.src,
      });
    }
  };

  handleMagnifyOk = e => {
    console.log(e);
    this.setState({
      magnifyVisible: false,
    });
  };
  getMessage = () => {
    const params = routerParams(location.search);
    getMessageByOrderNo({
      orderNo: params['id'],
    }).then(res => {
      const filterSource = res.data.filter(item => {
        return item.msgSource == 1 || item.msgSource == 2;
      });
      const filterMsgType = filterSource.filter(item => {
        return item.msgType == 1 || item.msgType == 3;
      });
      console.log('filterMsgType_', filterMsgType);

      this.setState({
        filterMsgInfo: filterMsgType,
        visible: true,
      });
    });
  };
  render() {
    const { currentOrder } = this.props.inquiry;
    const { condition, doctor } = currentOrder;
    console.log('condition_', condition);

    let imgParams = condition.conditionImg ? condition.conditionImg.split(',') : [];
    imgParams[imgParams.length - 1] === '' && imgParams.pop();
    console.log('imgParams_', imgParams);

    return (
      <frameElement>
        <div className={`${styles.title} `} style={{ marginTop: '20px' }}>
          <div className={`${styles.infopart}`}>
            咨询内容 &nbsp;{' '}
            {this.state.filterMsgInfo && (
              <a
                href="javascript:void(0);"
                style={{
                  fontSize: '12px',
                }}
                onClick={this.getMessage}
              >
                查看详情
              </a>
            )}
          </div>
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
              return (
                <img src={item} alt="" width="80" height="80" onClick={this.showMagnifyModal} />
              );
            })}
          </div>
          <Modal
            title="咨询详情"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            centered
            maskClosable
          >
            {this.state.filterMsgInfo.map((item, index) => {
              return (
                <div
                  style={
                    // item['msgSource'] == 1
                    index % 2 == 0
                      ? {
                          textAlign: 'left',
                          paddingRight: '40%',
                        }
                      : {
                          textAlign: 'right',
                          paddingLeft: '40%',
                        }
                  }
                >
                  <div
                    style={{
                      height: 'auto',
                      lineHeight: '40px',
                    }}
                  >
                    {// item['msgSource'] == 1
                    index % 2 == 0 && (
                      <img
                        src={doctor.icon}
                        alt=""
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '15px',
                          marginRight: '5px',
                        }}
                      />
                    )}
                    {item['msgType'] == 1 && <span>{item.msgContent}</span>}
                    {item['msgType'] == 3 && (
                      <img
                        src={item.msgContent}
                        style={{
                          width: '80px',
                          height: '80px',
                        }}
                      ></img>
                    )}
                  </div>
                </div>
              );
            })}
          </Modal>
          <Modal
            visible={this.state.magnifyVisible}
            onCancel={this.handleMagnifyOk}
            footer={null}
            centered
            maskClosable
          >
            <img style={{ width: '100%' }} alt="" src={this.state.imgSrc} />
          </Modal>
        </div>
      </frameElement>
    );
  }
}

export default PatientInfo;
