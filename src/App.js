import React, { Component } from 'react';
import Header from './compnents/Header/Header'
import LeftSider from './compnents/LeftSider/LeftSider'
import MainBox from './compnents/MainBox/MainBox'
import EventDrawer from './compnents/Drawer/EventDrawer'
import { Layout, Switch } from 'antd';
import './App.css';
import CharDrawer from './compnents/Drawer/CharDrawer';
import Config from './config';
import { ToolBox } from './compnents/ToolBox';

const staticPath = Config.staticPath;

const tilesMap = {
  'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer': 'StreetWarm',
  'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer': 'Community',
  'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer': 'Gray',
  'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer': 'Warm'
};


const { Content } = Layout
class App extends Component {
  constructor() {
    super()
    this.state = {
      charProfiles: [],
      years: [],
      events: [],
      experience: [],
      yearArea: [],
      Trigger: {
        heatmap: false,
        eventHeatmap: false,
        toolbar: true,
        comment: true,
        showChar: true,
        showExp: false,
        showOther: true
      },
      currentYear: 0,
      currentTileMap: 'topo',
      currentChar: null,
      currentDynasty: "夏",
      currentEvent: null,
    }
  }

  onSelectYear(id) {
    this.setState({ currentYear: id });
  }

  onSelectTileMap(currentTileMap) {
    this.setState({ currentTileMap })
  }

  onSelectDynasty(dynasty) {
    this.setState({ currentDynasty: dynasty })
  }

  processYearArea(data) {
    const result = [];
    Object.keys(data).forEach(d => {
      Object.keys(data[d][0]).forEach(d1 => {
        result.push([
          d + ' ' + d1,
          data[d][0][d1]
        ])
      })
    });
    return result;
  }

  processYear(data) {
    let idx = 0;
    Object.keys(data).forEach(d => {
      data[d].forEach((item, index) => {
        data[d][index] = {
          Year: data[d][index] + '年',
          idx
        }
        idx++;
      });
    });
    return data;
  }
  //handle character selection
  onSelectChar(charFID) {
    this.setState({ currentChar: charFID })

  }

  onSelectEvent(eventFID) {
    this.setState({ currentEvent: eventFID })
  }

  componentDidMount() {
    const yearData = fetch(staticPath + 'json/year.json').then(res => res.json())
    const profileData = fetch(staticPath + 'json/profile.json').then(res => res.json())
    const eventData = fetch(staticPath + 'json/event.json').then(res => res.json())
    const experienceData = fetch(staticPath + 'json/experience.json').then(res => res.json())
    const yearArea = fetch(staticPath + 'json/area.json').then(res => res.json())
    Promise.all([yearData, profileData, eventData, experienceData, yearArea]).then((dataList) => {
      console.log(dataList)
      this.setState({
        years: this.processYear(dataList[0]),
        charProfiles: dataList[1],
        events: dataList[2],
        experience: dataList[3],
        yearArea: this.processYearArea(dataList[4])
      })
    }).catch((err) => {
      console.error(err);
    })
  }

  render() {
    let experience = []
    let trash = null
    if (this.state.experience && this.state.currentChar !== null) {
      [].concat(...Object.values(this.state.experience)).map((e) => { e["Poet ID"] === String(this.state.currentChar) ? experience.push(e) : trash = undefined })
    }
    return (
      <div className="App">
        <Header />
        <LeftSider
          years={this.state.years}
          charProfiles={this.state.charProfiles}
          events={this.state.events}
          yearArea={this.state.yearArea}
          tilesMap={tilesMap}
          handleTileSelect={this.onSelectTileMap.bind(this)}
          currentTile={this.state.currentTileMap}
          onSelectYear={this.onSelectYear.bind(this)}
          onSelectDynasty={this.onSelectDynasty.bind(this)}
          onSelectChar={this.onSelectChar.bind(this)}
          onSelectEvent={this.onSelectEvent.bind(this)}
        />
        <Layout style={{ position: 'relative', height: 'calc(100% - 60px)' }}>
          <Content style={{ position: 'relative' }}>
            <MainBox
              years={this.state.years}
              charProfiles={this.state.charProfiles}
              events={this.state.events}
              yearArea={this.state.yearArea}
              onSelectYear={this.onSelectYear.bind(this)}
              currentYear={this.state.currentYear}
              currentTileMap={this.state.currentTileMap}
              trigger={this.state.Trigger}
              currentDynasty={this.state.currentDynasty}
              currentChar={this.state.currentChar}
              experience={experience}
            />
          </Content>
          <ToolBox>
            <div className="toolbox_item">
              <span>人物人生轨迹面板</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ showExp: b } } })} checkedChildren="开" unCheckedChildren="关" />
            </div>
            <hr />
            <div className="toolbox_item">
              <span>显示其他国家</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ showOther: b } } })} checkedChildren="开" unCheckedChildren="关" defaultChecked/>
            </div>
            <hr />
            <div className="toolbox_item">
              <span>在地图上显示选中人物</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ showChar: b } } })} checkedChildren="开" unCheckedChildren="关" defaultChecked />
            </div>
            <hr />
            <div className="toolbox_item">
              <span>历史人物分布热力图</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ heatmap: b } } })} checkedChildren="开" unCheckedChildren="关" />
            </div>
            <hr />
            <div className="toolbox_item">
              <span>历史事件分布热力图</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ eventHeatmap: b } } })} checkedChildren="开" unCheckedChildren="关" />
            </div>
            <hr />
            <div className="toolbox_item">
              <span>工具栏</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ toolbar: b } } })} checkedChildren="开" unCheckedChildren="关" defaultChecked />
            </div>
            <hr />
            <div className="toolbox_item">
              <span>开启评论</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ comment: b } } })} checkedChildren="开" unCheckedChildren="关" defaultChecked />
            </div>
          </ToolBox>
          <EventDrawer eventProfile={this.state.events && this.state.currentEvent !== null ? [].concat(...Object.values(this.state.events))[this.state.currentEvent] : undefined} />
          <CharDrawer charProfile={this.state.charProfiles && this.state.currentChar !== null ? [].concat(...Object.values(this.state.charProfiles))[this.state.currentChar] : undefined} />
        </Layout>

      </div>
    );
  }
}

export default App;
