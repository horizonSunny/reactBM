import React from 'react';
import { Table, Button, Divider, Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './findList.less';
import router from 'umi/router';
import { connect } from 'dva';
import dataInfo from '../../../../mock/quick';

@connect(({ operTool }) => ({
  operTool,
}))
export default class FindList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'operTool/getCategoryList',
        payload: {
          pageNumber: 0,
          pageSize: 1000,
        },
      }).then(() => {
        console.log('operTool');
      });
    }
  }
  state = {
    columns: [
      {
        title: 'icon',
        dataIndex: 'image',
        key: 'quickCategoryId',
        render: text => <img src={text} />,
      },
      {
        title: '名称',
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: text => <a>{text}</a>,
      },
      {
        title: '关联分类',
        dataIndex: 'categorys',
        key: 'categorys',
        render: value => (
          <span>
            {value &&
              value.length !== 0 &&
              value.map(item => {
                return item.map((info, index) => {
                  return index + 1 !== item.length
                    ? info['cateName'] + '/'
                    : info['cateName'] + ', ';
                });
              })}
          </span>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => <a>{text}</a>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <a>{text}</a>,
      },
      {
        title: '调整排序',
        dataIndex: 'sort',
        key: 'sort',
        render: (text, record, dataIndex) => (
          <div className="iconFont">
            {dataIndex === 0 && (
              <div>
                <Icon type="caret-up" className="disableIcon" />
              </div>
            )}
            {dataIndex !== 0 && (
              <div>
                <Icon
                  type="caret-up"
                  onClick={this.reverseCategoryList.bind(this, dataIndex, 'up')}
                />
              </div>
            )}
            {dataIndex + 1 !== dataInfo.data.pageList.length && (
              <div>
                <Icon
                  type="caret-down"
                  onClick={this.reverseCategoryList.bind(this, dataIndex, 'down')}
                />
              </div>
            )}
            {dataIndex + 1 === dataInfo.data.pageList.length && (
              <div>
                <Icon type="caret-down" className="disableIcon" />
              </div>
            )}
          </div>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <span>
            <a onClick={this.editorCategory.bind(this, record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={this.deleteCategory.bind(this, record)}>删除</a>
          </span>
        ),
      },
    ],
  };
  deleteCategory(record) {
    console.log('record_', record.quickCategoryId);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'operTool/deleteCategoryItem',
        payload: {
          quickCategoryId: record.quickCategoryId,
        },
      });
    }
  }
  editorCategory(record?) {
    let obj = {
      pathname: '/operTool/findCommodity/newCategory',
    };
    console.log('record_', record);
    let recordInfo;
    const { dispatch } = this.props;
    if (record) {
      // 编辑
      recordInfo = {
        categorys: record['categorys'],
        image: record['image'],
        quickCategoryName: record['categoryName'],
        quickCategoryId: record['quickCategoryId'],
      };
      obj.query = { id: record };
    } else {
      // 新建
      recordInfo = {
        // categorys: record['categorys'],
        categorys: [
          [
            { categoryId: 2, cateName: '医疗体检' },
            { categoryId: 33, cateName: '健康体检' },
            { categoryId: 276, cateName: '乳腺癌检测' },
          ],
        ],
        // image: 'https://product-img-bucket.oss-cn-shanghai.aliyuncs.com/bitmap.png',
        image: '',
        quickCategoryName: '123',
      };
    }
    dispatch({
      type: 'operTool/saveCategory',
      payload: recordInfo,
    });
    console.log('obj_', obj);
    router.push(obj);
  }
  // reverse排序
  reverseCategoryList(index, direction) {
    console.log('index_', index, '_direction_', direction);
    let startId = this.props.operTool.categoryList[index]['quickCategoryId'];
    let endId;
    switch (direction) {
      case 'up':
        endId = this.props.operTool.categoryList[index - 1]['quickCategoryId'];
        break;
      case 'down':
        endId = this.props.operTool.categoryList[index + 1]['quickCategoryId'];
        break;
      default:
        break;
    }
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'operTool/reverseCategoryList',
        payload: {
          quickCategoryIds: [startId, endId],
        },
      });
    }
  }
  render() {
    const { columns } = this.state;
    return (
      <PageHeaderWrapper className={styles['main']}>
        {/* <Title level={4}>商品编辑</Title> */}
        <Button
          type="danger"
          icon="plus-circle"
          className="buttonAdd"
          onClick={this.editorCategory.bind(this, '')}
        >
          添加
        </Button>
        <div
          style={{
            clear: 'both',
          }}
        ></div>
        <Table columns={columns} dataSource={this.props.operTool.categoryList} pagination={false} />
      </PageHeaderWrapper>
    );
  }
}
