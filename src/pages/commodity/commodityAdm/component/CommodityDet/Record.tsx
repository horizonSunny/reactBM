// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel } from 'antd';
import React from 'react';
import styles from './Table.less';
import filterData from './filter';

const columns = [
  {
    dataIndex: 'operate',
  },
  {
    dataIndex: 'operateInfo',
  },
];
const data = [
  {
    operate: '下架时间',
    operateInfo: '2012-03-04 张三',
  },
  {
    operate: '上架时间',
    operateInfo: '2012-03-04 李四',
  },
  {
    operate: '创建时间',
    operateInfo: '2012-03-04 王五',
  },
];
export default class TableList extends React.Component {
  componentDidMount() {}

  render() {
    const { state } = this;
    return (
      <div className={styles.main}>
        <a href="javascript:void(0);" className={styles.aInfo}>
          {' '}
          操作记录
        </a>
        <Table columns={columns} dataSource={data} bordered pagination={false} />
      </div>
    );
  }
}
