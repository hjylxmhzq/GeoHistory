import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import s from './LeftSider.less';

const { SubMenu } = Menu;

class LeftSider extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      yearSelectedKeys: [],
      eventSelectedKeys: [],
      charSelectedKeys: [],
      currentYear: ['Tang', ''],
      currentPeople: null,
      currentEvent: null
    };
  }

  onCollapse = collapsed => {
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
  handleEventSelect(eventName) {
    this.setState({currentEvent: eventName});
  }
  handlePeopleSelect(name) {
    this.setState({currentPeople: name});
  }
  handleYearSelect(dynasty, year) {
    this.setState({ currentYear: [dynasty, year] });
  }
  render() {

    const years = (
      <Menu style={{ maxHeight: 500, overflowY: 'scroll' }}>
        {
          ((years) => {
            const yearList = [];
            for (let name of Object.keys(years)) {
              yearList.push(
                <SubMenu title={name} >
                  {years[name].map(year => <Menu.Item onClick={this.handleYearSelect.bind(this, name, year.Year)}>{year.Year}</Menu.Item>)}
                </SubMenu>
              )
            }
            return yearList;
          })(this.props.years)
        }
      </Menu>
    );
    const events = (
      <Menu style={{ maxHeight: 500, overflowY: 'scroll' }}>
        {this.props.events[this.state.currentYear[0]] &&
          this.props.events[this.state.currentYear[0]].map(
            event => (
              <Menu.Item
                onClick={this.handleEventSelect.bind(this, event.HName)}>
                {event.HName}
              </Menu.Item>
            )
          )}
      </Menu>
    );
    const people = (
      <Menu style={{ maxHeight: 500, overflowY: 'scroll' }}>
        {this.props.charProfiles[this.state.currentYear[0]] &&
          this.props.charProfiles[this.state.currentYear[0]].map(
            char => (
              <Menu.Item
              onClick={this.handlePeopleSelect.bind(this, char.Name)}>
                {char.Name}
              </Menu.Item>
            )
          )}
      </Menu>
    );
    return (
      <div className={s.selectors}>
        <div>
          <Dropdown overlay={years} trigger={['click']}>
            <Button>{this.state.currentYear.join(' ') || '年代边界'}</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown overlay={people} trigger={['click']}>
            <Button>{`${this.state.currentYear[0]}: ${this.state.currentPeople || '历史人物'}`}</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown overlay={events} trigger={['click']}>
            <Button>{`${this.state.currentYear[0]}: ${this.state.currentEvent || '历史事件'}`}</Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default LeftSider