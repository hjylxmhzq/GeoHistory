import { Drawer, Button } from 'antd';
import React from 'react';
import s from './index.less';

export class ToolBox extends React.Component {
  state = { visible: false, placement: 'left' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div
        style={{
          overflow: 'hidden',
          position: 'absolute',
          width: 20,
          height: "100%"
        }}
      >
        <Button className={s.toolbox_button} onMouseEnter={this.showDrawer}>
          &gt;
        </Button>
        <Drawer
          title="工具箱"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          mask={false}
          onMouseLeave={this.onClose}
          getContainer={false}
          style={{height: 'calc(100% - 64px)', top: 64}}
        >
          {this.props.children}
        </Drawer>
      </div>
    );
  }
}
