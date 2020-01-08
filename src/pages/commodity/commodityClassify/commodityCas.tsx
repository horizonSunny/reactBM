import React from 'react';
import { Table, Row, Col, Button } from 'antd';
import { DndProvider } from 'react-dnd';
import { connect } from 'dva';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
// 外部引入
import styles from './commodityCas.less';
import { DragableBodyRow } from './component/commodityCas/casTr';
import CasCommodity from './component/commodityCas/casCommodity';
import CasTable from './component/commodityCas/casTable';

// const { Search } = Input;
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
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
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/classification',
      }).then(() => {
        console.log('this.props.commodityClassify_', this.props.commodityClassify);
      });
    }
  }
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
            <CasTable></CasTable>
          </Col>
          <Col span={5}>
            <CasTable></CasTable>
          </Col>
          <Col span={5}>
            <CasTable></CasTable>
          </Col>
          <Col span={9}>
            <CasCommodity></CasCommodity>
          </Col>
        </Row>
      </DndProvider>
    );
  }
}
