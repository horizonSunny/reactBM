import React from 'react';
import { Button, Modal, TreeSelect, Icon } from 'antd';

import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class SortTo extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  state = { visible: false, value: '' };
  showModal = classifyName => {
    const { dispatch } = this.props;
    console.log('in sortTo');
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/classifyDisabled',
      });
    }
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
  // 树状选择
  treeSelectChange(value) {
    // console.log('value_', value);
    this.setState({ value });
    const newArr = value.split('_');
  }
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
              确定
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              取消
            </Button>,
          ]}
        >
          <TreeSelect
            style={{ width: '70%' }}
            label="请选择分类"
            value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={this.props.commodityClassify.classifyDisabledInfo}
            placeholder="Please select"
            onChange={this.treeSelectChange.bind(this)}
            suffixIcon={
              <Icon
                type="plus-circle"
                style={{
                  fontSize: '14px',
                }}
              />
            }
          />
        </Modal>
      </div>
    );
  }
}
