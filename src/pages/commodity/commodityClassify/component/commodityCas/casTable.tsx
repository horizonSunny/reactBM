import React from 'react';
import { Table } from 'antd';
import { DragableBodyRow } from './casTr';
import { connect } from 'dva';

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
  moveRow = (record, dragIndex, hoverIndex) => {
    // 这边对拖拽进行一个判断，判断拖拽对物体是不是本classify内的，不是对话直接return
    console.log('moveRow', record, dragIndex, hoverIndex);
    let _this = this;
    if (record.classify !== this.props.commodityClassify.dragStart) {
      console.log('不在同一行');
      return;
    }
  };
  render() {
    const columns = [
      {
        dataIndex: 'cateName',
        key: 'id',
      },
    ];
    let dataSourceInfo = this.props.commodityClassify['casInfo' + this.props.levelInfo];
    return (
      <div>
        <div className="titleChoose">213123</div>
        <Table
          className="noHead"
          columns={columns}
          pagination={false}
          dataSource={dataSourceInfo}
          childrenColumnName=""
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow.bind(this, record),
          })}
        />
      </div>
    );
  }
}
