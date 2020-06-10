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
    filterMsgInfo: [1],
  };

  componentDidMount() {}

  componentWillUnmount() {}
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
  getMessage = () => {
    const params = routerParams(location.search);
    getMessageByOrderNo({
      orderNo: params['id'],
    }).then(res => {
      const filterSource = res.data.filter(item => {
        return item.msgSource == (1 || 2);
      });
      const filterMsgType = filterSource.filter(item => {
        return item.msgType == (1 || 3);
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
            <a
              href="javascript:void(0);"
              style={{
                fontSize: '12px',
              }}
              onClick={this.getMessage}
            >
              查看详情
            </a>
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
              return <img src={item} alt="" width="80" height="80" onClick={this.showModal} />;
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
                    <span>
                      {item.msgContent}
                      {item.msgContent}
                      {item.msgContent}
                      {item.msgContent}
                    </span>
                  </div>
                </div>
              );
            })}
          </Modal>
        </div>
      </frameElement>
    );
  }
}

export default PatientInfo;
