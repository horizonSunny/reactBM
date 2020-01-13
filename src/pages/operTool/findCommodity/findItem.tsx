import React from 'react';
import { Table, Button, Divider } from 'antd';
import { connect } from 'dva';

@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class FindItem extends React.Component {
  render() {
    return <div>456</div>;
  }
}
