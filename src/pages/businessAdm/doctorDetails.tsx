import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './particulars.less';
import {
  Title,
  BaseInfo,
  Qualification,
  Shopscene,
  Operationrecord,
} from './doctorComponent/index';
import routerParams from '@/utils/routerParams';

class Particulars extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const params = routerParams(location.search);
    dispatch({
      type: 'doctorAdm/queryList',
      // payload: { ...queryForm, ...pagination },
    });
  }
  handleEdit = () => {
    // router.push('/businessAdm/enter/edit');
  };
  handleBack = () => {
    // router.push('/businessAdm/enter');
  };
  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Title></Title>
            {/* <BaseInfo></BaseInfo>
            <Qualification></Qualification>
            <Shopscene></Shopscene>
            <Operationrecord></Operationrecord> */}
          </div>
          <div className={`${styles.operation}`}>
            <Button type="primary" onClick={this.handleEdit}>
              编辑
            </Button>
            <Button icon="left" className={`${styles.back}`} onClick={this.handleBack}>
              返回
            </Button>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
