import { Modal } from 'antd';
import React from 'react';

export class YearModal extends React.Component {

  render() {
    return (
      <div>
        <Modal
          title="年代百科"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          centered
          width={'70%'}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}