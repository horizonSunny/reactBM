import { Upload, Icon, Modal } from 'antd';
import React from 'react';
import styles from './CommodityImg.less';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url:
          'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E7%99%BE%E5%BA%A6%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=2&spn=0&di=37620&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3632677651%2C3179755979&os=2150266739%2C1838726856&simid=0%2C0&adpicid=0&lpn=0&ln=1634&fr=&fmq=1575612884727_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb8a2f3cb90ebfdcc8f432e55137d8008d8e0b53c656d-LYlEC1_fw658&fromurl=ippr_z2C%24qAzdH3FAzdH3Fi7wkwg_z%26e3Bv54AzdH3FrtgfAzdH3F8ml9lbc0n9AzdH3F&gsm=&rpstart=0&rpnum=0&islist=&querylist=&force=undefined',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-6',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
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

  handleChange = ({ fileList }) => this.setState({ fileList });
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
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
