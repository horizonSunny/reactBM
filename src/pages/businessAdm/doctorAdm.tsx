import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './doctorAdm.less';
import QueryForm from './doctorComponent/QueryForm';
import EnterTable from './doctorComponent/EnterTable';
import { connect } from 'dva';

@connect(({ doctorAdm }) => ({
  doctorAdm: doctorAdm,
}))
class BusinessEnter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { queryForm, pagination } = this.props.doctorAdm;
    // 查询列表
    // dispatch({
    //   type: 'doctorAdm/queryFormChange',
    //   payload: { ...params },
    // }).then(() => {
    dispatch({
      type: 'doctorAdm/queryList',
      payload: { ...queryForm, ...pagination },
    });
    // });
  }
  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={styles.containerForm}>
            <QueryForm></QueryForm>
          </div>
          <div className={styles.containerTable}>
            <EnterTable></EnterTable>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BusinessEnter;
