import React from 'react';
import { Table, Input, Button } from 'antd';
import { DragableBodyRow } from './casTr';
import { connect } from 'dva';
import update from 'immutability-helper';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class CasTable extends React.Component {
  state = {};
  components = {
    body: {
      row: DragableBodyRow,
    },
  };
  moveRow = (data, dataName, props, dragIndex, hoverIndex) => {
    // 这边对拖拽进行一个判断，判断拖拽对物体是不是本classify内的，不是对话直接return
    console.log('moveRow', dataName, props);
    const dragRow = data[dragIndex];
    const obj = new Object();
    obj[dataName] = {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    };
    // this.setState(update(this.state, obj));
  };
  render() {
    const columns = [
      {
        dataIndex: 'cateName',
        key: 'id',
      },
    ];
    console.log('this.props.levelInfo_', this.props.levelInfo);
    return (
      // <DndProvider backend={HTML5Backend}>
      <div>
        <div className="titleChoose">213123</div>
        <Table
          className="noHead"
          columns={columns}
          pagination={false}
          dataSource={this.props.commodityClassify[this.props.levelInfo + '']}
          childrenColumnName=""
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
            // moveRow: this.moveRow.bind(this, this.state.dataOne, 'dataOne', record),
          })}
        />
      </div>
      // </DndProvider>2
    );
  }
}
