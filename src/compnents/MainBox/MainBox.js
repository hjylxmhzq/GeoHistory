import React, { Component } from 'react'
import { Button,Switch } from 'antd';
import EsriLoader from 'esri-loader'
import s from './mainBox.less';
import { createSketch, renderer, heatMapRenderer } from './utils';
import { YearSelector } from '../charts';
import Search from '../Search';
import config from '../../config';
import { searchKey, searchName } from './utils/timeMap';
import { RightDrawer } from '../Drawer/Common';
import { YearModal } from '../YearModal/YearModal';
import { eventPopUpTemplate } from './utils/popUpTemplate';

const ButtonGroup = Button.Group;
const BOUNDARY_LAYER_NUM = 121;

class MainBox extends Component {
  constructor() {
    super()
    this.dojoUrl = config.dojoServer;
    this.tileMapUrl = "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer"
    this.baseBoundaryFeatureUrl = config.gisRestServer + "country_boundary/MapServer/";
    this.baseEventFeatureUrl = config.gisRestServer + "events_point/MapServer";
    this.basePeopleFeatureUrl = config.gisRestServer + "experience/MapServer/";
    this.state = {
      isPlay: false,
      playControllerText: '播放边界变化',
      sliderValue: 0,
      selectedBoundary: [],
      rightDrawShow: false,
      showYearModal: false,
      showBoundary:true,
      showChar:true,
      showEvent:true
    }
    this.playTimer = null;
    this.stopUpdate = true;
    this.selectGrphics = [];
    this.changeBaseMap = () => { };
  }
  componentWillMount() {
    this.initMap()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentYear !== this.props.currentYear) {
      this.changeBoundaryLayer(this.props.currentYear);
    }
    if (prevState.selectedBoundary !== this.state.selectedBoundary) {
      this.setState({ rightDrawShow: true });
    }
    //人物点显示

  }


  initMap() {
    EsriLoader.loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch",
      "esri/Map",
      "esri/Basemap",
      "esri/layers/TileLayer",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      'esri/Graphic',
      'esri/widgets/Zoom',
      "esri/widgets/Compass",
      'esri/widgets/ScaleBar',
      "dojo/domReady!"
    ], this.dojoUrl).then(([GraphicsLayer, Sketch, Map, Basemap, TileLayer, MapView, FeatureLayer, Graphic, Zoom, Compass, ScaleBar]) => {
      this.FeatureLayer = FeatureLayer;
      this.graphicsLayer2 = new GraphicsLayer();
      this.baseBoundaryFeatureLayer = new FeatureLayer({
        url: this.baseBoundaryFeatureUrl,
        id: '0',
        visible: true,
        renderer
      })
      this.baseEventFeatureLayer = new FeatureLayer({
        url: this.baseEventFeatureUrl,
        id: '4',
        visible: true,
        popupTemplate: eventPopUpTemplate,
        heatMapRenderer
      })
      this.basePeopleFeatureLayer = new FeatureLayer({
        url: this.basePeopleFeatureUrl,
        id: '0',
        visible: true,
        definitionExpression : 'Sequence=0 and Dynasty_ID='+String(this.props.currentDynasty),
        heatMapRenderer
      })

      this.changeBaseMap = (tileMapUrl) => {
        let tileLayer = new TileLayer({
          url: tileMapUrl
        });
        let baseMap = new Basemap({
          baseLayers: [tileLayer],
          id: 'myBaseMap'
        });
        if (this.map) {
          this.map.basemap = baseMap;
        }
      }

      let tileLayer = new TileLayer({
        url: this.tileMapUrl
      });
      let basemap = new Basemap({
        baseLayers: [tileLayer],
        id: 'myBaseMap'
      });
      this.map = new Map({
        basemap,
        layers: [
          this.graphicsLayer2,
          this.baseEventFeatureLayer,
          this.basePeopleFeatureLayer,
          this.baseBoundaryFeatureLayer,
        ]
      });
      this.view = new MapView({
        center: [115, 32.1],
        map: this.map,
        container: "mapDiv",
        zoom: 5
      });
      this.view.whenLayerView(this.baseBoundaryFeatureLayer).then((layerView) => {
        this.featureLayerView = layerView;
      });
      this.graphic = new Graphic()
      let zoom = new Zoom({
        view: this.view,
        layout: 'horizontal'
      })
      let compass = new Compass({
        view: this.view
      });
      let scaleBar = new ScaleBar({
        view: this.view,
        unit: 'metric'
      })
      const sketch = createSketch(this, Sketch);
      this.view.graphics.add(this.graphic)
      this.view.ui.padding = { top: 80, left: 30, right: 0, bottom: 0 };
      this.view.ui.remove('zoom')
      this.view.ui.add(zoom)
      this.view.ui.add(compass)
      this.view.ui.add(scaleBar, 'bottom-right');
      this.view.ui.add(sketch, "top-left");
      let len = this.map.layers.items.length
      let queryLayer = this.map.layers.items[len - 1]
      // this.view.when(function () {
      //   return queryLayer.when(function () {
      //     let query = queryLayer.createQuery()
      //     return queryLayer.queryFeatures(query)
      //   })
      // })
    })
  }

  changeBoundaryLayer(index) {
    if (!this.map || !this.FeatureLayer) {
      return 0;
    }
    const boundaryLayer = new this.FeatureLayer({
      url: this.baseBoundaryFeatureUrl + index,
      visible: true,
      renderer
    });
    const evnetLayerIndex = searchKey(index);
    const eventLayer = new this.FeatureLayer({
      url: this.baseEventFeatureUrl + '/' + evnetLayerIndex,
      visible: true,
      heatMapRenderer,
      popupTemplate: eventPopUpTemplate,
    })
    if(this.state.currentDynasty !== this.props.currentDynasty) 
    {this.basePeopleFeatureLayer.definitionExpression = 'Sequence=0 and Dynasty_ID='+String(this.props.currentDynasty)}
    this.map.layers = [this.graphicsLayer2,eventLayer, this.basePeopleFeatureLayer,boundaryLayer];
  }

  openYearModal() {
    this.setState({ yearModal: true });
  }

  handleSliderChange(value) {
    if (!this.map) {
      return 0;
    }
    // TO FIX: slider切换年份不生效
    this.changeBoundaryLayer(value);
    this.setState({ sliderValue: value });
  }

  handleLayerPlay() {
    this.stopUpdate = !this.stopUpdate
    this.setState({ isPlay: !this.state.isPlay })

    this.view.goTo({ center: [115, 32.1], zoom: 4 }, { duration: 1000, easing: 'in-out-expo' })
    let i = 0
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
      this.setState({ playControllerText: '播放边界变化', isPlay: false })
      return;
    }
    this.setState({ playControllerText: '暂停播放', isPlay: true })
    this.playTimer = setInterval(() => {
      if (i < BOUNDARY_LAYER_NUM) {
        if (i) {
          this.changeBoundaryLayer.call(this, i);
        }
        this.setState({ sliderValue: i });
      }
      else {
        this.stopUpdate = !this.stopUpdate
        this.setState({ isPlay: false })
        this.changeBoundaryLayer.call(this, i);
        clearInterval(this.playTimer);
        this.playTimer = null;
      }
      i++;
      return void 0;
    }, 2000)
  }
  // handleBoundarySwitch(){
  //   console.log('switching...')
  //   this.setState({showBoundary:!this.state.showBoundary})
  //   this.baseBoundaryFeatureLayer.visible = !this.state.showBoundary
  // }
  handleCharSwitch(){
    this.setState({showChar:!this.state.showChar})
    this.basePeopleFeatureLayer.visible = !this.state.showChar
  }
  // handleEventSwitch(){
  //   this.setState({showEvent:!this.state.showEvent})
  //   this.baseEventFeatureLayer.visible = !this.state.showEvent
  // }
  render() {
    return (
      <>
        <div id='mapDiv' style={{ height: '100%', width: '100%', padding: '5px' }}></div>
        <div className={s['switches']}>
          {/* <Switch defaultChecked onChange={this.handleBoundarySwitch.bind(this)}>边界</Switch> */}
          <Switch defaultChecked onChange={this.handleCharSwitch.bind(this)}>人物</Switch>
          {/* <Switch defaultChecked onChange={this.handleEventSwitch.bind(this)}>事件</Switch> */}
        </div>
        <div className={s['traj_set']}>
          <Button ghost icon={'caret-right'}>{'显示轨迹'}</Button>
          <ButtonGroup>
            <Button ghost icon={'step-backward'}></Button>
            <Button ghost>{"×1.0"}</Button>
            <Button ghost icon={'step-forward'}></Button>
          </ButtonGroup>
        </div>
        <div className={s['play_button']}>
          <Button
            onClick={this.handleLayerPlay.bind(this)}
            ghost
            icon={this.state.isPlay ? 'pause' : 'caret-right'}
          >
            {this.state.playControllerText}
          </Button>
        </div>
        <YearSelector onClick={this.changeBoundaryLayer.bind(this)} data={this.props.yearArea} />
        <Button
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
        </YearModal>
        <RightDrawer
          isShow={this.state.rightDrawShow}
          onClose={() => this.setState({ rightDrawShow: false })}
          data={{
            years: this.props.years,
            charProfiles: this.props.charProfiles,
            events: this.props.events,
            selectedBoundary: this.state.selectedBoundary
          }}
        />
        {
          !this.state.rightDrawShow &&
          <Button
            style={{ position: 'absolute', right: 0, bottom: 3, height: '99%', width: 15, padding: 0 }}
            onClick={() => this.setState({ rightDrawShow: true })}
          >
            &lt;
        </Button>
        }
        <Search
          year={this.props.years}
          event={this.props.events}
          people={this.props.charProfiles}
        />
        {/* <Slider
          years={this.props.years}
          value={this.state.sliderValue}
          onChange={this.handleSliderChange.bind(this)}
        /> */}
      </>
    )
  }
}

export default MainBox