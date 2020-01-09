import React from 'react';
import { Table, Input, Button } from 'antd';
import { commodityItem } from './commodityItem';
const { Search } = Input;
import styles from './casCommodity.less';

import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class CasCommodity extends React.Component {
  state = {
    selectedRowKeys: [],
  };
  components = {
    body: {
      row: commodityItem,
    },
  };
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  downSelect = () => {
    return (
      <div className="buttonContain">
        <Button type="danger">移除</Button>
        <Button>分类至</Button>
      </div>
    );
  };
  search = e => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/modifyKeyWord',
        payload: e.target.value,
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
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles['main']}>
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            border: '1px solid rgb(208,208,208)',
            borderRadius: '5px',
            height: '33px',
          }}
        >
          <div>
            共
            <span
              style={{
                color: 'red',
              }}
            >
              {this.props.commodityClassify.commodityInfo['totalElements']}
            </span>
            件商品
          </div>
          <Search
            placeholder="请输入关键字"
            className="searchInput"
            onChange={this.search.bind(this)}
            style={{ width: 200 }}
            value={this.props.commodityClassify.searchKeyword}
          />
        </div>
        <Table
          columns={columns}
          dataSource={this.props.commodityClassify.commodityInfo.pageList}
          // components={this.components}
          rowSelection={rowSelection}
          pagination={{ pageSize: 5, total: 10 }}
        />
      </div>
    );
  }
}
