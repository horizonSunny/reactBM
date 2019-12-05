import React, { Component } from 'react';
import styles from './index.less';
const operationlist = [
  {
    id: 1,
    name: '修改时间',
    operater: '操作人',
    time: '2019-12-04 12:30:40',
  },
  {
    id: 2,
    name: '起售时间',
    operater: '操作人',
    time: '2019-12-04 12:30:40',
  },
  {
    id: 3,
    name: '创建时间',
    operater: '操作人',
    time: '2019-12-04 12:30:40',
  },
];
class Operationrecord extends Component {
  render() {
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>操作记录</div>
        <div className={`${styles.table}`}>
          <table>
            <tbody>
              {operationlist.map(item => (
                <tr  key={item.id}>
                  <td className={`${styles.tableleft}`}>{item.name}</td>
                  <td>
                    <span>{item.time}</span>
                    <span className={`${styles.operater}`}>{item.operater}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Operationrecord;
