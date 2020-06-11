import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Cascader } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './QueryForm.less';
import { newArea } from '../../../utils/area.js';
import router from 'umi/router';

const { RangePicker } = DatePicker;
const { Option } = Select;
const options = newArea();

@connect(({ businessAdm }) => ({
  businessAdm: businessAdm,
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
    this.initChannel();
  }
  initChannel = () => {
    console.log('???');
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAdm/initChannel',
    });
  };
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
        adminName: values.adminName,
        endTime: endTime,
        startTime: startTime,
        status: values.status,
        channel: values.channel,
        tenantName: values.tenantName,
        province: values.province || [],
      };
      console.log('查询参数: ', params);
      // 查询列表
      dispatch({
        type: 'businessAdm/queryFormChange',
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
      adminName: '',
      endTime: '',
      startTime: '',
      status: '',
      channel: '',
      tenantName: '',
    };
    dispatch({
      type: 'businessAdm/queryFormChange',
      payload: { ...params },
    }).then(() => {
      this.handleQuery();
    });
  };

  handleQuery = () => {
    const { dispatch } = this.props;
    const { queryForm, pagination } = this.props.businessAdm;
    let params = {
      ...queryForm,
      ...pagination,
    };
    // 查询列表
    dispatch({
      type: 'businessAdm/queryList',
      payload: { ...params },
    });
  };
  handleInsert = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'businessAdm/currentRecord',
      payload: {},
    }).then(() => {
      router.push('/businessAdm/enter/edit');
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { queryForm, channel } = this.props.businessAdm;

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
            <Form.Item {...formItemLayout} label="入住时间">
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
            <Form.Item {...formItemLayout} label="企业状态">
              {getFieldDecorator('status', {
                initialValue: queryForm.status,
              })(
                <Select>
                  <Option value="">全部</Option>
                  <Option value="1">启售</Option>
                  <Option value="0">禁售</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="所属渠道">
              {getFieldDecorator('channel', {
                initialValue: queryForm.channel,
              })(
                <Select>
                  <Option value="">全部</Option>
                  {channel.map((item, index) => {
                    return (
                      <Option value={item} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="地区">
              {getFieldDecorator('province', {
                initialValue: queryForm.province,
              })(<Cascader options={options} changeOnSelect placeholder="省市区" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="企业名称">
              {getFieldDecorator('tenantName', {
                initialValue: queryForm.tenantName,
              })(<Input placeholder="企业名称" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="管理员">
              {getFieldDecorator('adminName', {
                initialValue: queryForm.adminName,
              })(<Input placeholder="管理员" />)}
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
            <Button
              type="danger"
              icon="plus"
              style={{ marginLeft: 16 }}
              onClick={this.handleInsert}
            >
              添加
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(QueryForm);
