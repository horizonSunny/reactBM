import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Pagination } from 'antd';

@connect(({ businessAdm }) => ({
  businessAdm: businessAdm,
}))
class Operationrecord extends Component {
  onChange = page => {
    const { dispatch } = this.props;
    const { recordpagination, currentRecord } = this.props.businessAdm;
    dispatch({
      type: 'businessAdm/getOperationRecord',
      payload: {
        ...recordpagination,
        pageNumber: page,
        tenantId: currentRecord.tenantId,
      },
    });
  };
  render() {
    const { operaRecord, recordpagination } = this.props.businessAdm;
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>操作记录</div>
        <div className={`${styles.table}`}>
          <table>
            <tbody>
              {operaRecord &&
                operaRecord.map(item => (
                  <tr key={item.id}>
                    <td className={`${styles.tableleft}`}>{item.operation}</td>
                    <td>
                      <span>{item.optTime}</span>
                      <span className={`${styles.operater}`}>操作人: {item.operator}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {recordpagination.totalElements >
        (recordpagination.pageNumber + 1) * recordpagination.pageSize ? (
          <div className={`${styles.page}`}>
            <Pagination
              current={recordpagination.pageNumber}
              onChange={this.onChange}
              total={recordpagination.totalElements}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Operationrecord;
