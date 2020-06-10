import { Table, Switch, Button, Modal, message } from 'antd';
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { statusFilter } from '@/utils/orderStatusFilter';
const { confirm } = Modal;
@connect(({ inquiry }) => ({
  inquiry: inquiry,
}))
class EnterTable extends Component {
  columns = [
    {
      title: '订单编码',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '用户ID',
      dataIndex: 'patientId',
      key: 'patientId',
    },
    {
      title: '患者姓名',
      dataIndex: 'medicineName',
      key: 'medicineName',
    },
    {
      title: '咨询医生',
      dataIndex: 'doctorName',
      key: 'doctorName',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (text, record) => {
        const textInfo = statusFilter(text);
        return text;
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => this.handleView(text, record)}>
            查看
          </Button>
        </div>
      ),
    },
  ];
  handleView = (text, record) => {
    console.log('当前行的数据为:', text, record);
    router.push({
      pathname: '/orderMagt/inquiry/inquiryDetail',
      query: { id: record.orderNo },
    });
  };
  onChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    const params = {
      pageNumber: pagination.current - 1,
      pageSize: 10,
    };
    dispatch({
      type: 'inquiry/querypaginationChange',
      payload: { ...params },
    }).then(() => {
      const { queryForm, pagination } = this.props.inquiry;
      let params = {
        ...queryForm,
        ...pagination,
      };
      // 查询列表
      dispatch({
        type: 'inquiry/queryList',
        payload: { ...params },
      });
    });
  };
  render() {
    const { inquiry } = this.props;
    console.log('inquiry.pagination_', inquiry.pagination);

    return (
      <Table
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        rowKey="tenantId"
        dataSource={inquiry.businessData}
        columns={this.columns}
        pagination={inquiry.pagination}
        onChange={this.onChange}
        scroll={{ x: 1200 }}
      />
    );
  }
}

export default EnterTable;
