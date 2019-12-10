import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityAdm.less';
import { connect } from 'dva';
import filterProperty from '@/utils/filterProperty';

//传入组件
import SearchForm from './component/CommodityAdm/SearchForm';
import TableList from './component/CommodityAdm/TableList';

// 请求
@connect(({ commodity }) => ({ commodity }))
export default class CommodityAdm extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const searchParams = filterProperty(this.props.commodity.searchInfo);
    console.log('searchParams_', searchParams, '_searchInfo_', this.props.commodity.searchInfo);
    dispatch({
      type: 'commodity/getList',
      payload: searchParams,
    });
  }
  render() {
    return (
      <PageHeaderWrapper>
        <SearchForm />
        <TableList />
      </PageHeaderWrapper>
    );
  }
}
