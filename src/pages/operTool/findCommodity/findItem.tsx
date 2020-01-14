import React from 'react';
import { Tag, Form, Input, Upload, Icon, message, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './findItem.less';
import { connect } from 'dva';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
// tags
function Tags(props) {
  return props.tags.map(item => {
    return (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          props.handleClose(item);
        }}
      >
        {item['cateName'] +
          (item['cateName1'] ? '/' + item['cateName1'] : '') +
          (item['cateName2'] ? '/' + item['cateName2'] : '')}
      </Tag>
    );
  });
}
@connect(({ operTool }) => ({
  operTool,
}))
class FindItem extends React.Component {
  state = {
    loading: false,
    tags: this.props.operTool.categoryItem['categorys'],
    imageUrl: this.props.operTool.categoryItem['image'],
  };
  // 上传图片变化
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  //  关闭标签
  handleClose(tag) {
    console.log('tag_', this.state.tags);
    const newTags = this.state.tags.filter(item => {
      return tag['quickCategoryRelationId'] !== item['quickCategoryRelationId'];
    });
    this.setState({
      tags: newTags,
    });
  }
  render() {
    // 上传图片
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    // form表单
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const { tags } = this.state;
    return (
      <PageHeaderWrapper className={styles['main']}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="分类Icon">
            {getFieldDecorator('img', {
              rules: [
                {
                  required: true,
                  message: '请选择分类图片!',
                },
              ],
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="分类名称">
            {getFieldDecorator('cateName', {
              initialValue: this.props.operTool.categoryItem['quickCategoryName'],
              rules: [
                {
                  required: true,
                  message: '请填写分类名称!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="关联商品分类">
            {getFieldDecorator('cateClassify', {
              initialValue: this.props.operTool.categoryItem['quickCategoryName'],
              rules: [
                {
                  required: true,
                  message: '请选择关联商品分类!',
                },
              ],
            })(<Tags tags={tags} handleClose={this.handleClose.bind(this)}></Tags>)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    );
  }
}
const WrappedEditForm = Form.create({ name: 'findItem' })(FindItem);

export default WrappedEditForm;
