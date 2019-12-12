import { Table, Divider, Tag, Switch } from 'antd';
import React from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './TableList.less';
import { connect } from 'dva';

const pagination = { position: 'bottom', pageSize: 10 };

@connect(({ commodity }) => ({ commodity }))
export default class TableList extends React.Component {
  state = {
    data: this.props.commodity.productList.pageList,
    searchInfo: this.props.searchInfo,
    pagination,
    columns: [
      {
        title: 'Sku',
        dataIndex: 'productSku',
        key: 'productSku',
        render: text => <a>{text}</a>,
      },
      {
        title: '商品名',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNumber',
        key: 'approvalNumber',
      },
      {
        title: '类别',
        key: 'productType',
        dataIndex: 'productType',
      },
      {
        title: '包装规格',
        key: 'productSpecif',
        dataIndex: 'productSpecif',
      },
      {
        title: '报价数',
        key: 'offer',
        dataIndex: 'offer',
        render: text => <a>{text}</a>,
      },
      {
        title: '均价',
        key: 'average',
        dataIndex: 'average',
      },
      {
        title: '售卖状态',
        key: 'status',
        render: (status, record) => (
          <Switch defaultChecked={record.status} onChange={this.onChange} />
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={this.goToNextPage.bind(this, record, 'detail')}>查看</a>
            <Divider type="vertical" />
            <a onClick={this.goToNextPage.bind(this, record, 'editor')}>编辑</a>
          </span>
        ),
      },
    ],
  };
  onChange = e => {
    const { dispatch } = this.props;
    const currentPage = e.current - 1;
    console.log('currentPage_', currentPage);
    dispatch({
      type: 'commodity/getList',
      payload: Object.assign(
        {
          pageNumber: currentPage,
          pageSize: 10,
        },
        this.state.searchInfo,
      ),
    });
  };
  // 请求数据跳转详情页面
  goToNextPage = (params, operate) => {
    const { dispatch } = this.props;
    console.log('operate_', operate);
    dispatch({
      type: 'commodity/getProduct',
      payload: {
        id: params.productId,
      },
    }).then(result => {
      router.push({
        pathname:
          operate === 'detail'
            ? '/commodityAdm/management/particulars'
            : '/commodityAdm/management/edit',
        query: { id: params.productId },
      });
    });
  };
  render() {
    const { state } = this;
    return (
      <Table
        {...this.state}
        className={styles['main']}
        columns={state.columns}
        dataSource={this.props.commodity.productList.pageList}
        onChange={this.onChange}
      />
    );
  }
}
