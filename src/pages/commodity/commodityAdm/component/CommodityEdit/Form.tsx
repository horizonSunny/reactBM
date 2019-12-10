import { Form, Input, Select, Radio, Button } from 'antd';
import React from 'react';
import styles from './Form.less';
import LabelInfo from '../../../../../components/Label/label';
import CommodityImg from './CommodityImg';
// 引入富文本编辑器
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const { Option } = Select;
const isMapClass = {
  width: '40px',
  borderRadius: '15px',
  height: '20px',
  lineHeight: '20px',
  fontSize: '10px',
};
class EditForm extends React.Component {
  state = {
    editorState: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.content.toRAW());
        // console.log('Received values of form: ', values.content.toHTML());
      }
    });
  };
  onChange = e => {};
  //编辑器

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    const result = await saveEditorContent(htmlContent);
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const pictureList = [];
    const { editorState } = this.state;
    // 不在控制栏显示的控件
    const excludeControls = ['media', 'emoji'];
    return (
      <Form className={styles['main']} {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* <Form.Item label="商品图">
          {getFieldDecorator('productImage', {
            rules: [
              {
                required: true,
                message: '请选择上传商品图片',
                initialValue: pictureList,
              },
            ],
          })(<CommodityImg />)}
        </Form.Item>
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
        </Form.Item>*/}
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
              value={editorState}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
              excludeControls={excludeControls}
            />,
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'edit' })(EditForm);

export default WrappedEditForm;
