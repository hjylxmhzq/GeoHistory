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
      curDrawing: 0,
      isCharDrawerOpen: false,
      isEventDrawerOpen: false,
      isCharSelectChangeToAnother: false,
      isEventSelectChangeToAnother: false,
      isYearSelectChangeToAnother: false,
    }
  }

  componentDidMount() {
    fetch(staticPath + 'json/year.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          years: data.Tang
        })
      })
    fetch(staticPath + 'json/profile.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          charProfiles: data.Tang
        })
        console.log(data)
      })
    fetch('./json/event.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          events: data.Tang
        })
      })
    fetch('./json/experience.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          experience: data.Tang
        })
        console.log(data)
      })
  }
  componentWillUpdate() {

  }
  handleSelectChange(e) {
    if (e.keyPath[1] === 'years') {
      this.setState({
        isYearSelectChangeToAnother: true,
        isCharSelectChangeToAnother: false,
        isEventSelectChangeToAnother: false
      })
      if (!this.state.yearSelectedKeys.length) {
        this.setState({ yearSelectedKeys: [e.key] })
      }
      else if (this.state.yearSelectedKeys[0] === e.key) {
        this.setState({ yearSelectedKeys: [] })
      } else {
        this.setState({ yearSelectedKeys: [e.key] })
      }
    }
    if (e.keyPath[1] === 'events') {
      this.setState({
        isYearSelectChangeToAnother: false,
        isCharSelectChangeToAnother: false,
        isEventSelectChangeToAnother: true
      })
      if (!this.state.eventSelectedKeys.length) {
        this.setState({
          eventSelectedKeys: [e.key],
          isEventDrawerOpen: true,
          isCharDrawerOpen: false,
        })
      }
      else if (this.state.eventSelectedKeys[0] === e.key) {
        this.setState({
          eventSelectedKeys: [],
          isEventDrawerOpen: false,
          isCharDrawerOpen: this.state.charSelectedKeys.length ? true : false,
        })
      } else {
        this.setState({
          eventSelectedKeys: [e.key],
          isEventDrawerOpen: true,
          isCharDrawerOpen: false,
        })
      }
    }
    if (e.keyPath[1] === 'characters') {
      this.setState({
        isYearSelectChangeToAnother: false,
        isEventSelectChangeToAnother: false,
        isCharSelectChangeToAnother: true
      })
      if (!this.state.charSelectedKeys.length) {
        this.setState({
          charSelectedKeys: [e.key],
          isEventDrawerOpen: false,
          isCharDrawerOpen: true,
        })
      }
      else if (this.state.charSelectedKeys[0] === e.key) {
        this.setState({
          charSelectedKeys: [],
          isCharDrawerOpen: false,
          isEventDrawerOpen: this.state.eventSelectedKeys.length ? true : false,
        })
      } else {
        this.setState({
          charSelectedKeys: [e.key],
          isEventDrawerOpen: false,
          isCharDrawerOpen: true,
        })
      }
    }
  }

  handleEventOpen(e) {
    console.log(e)
    if (!e.length) this.setState({ isEventDrawerOpen: false, isCharDrawerOpen: this.state.charSelectedKeys.length ? true : false })
    this.setState({
      isEventOpen: this.state.isEventOpen ? false : true,
      eventSelectedKeys: [],
      isEventSelectChangeToAnother: this.state.isEventSelectChangeToAnother ? false : true,
      isCharSelectChangeToAnother: false,
      isYearSelectChangeToAnother: false
    })
  }

  handleCharOpen(e) {
    if (!e.length) this.setState({ isCharDrawerOpen: false, isEventDrawerOpen: this.state.eventSelectedKeys.length ? true : false })
    this.setState({
      isCharOpen: this.state.isCharOpen ? false : true,
      charSelectedKeys: [],
      isCharSelectChangeToAnother: this.state.isCharSelectChangeToAnother ? false : true,
      isEventSelectChangeToAnother: false,
      isYearSelectChangeToAnother: false
    })
  }

  handleYearOpen(e) {
    if (!e.length) this.setState({ isYearOpen: this.state.isYearOpen ? false : true, yearSelectedKeys: [] })
    this.setState({
      isYearOpen: this.state.isYearOpen ? false : true,
      isCharSelectChangeToAnother: false,
      isEventSelectChangeToAnother: false,
      isYearSelectChangeToAnother: this.state.isYearSelectChangeToAnother ? false : true
    })
  }
  render() {
    const exp = []
    this.state.experience.map((e) => {
      if (e.ID === this.state.charSelectedKeys[0]) exp.push(e)
      return void 0;
    })
    return (
      <div className="App">
        <Header />
        <LeftSider
            years={this.state.years} charProfiles={this.state.charProfiles} events={this.state.events}
            onSelect={this.handleSelectChange.bind(this)} onYearOpen={this.handleYearOpen.bind(this)}
            onEventOpen={this.handleEventOpen.bind(this)} onCharOpen={this.handleCharOpen.bind(this)} />
        <Layout style={{ position: 'relative', height: 'calc(100% - 60px)' }}>
          <Content style={{ position: 'relative' }}>
            <MainBox
              yearSelected={this.state.yearSelectedKeys[0]}
              charSelected={this.state.charSelectedKeys[0]}
              eventSelected={this.state.eventSelectedKeys[0]}
              isShowYear={this.state.isYearOpen}
              isShowEvent={this.state.isEventOpen}
              isShowChar={this.state.isCharOpen}
              isYearSelectChangeToAnother={this.state.isYearSelectChangeToAnother}
              isCharSelectChangeToAnother={this.state.isCharSelectChangeToAnother}
              isEventSelectChangeToAnother={this.state.isEventSelectChangeToAnother}
              curDrawingPoint={this.handleCurDrawing}
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
