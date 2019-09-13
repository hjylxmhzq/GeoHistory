import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import s from './LeftSider.less';
import { Select } from 'antd';
import { YearSelector } from '../charts';
import { YearModal } from '../YearModal/YearModal';
import Search from '../Search';
import { searchKey, searchName } from '../MainBox/utils/timeMap';
const { Option } = Select;
const { SubMenu } = Menu;

class LeftSider extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      yearLabel: undefined,
      showYearModal: false,
      currentYear: ['夏', '-2100年'],
      currentPeople: null,
      currentEvent: null
    };
  }

  handleEventSelect(eventFID) {
    if(this.props.onSelectEvent) this.props.onSelectEvent(eventFID)
    this.setState({ currentEvent: eventFID });
  }
  handlePeopleSelect(charFID) {
    if(this.props.onSelectChar) this.props.onSelectChar(charFID)
    this.setState({ currentPeople: charFID });
  }
  handleYearSelect(dynasty, year, idx) {
    console.log(dynasty,year,idx)
    if(this.props.onSelectDynasty) {
      this.props.onSelectDynasty(dynasty)
    }
    if(this.props.onSelectYear) this.props.onSelectYear(idx);
    this.setState({ currentYear: [dynasty, year]});
  }

  handleBarClick(idx,name){
    if(name.split(" ").toString()+"年"!==this.state.currentYear.toString()){
      let tmp = name.split(" ")
      tmp[1]+='年'
      this.setState({currentYear:tmp})
      this.handleYearSelect(tmp[0],tmp[1],idx)
    }
  }
  openYearModal() {
    this.setState({ showYearModal: true });
  }

  render() {

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
              <Option value={event.FID} key={event.FID}>
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
      <div>
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
      <div className={s.chartContainer}>
          <YearSelector onClick={this.handleBarClick.bind(this)} data={this.props.yearArea} />
      </div>
        {/* <Button
            style={{ position: 'absolute', right: 70, bottom: 80 }}
            onClick={this.openYearModal.bind(this)}>年代变化</Button>
          <YearModal
            visible={this.state.yearModal}
            handleCancel={() => this.setState({ yearModal: false })}
            handleOk={() => this.setState({ yearModal: false })}
          >
            <Button onClick={() => this.setState({ showWiki: !this.state.showWiki })}>显示百科</Button>
            {
              this.state.showWiki &&
              <iframe name="wiki_frame" title="baike" src={"https://baike.baidu.com/item/" + encodeURIComponent(searchName(this.props.currentYear)) + "朝"} height="600px" width="1240px" seamless frameborder="0"></iframe>
            }
            <YearSelector
              style={{ position: 'relative', left: 0, right: 0, bottom: 0 }}
              onClick={this.props.onSelectYear}
              data={this.props.yearArea} />
          </YearModal> */}

      </div>
    );
  }
}

export default LeftSider