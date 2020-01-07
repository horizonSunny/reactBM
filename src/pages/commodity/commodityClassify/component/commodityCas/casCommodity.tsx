import React from 'react';
import { Table, Input, Button } from 'antd';
import { DragableBodyRow } from './casTr';
const { Search } = Input;

export default class CasCommodity extends React.Component {
  state = {
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
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  downSelect = () => {
    return (
      <div className="buttonContain">
        <Button type="danger">移除</Button>
        <Button>分类至</Button>
      </div>
    );
  };
  render() {
    const columnss = [
      {
        title: this.downSelect(),
        dataIndex: 'name',
        key: 'name',
      },
    ];
    return (
      <div>
        <div className="titleChoose">
          123
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
        <Table
          columns={columnss}
          pagination={false}
          dataSource={this.state.dataFoure}
          components={this.components}
          rowSelection={this.rowSelection}
        />
      </div>
    );
  }
}
