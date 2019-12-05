import React, { Component } from 'react';
import styles from './index.less';

class BaseInfo extends Component {
  render() {
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>基本信息</div>
        <div className={`${styles.table}`}>
          <table>
            <tr>
              <td className={`${styles.tableleft}`}>企业类型</td>
              <td>批发企业</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>统一社会信用代码</td>
              <td>9F1231231231231231231</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>店铺所在地</td>
              <td>上海市 上海市 浦东新区</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>店铺详细地址</td>
              <td>XXXX XXXXXXXXXXXXX</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>法定代表人(负责人)姓名</td>
              <td>批发企业</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>管理员姓名</td>
              <td>XXXXXXXX</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>管理员手机号</td>
              <td>13222222222</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>管理员手持身份证照片</td>
              <td>
                <img
                  src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  alt=""
                  height="150"
                  width="150"
                />
              </td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>用户名</td>
              <td>31231312</td>
            </tr>
            <tr>
              <td className={`${styles.tableleft}`}>密码</td>
              <td>1111113333333</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default BaseInfo;
