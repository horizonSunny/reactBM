import React, { Component } from 'react';
import styles from './index.less';

const picList = [
  {
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: '营业执照书',
    id: 1,
  },
  {
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: '药品经营许可证',
    id: 2,
  },
  {
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: '医疗器械许可证',
    id: 3,
  },
  {
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: '第二类医疗器械经营备案凭证',
    id: 4,
  },
  {
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: '药品经营质量管理规范认证',
    id: 5,
  },
  {
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: 'XXXXXXXX',
    id: 6,
  },
  {
    url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    name: 'XXXXXXXXXXXXX',
    id: 7,
  },
];
class Qualification extends Component {
  render() {
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>企业资质</div>
        <div className={`${styles.picList}`}>
          {picList.map(item => {
            return (
              <div className={`${styles.picItem}`} key={item.id}>
                <img src={item.url} alt="" />
                <div className={`${styles.picName}`}>{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Qualification;
