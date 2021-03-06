import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Cascader } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './QueryForm.less';
import { newArea } from '../../../utils/area.js';
import router from 'umi/router';

const { RangePicker } = DatePicker;
const { Option } = Select;
const options = newArea();

@connect(({ doctorAdm }) => ({
  doctorAdm: doctorAdm,
}))
class QueryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  handleSearch = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      let params = {
        authStatus: values.authStatus,
        doctorName: values.doctorName,
        hospitalName: values.hospitalName,
        status: values.status,
      };
      console.log('查询参数: ', params);
      // 查询列表
      dispatch({
        type: 'doctorAdm/queryFormChange',
        payload: { ...params },
      }).then(() => {
        this.handleQuery();
      });
    });
  };

  handleReset = () => {
    const { dispatch } = this.props;
    this.props.form.resetFields();
    let params = {
      authStatus: '0',
      doctorName: '',
      hospitalName: '',
      status: '0',
    };
    dispatch({
      type: 'doctorAdm/queryFormChange',
      payload: { ...params },
    }).then(() => {
      this.handleQuery();
    });
  };

  handleQuery = () => {
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
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { queryForm } = this.props.doctorAdm;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 18 },
      },
    };

    return (
      <Form className={styles.searchform} onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="医生姓名">
              {getFieldDecorator('doctorName', {
                initialValue: queryForm.doctorName,
              })(<Input placeholder="医生姓名" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="所属医院">
              {getFieldDecorator('hospitalName', {
                initialValue: queryForm.hospitalName,
              })(<Input placeholder="医院名称" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="审核状态">
              {getFieldDecorator('authStatus', {
                initialValue: queryForm.authStatus,
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">待审核</Option>
                  <Option value="2">审核驳回</Option>
                  <Option value="3">审核通过</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="服务状态">
              {getFieldDecorator('status', {
                initialValue: queryForm.status,
              })(
                <Select>
                  <Option value="0">全部</Option>
                  <Option value="1">服务中</Option>
                  <Option value="2">暂停</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8} offset={16} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(QueryForm);
