import React, { Component } from 'react'
import { Button,Timeline, Empty, Icon,message,Slider,Progress } from 'antd';
import EsriLoader from 'esri-loader'
import s from './mainBox.less';
import { createSketch, heatMapRenderer, simpleMarkerRender, simplePeopleMarkerRender, boundaryLayerOption, eventLayerOption, peopleLayerOption } from './utils';
import Search from '../Search';
import config from '../../config';
import { searchKey, searchName } from './utils/timeMap';
import { RightDrawer } from '../Drawer/Common';

const ButtonGroup = Button.Group;
const BOUNDARY_LAYER_NUM = 121;

class MainBox extends Component {
  constructor() {
    super()
    this.dojoUrl = config.dojoServer;
    this.tileMapUrl = "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer"
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
      showBoundary: true,
      selectedEvents: [],
      showTraj: 0,
      bntLabel: '显示轨迹',
      speedChange: false,
      speed: 100,
      expIdx: -1,
      showExp: false,
    }
    this.playTimer = null;
    this.stopUpdate = true;
    this.selectGrphics = [];
    this.changeBaseMap = () => { };

  }
  componentWillMount() {
    this.initMap()
  }
  handleMouseOverSearchResult(mapPoint, name, content, e) {
    this.view && this.view.popup.open({
      // Set the popup's title to the coordinates of the location
      title: name,
      content,
      location: mapPoint, // Set the location of the popup to the clicked location
    });
  }
  onSearchSelect(action) {
    console.log('action', action);
    switch (action.type) {
      case 0: this.props.onSelectDynasty(action.payload); break;
      case 1: this.props.onSelectChar(action.payload); break;
      case 2: this.props.onSelectEvent(action.payload); break;
      case 3: this.props.onSelectYear(action.payload); break;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update')
    console.log(this.props.currentDynasty)
    if (prevProps.currentYear !== this.props.currentYear ||
      prevProps.trigger.eventHeatmap !== this.props.trigger.eventHeatmap ||
      prevProps.trigger.heatmap !== this.props.trigger.heatmap) this.changeBoundaryLayer.call(this, this.props.currentYear);
    if (prevProps.currentTileMap !== this.props.currentTileMap) {
      console.log(this.props.currentTileMap)
      this.changeBaseMap(this.props.currentTileMap);
    }
    if (prevState.selectedBoundary !== this.state.selectedBoundary) {

      this.setState({ rightDrawShow: true });
    }
    // trigger start
    if (this.sketch) {
      if (!this.props.trigger.toolbar) {
        this.view.ui.remove(this.sketch);
      } else {
        this.view.ui.add(this.sketch, 'top-left');
      }
    }

    // trigger end
    //人物点显示
    this.trajCtrl(prevProps.currentChar);
    this.basePeopleFeatureLayer && (this.basePeopleFeatureLayer.visible = this.props.trigger.showChar);
    //
    if(this.baseBoundaryFeatureLayer){
      if(!this.props.trigger.showOther) this.baseBoundaryFeatureLayer.definitionExpression = `China>0`
      else this.baseBoundaryFeatureLayer.definitionExpression = undefined
    }
    //事件点显示
    //console.log(this.props.trigger)
    if(this.baseEventFeatureLayer){
      this.baseEventFeatureLayer.visible = this.props.trigger.showEvent
      if(prevProps.currentEvent !== this.props.currentEvent && this.props.currentEvent!==null){
        this.view.whenLayerView(this.baseEventFeatureLayer).then((layerView) => {
          let query = this.baseEventFeatureLayer.createQuery();
          query.where = 'FID=' + this.props.currentEvent
          this.baseEventFeatureLayer.queryFeatures(query).then((result) => {
            let feature = result.features[0]
            this.view.goTo({center:feature.geometry,zoom:7},{duration:1000,easing:'in-out-expo'})
            let highlight = layerView.highlight(feature)
            setTimeout(() => {
              highlight.remove()
            },1500)
          })
        });
      }
    }
  }

  trajCtrl(prevChar) {
    if (!this.props.trigger.showChar) {
      if (this.t) {
        clearInterval(this.t)
        this.t = null
      }
      if (this.state.showTraj > 0) this.setState({ showTraj: 0, bntLabel: '显示轨迹', speedChange: false })
      if (this.graphic) this.graphic.geometry = undefined
      if (this.polyline) this.polyline.paths = []
      return
    }
    if (prevChar !== undefined && this.props.currentChar === undefined) {
      if (this.t) {
        clearInterval(this.t)
        this.t = null
      }
      if (this.state.showTraj > 0) this.setState({ showTraj: 0, bntLabel: '显示轨迹', speedChange: false })
      if (this.graphic) this.graphic.geometry = undefined
      if (this.polyline) this.polyline.paths = []
      if (this.basePeopleFeatureLayer) this.basePeopleFeatureLayer.definitionExpression = `Sequence=0 and Dynasty='${this.props.currentDynasty}'`
    }else if(prevChar !== undefined && this.props.currentChar !== undefined && prevChar!==this.props.currentChar){
        if (this.t) {
          clearInterval(this.t)
          this.t = null
        }
        if (this.state.showTraj > 0) this.setState({ showTraj: 0, bntLabel: '显示轨迹', speedChange: false })
        if (this.graphic) this.graphic.geometry = undefined
        if (this.polyline) this.polyline.paths = []
        if (this.view) this.loadingPath()
        if (this.basePeopleFeatureLayer) this.basePeopleFeatureLayer.definitionExpression = 'Poet_ID=' + this.props.currentChar
     }else if (prevChar || this.props.currentChar) {
      if (this.basePeopleFeatureLayer && prevChar !== this.props.currentChar) this.basePeopleFeatureLayer.definitionExpression = 'Poet_ID=' + this.props.currentChar
      if (this.state.showTraj === 0) {
        //console.log('loading...')
        if (this.t) {
          clearInterval(this.t)
          this.t = null
        }

        if (this.polyline) this.polyline.paths = []
        if (this.view) this.loadingPath()
      } else if (this.state.showTraj % 2 !== 0) {
        //console.log('showing trajectory...')
        if (this.state.speedChange) {
          if (this.t) {
            clearInterval(this.t)
            this.t = null
          }
        }
        if (this.traj && this.traj.length > 0) {
          if (!this.t) {
            this.play()
          }
        }
      } else {
        //console.log('pausing...')
        if (this.t) {
          clearInterval(this.t)
          this.t = null
        }
      }
    } else {
      if (this.basePeopleFeatureLayer) this.basePeopleFeatureLayer.definitionExpression = `Sequence=0 and Dynasty='${this.props.currentDynasty}'`
    }
  }


  play() {
    //if(this.state.showTraj===1)this.view.goTo({center:this.traj[0],zoom:5},{duration:500,easing:'in-out-expo'})
    this.t = setInterval(() => {
      if (this.traj.length > 0) {
        let tmp = this.traj.shift()
        //console.log(tmp)
        this.props.trigger.track && this.view.goTo({center:tmp,zoom:6},{duration:1000,easing:'in-out-expo'})
        this.polyline.paths.push(tmp)
        this.graphic.geometry = this.polyline
        let manifestIdx = this.nodeIdx.shift()
        if (this.polyline.paths.length === manifestIdx) {

          this.view.whenLayerView(this.basePeopleFeatureLayer).then((layerView) => {
            let query = this.basePeopleFeatureLayer.createQuery();
            query.where = 'Poet_ID=' + this.props.currentChar
            this.basePeopleFeatureLayer.queryFeatures(query).then((result) => {
              //this.basePeopleFeatureLayer.definitionExpression = 'Poet_ID='+this.props.currentChar+' and Sequence<='+(result.features.length-this.nodeIdx.length-1)
              this.setState({ expIdx: this.state.expIdx + 1 }, () => { })
              let feature = result.features[result.features.length - this.nodeIdx.length - 1]
              let highlight = layerView.highlight(feature)
              setTimeout(() => {
                highlight.remove()
              },700)
            })
          });
        } else {
          this.nodeIdx.unshift(manifestIdx)
        }
      } else {
        clearInterval(this.t)
        this.t = null
        this.setState({ showTraj: 0, bntLabel: '显示轨迹', speedChange: false })
        setTimeout(() => {
          this.setState({ expIdx: -1 })
        }, 1000)
      }
    }, this.state.speed);

  }

  loadingPath() {
    this.view.whenLayerView(this.basePeopleFeatureLayer).then(() => {
      let queryChar = this.basePeopleFeatureLayer.createQuery();
      queryChar.where = "Poet_ID=" + this.props.currentChar
      this.basePeopleFeatureLayer.queryFeatures(queryChar).then((result) => {
        let feature = result.features
        this.traj = []
        this.cnt = 0
        this.nodeIdx = [1]
        for (let i = 0; i < feature.length - 1; i++) {
          this.traj.push.apply(this.traj, this.interpolation(feature[i].geometry, feature[i + 1].geometry, i % 2 === 0 ? 1 : -1))
          this.nodeIdx.push(this.cnt)
        }
      })
    })
  }

  interpolation(pointA, pointB, inverse) {
    //calculate center
    let angle = (Math.PI / 6 + Math.round(Math.random()) / 5)
    let pointC = { x: 0, y: 0 }
    if (pointA.x === pointB.x) {
      pointC.x = pointA.x + Math.abs(pointB.y - pointA.y) / 2 * Math.tan(angle)
      pointC.y = pointA.y
    } else {
      let k = -(pointB.x - pointA.x) / (pointB.y - pointA.y)
      let x0 = (pointA.x + pointB.x) / 2
      let y0 = (pointA.y + pointB.y) / 2
      let dist = inverse * Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y)) / 2 * Math.tan(angle)
      pointC.x = x0 + dist * Math.sqrt(1 / (1 + k * k))
      pointC.y = y0 + dist * Math.sqrt(1 / (1 + k * k)) * k
    }
    let t = 0
    let incre = 0.1 / Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y))
    let pnt = { x: 0, y: 0 }, tmpPnt1 = { x: 0, y: 0 }, tmpPnt2 = { x: 0, y: 0 }
    let pntSet = []
    while (t <= 1) {
      tmpPnt1.x = (1 - t) * pointA.x + t * pointC.x
      tmpPnt1.y = (1 - t) * pointA.y + t * pointC.y
      tmpPnt2.x = (1 - t) * pointC.x + t * pointB.x
      tmpPnt2.y = (1 - t) * pointC.y + t * pointB.y
      pnt.x = (1 - t) * tmpPnt1.x + t * tmpPnt2.x
      pnt.y = (1 - t) * tmpPnt1.y + t * tmpPnt2.y
      pntSet.push([pnt.x, pnt.y])
      this.cnt++
      t += incre
    }
    pntSet.push([pointB.x, pointB.y])
    this.cnt++
    return pntSet
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
      this.Basemap = Basemap;
      this.graphicsLayer2 = new GraphicsLayer();

      this.baseBoundaryFeatureLayer = new FeatureLayer(boundaryLayerOption);
      this.baseEventFeatureLayer = new FeatureLayer(eventLayerOption);
      this.basePeopleFeatureLayer = new FeatureLayer(peopleLayerOption);

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
          this.baseBoundaryFeatureLayer,
          this.baseEventFeatureLayer,
          this.basePeopleFeatureLayer,
          this.graphicsLayer2
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
      this.sketch = createSketch(this, Sketch);
      this.graphic.symbol = {
        type: "simple-line",
        color: [226, 119, 40],
        width: 1.5
      };
      this.polyline = {
        type: 'polyline',
        paths: []
      }
      this.sketch = createSketch(this, Sketch);
      this.view.graphics.add(this.graphic)
      this.view.ui.padding = { top: 80, left: 30, right: 0, bottom: 0 };
      this.view.ui.remove('zoom')
      this.view.ui.add(zoom)
      this.view.ui.add(compass)
      this.view.ui.add(scaleBar, 'bottom-right');
      //this.view.ui.add(this.sketch, "top-left");

    })
  }

  changeBoundaryLayer(index) {
    console.log('change layer:',index,this.props.currentDynasty,this.state.currentDynasty)
    if (!this.map || !this.FeatureLayer) {
      return 0;
    }
    if (this.baseEventFeatureLayer) {
      if (this.props.trigger.eventHeatmap) {
        eventLayerOption.renderer = heatMapRenderer;
      } else {
        eventLayerOption.renderer = simpleMarkerRender;
      }
    }
    if (this.basePeopleFeatureLayer) {
      if (this.props.trigger.heatmap) {
        peopleLayerOption.renderer = heatMapRenderer;
        
        
      } else {
        peopleLayerOption.renderer = simplePeopleMarkerRender;
      }
    }
    if(!this.props.currentChar) peopleLayerOption.definitionExpression = `Sequence=0 and Dynasty='${this.props.currentDynasty}'`
    else peopleLayerOption.definitionExpression = `Poet_ID =${this.props.currentChar}`
    this.basePeopleFeatureLayer = new this.FeatureLayer(peopleLayerOption);

    boundaryLayerOption.url = boundaryLayerOption.url.split('/').slice(0, -1).join('/') + '/' + index;
    this.baseBoundaryFeatureLayer = new this.FeatureLayer(boundaryLayerOption);
    const eventLayerIndex = searchKey(index);
    console.log(eventLayerIndex)
    eventLayerOption.url = eventLayerOption.url.split('/').slice(0, -1).join('/') + '/' + eventLayerIndex;
    console.log(eventLayerOption,peopleLayerOption,boundaryLayerOption)
    this.baseEventFeatureLayer = new this.FeatureLayer(eventLayerOption);
    
    
      


    this.map.layers = [this.baseBoundaryFeatureLayer, this.baseEventFeatureLayer, this.basePeopleFeatureLayer,this.graphicsLayer2];
  }

  openYearModal() {
    this.setState({ yearModal: true });
  }

  handleLayerPlay() {
    this.stopUpdate = !this.stopUpdate
    this.setState({ isPlay: !this.state.isPlay })

    this.view.goTo({ center: [115, 32.1], zoom: 4 }, { duration: 1000, easing: 'in-out-expo' })
    let i = this.props.currentYear
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
      this.setState({ playControllerText: '播放边界变化', isPlay: false })
      return;
    }
    this.setState({ playControllerText: '\u3000暂停播放\u3000', isPlay: true })
    this.playTimer = setInterval(() => {
      if (i < BOUNDARY_LAYER_NUM) {
        if (i) {
          this.changeBoundaryLayer.call(this, i);
        }
        this.props.onCurrentYearIdxChange(i);
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

  //人物开关
  
  //trajectory
  handleShowPath() {
    if(this.props.currentChar===null || this.props.currentChar===undefined) message.error('请选择人物',2);
    this.setState({ showTraj: this.props.currentChar ? this.state.showTraj + 1 : 0, bntLabel: this.props.currentChar ? this.state.showTraj % 2 === 0 ? '暂\u3000停\u3000 ' : '继\u3000续\u3000 ' : '显示轨迹', speedChange: false })
  }
  handleSpeedChange(speed){
    this.setState({ speed: (2.1-speed)*100, speedChange: true })
  }
  //
  handleExpNav(idx) {
    //console.log(idx)

    this.view.whenLayerView(this.basePeopleFeatureLayer).then((layerView) => {
      let query = this.basePeopleFeatureLayer.createQuery()
      query.where = `Poet_ID=${this.props.currentChar} and Sequence=${idx}`
      this.basePeopleFeatureLayer.queryFeatures(query).then((result) => {
        let feature = result.features[0]
        let highlight = layerView.highlight(feature)
        setTimeout(() => {
          highlight.remove()
        }, 2000)
        this.view.goTo({ center: feature.geometry, zoom: 6 }, { duration: 1000, easing: 'in-out-expo' })
      })
    })

  }
  render() {
    //console.log(this.props.startAndEnd)
    const speedMark = {
      0:'Speed',
      1:'×1',
      2:'×2'
    }
    let timeline = (
      <Timeline >
        <div className={'charExp'}>人物经历</div>
        {this.props.currentChar !== null ? this.props.experience.map((e, idx) => {
          return (<Timeline.Item
            onClick={this.handleExpNav.bind(this, idx)}
            style={{ color: this.state.expIdx === idx ? 'deepskyblue' : '' }}
            dot={idx === this.state.expIdx ? <Icon type="loading" style={{ fontSize: '20px' }} /> : undefined} >
            {e.Year + '年，' + e.Place + '，' + e.Content}</Timeline.Item>)
        }) : <Empty description={'请选择人物'} />}
      </Timeline>
    )
    return (
      <>
        <div id='mapDiv' style={{ height: '100%', width: '100%', padding: '5px' }}></div>

        {this.props.trigger.showExp ? timeline : undefined}
        <div className={s['traj_set']}>
          <Button type={'primary'}  icon={this.state.showTraj%2===0?'caret-right':'loading'} onClick={this.handleShowPath.bind(this)}>{this.state.bntLabel}</Button>
          <Slider included={false} marks={speedMark} tooltipPlacement={'bottom'} min={0} max={2} step={0.1} defaultValue={1} onAfterChange={this.handleSpeedChange.bind(this)}></Slider>
        </div>
        <div className={s['play_button']}>
          <Button type={'primary'}  onClick={this.handleLayerPlay.bind(this)} icon={this.state.isPlay ? 'loading' : 'caret-right'}>
            {this.state.playControllerText}
          </Button>
        </div>
        <RightDrawer
          isShow={this.state.rightDrawShow}
          onClose={() => this.setState({ rightDrawShow: false })}
          onHoverResult={this.handleMouseOverSearchResult.bind(this)}
          data={{
            years: this.props.years,
            charProfiles: this.props.charProfiles,
            events: this.props.events,
            selectedBoundary: this.state.selectedBoundary,
            selectedEvents: this.state.selectedEvents
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
          onSelect={this.onSearchSelect.bind(this)}
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