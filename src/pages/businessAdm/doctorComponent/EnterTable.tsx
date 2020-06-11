import { Table, Switch, Button, Modal, message } from 'antd';
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
const { confirm } = Modal;
@connect(({ doctorAdm }) => ({
  doctorAdm: doctorAdm,
}))
class EnterTable extends Component {
  columns = [
    {
      title: '医生编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: text => <span>{text == 1 ? '男' : '女'}</span>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '医院/科室',
      dataIndex: 'doctorHospital',
      key: 'doctorHospitalList',
      render: (text, record) => {
        record.doctorHospitalList.map(item => {
          return <span>{`${hospitalName}(${partName})`}</span>;
        });
      },
    },
    {
      title: '好评率',
      dataIndex: 'goodEstimate',
      key: 'goodEstimate',
    },
    {
      title: '审核状态',
      dataIndex: 'authStatus',
      key: 'authStatus',
      render: (text, record) => {
        switch (text) {
          case '1':
            return <span>待审核</span>;
          case '2':
            return <span>审核驳回</span>;
          case '3':
            return <span>审核通过</span>;
        }
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
          type: 'doctorAdm/switchStatus',
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
    const { recordpagination } = this.props.doctorAdm;
    dispatch({
      type: 'doctorAdm/currentRecord',
      payload: { ...record },
    });
    // 获取操作日志
    dispatch({
      type: 'doctorAdm/getOperationRecord',
      payload: {
        ...recordpagination,
        tenantId: record.tenantId,
        pageNumber: 0,
        totalElements: 0,
      },
    });
    router.push('/doctorAdm/enter/particulars');
  };
  handleUpdate = (text, record) => {
    console.log('当前行的数据为:', text, record);
    const { dispatch } = this.props;
    dispatch({
      type: 'doctorAdm/currentRecord',
      payload: { ...record },
    });
    router.push('/doctorAdm/enter/edit');
  };
  onChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'doctorAdm/querypaginationChange',
      payload: { ...pagination },
    }).then(() => {
      const { queryForm, pagination } = this.props.doctorAdm;
      let params = {
        ...queryForm,
        ...pagination,
      };
      // 查询列表
      dispatch({
        type: 'doctorAdm/queryList',
        payload: { ...params },
      });
    });
  };
  render() {
    const { doctorAdm } = this.props;
    return (
      <Table
        style={{ paddingLeft: '10px', paddingRight: '10px' }}
        rowKey="tenantId"
        dataSource={doctorAdm.businessData}
        columns={this.columns}
        pagination={doctorAdm.pagination}
        onChange={this.onChange}
        scroll={{ x: 1200 }}
      />
    );
  }
}

export default EnterTable;
