import React, { Component } from 'react';
import { Upload, message, Icon, Modal, Radio, Card } from 'antd';
import config from '../../../../config';
import { getCookie } from 'Utils/publicFunc';
import './UploadPhoto.less';

class UploadPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      previewImage: '',
      fileList: [],
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.onChangeRadioSelect = this.onChangeRadioSelect.bind(this);
  }
  handleChange(info) {
    let { file, fileList } = info;
    if (file.status == 'error') {
      Modal.error({
        centered: true,
        title: '上传失败',
        content: file.response.message,
      });
      return;
    }
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.downloadPath;
      }
      return file;
    });
    fileList = fileList.filter(file => {
      return file.status === 'done';
    });
    this.setState(
      {
        fileList: [...fileList],
      },
      () => {
        if (file.status == 'done') {
          message.success('上传成功');
          const { businessType } = this.props;
          file.response.businessType = businessType;
          file.response.code = null;
          file.response.extraCode = 'N';
          if (this.props.addAttachment) {
            window.console.log('调用');
            this.props.addAttachment(file.response);
          }
        }
      },
    );
  }
  handleRemove(file) {
    if (this.props.removeAttachment) {
      this.props.removeAttachment(file.response);
    }
  }
  handleCancel() {
    this.setState({
      showModal: false,
    });
  }
  handlePreview(url) {
    this.setState({
      previewImage: url,
      showModal: true,
    });
  }

  beforeUpload(file) {
    const { fileSize = 200 * 1024 } = this.props;
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG && !isPNG) {
      file.status = 'error';
      message.error('只能上传格式jpg或png的图片');
      return false;
    }
    if (file.size > fileSize) {
      file.status = 'error';
      message.error(`图片大小不能大于${parseInt(fileSize / 1024)}kb`);
      return false;
    }
  }

  onChangeRadioSelect(e) {
    this.setState({ value: e.target.value }, () => {
      if (this.props.callToMainImg) {
        e.target.info.response.extraCode = 'Y';
        this.props.callToMainImg(e.target.info.response);
      }
    });
  }

  render() {
    const { showModal, previewImage } = this.state;
    let { fileType, defaultFileList, preview } = this.props;
    window.console.log(defaultFileList);
    let extraFlag = null;
    if (defaultFileList && defaultFileList.length > 0) {
      extraFlag = defaultFileList.find(item => item.extraCode == 'Y');
      extraFlag = extraFlag ? extraFlag.uid : null;
    }
    const uploadProps = {
      action: `${config.server}/attachment/uploadCompressPicture/${fileType}?width=500&height=500`,
      onChange: this.handleChange,
      onPreview: this.handlePreview,
      onRemove: this.handleRemove,
      beforeUpload: this.beforeUpload,
      listType: 'picture-card',
      headers: {
        Authorization: `bearer ${getCookie('token')}`,
      },
      defaultFileList: null,
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="">{'上传图片'}</div>
      </div>
    );
    return (
      <div className={'uploadPhoto'}>
        <span style={{ display: defaultFileList.length > 0 ? 'inline-block' : 'none' }}>
          {'设为主图'}
        </span>
        <Radio.Group
          onChange={this.onChangeRadioSelect}
          style={{ display: defaultFileList.length === 0 ? 'none' : 'inline-block' }}
          value={extraFlag}
        >
          {defaultFileList.map(item => {
            return (
              <div key={item.uid} style={{ display: 'inline-block', marginRight: '5px' }}>
                <Card bodyStyle={{ padding: '5px' }}>
                  <Icon
                    className="del-picture"
                    onClick={this.handleRemove.bind(this, item)}
                    style={{ display: preview ? 'none' : 'block' }}
                    type="close"
                  />
                  <img
                    alt="图片"
                    onClick={this.handlePreview.bind(this, item.url)}
                    src={item.url}
                    style={{ width: '80px', height: '80px' }}
                  />
                </Card>
                <Radio disabled={preview} info={item} value={item.uid} />
              </div>
            );
          })}
        </Radio.Group>
        <Upload {...uploadProps}>{preview ? '' : uploadButton}</Upload>
        <Modal footer={null} onCancel={this.handleCancel} visible={showModal}>
          <img alt="" src={previewImage} style={{ width: '100%' }} />
        </Modal>
      </div>
    );
  }
}

export default UploadPhoto;
