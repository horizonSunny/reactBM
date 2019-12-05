import { Form, Input, Select, Radio, AutoComplete } from 'antd';
import React from 'react';
import styles from './Form.less';
import LabelInfo from '../../../../../components/Label/label';
// 引入富文本编辑器
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const isMapClass = {
  width: '40px',
  borderRadius: '15px',
  height: '20px',
  lineHeight: '20px',
  fontSize: '10px',
};
class EditForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    value: '123',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };
  onChange = e => {};
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form className={styles['main']} {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="通用名">
          {getFieldDecorator('productName', {
            rules: [
              {
                required: true,
                message: '请填写你的商品名称',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="商品类别">
          {getFieldDecorator('productType', {
            rules: [
              {
                required: true,
                message: '请选择商品类别',
              },
            ],
          })(
            <Select style={{ width: 150 }}>
              <Option value={1}>中西药品</Option>
              <Option value={2}>养生保健</Option>
              <Option value={3}>医疗器械</Option>
              <Option value={4}>计生用品</Option>
              <Option value={5}>中药饮品</Option>
              <Option value={6}>美容护肤</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="是否处方药">
          {getFieldDecorator('isMp', {
            rules: [
              {
                required: true,
                message: '请确认药品类别',
              },
            ],
          })(
            <Radio.Group onChange={this.onChange} value={this.state.value}>
              <Radio value={1}>
                <LabelInfo
                  text="otc"
                  classInfo={Object.assign(
                    {
                      border: '1px solid green',
                      color: 'green',
                    },
                    isMapClass,
                  )}
                ></LabelInfo>
              </Radio>
              <Radio value={2}>
                <LabelInfo
                  text="otc"
                  classInfo={Object.assign(
                    {
                      border: '1px solid red',
                      color: 'red',
                    },
                    isMapClass,
                  )}
                ></LabelInfo>
              </Radio>
              <Radio value={3}>
                <LabelInfo
                  text="Rx"
                  classInfo={Object.assign(
                    {
                      border: '1px solid red',
                      color: 'red',
                    },
                    isMapClass,
                  )}
                ></LabelInfo>
              </Radio>
              <Radio value={4}>
                <LabelInfo
                  text="其他"
                  classInfo={Object.assign(
                    {
                      border: '1px solid rgb(136,136,136)',
                      color: 'rgb(136,136,136)',
                    },
                    isMapClass,
                  )}
                ></LabelInfo>
              </Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="商品品牌">
          {getFieldDecorator('productBrand', {
            rules: [
              {
                required: true,
                message: '请填写你的商品品牌',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="商品简介">
          {getFieldDecorator('productDesc', {
            rules: [
              {
                required: true,
                message: '请填写你的商品简介',
              },
            ],
          })(<Input.TextArea />)}
        </Form.Item>
        <Form.Item label="批准文号">
          {getFieldDecorator('approvalNumber', {
            rules: [
              {
                required: true,
                message: '请填写你的批准文号',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="产品规格">
          {getFieldDecorator('productSpecif', {
            rules: [
              {
                required: true,
                message: '请填写你的产品规格',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="剂型/型号">
          {getFieldDecorator('productModel', {
            rules: [
              {
                required: true,
                message: '请填写你的剂型/型号',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="英文名">
          <Input />
        </Form.Item>
        <Form.Item label="汉语拼音">
          <Input />
        </Form.Item>
        <Form.Item label="产品有效期">
          {getFieldDecorator('productExpire', {
            rules: [
              {
                required: true,
                message: '请填写你的产品有效期',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="生产企业">
          {getFieldDecorator('manufacturer', {
            rules: [
              {
                required: true,
                message: '请填写你的生产企业',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="说明书">
          {getFieldDecorator('content', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容');
                  } else {
                    callback();
                  }
                },
              },
            ],
            initialValue: BraftEditor.createEditorState(''),
          })(
            <BraftEditor
              style={{ border: '1px solid #d1d1d1', borderRadius: 5 }}
              placeholder="请输入正文内容"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'edit' })(EditForm);

export default WrappedEditForm;
