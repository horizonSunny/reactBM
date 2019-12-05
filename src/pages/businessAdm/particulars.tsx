import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button } from 'antd';
import styles from './particulars.less';
import {
  Title,
  BaseInfo,
  Qualification,
  Shopscene,
  Operationrecord,
} from './particularsComponents/index';

class Particulars extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Title></Title>
            <BaseInfo></BaseInfo>
            <Qualification></Qualification>
            <Shopscene></Shopscene>
            <Operationrecord></Operationrecord>
          </div>
          <div className={`${styles.operation}`}>
            <Button type="primary">编辑</Button>
            <Button icon="left" className={`${styles.back}`}>
              返回
            </Button>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Particulars;
