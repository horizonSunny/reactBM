import { Table, Divider, Tag, Switch } from 'antd';
import React from 'react';
import Link from 'umi/link';
import styles from './TableList.less';

const pagination = { position: 'bottom', pageSize: 10 };
// export default (): React.ReactNode => (
//   <Table className={styles['main']} columns={columns} dataSource={data} {...state} />
// );
export default class TableList extends React.Component {
  state = {
    pagination,
    data: [
      {
        sku: '1',
        key: 1,
        tradeName: 'John Brown',
        approvalNumber: 32,
        classes: 'New York No. 1 Lake Park',
        specification: '31123',
        offer: '231',
        average: '312',
        status: true,
      },
      {
        sku: '1',
        key: 2,
        tradeName: 'John Brown',
        approvalNumber: 32,
        classes: 'New York No. 1 Lake Park',
        specification: '31123',
        offer: '231',
        average: '312',
        status: false,
      },
    ],
    columns: [
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
        render: text => <a>{text}</a>,
      },
      {
        title: '商品名',
        dataIndex: 'tradeName',
        key: 'tradeName',
      },
      {
        title: '批准文号',
        dataIndex: 'approvalNumber',
        key: 'approvalNumber',
      },
      {
        title: '类别',
        key: 'classes',
        dataIndex: 'classes',
      },
      {
        title: '包装规格',
        key: 'specification',
        dataIndex: 'specification',
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
            <Link to="/commodityAdm/management/particulars">查看</Link>
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
    return (
      <Table
        {...this.state}
        className={styles['main']}
        columns={state.columns}
        dataSource={state.data}
      />
    );
  }
}
