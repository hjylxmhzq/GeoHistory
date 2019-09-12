import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import s from './LeftSider.less';
import { Select } from 'antd';

const { Option } = Select;
const { SubMenu } = Menu;

class LeftSider extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      yearLabel: undefined,
      yearSelectedKeys: [],
      eventSelectedKeys: [],
      charSelectedKeys: [],
      currentYear: ['夏', '-2100年'],
      currentPeople: null,
      currentEvent: null
    };
  }


  handleEventSelect(eventName) {
    this.setState({ currentEvent: eventName });
  }
  handlePeopleSelect(name) {
    if(this.props.onSelectChar) this.props.onSelectChar(name)
    this.setState({ currentPeople: name });
  }
  handleYearSelect(dynasty, year, idx) {
    if(this.props.onSelectDynasty) {
      let dynastyID = 0
      switch(dynasty){
        case '夏':dynastyID=0; break
        case '商':dynastyID=1; break
        case '周':dynastyID=2; break
        case '春秋':dynastyID=3; break
        case '战国':dynastyID=4; break
        case '秦':dynastyID=5; break
        case '汉':dynastyID=6; break
        case '三国':dynastyID=7; break
        case '晋':dynastyID=8; break
        case '十六国':dynastyID=9; break
        case '南北朝':dynastyID=10; break
        case '隋':dynastyID=11; break
        case '唐':dynastyID=12; break
        case '五代十国':dynastyID=13; break
        case '宋':dynastyID=14; break
        case '元':dynastyID=15; break
        case '明':dynastyID=16; break
        case '清':dynastyID=17; break
        case '民国':dynastyID=18; break
        case '中华人民共和国':dynastyID=19; break
        default: break
      }
      this.props.onSelectDynasty(dynastyID)
    }
    if(this.props.onSelectYear) this.props.onSelectYear(idx);
    this.setState({ currentYear: [dynasty, year]});
  }
  render() {
    //console.log(this.props.years)
    const years = (
      <Menu style={{ maxHeight: 500, overflowY: 'auto' }}>
        {
          ((years) => {
            const yearList = [];
            for (let name of Object.keys(years)) {
              yearList.push(
                <SubMenu title={name} key={name}>
                  {years[name].map((year, index) => <Menu.Item key={name + year.Year + index} onClick={this.handleYearSelect.bind(this, name, year.Year, year.idx)}>{year.Year}</Menu.Item>)}
                </SubMenu>
              )
            }
            return yearList;
          })(this.props.years)
        }
      </Menu>
    );
    const events = (
      <Select showSearch
        onChange = {this.handleEventSelect.bind(this)}
        allowClear={true}
        placeholder={`${this.state.currentYear[0]}: 历史事件`} 
        style={{ width:140,overflowY: 'auto' }}>
        {this.props.events[this.state.currentYear[0]] &&
          this.props.events[this.state.currentYear[0]].map(
            event => (
              <Option value={event.HName} key={event.HName}>
                {event.HName}
              </Option>
            )
          )}
      </Select>
    );
    const people = (
      <Select showSearch
        onChange = {this.handlePeopleSelect.bind(this)}
        allowClear={true}
        placeholder={`${this.state.currentYear[0]}: 历史人物`} 
        style={{ width:140,overflowY: 'auto' }}>
        {this.props.charProfiles[this.state.currentYear[0]] &&
          this.props.charProfiles[this.state.currentYear[0]].map(
            char => (
              <Option value={char.FID} key={char.FID}>
                {char.Name}
              </Option>
            )
          )}
      </Select>
    );
    const tiles = (
      <Menu style={{ maxHeight: 500, overflowY: 'auto' }}>
        {this.props.currentTile &&
          Object.keys(this.props.tilesMap).map(
            tile => (
              <Menu.Item
                key={tile}
                onClick={() => { this.props.handleTileSelect(tile) }}>
                {this.props.tilesMap[tile]}
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
        <div>{people}</div>
        <div>{events}</div>
        <div>
          <Dropdown overlay={tiles} trigger={['click']}>
            <Button>{`底图: ${this.props.tilesMap[this.props.currentTile] || '底图'}`}</Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default LeftSider