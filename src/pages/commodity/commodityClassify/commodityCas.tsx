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
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Row className={styles['main']}>
          <Col span={5}>
            <CasTable levelInfo="One"></CasTable>
          </Col>
          <Col span={5}>
            <CasTable levelInfo="Two"></CasTable>
          </Col>
          <Col span={5}>
            <CasTable levelInfo="Three"></CasTable>
          </Col>
          <Col span={9}>
            <CasCommodity></CasCommodity>
          </Col>
        </Row>
      </DndProvider>
    );
  }
}
