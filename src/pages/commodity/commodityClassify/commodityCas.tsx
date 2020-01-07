import React from 'react';
import { Table, Row, Col, Input, Button } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import styles from './commodityCas.less';
import { template } from '_@types_babel__core@7.1.3@@types/babel__core';

let dragingIndex = -1;
const { Search } = Input;
class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = {
      ...restProps.style,
      cursor: 'move',
      textAlign: 'center',
      height: '25px',
      lineHeight: '25px',
    };
    let { className } = restProps;
    // 测试
    const item = restProps.children;
    const info = item[item.length - 1]['props']['record'];
    // console.log('restProps_', info);
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className = [' drop-over-downward'];
      }
      if (restProps.index < dragingIndex) {
        className = [' drop-over-upward'];
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          className={(className, info.name === 'Joe Black1' ? 'testYellow' : '')}
          style={style}
          onClick={() => {
            console.log('onClick');
          }}
        />,
      ),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

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
    // const { data } = this.state;
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
          </Col>
        </Row>
      </DndProvider>
    );
  }
}
