import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';
import { Form, Input, Button, Upload, Icon, Modal, message, Radio } from 'antd';
import { serverUrl } from '@/utils/request';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

@connect(({ hospitalAdm }) => ({
  hospitalAdm: hospitalAdm,
}))
class HospitalEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadUrl: serverUrl + '/admin/v1/uploadFileWeb',
      previewVisible: false,
      previewImage: '',
      editorState: null,
      contentEdit: {
        title: '', // 文章标题
        picImg: '', // 文章封面
        videoList: [], // 上传视频集合
        contentWrap: '', // 文章内容
        type: 'doctor',
      },
    };
  }
  componentDidMount() {}
  // 保存上传
  handleSave = () => {
    console.log('all_', this.state.contentEdit.contentWrap.toHTML());

    const {
      dispatch,
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        //   let params = {
        //     ...values,
        //     tenantLogo: this.state.logoUrl,
        //     adminCard: this.state.adminUrl,
        //     enterpriseQualification: this.state.qualificationFileList,
        //     storeLive: this.state.storeLiveFileList,
        //   };
        //   dispatch({
        //     type: 'hospitalAdm/saveBusiness',
        //     payload: params,
        //   }).then(
        //     data => {
        //       if (data.code === 1) {
        //         message.success('保存成功!');
        //       } else {
        //         message.info(data.msg);
        //       }
        //     },
        //     () => {
        //       message.error('网络连接失败,请稍后再试!');
        //     },
        //   );
      }
    });
  };
  // 返回
  // handleBack = () => {
  //   router.push('/businessAdm/hospitalAdm');
  // };
  // 关闭弹窗
  handleCancel = () => this.setState({ previewVisible: false });

  // handleQualificationChange = ({ fileList }) => this.setState({ qualificationFileList: fileList });

  handleVideoLiveChange = ({ fileList }) => {
    let data = Object.assign({}, this.state.contentEdit, {
      videoList: fileList,
    });
    this.setState({ contentEdit: data }, () => {
      console.log('handleVideoLiveChange_', this.state.contentEdit);
    });
  };

  picImgChange = info => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 1) {
        let data = Object.assign({}, this.state.contentEdit, {
          picImg: info.file.response.data,
        });
        this.setState(
          {
            contentEdit: data,
          },
          () => {
            console.log('contentEdit_', this.state.contentEdit);
          },
        );
      }
    }
  };
  // 上传前检测图片格式是否符合
  beforeUpload = file => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('请上传指定格式的图片');
    }
    const isLt2M = file.size / 1024 < 300;
    if (!isLt2M) {
      message.error('请注意上传文件大小');
    }
    return isJpgOrPng && isLt2M;
  };
  handleEditorChange = editorState => {
    // this.setState({ editorState });
    let data = Object.assign({}, this.state.contentEdit, {
      contentWrap: editorState,
    });
    this.setState({ contentEdit: data }, () => {
      console.log('handleVideoLiveChange_', this.state.contentEdit);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { hospitalAdm } = this.props;
    const headers = {
      Authorization: sessionStorage.getItem('token'),
    };
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
    const { contentEdit } = this.state;
    const excludeControls = ['emoji'];
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Form {...formItemLayout} className={styles['main']}>
              <Form.Item label="title">
                {getFieldDecorator('title', {
                  initialValue: contentEdit['title'],
                  rules: [{ required: true, message: '请输入文章标题!', type: 'string' }],
                })(<Input maxLength={20} placeholder="请输入文章标题" />)}
              </Form.Item>
              <Form.Item label="app类型">
                {getFieldDecorator('type', {
                  initialValue: contentEdit['type'],
                  rules: [{ required: true, message: '请选择app类型!', type: 'string' }],
                })(
                  <Radio.Group size="large">
                    <Radio value="doctor">医生端</Radio>
                    <Radio value="patient">患者端</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              <Form.Item label="请输入文章封面" extra="支持PNG,JPG,JPEG,大小控制在100kb内">
                {getFieldDecorator('picImg', {
                  valuePropName: 'picImg',
                  initialValue: contentEdit['picImg'],
                  // rules: [{ required: true, message: '请选择文章封面!', type: 'string' }],
                })(
                  <Upload
                    name="file"
                    action={this.state.uploadUrl}
                    listType="picture-card"
                    showUploadList={false}
                    // beforeUpload={this.beforeUpload}
                    onChange={this.picImgChange}
                    headers={headers}
                    data={{ type: 'hospital' }}
                  >
                    {contentEdit['picImg'] ? (
                      <img src={contentEdit['picImg']} alt="avatar" style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>,
                )}
              </Form.Item>
              <Form.Item label="文章内部视频">
                {getFieldDecorator('contentVideo', {
                  valuePropName: 'fileList',
                  initialValue: contentEdit['contentVideo'],
                })(
                  <Fragment>
                    <Upload
                      action={this.state.uploadUrl}
                      onChange={this.handleVideoLiveChange}
                      accept=".mp4"
                      data={{ type: 'hospital' }}
                      headers={headers}
                    >
                      {/* {contentEdit['contentVideo'].length >= 5 ? null : uploadButton} */}
                      <Button>上传视频</Button>
                    </Upload>
                    {/* {this.state.contentEdit.videoList &&
                      this.state.contentEdit.videoList.length > 0 && ( */}
                    {this.state.contentEdit.videoList.map(item => {
                      return (
                        <div
                        // style={{
                        //   height: '25px',
                        //   lineHeight: '25px',
                        // }}
                        >
                          视频链接：
                          <a href="javascript:void(0);">
                            {item && item.response && item.response.data}
                          </a>
                        </div>
                      );
                    })}
                    {/* )} */}
                  </Fragment>,
                )}
              </Form.Item>
              <Form.Item label="文章内容">
                {getFieldDecorator('contentWrap', {
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
                  initialValue: BraftEditor.createEditorState(contentEdit['contentWrap']),
                })(
                  <BraftEditor
                    style={{ border: '1px solid #d1d1d1', borderRadius: 5 }}
                    placeholder="请输入正文内容"
                    value={contentEdit['contentWrap']}
                    onChange={this.handleEditorChange}
                    excludeControls={excludeControls}
                  />,
                )}
              </Form.Item>
            </Form>
          </div>
          <div className={`${styles.operation}`}>
            <Button type="primary" onClick={this.handleSave}>
              保存
            </Button>
            {/* <Button icon="left" className={`${styles.back}`} onClick={this.handleBack}>
              返回
            </Button> */}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(HospitalEdit);
