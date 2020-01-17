import React from 'react';
import { Button, Modal, Input } from 'antd';

import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class SortTo extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  state = { visible: false, title: '' };
  showModal = classifyName => {
    console.log('classifyName_', this.props.commodityClassify);
    const props = this.props.commodityClassify;
    this.setState({ visible: true });
  };

  handleOk = e => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/categoryInsert',
        payload: {},
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
  onChange(e) {}
  render() {
    const { visible, title } = this.state;
    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              cnacel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              add
            </Button>,
          ]}
        >
          <Input placeholder="请填写分类名称" onChange={this.onChange.bind(this)} />
        </Modal>
      </div>
    );
  }
}
