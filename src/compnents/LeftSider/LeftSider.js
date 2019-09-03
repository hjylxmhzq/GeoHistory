import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import s from './LeftSider.less';

const { SubMenu } = Menu;

class LeftSider extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      yearLabel: undefined,
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
    console.log(e.key[0])
    // 选择年份
    if (e.key[0] === 'Y') {
      
      if (!this.state.yearSelectedKeys) {
        let yearLabel = e.key.slice(3)
        console.log(yearLabel)
        this.setState({ yearSelectedKeys: [e.key],yearLabel:yearLabel})
      }
      else if (this.state.yearSelectedKeys[0] === e.key) {
        this.setState({ yearSelectedKeys: [] })
      }
      else {
        this.setState({ yearSelectedKeys: [e.key] })
      }
    }
    // 选择人物
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
  //
  onChange = value => {
    console.log(value);
    this.setState({ value });
  };
  //
  render() {
    const years = (
      <Menu>
        {
          ((years) => {
            const yearList = [];
            for (let name of Object.keys(years)) {
              yearList.push(
                <SubMenu title={name} key={'Y-'+name}>
                  { years[name].map((year,i) => <Menu.Item key={'Y-'+i+name+' '+year.Year} onClick={this.handleSelectChange.bind(this)}>{year.Year}</Menu.Item>) }
                </SubMenu>
              )
            }
            return yearList;
          })(this.props.years)
        }
      </Menu>
    );
    return (
      <div className={s.selectors}>
        <div>
          <Dropdown overlay={years} trigger={['click']}>
            <Button>{'年代边界'+this.state.yearSelectedKeys}</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown overlay={years} trigger={['click']}>
            <Button>历史人物</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown overlay={years} trigger={['click']}>
            <Button>历史事件</Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default LeftSider