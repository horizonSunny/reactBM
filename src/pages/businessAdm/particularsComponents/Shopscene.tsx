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
];
class Shopscene extends Component {
  render() {
    return (
      <div className={`${styles.infopart}`}>
        <div className={`${styles.title}`}>店铺实景</div>
        <div className={`${styles.picList}`}>
          {picList.map(item => {
            return (
              <div className={`${styles.picItem}`} key={item.id}>
                <img src={item.url} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Shopscene;
