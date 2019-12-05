import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Cascader } from 'antd';
import React, { Component } from 'react';
import styles from './QueryForm.less';
import { newArea } from '../../../utils/area.js';
import router from 'umi/router';

const { RangePicker } = DatePicker;
const { Option } = Select;
const options = newArea();

class QueryForm extends Component {
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleInsert = () => {
    // 新增
    console.log('新增跳转');
    router.push('enter/particulars');
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
                rules: [],
              })(<RangePicker />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="企业状态">
              {getFieldDecorator('status', {
                rules: [],
              })(
                <Select>
                  <Option value="1">全部</Option>
                  <Option value="2">禁售</Option>
                  <Option value="3">启售</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="所属渠道">
              {getFieldDecorator('channel', {
                rules: [],
              })(
                <Select>
                  <Option value="1">全部</Option>
                  <Option value="2">张三</Option>
                  <Option value="3">李四</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="地区">
              {getFieldDecorator('area', {
                rules: [],
              })(<Cascader options={options} changeOnSelect placeholder="省市区" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="企业名称">
              {getFieldDecorator('name', {
                rules: [],
              })(<Input placeholder="企业名称" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="管理员">
              {getFieldDecorator('admin', {
                rules: [],
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
