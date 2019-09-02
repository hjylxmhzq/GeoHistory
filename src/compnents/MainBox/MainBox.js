import React, { Component } from 'react'
import { Button } from 'antd';
import EsriLoader from 'esri-loader'
import s from './mainBox.less';
import Slider from '../Slider/Slider';


class MainBox extends Component {
  constructor() {
    super()
    this.tangFeatureLayers = []
    this.dojoUrl = "http://tony-space.top:8007/arcgis_js_api/library/4.11/dojo/dojo.js"
    this.tileMapUrl = "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer"
    this.baseFeatureUrl = "http://172.20.32.70:6080/arcgis/rest/services/TD/MapServer/"
    this.highlightSelectChar = []
    this.state = {
      isPlay: false,
      playControllerText: '播放边界变化'
    }
    this.playTimer = null;
    this.stopUpdate = true
  }
  componentWillMount() {
    this.initMap()
  }
  componentDidUpdate() {
    if (this.map && this.stopUpdate) {
      if (this.map.layers.length) {
        this.map.layers.items.map((layer) => {
          layer.visible = false;
          return void 0;
        })
        this.search.sources = []
        if (this.props.isShowYear) {
          if (this.props.yearSelected) {
            this.map.layers.items[15].visible = true
            this.map.layers.items[this.props.yearSelected].visible = true
            this.search.sources.push(this.searchSource[this.props.yearSelected])
            this.search.sources.push(this.searchSource[15])
          }
        }
        if (this.props.isShowEvent) {
          this.map.layers.items[13].visible = true
          this.search.sources.push(this.searchSource[13])
        }
        if (this.props.isShowChar) {
          this.map.layers.items[14].visible = true
          this.search.sources.push(this.searchSource[14])
        }
        else {
          if (this.t) clearTimeout(this.t)
          this.graphic.geometry = undefined
        }
        //
        if (this.props.isCharSelectChangeToAnother && !this.props.isEventSelectChangeToAnother && !this.props.isYearSelectChangeToAnother) {
          if (this.props.charSelected) {
            this.tangFeatureLayers[14].definitionExpression = 'ID=' + this.props.charSelected
            this.tangFeatureLayers[14].labelsVisible = true
            if (this.t) clearTimeout(this.t)
            this.queryForChar()
          } else {
            this.tangFeatureLayers[14].definitionExpression = undefined
            this.tangFeatureLayers[14].labelsVisible = false

            if (this.highlightSelectChar.length) {
              this.highlightSelectChar.map((highlight) => {
                highlight.remove();
                return void 0;
              })
            }
            if (this.t) clearTimeout(this.t)
            this.graphic.geometry = undefined
          }
        }

        //
        if (this.props.isEventSelectChangeToAnother && !this.props.isCharSelectChangeToAnother && !this.props.isYearSelectChangeToAnother) {
          if (this.props.eventSelected) {
            this.queryForEvent()
          }
          else {
            if (this.highlightSelectEvent) {
              this.highlightSelectEvent.remove()
            }
          }
        }
      }
    }
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
  queryForEvent() {
    let eventLayer = this.map.layers.items[13]
    this.view.whenLayerView(eventLayer).then((layerView) => {
      var queryEvents = eventLayer.createQuery();
      queryEvents.where = "FID=" + this.props.eventSelected
      eventLayer.queryFeatures(queryEvents).then((result) => {
        if (this.highlightSelectEvent) {
          this.highlightSelectEvent.remove()
        }
        let feature = result.features[0]
        this.highlightSelectEvent = layerView.highlight(
          feature.attributes['FID']
        )
        this.view.goTo(
          {
            center: [feature.geometry.x + 3, feature.geometry.y],
            zoom: 6,
          },
          {
            duration: 1500,
            easing: 'in-out-expo'
          })
      })
    })
  }
  initMap() {
    EsriLoader.loadModules([
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
    ], this.dojoUrl).then(([Map, Basemap, TileLayer, MapView, FeatureLayer, Graphic, Zoom, Compass, ScaleBar, Search]) => {
      //
      const popupTemplateForCountry = {
        // autocasts as new PopupTemplate()
        title: '国家信息',
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "Name",
                label: "国家名称",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "Area",
                label: "面积  (Km^2)",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "isChina",
                label: "是否属于中国",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              }
            ]
          }
        ]
      };
      const popupTemplateForEvent = {
        // autocasts as new PopupTemplate()
        title: '事件信息',
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "HName",
                label: "名称",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "HCityName",
                label: "发生地",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "Intro",
                label: "简介",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "STime",
                label: "开始时间",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "ETime",
                label: "结束时间",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              }
            ]
          }
        ]
      };
      const popupTemplateForChar = {
        title: '人物经历',
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "name",
                label: "姓名",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "year",
                label: "年份",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "place",
                label: "地点",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "content",
                label: "经历",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
            ]
          }
        ]
      };
      const popupTemplateForCity = {
        title: '城市信息',
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "CityName",
                label: "名称",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "lat",
                label: "纬度",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
              {
                fieldName: "lng",
                label: "经度",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              },
            ]
          }
        ]
      };
      for (let i = 0; i <= 15; i++) {
        if (i <= 15) {
          let tangLayerUrl = this.baseFeatureUrl + i
          this.tangFeatureLayers.push(
            new FeatureLayer({
              url: tangLayerUrl,
              id: 'tangLayer' + i,
              visible: false,
              popupTemplate: i <= 12 ? popupTemplateForCountry : i === 13 ? popupTemplateForEvent : i === 14 ? popupTemplateForChar : popupTemplateForCity,
            })
          )
        }
      }
      //
      let tileLayer = new TileLayer({
        url: this.tileMapUrl
      });
      let baseMap = new Basemap({
        baseLayers: [tileLayer],
        id: 'myBaseMap'
      });
      this.map = new Map({
        basemap: baseMap,
        layers: this.tangFeatureLayers
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
      this.searchSource = this.tangFeatureLayers.map((layer, idx) => {
        return {
          layer: layer,
          searchFields:
            idx <= 12 ? ['Name'] :
              idx === 13 ? ["HName"] :
                idx === 14 ? ['name'] :
                  ['CityName'],
          suggestionTemplate:
            idx <= 12 ? "{Name}" :
              idx === 13 ? "{HName}, 城市:{HCityName}, 起始时间:{STime}, 结束时间:{ETime}" :
                idx === 14 ? "{name}, 年份:{year}, 地点:{place}, 经历:{content}" :
                  "{CityName}, 经度:{lng}, 纬度:{lat}",
          displayField:
            idx <= 12 ? 'Name' :
              idx === 13 ? "HName" :
                idx === 14 ? 'name' :
                  'CityName',
          exactMatch: false,
          name:
            idx <= 12 ? "国家" :
              idx === 13 ? "事件" :
                idx === 14 ? "人物" :
                  "城市",
          placeholder:
            idx <= 12 ? "查找国家-例：唐" :
              idx === 13 ? "查找事件-例：贞观之治" :
                idx === 14 ? "查找人物-例：李白" :
                  "查找城市-例：长安",
        }
      })
      this.view.graphics.add(this.graphic)
      this.view.ui.remove('zoom')
      this.view.ui.add(zoom)
      this.view.ui.add(compass)
      this.view.ui.add(scaleBar, 'bottom-right')
      this.view.ui.add(this.search)
      let len = this.map.layers.items.length
      let queryLayer = this.map.layers.items[len - 1]
      this.view.when(function () {
        return queryLayer.when(function () {
          let query = queryLayer.createQuery()
          return queryLayer.queryFeatures(query)
        })
      })
      //
    })
  }

  handleLayerPlay(e) {
    this.stopUpdate = !this.stopUpdate
    this.setState({ isPlay: !this.state.isPlay })
    console.log(this.state.isPlay)

    this.view.goTo({ center: [115, 32.1], zoom: 4 }, { duration: 1000, easing: 'in-out-expo' })
    for (let i = 0; i < 13; i++) {
      this.map.layers.items[i].visible = false
      this.map.layers.items[i].definitionExpression = "Name='唐'"
    }
    (() => {
      let i = 0
      if (this.playTimer) {
        clearInterval(this.playTimer);
        this.playTimer = null;
        this.setState({ playControllerText: '播放边界变化', isPlay: false })
        return;
      }
      this.setState({ playControllerText: '暂停播放', isPlay: true })
      this.playTimer = setInterval(() => {
        if (i <= 12) {
          if (i) {
            this.map.layers.items[i - 1].visible = false
          }
          this.map.layers.items[i].visible = true
          this.map.layers.items[15].visible = true
          console.log(i)
        }
        if (i === 13) {
          this.stopUpdate = !this.stopUpdate
          this.setState({ isPlay: false })
          this.map.layers.items.map((f, idx) => {
            f.definitionExpression = undefined;
            return void 0;
          })
          clearInterval(this.playTimer);
          this.playTimer = null;
        }
        i++;
        return void 0;
      }, 2000)
    })();
  }
  render() {
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
        <Slider years={this.props.years} />
      </>
    )
  }
}

export default MainBox