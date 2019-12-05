// import { Table, Divider, Tag, Switch } from 'antd';

import { Table } from 'antd';
import React from 'react';
import styles from './Table.less';
import filterData from './filter';

const columns = [
  {
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    className: 'column-money',
    dataIndex: 'value',
  },
];
const dataInfo = {
  // productImg: [
  //   {
  //     url: '../src/assets/timg1.jpeg',
  //     status: true,
  //   },
  //   {
  //     url: '../src/assets/timg2.jpeg',
  //     status: false,
  //   },
  //   {
  //     url: '../src/assets/timg3.jpeg',
  //     status: false,
  //   },
  //   {
  //     url: '../src/assets/timg4.jpeg',
  //     status: false,
  //   },
  // ],
  name: '感冒灵颗粒',
  status: '中医药品',
  isRx: 1,
  brand: '999',
  intro: '感冒灵颗粒666',
  approvalNumber: '2313',
  packing: '10gX9袋／盒',
  model: '颗粒剂',
  englishName: '',
  spell: '',
  validity: '24个月',
  company: 'xxxx',
  specification: 'xxxxxxx',
};
export default class TableList extends React.Component {
  state = {
    tabelArr: [],
  };
  // 获取处理后的数据
  dataReverse(data) {
    const arr = [];
    let i = 0;
    for (let item in data) {
      const obj = new Object();
      obj.key = i++;
      obj.value = data[item];
      // this.state.tabelArr.push(obj);
      if (filterData.hasOwnProperty(item)) {
        obj.name = filterData[item];
      }
      arr.push(obj);
    }
    this.setState({
      tabelArr: arr,
    });
  }
  // 生命周期
  componentDidMount() {
    this.dataReverse(dataInfo);
    console.log('this.state.tabelArr_', this.state.tabelArr);
  }

  render() {
    const { state } = this;
    return (
      <Table
        className={styles.main}
        columns={columns}
        dataSource={state.tabelArr}
        bordered
        pagination={false}
      />
    );
  }
}
