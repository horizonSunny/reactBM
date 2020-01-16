import React from 'react';
import { Button, Modal, Table, Input } from 'antd';
import styles from './addCommodity.less';
import { connect } from 'dva';
import { commodityItem } from '../component/commodityCas/commodityItem';
const { Search } = Input;
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class AddCommodityModal extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  state = { visible: false };
  components = {
    body: {
      row: commodityItem,
    },
  };
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
  // 搜索
  onSearch(e) {
    console.log('e_', e);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/productSearch',
        payload: e,
      });
    }
  }
  // 搜索弹框
  downSelect = () => {
    return (
      <div
        className={styles['main']}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="buttonContain">
          <Search
            style={{
              marginLeft: '10px',
              width: '200px',
            }}
            placeholder=""
            onSearch={this.onSearch.bind(this)}
          />
          <Button
            type="primary"
            style={{
              marginLeft: '20px',
            }}
          >
            添加
          </Button>
        </div>
      </div>
    );
  };
  // 选中添加项
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/modifyProduct',
        payload: selectedRowKeys,
      });
    }
  };
  render() {
    const columns = [
      {
        title: this.downSelect(),
        dataIndex: 'productCommonName',
        key: 'productId',
      },
    ];
    // 这里必须用状态管理中的数据,要是this.state会留存上一次的数据
    const { selectedProductKeys } = this.props.commodityClassify;
    const rowSelection = {
      selectedProductKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          style={{
            height: '450px',
          }}
        >
          <Table
            columns={columns}
            dataSource={this.props.commodityClassify.modalProductList.pageList}
            components={this.components}
            rowSelection={rowSelection}
            rowKey={record => record.productId}
            pagination={{ pageSize: 5, total: this.props.commodityClassify.modalProductList.total }}
          />
        </Modal>
      </div>
    );
  }
}
