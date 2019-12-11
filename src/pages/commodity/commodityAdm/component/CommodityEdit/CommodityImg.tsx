import { Upload, Icon, Modal } from 'antd';
import React from 'react';
import styles from './CommodityImg.less';
import { connect } from 'dva';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@connect(({ commodity }) => ({ commodity }))
class PicturesWall extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillReceiveProps() {
    const imgArr = this.props.commodity.productWithId.productImage;
    const arr = imgArr.map((item, index) => {
      const newObj = new Object();
      newObj.url = item;
      newObj.uid = index;
      return newObj;
    });
    this.setState({
      fileList: arr,
    });
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  // 获取fileList
  getImgList = () => {
    return this.state.fileList;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList, file, event }) => {
    console.log('file_', file);
    console.log('fileList_', fileList);
    this.setState({ fileList });
    // this.props.onChange(fileList);
  };
  // 将传入数组元素位置调换为首,黑科技
  swapArr(itemIndex) {
    let temp = this.state.fileList[0];
    this.state.fileList[0] = this.state.fileList[itemIndex];
    this.state.fileList[itemIndex] = temp;
    console.log('this.state.fileList_', this.state.fileList);
    this.setState({
      fileList: this.state.fileList,
    });
  }
  // 删除图片
  deleteImg(itemIndex) {
    this.state.fileList.splice(itemIndex, 1);
    this.setState({
      fileList: this.state.fileList,
    });
  }

  // 修改上传

  getPdfURL = () => {
    const _this = this;
    const props = {
      name: 'file',
      action: 'http://47.103.158.133/admin/v1/uploadFile',
      headers: {
        authorization: 'bearer ' + sessionStorage.getItem('token'),
      },
    };
    return props;
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={styles.main}>
        <span className={styles.imgPosition}>
          {fileList.map((item, index) => (
            <span className={styles.imageShade}>
              <Icon
                type="close-circle"
                theme="filled"
                className={styles.imgDelete}
                onClick={this.deleteImg.bind(this, index)}
              />
              <span onClick={this.swapArr.bind(this, index)}>
                {index === 0 ? '主图' : '设为主图'}
              </span>
            </span>
          ))}
        </span>
        <Upload
          {...this.getPdfURL()}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
