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
  handleSwitchChange = (text, record) => {
    console.log('switch切换:', text, record);
    const { dispatch } = this.props;
    confirm({
      content: `是否${text ? '启售' : '禁售'}当前商户?`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        let tempParam = {
          tenantId: record.tenantId,
          status: text ? 0 : 1,
        };
        dispatch({
          type: 'inquiry/switchStatus',
          payload: tempParam,
        }).then(data => {
          if (data.code === 1) {
            message.success('修改成功!');
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  handleView = (text, record) => {
    console.log('当前行的数据为:', text, record);
    const { dispatch } = this.props;
    const { recordPagenation } = this.props.inquiry;
    dispatch({
      type: 'inquiry/currentRecord',
      payload: { ...record },
    });
    // 获取操作日志
    dispatch({
      type: 'inquiry/getOperationRecord',
      payload: {
        ...recordPagenation,
        tenantId: record.tenantId,
        pageNumber: 0,
        totalElements: 0,
      },
    });
    router.push('/inquiry/enter/particulars');
  };
  handleUpdate = (text, record) => {
    console.log('当前行的数据为:', text, record);
    const { dispatch } = this.props;
    dispatch({
      type: 'inquiry/currentRecord',
      payload: { ...record },
    });
    router.push('/inquiry/enter/edit');
  };
  onChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inquiry/queryPagenationChange',
      payload: { ...pagination },
    }).then(() => {
      const { queryForm, pagenation } = this.props.inquiry;
      let params = {
        ...queryForm,
        ...pagenation,
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
    return (
      <Table
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        rowKey="tenantId"
        dataSource={inquiry.businessData}
        columns={this.columns}
        pagination={inquiry.pagenation}
        onChange={this.onChange}
        scroll={{ x: 1200 }}
      />
    );
  }
}

export default EnterTable;
