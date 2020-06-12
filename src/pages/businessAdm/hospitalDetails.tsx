import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Button, Modal, Input, message } from 'antd';
import router from 'umi/router';
import styles from './particulars.less';
import { Content, Record } from './doctorComponent/index';
import routerParams from '@/utils/routerParams';
@connect(({ hospitalAdm }) => ({
  hospitalAdm: hospitalAdm,
}))
class Particulars extends Component {
  state = {
    visible: false,
    closeReason: '',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const params = routerParams(location.search);
    if (dispatch) {
      dispatch({
        type: 'hospitalAdm/getHospitalDetails',
        payload: {
          hospitalId: params.id,
        },
      });
    }
  }
  auditPass = () => {
    const { dispatch } = this.props;
    const params = routerParams(location.search);
    dispatch({
      type: 'doctorAdm/auditDoctor',
      payload: {
        doctorId: params.id,
        authStatus: '3',
      },
    });
  };
  auditReject = () => {
    this.setState({
      visible: true,
    });
  };
  // 开启或者关闭服务
  handleOk = () => {
    if (this.state.pauseReason == '') {
      message.info('关闭原因不能为空');
      return;
    }
    const { dispatch } = this.props;
    const params = routerParams(location.search);
    dispatch({
      type: 'doctorAdm/auditDoctor',
      payload: {
        doctorId: params.id,
        authStatus: '2',
        reason: this.state.pauseReason,
      },
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  closeReson = e => {
    const { value } = e.target;
    console.log('value_', value);
    this.setState({
      closeReason: value,
    });
  };
  render() {
    const { currentHospital } = this.props.hospitalAdm;
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Content></Content>
            <Record></Record>
          </div>
          {currentHospital.authStatus && currentHospital.authStatus != 3 && (
            <div className={`${styles.operation}`}>
              {currentHospital.authStatus == 1 && (
                <Button type="primary" onClick={this.auditPass}>
                  审核通过
                </Button>
              )}
              {currentHospital.authStatus == 2 && (
                <Button type="primary" onClick={this.auditReject}>
                  审核驳回
                </Button>
              )}
            </div>
          )}
          <Modal
            title="请填写关闭原因"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input width="25" onChange={this.closeReson}></Input>
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
