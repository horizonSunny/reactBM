import { Table, Divider, Tag, Switch } from 'antd';
import React from 'react';
import styles from './Table.less';

const pagination = { position: 'bottom', pageSize: '10' };

export default class TableList extends React.Component {
  state = {
    pagination,
  };
  render() {
    const { state } = this;
    return <div>123</div>;
  }
}
