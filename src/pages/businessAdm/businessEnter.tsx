import React, { Component } from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './businessEnter.less';
import QueryForm from './components/QueryForm';
import EnterTable from './components/EnterTable';

class BusinessEnter extends Component {
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
