import React from 'react';
import { Row, Col } from 'antd';
import { DndProvider } from 'react-dnd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import HTML5Backend from 'react-dnd-html5-backend';
// 外部引入
import styles from './commodityCas.less';
import CasCommodity from './component/commodityCas/casCommodity';
import CasTable from './component/commodityCas/casTable';

// const { Search } = Input;
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class Table extends React.Component {
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
      <PageHeaderWrapper>
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
      </PageHeaderWrapper>
    );
  }
}
