import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
// 外部引入
import styles from './itemComponent.less';
// const { Search } = Input;
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class ComponentItem extends React.Component {
  stick(index) {
    console.log('index_', index);
  }
  render() {
    return (
      <div className={styles['main']}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <img className="image" src={this.props.info['productImage'][0]}></img>
          <div className="commodityInfo">
            <div className="name">{this.props.info['productCommonName']}</div>
            <div className="spec">{this.props.info['productSpecif']}</div>
          </div>
        </div>
        <div className="operate">
          {this.props.indexInfo !== 0 && (
            <Icon
              type="vertical-align-top"
              onClick={this.stick.bind(this, this.props.info['productId'])}
            />
          )}
          {this.props.indexInfo === 0 && <Icon style={{ cursor: 'default' }} />}
          {/* <Icon type="edit" /> */}
        </div>
      </div>
    );
  }
}
