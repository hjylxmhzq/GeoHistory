import React, { Component } from 'react';
import Header from './compnents/Header/Header'
import LeftSider from './compnents/LeftSider/LeftSider'
import MainBox from './compnents/MainBox/MainBox'
import EventDrawer from './compnents/Drawer/EventDrawer'
import ExpTimeline from './compnents/Timelist/ExpTimeline'
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
      yearSelectedKeys: [],
      charSelectedKeys: [],
      eventSelectedKeys: [],
      charProfiles: [],
      years: [],
      events: [],
      experience: [],
      yearArea: [],
      currentYear: 0,
      currentTileMap: 'topo',
      isCharDrawerOpen: false,
      isEventDrawerOpen: false,
<<<<<<< HEAD
      currentChar:undefined,
      currentDynasty:0,
=======
      isCharSelectChangeToAnother: false,
      isEventSelectChangeToAnother: false,
      isYearSelectChangeToAnother: false,
      Trigger: {
        heatmap: false,
      },
      currentChar:null,
      currentDynasty:0
>>>>>>> f0e7cd476e771a42a1a6898571d654960b3e7b25
    }
  }

  onSelectYear(id) {
    this.setState({ currentYear: id });
  }

  onSelectTileMap(currentTileMap) {
    this.setState({ currentTileMap })
  }
  onSelectDynasty(ID){
    this.setState({currentDynasty:ID})
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
  onSelectChar(FID){
    this.setState({currentChar:FID})
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
    const exp = []
    this.state.experience.length && this.state.experience['Tang'].map((e) => {
      if (e.ID === this.state.charSelectedKeys[0]) exp.push(e)
      return void 0;
    })
    return (
      <div className="App">
        <Header />
        <LeftSider
          years={this.state.years}
          charProfiles={this.state.charProfiles}
          events={this.state.events}
          tilesMap={tilesMap}
          handleTileSelect={this.onSelectTileMap.bind(this)}
          currentTile={this.state.currentTileMap}
          onSelectYear={this.onSelectYear.bind(this)}
          onSelectDynasty={this.onSelectDynasty.bind(this)}
          onSelectChar={this.onSelectChar.bind(this)}
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
            />
            {exp.length ? <ExpTimeline exp={exp} /> : null}
          </Content>
          <EventDrawer
            events={this.state.events}
            isShow={this.state.isEventDrawerOpen}
            eventSelected={this.state.eventSelectedKeys[0]} />
          <ToolBox>
            <span style={{ paddingRight: 20 }}>热力图</span><Switch onChange={b => this.setState({ Trigger: { ...this.state.Trigger, ...{ heatmap: b } } })} checkedChildren="开" unCheckedChildren="关" />
          </ToolBox>
          <CharDrawer
            chars={this.state.charProfiles}
            isShow={this.state.isCharDrawerOpen}
            charSelected={this.state.charSelectedKeys[0]} />
        </Layout>

      </div>
    );
  }
}

export default App;
