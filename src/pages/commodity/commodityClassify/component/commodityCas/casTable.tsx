import React from 'react';
import { Table, Input, Button } from 'antd';
import { DragableBodyRow } from './casTr';
import update from 'immutability-helper';

export default class CasTable extends React.Component {
  state = {
    dataOne: [
      {
        name: 'John Brown1',
        classify: 1,
      },
      {
        name: 'Jim Green1',
        classify: 1,
      },
      {
        name: 'Joe Black1',
        classify: 1,
      },
    ],
    dataTwo: [
      {
        name: 'John Brown2',
      },
      {
        name: 'Jim Green2',
      },
      {
        name: 'Joe Black2',
      },
    ],
    dataThree: [
      {
        name: 'John Brown3',
      },
      {
        name: 'Jim Green3',
      },
      {
        name: 'Joe Black3',
      },
    ],
    dataFoure: [
      {
        name: 'John Brown4',
        key: 1,
      },
      {
        name: 'Jim Green4',
        key: 2,
      },
      {
        name: 'Joe Black4',
        key: 3,
      },
    ],
  };
  components = {
    body: {
      row: DragableBodyRow,
    },
  };
  moveRow = (data, dataName, dragIndex, hoverIndex) => {
    console.log('moveRow');
    const dragRow = data[dragIndex];
    const obj = new Object();
    obj[dataName] = {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    };
    this.setState(update(this.state, obj));
  };
  render() {
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
      },
    ];
    return (
      <div>
        <div className="titleChoose">213123</div>
        <Table
          className="noHead"
          columns={columns}
          pagination={false}
          dataSource={this.state.dataOne}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow.bind(this, this.state.dataOne, 'dataOne'),
          })}
        />
      </div>
    );
  }
}
