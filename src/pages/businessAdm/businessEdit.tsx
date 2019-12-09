import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import styles from './businessEdit.less';
import { newArea } from '../../utils/area.js';
import { Form, Select, Input, Cascader, Radio, Button, Upload, Icon, Modal } from 'antd';
const { Option } = Select;
const options = newArea();

class BusinessEdit extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  handleSave = () => {
    // router.push('/businessAdm/enter/edit');
  };
  handleBack = () => {
    router.push('/businessAdm/enter');
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Form {...formItemLayout}>
              <Form.Item label="企业logo" extra="支持PNG,JPG,JPEG,大小控制在100kb内">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                })(
                  <Upload name="logo" accept=".png,.jpg,.jpeg" listType="picture-card">
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">点击上传</div>
                    </div>
                  </Upload>,
                )}
              </Form.Item>
              <Form.Item label="企业名称">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
              <Form.Item label="企业类型">
                <Radio.Group defaultValue="a" size="large">
                  <Radio.Button value="a">单体药店</Radio.Button>
                  <Radio.Button value="b">连锁药店</Radio.Button>
                  <Radio.Button value="c">批发企业</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="统一社会信用代码">
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
              <Form.Item label="店铺所在地">
                {getFieldDecorator('area', {
                  rules: [],
                })(<Cascader options={options} changeOnSelect placeholder="省市区" />)}
              </Form.Item>
              <Form.Item label="店铺详细地址">
                <Input placeholder="请输入店铺详细地址" />
              </Form.Item>
              <Form.Item label="法定代表人(负责人)姓名">
                <Input placeholder="请输入法人姓名" />
              </Form.Item>
              <Form.Item label="管理员姓名">
                <Input placeholder="请输入管理员姓名" />
              </Form.Item>
              <Form.Item label="管理员手机号">
                <Input placeholder="请输入管理员手机号" />
              </Form.Item>
              <Form.Item label="管理员手持身份证照片" extra="支持PNG,JPG,JPEG,大小控制在300kb内">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                })(
                  <Upload
                    name="logo"
                    accept=".png,.jpg,.jpeg"
                    action="/upload.do"
                    listType="picture-card"
                  >
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">点击上传</div>
                    </div>
                  </Upload>,
                )}
              </Form.Item>
              <Form.Item label="用户名">
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item label="密码">
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item label="企业资质" extra="支持PNG,JPG,JPEG,大小控制在300kb内">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  accept=".png,.jpg,.jpeg"
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
              <Form.Item label="店铺实景" extra="支持PNG,JPG,JPEG,大小控制在300kb内">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  accept=".png,.jpg,.jpeg"
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
            </Form>
          </div>
          <div className={`${styles.operation}`}>
            <Button type="primary" onClick={this.handleSave}>
              保存
            </Button>
            <Button icon="left" className={`${styles.back}`} onClick={this.handleBack}>
              返回
            </Button>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(BusinessEdit);
