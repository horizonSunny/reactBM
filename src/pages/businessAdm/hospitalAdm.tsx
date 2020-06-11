import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './businessEnter.less';
import QueryForm from './hospitalComponent/QueryForm';
import EnterTable from './hospitalComponent/EnterTable';
import { connect } from 'dva';

@connect(({ hospitalAdm }) => ({
  hospitalAdm: hospitalAdm,
}))
class BusinessEnter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { queryForm, pagination } = this.props.hospitalAdm;
    let params = {
      ...queryForm,
      ...pagination,
    };
    // 查询列表
    dispatch({
      type: 'hospitalAdm/queryList',
      payload: { ...params },
    });
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
