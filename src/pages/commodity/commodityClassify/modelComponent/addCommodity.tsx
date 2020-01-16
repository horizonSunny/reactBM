import React from 'react';
import { Button, Modal, Input } from 'antd';

import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class AddCommodityModal extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/categoryInsert',
        payload: {
          classify: this.state.classify,
          cateName: this.state.newCateName,
        },
      });
    }
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
  // input输入改变
  onChange(e) {
    const { value } = e.target;
    console.log('value_', value);
    this.setState({
      newCateName: value,
    });
  }
  render() {
    return (
      <div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div>123</div>
        </Modal>
      </div>
    );
  }
}
