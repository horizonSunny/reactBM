import React from 'react';
import { Table, Button, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './findList.less';
import { connect } from 'dva';
import dataInfo from '../../../../mock/quick';

const columns = [
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
      <a>
        {value &&
          value.length !== 0 &&
          value.map(item => {
            return item['cateName'] + ',';
          })}
      </a>
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
    render: text => <a>{text}</a>,
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (text, record) => (
      <span>
        <a onClick={this.goToNextPage.bind(this, record, 'detail')}>查看</a>
        <Divider type="vertical" />
        <a onClick={this.goToNextPage.bind(this, record, 'editor')}>编辑</a>
      </span>
    ),
  },
];
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export default class FindList extends React.Component {
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
          <a>
            {value &&
              value.length !== 0 &&
              value.map(item => {
                return item['cateName'] + ',';
              })}
          </a>
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
        render: text => <a>{text}</a>,
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <span>
            <a onClick={this.goToNextPage.bind(this, record, 'detail')}>查看</a>
            <Divider type="vertical" />
            <a onClick={this.goToNextPage.bind(this, record, 'editor')}>编辑</a>
          </span>
        ),
      },
    ],
  };
  goToNextPage(record, operate) {}
  render() {
    const { columns } = this.state;
    return (
      <PageHeaderWrapper className={styles['main']}>
        {/* <Title level={4}>商品编辑</Title> */}
        <Button type="danger" icon="plus-circle" className="buttonAdd">
          添加
        </Button>
        <div
          style={{
            clear: 'both',
          }}
        ></div>
        <Table columns={columns} dataSource={dataInfo.data.pageList} />
      </PageHeaderWrapper>
    );
  }
}
