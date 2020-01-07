import React from 'react';
import { Table, Row, Col, Button } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
// 外部引入
import styles from './commodityCas.less';
import { DragableBodyRow } from './component/commodityCas/casTr';
import CasCommodity from './component/commodityCas/casCommodity';

// const { Search } = Input;

export default class DragSortingTable extends React.Component {
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
      <DndProvider backend={HTML5Backend}>
        <Row className={styles['main']}>
          <Col span={5}>
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
          </Col>
          <Col span={5}>
            <div className="titleChoose">213123</div>
            <Table
              className="noHead"
              columns={columns}
              pagination={false}
              dataSource={this.state.dataTwo}
              components={this.components}
              onRow={(record, index) => ({
                index,
                moveRow: this.moveRow.bind(this, this.state.dataTwo, 'dataTwo'),
              })}
            />
          </Col>
          <Col span={5}>
            <div className="titleChoose">213123</div>
            <Table
              columns={columns}
              pagination={false}
              className="noHead"
              dataSource={this.state.dataThree}
              components={this.components}
              onRow={(record, index) => ({
                index,
                moveRow: this.moveRow.bind(this, this.state.dataThree, 'dataThree'),
              })}
            />
          </Col>
          <Col span={9}>
            <CasCommodity></CasCommodity>
          </Col>
        </Row>
      </DndProvider>
    );
  }
}
