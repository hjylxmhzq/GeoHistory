import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import './LeftSider.less';

const { SubMenu } = Menu;

class LeftSider extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      yearSelectedKeys: [],
      eventSelectedKeys: [],
      charSelectedKeys: []
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSelectChange(e) {
    if (e.keyPath[1] === 'years') {
      if (!this.state.yearSelectedKeys) {
        this.setState({ yearSelectedKeys: [e.key] })
      }
      else if (this.state.yearSelectedKeys[0] === e.key) {
        this.setState({ yearSelectedKeys: [] })
      }
      else {
        this.setState({ yearSelectedKeys: [e.key] })
      }
    }
    if (e.keyPath[1] === 'characters') {
      if (!this.state.charSelectedKeys) {
        this.setState({ charSelectedKeys: [e.key] })
      }
      else if (this.state.charSelectedKeys[0] === e.key) {
        this.setState({ charSelectedKeys: [] })
      }
      else {
        this.setState({ charSelectedKeys: [e.key] })
      }
    }
    if (e.keyPath[1] === 'events') {
      if (!this.state.eventSelectedKeys) {
        this.setState({ eventSelectedKeys: [e.key] })
      }
      else if (this.state.eventSelectedKeys[0] === e.key) {
        this.setState({ eventSelectedKeys: [] })
      }
      else {
        this.setState({ eventSelectedKeys: [e.key] })
      }
    }
    if (this.props.onSelect) {
      this.props.onSelect(e)
    }
  }
  handleEventOpen(e) {
    this.setState({ eventSelectedKeys: [] })
    if (this.props.onEventOpen) {
      this.props.onEventOpen(e)
    }
  }
  handleCharOpen(e) {
    this.setState({ charSelectedKeys: [] })
    if (this.props.onCharOpen) {
      this.props.onCharOpen(e)
    }
  }
  handleYearOpen(e) {
    this.setState({ yearSelectedKeys: [] })
    if (this.props.onYearOpen) {
      this.props.onYearOpen(e)
    }
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <SubMenu title="sub menu">
          <Menu.Item>3rd menu item</Menu.Item>
          <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled>
          <Menu.Item>5d menu item</Menu.Item>
          <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
      </Menu>
    );
    return (
      <div className="tools" >
        <Dropdown overlay={menu}>
          <Button>年代边界</Button>
        </Dropdown>
      </div>
    );
  }
}

export default LeftSider