import React from 'react';
import { Button, Modal, Input } from 'antd';

import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class AddClassifyModal extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  state = { visible: false, title: '' };
  showModal = classifyName => {
    console.log('classifyName_', this.props.commodityClassify);
    const props = this.props.commodityClassify;
    let classifyItem, classifyInfo;
    switch (classifyName) {
      case '一级':
        classifyItem = {
          cateName: '',
        };
        classifyInfo = '添加一级分类';
        break;
      case '二级':
        classifyItem = props.casInfoOne.find(item => {
          return item.id === props.casOneId;
        });
        classifyInfo = '添加二级分类';
        break;
      case '三级':
        classifyItem = props.casInfoTwo.find(item => {
          return item.id === props.casTwoId;
        });
        classifyInfo = '添加三级分类';
        break;

      default:
        break;
    }
    this.setState({
      title: classifyItem['cateName'] + classifyInfo,
      visible: true,
    });
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
  // 移除选中的药物
  removeCom() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/removeCommodity',
      });
    }
  }
  render() {
    const { visible, title } = this.state;
    return (
      <div>
        <Modal title={title} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Input placeholder="请填写分类名称" />
        </Modal>
      </div>
    );
  }
}
