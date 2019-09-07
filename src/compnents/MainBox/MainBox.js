import React, { Component } from 'react'
import { Button } from 'antd';
import EsriLoader from 'esri-loader'
import s from './mainBox.less';
import Slider from '../Slider/Slider';
import createSketch from './utils/sketch';
import { YearSelector } from '../charts';
import Search from '../Search';
import config from '../../config';

const BOUNDARY_LAYER_NUM = 121;

class MainBox extends Component {
  constructor() {
    super()
    this.tangFeatureLayers = []
    this.dojoUrl = config.dojoServer;
    this.tileMapUrl = "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer"
    this.baseFeatureUrl = config.gisRestServer + "country_boundary/MapServer/";
    this.highlightSelectChar = []
    this.state = {
      isPlay: false,
      playControllerText: '播放边界变化',
      sliderValue: 0
    }
    this.playTimer = null;
    this.stopUpdate = true;
    this.selectGrphics = [];
  }
  componentDidMount() {
    this.initMap()
  }

  interpolation(pointA, pointB, speed) {
    var tmp = [];
    if (speed === undefined) {
      speed = 1;
    }
    var count = Math.abs(speed) * 25;
    var disX = (pointB.x - pointA.x) / count;
    var disY = (pointB.y - pointA.y) / count;
    var i = 0;
    while (i <= count) {
      var p = pointA.clone()
      p.x = pointA.x + i * disX;
      p.y = pointA.y + i * disY;

      tmp.push(p);
      i++;
    }
    tmp.push(pointB);//防止插值出来的最后一个点到不了B点
    return tmp;
  }
  drawLine(feature, layerView) {
    this.traj = []
    for (let i = 0; i < feature.length - 1; i++) {
      this.traj.push(this.interpolation(feature[i].geometry, feature[i + 1].geometry))
    }
    var polyline = {
      type: 'polyline',
      paths: []
    }
    var lineSymbol = {
      type: "simple-line", // autocasts as SimpleLineSymbol()
      color: [226, 119, 40],
      width: 1.5
    };

    this.graphic.symbol = lineSymbol

    for (let i = 0; i < this.traj.length; i++) {
      for (let j = 0; j < this.traj[i].length - 1; j++) {
        polyline.paths.push([this.traj[i][j].x, this.traj[i][j].y])
      }
    }
    let nPolyline = {
      type: 'polyline',
      paths: []
    };
    let cnt = 0
    let draw = () => {
      if (this.props.isShowChar && this.props.charSelected) {
        if (polyline.paths.length > 0) {
          this.t = setTimeout(() => {
            let tmp = polyline.paths.shift()
            nPolyline.paths.push(tmp);
            if (tmp[0] === feature[cnt].geometry.x && tmp[1] === feature[cnt].geometry.y) {
              if (this.props.curDrawingPoint) this.props.curDrawingPoint(cnt)
              this.highlightSelectChar.push(layerView.highlight(
                feature[cnt++].attributes['FID']))
            }
            this.graphic.geometry = nPolyline;

            this.view.goTo({ center: [tmp[0] + 3, tmp[1]], zoom: 6 }, { duration: 500, easing: 'in-out-expo' })
            draw();
          }, 100)
        } else {
          clearTimeout(this.t)
        }
      } else {
        clearTimeout(this.t)
        this.graphic.geometry = undefined
      }
    }
    draw()
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
      this.currentBoundaryLayer = new FeatureLayer({
        url: this.baseFeatureUrl,
        id: '0',
        visible: true,
      })

      let tileLayer = new TileLayer({
        url: this.tileMapUrl
      });
      let baseMap = new Basemap({
        baseLayers: [tileLayer],
        id: 'myBaseMap'
      });
      this.map = new Map({
        basemap: baseMap,
        layers: this.currentBoundaryLayer
      });
      this.view = new MapView({
        center: [115, 32.1],
        map: this.map,
        container: "mapDiv",
        zoom: 5
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
      this.search = new Search({
        view: this.view,
        allPlaceholder: '找点什么',
        includeDefaultSources: false,
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
    this.map.layers = new this.FeatureLayer({
      url: this.baseFeatureUrl + index,
      visible: true,
    })
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
        <YearSelector data={this.props.yearArea} />
        <Search
          year={this.props.years}
          event={this.props.events}
          people={this.props.charProfiles}
        />
        <Slider
          years={this.props.years}
          value={this.state.sliderValue}
          onChange={this.handleSliderChange.bind(this)}
        />
      </>
    )
  }
}

export default MainBox