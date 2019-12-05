// import { Table, Divider, Tag, Switch } from 'antd';

import { Table } from 'antd';
import React from 'react';
import styles from './Table.less';

const columns = [
  {
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    className: 'column-money',
    dataIndex: 'money',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
export default class TableList extends React.Component {
  state = {};
  render() {
    const { state } = this;
    return (
      <Table
        className={styles.main}
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
      />
    );
  }
}
