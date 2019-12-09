import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './CommodityAdm.less';
import { connect } from 'dva';

//传入组件
import SearchForm from './component/CommodityAdm/SearchForm';
import TableList from './component/CommodityAdm/TableList';

// 请求
// import { CurrentUser } from '@/models/user';
@connect(() => ({}))
export default class CommodityAdm extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodity/getList',
      payload: {
        pageNumber: 0,
        pageSize: 10,
      },
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
