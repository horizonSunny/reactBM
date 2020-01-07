import React from 'react';
import { Table } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import styles from './casTr.less';

let dragingIndex = -1;
export class BodyRow extends React.Component {
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
    // console.log('restProps_', info);
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className = [' drop-over-downward'];
      }
      if (restProps.index < dragingIndex) {
        className = [' drop-over-upward'];
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          className={(className, info.name === 'Joe Black1' ? 'testYellow' : '')}
          style={style}
          onClick={() => {
            console.log('onClick');
          }}
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
