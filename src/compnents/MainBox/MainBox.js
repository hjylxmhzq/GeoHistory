import React, { Component } from 'react'
import { Button } from 'antd';
import EsriLoader from 'esri-loader'
import s from './mainBox.less';
import { createSketch, renderer } from './utils';
import { YearSelector } from '../charts';
import Search from '../Search';
import config from '../../config';
import { searchKey } from './utils/timeMap';
import { RightDrawer } from '../Drawer/Common';

const BOUNDARY_LAYER_NUM = 121;

class MainBox extends Component {
  constructor() {
    super()
    this.tangFeatureLayers = []
    this.dojoUrl = config.dojoServer;
    this.tileMapUrl = "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer"
    this.baseBoundaryFeatureUrl = config.gisRestServer + "country_boundary/MapServer/";
    this.baseEventFeatureUrl = config.gisRestServer + "events_point/MapServer";
    this.basePeopleFeatureUrl = config.gisRestServer + "country_boundary/MapServer/";
    this.highlightSelectChar = []
    this.state = {
      isPlay: false,
      playControllerText: '播放边界变化',
      sliderValue: 0,
      selectedBoundary: [],
      rightDrawShow: false
    }
    this.playTimer = null;
    this.stopUpdate = true;
    this.selectGrphics = [];
    this.changeBaseMap = () => { };
  }
  componentDidMount() {
    this.initMap()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedBoundary !== this.state.selectedBoundary) {
      this.setState({ rightDrawShow: true });
    }
  }

  queryForChar() {
    let charLayer = this.map.layers.items[14]
    this.view.whenLayerView(charLayer).then((layerView) => {
      var queryChar = charLayer.createQuery();
      queryChar.where = "ID=" + this.props.charSelected
      charLayer.queryFeatures(queryChar).then((result) => {
        if (this.highlightSelectChar.length) {
          this.highlightSelectChar.map((highlight) => {
            highlight.remove()
            return void 0;
          })
        }
        let feature = result.features
        // let x = 0, y = 0
        // for (let i = 0; i < feature.length; i++) {
        //   x += feature[i].geometry.x
        //   y += feature[i].geometry.y
        // }
        // x /= feature.length
        // y /= feature.length
        this.view.goTo(
          {
            center: [feature[0].geometry.x + 3, feature[0].geometry.y],
            zoom: 6
          },
          {
            duration: 1000,
            easing: 'in-out-expo'
          })
        setTimeout(() => {
          this.drawLine(feature, layerView)
        }, 1000)
        return void 0;
      })
    })
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
      'esri/widgets/Search',
      "dojo/domReady!"
    ], this.dojoUrl).then(([GraphicsLayer, Sketch, Map, Basemap, TileLayer, MapView, FeatureLayer, Graphic, Zoom, Compass, ScaleBar, Search]) => {
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
      })
      this.basePeopleFeatureLayer = new FeatureLayer({
        url: this.basePeopleFeatureUrl,
        id: '0',
        visible: true,
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
          this.baseEventFeatureLayer,
          // this.basePeopleFeatureLayer,
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
      this.view.when(function () {
        return queryLayer.when(function () {
          let query = queryLayer.createQuery()
          return queryLayer.queryFeatures(query)
        })
      })
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
    })
    this.map.layers = [boundaryLayer, eventLayer];
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
  render() {
    console.log(this.props)
    return (
      <>
        <div id='mapDiv' style={{ height: '100%', width: '100%', padding: '5px' }}></div>
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