import React, { Component } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const columns = [
  {
    title: '操作记录',
    dataIndex: 'status',
    key: 'status',
    render: text => {
      text == 1 && <div>待审核</div>;
      text == 2 && <div>审核驳回</div>;
      text == 3 && <div>审核通过</div>;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作人',
    dataIndex: 'creteUser',
    key: 'creteUser',
  },
  {
    title: '备注',
    dataIndex: 'reason',
    key: 'reason',
  },
];
@connect(({ doctorAdm }) => ({
  doctorAdm: doctorAdm,
}))
class Record extends Component {
  render() {
    const { currentDoctor } = this.props.doctorAdm;
    return (
      <div className={`${styles.infopart} ${styles.content}`} style={{ borderBottom: '0px' }}>
        <Table columns={columns} dataSource={currentDoctor['auditLogList']} />
      </div>
    );
  }
}

export default Record;
