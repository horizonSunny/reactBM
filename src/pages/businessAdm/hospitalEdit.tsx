import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './businessEdit.less';
import { newArea } from '../../utils/area.js';
import { Form, Select, Input, Cascader, Radio, Button, Upload, Icon, Modal, message } from 'antd';
const { TextArea } = Input;
const options = newArea();
import { serverUrl } from '@/utils/request';
import { thisExpression } from '@babel/types';
import { getHospitalDetails } from '@/services/businessAdm';
import routerParams from '@/utils/routerParams';

const { Search } = Input;
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
      // storeLiveFileList: tempStoreLive || [],
      // qualificationFileList: tempQualification || [],
      hospitalInfo: {
        name: '', // 机构名称
        province: '',
        city: '',
        area: '',
        address: '', // 详细地址
        doctorName: '', // 管理员姓名
        certNo: '', // 管理员身份证
        phone: '', // 管理员手机号
        hospitalDesc: '', // 概况
        qualifiImgs: [], // 医院资质图片
        picImg: '', // 医院门头照片
      },
    };
  }
  componentDidMount() {
    const params = routerParams(location.search);
    params.id &&
      getHospitalDetails({
        hospitalId: params.id,
      }).then(res => {
        if (res && res.code == 1) {
          this.setState({
            hospitalInfo: res.data,
          });
          console.log('res.data_', res.data);
        }
      });
  }
  // 保存上传
  handleSave = () => {
    console.log('all_', this.state.hospitalInfo);

    const {
      dispatch,
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      debugger;
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
  handleBack = () => {
    router.push('/businessAdm/hospitalAdm');
  };
  // 关闭弹窗
  handleCancel = () => this.setState({ previewVisible: false });

  // handleQualificationChange = ({ fileList }) => this.setState({ qualificationFileList: fileList });

  handleStoreLiveChange = ({ fileList }) => {
    console.log('handleStoreLiveChange_', fileList);
    let data = Object.assign({}, this.state.hospitalInfo, {
      qualifiImgs: fileList,
    });
    this.setState({ hospitalInfo: data });
  };
  // 查看已经上传的图片
  handlePreview = async file => {
    this.setState({
      previewImage: file.thumbUrl || file.url,
      previewVisible: true,
    });
  };

  picImgChange = info => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 1) {
        let data = Object.assign({}, this.state.hospitalInfo, {
          picImg: info.file.response.data,
        });
        this.setState(
          {
            hospitalInfo: data,
          },
          () => {
            console.log('hospitalInfo_', this.state.hospitalInfo);
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
    const { hospitalInfo, previewVisible, previewImage } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <div className={`${styles.content}`}>
            <Form {...formItemLayout}>
              <Form.Item label="机构名称">
                {getFieldDecorator('name', {
                  initialValue: hospitalInfo['name'],
                  rules: [{ required: true, message: '请输入机构名称!', type: 'string' }],
                })(<Input maxLength={20} placeholder="请输入机构名称" />)}
              </Form.Item>
              <Form.Item label="所在城市">
                {getFieldDecorator('areaData', {
                  initialValue: [
                    hospitalInfo['province'],
                    hospitalInfo['city'],
                    hospitalInfo['area'],
                  ],
                  rules: [{ required: true, message: '请选择城市所在' }],
                })(<Cascader options={options} changeOnSelect placeholder="省市区" />)}
              </Form.Item>
              <Form.Item label="详细地址">
                {getFieldDecorator('address', {
                  initialValue: hospitalInfo['address'],
                  rules: [{ required: true, message: '请输入详细地址!', type: 'string' }],
                })(<Input maxLength={20} placeholder="请输入详细地址" />)}
              </Form.Item>
              <Form.Item label="管理员姓名">
                {getFieldDecorator('doctorName', {
                  initialValue: hospitalInfo['doctorName'],
                  rules: [{ required: true, message: '请输入管理员姓名!', type: 'string' }],
                })(<Input maxLength={20} placeholder="请输入管理员姓名" />)}
              </Form.Item>
              <Form.Item label="身份证">
                {getFieldDecorator('certNo', {
                  initialValue: hospitalInfo['certNo'],
                  rules: [
                    { required: true, message: '请输入身份证!', type: 'string' },
                    {
                      pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                      message: '身份证格式错误！',
                    },
                  ],
                })(<Input maxLength={18} placeholder="请输入身份证" />)}
              </Form.Item>

              <Form.Item label="手机号">
                {getFieldDecorator('phone', {
                  initialValue: hospitalInfo['phone'],
                  rules: [
                    { required: true, message: '请输入手机号!', type: 'string' },
                    {
                      pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/,
                      message: '手机号格式错误！',
                    },
                  ],
                })(<Input maxLength={11} placeholder="请输入手机号" />)}
              </Form.Item>
              <Form.Item label="医院概况">
                {getFieldDecorator('hospitalDesc', {
                  initialValue: hospitalInfo['hospitalDesc'],
                  rules: [{ required: true, message: '请输入医院概况信息!', type: 'string' }],
                })(<TextArea maxLength={200} placeholder="请输入医院概况信息" />)}
              </Form.Item>
              <Form.Item label="医院门头照片" extra="支持PNG,JPG,JPEG,大小控制在100kb内">
                {getFieldDecorator('picImg', {
                  valuePropName: 'picImg',
                  initialValue: hospitalInfo['picImg'],
                })(
                  <Upload
                    name="file"
                    action={this.state.uploadUrl}
                    accept=".png,.jpg,.jpeg"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.picImgChange}
                    headers={headers}
                    data={{ type: 'hospital' }}
                  >
                    {hospitalInfo['picImg'] ? (
                      <img src={hospitalInfo['picImg']} alt="avatar" style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>,
                )}
              </Form.Item>
              <Form.Item
                label="医疗机构许可证／营业执照"
                extra="支持PNG,JPG,JPEG,大小控制在300kb内,最多上传5张"
              >
                {getFieldDecorator('qualifiImgs', {
                  valuePropName: 'fileList',
                  initialValue: hospitalInfo['qualifiImgs'],
                })(
                  <Fragment>
                    <Upload
                      action={this.state.uploadUrl}
                      listType="picture-card"
                      fileList={hospitalInfo['qualifiImgs']}
                      onPreview={this.handlePreview}
                      onChange={this.handleStoreLiveChange}
                      accept=".png,.jpg,.jpeg"
                      data={{ type: 'hospital' }}
                      headers={headers}
                    >
                      {hospitalInfo['qualifiImgs'].length >= 5 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </Fragment>,
                )}
              </Form.Item>
            </Form>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
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

export default Form.create()(HospitalEdit);
