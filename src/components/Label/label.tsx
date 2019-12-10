import React from 'react';
import styles from './label.less';

export default class Label extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles['main']} style={this.props.classInfo}>
        {this.props.text}
      </div>
    );
  }
}
