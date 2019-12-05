import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd';
import React from 'react';
import styles from './SearchForm.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };
  // 售卖状态
  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
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
              <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleSelectChange}>
                <Option value="all">全部</Option>
                <Option value="sell">上架</Option>
                <Option value="soldOut">下架</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} style={{}}>
            <Form.Item label="类别">
              <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleSelectChange}>
                <Option value="1">全部</Option>
                <Option value="2">中西药品</Option>
                <Option value="3">养生保健</Option>
                <Option value="4">医疗器械</Option>
                <Option value="5">计生用品</Option>
                <Option value="6">计生用品</Option>
                <Option value="7">中药饮品</Option>
                <Option value="8">美容护肤</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8} style={{}}>
            <Form.Item label="关键字">
              <Input placeholder="关键字输入" />
            </Form.Item>
          </Col>
          <Col span={8} style={{}}>
            <Form.Item label="批准文号">
              <Input placeholder="批准文号输入" />
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
            {/* <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
            </a> */}
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;
