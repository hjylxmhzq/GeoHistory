import { Modal } from 'antd';
import React from 'react';

export class YearModal extends React.Component {

  render() {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          centered
          width={'80%'}
        >
            介绍
        </Modal>
      </div>
    );
  }
}