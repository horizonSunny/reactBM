import React from 'react';
import { Table } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import styles from './casTr.less';
import { connect } from 'dva';

let dragingIndex = -1;
@connect(({ commodityClassify }) => ({
  commodityClassify,
}))
export class BodyRow extends React.Component {
  selectCas(record) {
    console.log('record_', record);
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'commodityClassify/selectCas',
        payload: record,
      });
    }
  }
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = {
      ...restProps.style,
      cursor: 'move',
      textAlign: 'center',
      height: '25px',
      lineHeight: '25px',
    };
    let { className } = restProps;
    // 测试
    const item = restProps.children;
    const info = item[item.length - 1]['props']['record'];
    let classifyInfo = '';
    switch (info['classify']) {
      case 1:
        classifyInfo = this.props.commodityClassify['casOneId'];
        break;
      case 2:
        classifyInfo = this.props.commodityClassify['casTwoId'];
        break;
      case 3:
        classifyInfo = this.props.commodityClassify['casThreeId'];
        break;
      default:
        break;
    }

    return connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          className={(className, info.id === classifyInfo ? 'testYellow' : '')}
          style={style}
          onClick={this.selectCas.bind(this, info)}
        />,
      ),
    );
  }
}

export const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

export const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

export const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);
