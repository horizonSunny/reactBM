import { Table, Switch, Button, Modal, Input, message } from 'antd';
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { upDoctorStatus } from '@/services/businessAdm';

@connect(({ doctorAdm }) => ({
  doctorAdm: doctorAdm,
}))
class EnterTable extends Component {
  state = {
    visible: false,
    serviceState: true,
    closeReason: '',
    currentDoctor: {},
  };
  columns = [
    {
      title: '医生编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '更新时间',
      dataIndex: 'auditTime',
      key: 'auditTime',
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>
          {text == 1 ? '服务中' : '暂停'}
          <Switch
            checked={text == 1 ? true : false}
            defaultChecked={text == 1 ? true : false}
            onChange={() => this.handleSwitchChange(text, record)}
          />
        </span>
      ),
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
    this.setState(
      {
        visible: true,
        serviceState: text == 1 ? false : true,
        currentDoctor: record,
      },
      () => {
        // console.log(this.state.initSwitch); //此时的this.state.initSwitch为true
      },
    );
    // const { dispatch } = this.props;
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
    const params = {
      pageNumber: pagination.current - 1,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'doctorAdm/querypaginationChange',
      payload: { ...params },
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
  // 开启或者关闭服务
  handleOk = () => {
    const params = {
      doctorId: this.state.currentDoctor.id,
      status: this.state.serviceState ? 1 : 2,
    };
    if (!this.state.serviceState) {
      params.pauseReason = this.state.closeReason;
    }
    if (!this.state.serviceState && params.pauseReason == '') {
      message.info('关闭原因不能为空');
      return;
    }
    upDoctorStatus(params).then(res => {
      if (res.code == 1) {
        this.setState(
          {
            visible: false,
          },
          () => {
            this.setState({
              serviceState: true,
              closeReason: '',
              currentDoctor: {},
            });
          },
        );
        //重新请求
        const { dispatch } = this.props;
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
      } else {
        message.info(res.msg);
      }
    });
  };
  handleCancel = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.setState({
          serviceState: true,
          closeReason: '',
          currentDoctor: {},
        });
      },
    );
  };
  closeReson = e => {
    const { value } = e.target;
    console.log('value_', value);
    this.setState({
      closeReason: value,
    });
  };
  render() {
    const { doctorAdm } = this.props;
    return (
      <div>
        <Table
          style={{ paddingLeft: '10px', paddingRight: '10px' }}
          rowKey="tenantId"
          dataSource={doctorAdm.businessData}
          columns={this.columns}
          pagination={doctorAdm.pagination}
          onChange={this.onChange}
          scroll={{ x: 1200 }}
        />
        <Modal
          title={this.state.serviceState ? '开启服务' : '请填写关闭原因'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.serviceState && <span>是否开启服务?</span>}
          {!this.state.serviceState && '关闭原因：' && (
            <Input width="25" onChange={this.closeReson}></Input>
          )}
        </Modal>
      </div>
    );
  }
}

export default EnterTable;
