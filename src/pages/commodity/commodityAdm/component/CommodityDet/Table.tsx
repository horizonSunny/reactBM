// import { Table, Divider, Tag, Switch } from 'antd';

import { Table, Carousel } from 'antd';
import React from 'react';
import styles from './Table.less';
import filterData from './filter';
import { connect } from 'dva';

const columns = [
  {
    dataIndex: 'name',
  },
  {
    className: 'column-money',
    dataIndex: 'value',
    render: (text, record) => {
      if (record.name === '商品图') {
        return (
          <Carousel>
            <Carousel>
              {record.value.map((item, index) => {
                return (
                  <div>
                    <img src={item} alt="2311" style={{ height: '100%', width: '100%' }} />
                  </div>
                );
              })}
            </Carousel>
          </Carousel>
        );
      } else {
        return text;
      }
    },
  },
];
@connect(({ commodity }) => ({ commodity }))
export default class TableList extends React.Component {
  state = {
    tabelArr: [],
  };
  // 获取处理后的数据
  dataReverse(data) {
    const arr = [];
    let i = 0;
    for (let item in data) {
      // this.state.tabelArr.push(obj);
      if (filterData.hasOwnProperty(item)) {
        const obj = new Object();
        obj.key = i++;
        obj.value = data[item];
        obj.name = filterData[item];
        arr.push(obj);
      }
    }
    console.log('tabelArr_', arr);
    // return arr;
    this.setState({
      tabelArr: arr,
    });
  }
  // 生命周期
  componentDidMount() {
    this.dataReverse(this.props.commodity.productWithId);
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
