import { Table, Divider, Tag, Switch } from 'antd';
import React from 'react';
import Link from 'umi/link';
import styles from './TableList.less';
import { connect } from 'dva';

const pagination = { position: 'bottom', pageSize: 10 };
// export default (): React.ReactNode => (
//   <Table className={styles['main']} columns={columns} dataSource={data} {...state} />
// );
@connect(({ commodity }) => ({ commodity }))
export default class TableList extends React.Component {
  state = {
    data: this.props.commodity.productList.pageList,
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
            <Link to={`/commodityAdm/management/particulars?id=${record.productId}`}>查看</Link>
            <Divider type="vertical" />
            <Link to="/commodityAdm/management/edit">编辑</Link>
          </span>
        ),
      },
    ],
  };
  onChange = e => {};
  render() {
    const { state } = this;
    console.log('listData2323_', this.state.data);
    console.log('listData_', this.props.commodity.productList.pageList);
    return (
      <Table
        {...this.state}
        className={styles['main']}
        columns={state.columns}
        dataSource={this.props.commodity.productList.pageList}
      />
    );
  }
}
