import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd';
import React from 'react';
import styles from './SearchForm.less';
import router from 'umi/router';

const { RangePicker } = DatePicker;
const { Option } = Select;

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    sellingStatus: null,
  };
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log('fieldsValue_', fieldsValue);
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    console.log('reset');
    this.props.form.resetFields();
  };
  // 售卖状态
  handleSellingChange = value => {
    console.log('handleSellingChange_', value);
  };
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  // 新增产品
  handleNew = () => {
    router.push('/commodityAdm/management/edit');
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', message: 'Please select time!' }],
    };
    return (
      <Form className={styles['ant-advanced-search-form']} onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={10} style={{}}>
            <Form.Item label="创建时间">
              {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
            </Form.Item>
          </Col>
          <Col span={6} style={{}}>
            <Form.Item label="售卖状态">
              {getFieldDecorator('sellStatus', {
                rules: [],
                initialValue: 'all',
              })(
                <Select style={{ width: 120 }} onChange={this.handleSellingChange}>
                  <Option value="all">全部</Option>
                  <Option value="sell">上架</Option>
                  <Option value="soldOut">下架</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={6} style={{}}>
            <Form.Item label="类别">
              {getFieldDecorator('status', {
                rules: [],
                initialValue: '1',
              })(
                <Select style={{ width: 120 }} onChange={this.handleSelectChange}>
                  <Option value="1">全部</Option>
                  <Option value="2">中西药品</Option>
                  <Option value="3">养生保健</Option>
                  <Option value="4">医疗器械</Option>
                  <Option value="5">计生用品</Option>
                  <Option value="6">中药饮品</Option>
                  <Option value="7">美容护肤</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8} style={{}}>
            <Form.Item label="关键字">
              {getFieldDecorator('keyword', {
                rules: [],
              })(<Input placeholder="关键字输入" />)}
            </Form.Item>
          </Col>
          <Col span={8} style={{}}>
            <Form.Item label="批准文号">
              {getFieldDecorator('approvalNumber', {
                rules: [],
              })(<Input placeholder="批准文号输入" />)}
            </Form.Item>
          </Col>
          <Col
            span={8}
            style={{ textAlign: 'right', position: 'relative', top: '15px', left: '-20px' }}
          >
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleNew}>
              新增
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;
