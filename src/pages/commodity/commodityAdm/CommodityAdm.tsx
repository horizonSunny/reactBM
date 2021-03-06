import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityAdm.less';
import { connect } from 'dva';

//传入组件
import SearchForm from './component/CommodityAdm/SearchForm';
import TableList from './component/CommodityAdm/TableList';

// 请求
@connect(({ commodity }) => ({ commodity }))
export default class CommodityAdm extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // const searchParams = filterProperty(this.props.commodity.searchInfo);
    dispatch({
      type: 'commodity/getProductType',
    });
    dispatch({
      type: 'commodity/getList',
      payload: {
        pageNumber: 0,
        pageSize: 10,
      },
    });
  }
  // componentWillReceiveProps() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'commodity/getProductType',
  //     payload: { code: 'productType' },
  //   });
  // }
  state = {
    searchInfo: {},
  };
  resetSearch(info) {
    console.log('info_', info);
    this.setState({
      searchInfo: info,
    });
  }
  render() {
    return (
      <PageHeaderWrapper>
        <SearchForm saveSearchInfo={this.resetSearch.bind(this)} />
        <TableList searchInfo={this.state.searchInfo} />
      </PageHeaderWrapper>
    );
  }
}
