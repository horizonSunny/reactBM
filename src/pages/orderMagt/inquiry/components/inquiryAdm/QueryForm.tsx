import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Cascader } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './QueryForm.less';
import { newArea } from '@/utils/area.js';
import router from 'umi/router';
import { query } from '@/services/user';

const { RangePicker } = DatePicker;
const { Option } = Select;
const options = newArea();

@connect(({ inquiry }) => ({
  inquiry: inquiry,
}))
class QueryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 0,
        pageSize: 10,
      },
    };
  }
  componentDidMount() {
    // this.initChannel();
  }
  // initChannel = () => {
  //   console.log('???');
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'inquiry/initChannel',
  //   });
  // };
  handleSearch = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      let startTime = '';
      let endTime = '';
      console.log('values.time:', values.time);
      if (values.time && values.time.length > 0) {
        startTime = new Date(values.time[0]).getTime();
        endTime = new Date(values.time[1]).getTime();
      }
      let params = {
        medicineName: values.medicineName,
        endTime: endTime,
        startTime: startTime,
        type: values.type,
        orderNo: values.orderNo,
        doctorName: values.doctorName,
      };
      console.log('查询参数: ', params);
      // 查询列表
      dispatch({
        type: 'inquiry/queryFormChange',
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
      endTime: '',
      startTime: '',
      doctorName: '',
      medicineName: '',
      type: 0,
      orderNo: '',
    };
    dispatch({
      type: 'inquiry/queryFormChange',
      payload: { ...params },
    });
    // .then(() => {
    //   this.handleQuery();
    // });
  };

  handleQuery = () => {
    const { dispatch } = this.props;
    const _this = this;
    async function query() {
      const { queryForm } = _this.props.inquiry;
      let params = {
        ...queryForm,
        pageNumber: 0,
        pageSize: 10,
      };
      // 查询列表
      dispatch({
        type: 'inquiry/queryList',
        payload: { ...params },
      });
    }
    query();
  };
  // handleInsert = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'inquiry/currentRecord',
  //     payload: {},
  //   }).then(() => {
  //     router.push('/inquiry/enter/edit');
  //   });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { queryForm, channel } = this.props.inquiry;

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
            <Form.Item {...formItemLayout} label="创建时间">
              {getFieldDecorator('time', {
                // initialValue: [queryForm.startTime,queryForm.endTime]
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: '100%' }}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="订单号">
              {getFieldDecorator('orderNo', {
                initialValue: queryForm.orderNo,
              })(<Input placeholder="输入订单号" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="订单状态">
              {getFieldDecorator('type', {
                initialValue: queryForm.type,
              })(
                <Select>
                  <Option value={0}>全部</Option>
                  <Option value={1}>待接诊</Option>
                  <Option value={2}>进行中</Option>
                  <Option value={3}>待评价</Option>
                  <Option value={4}>已取消</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="医生姓名">
              {getFieldDecorator('doctorName', {
                initialValue: queryForm.doctorName,
              })(<Input placeholder="医生姓名" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="患者姓名">
              {getFieldDecorator('medicineName', {
                initialValue: queryForm.medicineName,
              })(<Input placeholder="患者姓名" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
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
