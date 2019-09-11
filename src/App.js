import React, { Component } from 'react';
import Header from './compnents/Header/Header'
import LeftSider from './compnents/LeftSider/LeftSider'
import MainBox from './compnents/MainBox/MainBox'
import EventDrawer from './compnents/Drawer/EventDrawer'
import ExpTimeline from './compnents/Timelist/ExpTimeline'
import { Layout } from 'antd';
import './App.css';
import CharDrawer from './compnents/Drawer/CharDrawer';
import Config from './config';

const staticPath = Config.staticPath;

const tilesMap = [
  'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
  'dark-gray',
  'streets',
  'hybrid'
]

const { Content } = Layout
class App extends Component {
  constructor() {
    super()
    this.state = {
      yearSelectedKeys: [],
      charSelectedKeys: [],
      eventSelectedKeys: [],
      isYearOpen: true,
      isEventOpen: false,
      isCharOpen: false,
      charProfiles: [],
      years: [],
      events: [],
      experience: [],
      yearArea: [],
      curDrawing: 0,
      currentYear: 0,
      currentTileMap: 'topo',
      isCharDrawerOpen: false,
      isEventDrawerOpen: false,
      isCharSelectChangeToAnother: false,
      isEventSelectChangeToAnother: false,
      isYearSelectChangeToAnother: false,
    }
  }

  onSelectYear(id) {
    this.setState({currentYear: id});
  }

  onSelectTileMap(currentTileMap) {
    this.setState({ currentTileMap })
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
        />
        <Layout style={{ position: 'relative', height: 'calc(100% - 60px)' }}>
          <Content style={{ position: 'relative' }}>
            <MainBox
              years={this.state.years}
              charProfiles={this.state.charProfiles}
              events={this.state.events}
              yearArea={this.state.yearArea}
              yearSelected={this.state.yearSelectedKeys[0]}
              charSelected={this.state.charSelectedKeys[0]}
              eventSelected={this.state.eventSelectedKeys[0]}
              curDrawingPoint={this.handleCurDrawing}
              onSelectYear={this.onSelectYear.bind(this)}
              currentYear={this.state.currentYear}
            />
            {exp.length ? <ExpTimeline exp={exp} /> : null}
          </Content>
          <EventDrawer
            events={this.state.events}
            isShow={this.state.isEventDrawerOpen}
            eventSelected={this.state.eventSelectedKeys[0]} />
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
