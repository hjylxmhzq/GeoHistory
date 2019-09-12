import React, { Component } from 'react'
import { Button,Switch } from 'antd';
import EsriLoader from 'esri-loader'
import s from './mainBox.less';
import { createSketch, renderer, heatMapRenderer, simpleMarkerRender } from './utils';
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
      showChar:true,
      //
      showTraj:0,
      bntLabel:'显示轨迹',
      speedChange:false,
      speed:101,
      charSwitchDisable:false,
      charSwitchLoading:false
    }
    this.playTimer = null;
    this.stopUpdate = true;
    this.selectGrphics = [];
    this.changeBaseMap = () => { };
    this.charHighlight = []
  }
  componentWillMount() {
    this.initMap()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentYear !== this.props.currentYear) {
      this.changeBoundaryLayer(this.props.currentYear);
    }
    if (prevProps.currentTileMap !== this.props.currentTileMap) {
      console.log(this.props.currentTileMap)
      this.changeBaseMap(this.props.currentTileMap);
    }
    if (prevState.selectedBoundary !== this.state.selectedBoundary) {
      this.setState({ rightDrawShow: true });
    }
    //人物点显示
    this.trajCtrl(prevProps.currentChar)
  }

  trajCtrl(prevChar){
    if(!this.state.showChar){
      if(this.t) {
        clearInterval(this.t)
        this.t = null
      }
      if(this.state.showTraj>0)this.setState({showTraj:0,bntLabel:'显示轨迹',speedChange:false})
      if(this.graphic) this.graphic.geometry = undefined
      if(this.polyline) this.polyline.paths = []
      return
    }
    if(prevChar>=0&&this.props.currentChar===undefined){
      if(this.t) {
        clearInterval(this.t)
        this.t = null
      }
      if(this.state.showTraj>0)this.setState({showTraj:0,bntLabel:'显示轨迹',speedChange:false})
      if(this.graphic) this.graphic.geometry = undefined
      if(this.polyline) this.polyline.paths = []
      if(this.basePeopleFeatureLayer) this.basePeopleFeatureLayer.definitionExpression = `Sequence=0 and Dynasty='${this.props.currentDynasty}'`
      if(this.t) {
        clearInterval(this.t)
        this.t = null
      }
      if(this.state.showTraj>0)this.setState({showTraj:0,bntLabel:'显示轨迹',speedChange:false})
      if(this.graphic) this.graphic.geometry = undefined
      if(this.polyline) this.polyline.paths = []
      if(this.view) this.loadingPath()
      if(this.basePeopleFeatureLayer) this.basePeopleFeatureLayer.definitionExpression = 'Sequence=0 and Poet_ID='+this.props.currentChar
    }else if(prevChar || this.props.currentChar){
      if(this.basePeopleFeatureLayer && prevChar!==this.props.currentChar) this.basePeopleFeatureLayer.definitionExpression = 'Sequence=0 and Poet_ID='+this.props.currentChar
      if(this.state.showTraj===0){
        //console.log('loading...')
        if(this.t) {
          clearInterval(this.t)
          this.t = null
        }
        
        if(this.polyline) this.polyline.paths = []
        if(this.view) this.loadingPath()
      }else if(this.state.showTraj%2!==0){
        //console.log('showing trajectory...')
        if(this.state.speedChange){
          if(this.t) {
            clearInterval(this.t)
            this.t = null
          }
        }
        if(this.traj && this.traj.length>0) {
          if(!this.t)this.play()
        }
      }else{
        //console.log('pausing...')
        if(this.t) {
          clearInterval(this.t)
          this.t = null
        }
      }
    }else{
      if(this.basePeopleFeatureLayer) this.basePeopleFeatureLayer.definitionExpression = `Sequence=0 and Dynasty='${this.props.currentDynasty}'`
    }
  }

  play(){
    if(this.state.showTraj===1)this.view.goTo({center:this.traj[0],zoom:6},{duration:500,easing:'in-out-expo'})
    this.t = setInterval(() => {
        if(this.traj.length>0) {
          let tmp =  this.traj.shift()
          //console.log(tmp)
          //this.view.goTo({center:tmp,zoom:6},{duration:1000,easing:'in-out-expo'})
          this.polyline.paths.push(tmp)
          this.graphic.geometry = this.polyline
          let highlightIdx = this.nodeIdx.shift()
          if(this.polyline.paths.length===highlightIdx){
            
            if(this.charHighlight.length)this.charHighlight.shift().remove()
            this.view.whenLayerView(this.basePeopleFeatureLayer).then((layerView)=>{
            let query = this.basePeopleFeatureLayer.createQuery();
            query.where = 'Poet_ID='+this.props.currentChar
            this.basePeopleFeatureLayer.queryFeatures(query).then((result)=>{
            this.charHighlight.push(layerView.highlight(result.features.length-this.nodeIdx.length-1));
            this.basePeopleFeatureLayer.definitionExpression = 'Poet_ID='+this.props.currentChar+' and Sequence<='+(result.features.length-this.nodeIdx.length-1)
            if(!this.traj.length){
              setTimeout(()=>{
                while(this.charHighlight.length) this.charHighlight.shift().remove()
              },800)
            }
            //
            })
          });
        }else{
          this.nodeIdx.unshift(highlightIdx)
        } 
        }else{
          clearInterval(this.t)
          this.t=null
          this.setState({showTraj:0,bntLabel:'显示轨迹',speedChange:false,isOver:true})
        }
    }, this.state.speed);
  }

  loadingPath(){
    this.view.whenLayerView(this.basePeopleFeatureLayer).then(()=>{
      let queryChar = this.basePeopleFeatureLayer.createQuery();
      queryChar.where = "Poet_ID="+this.props.currentChar
      this.basePeopleFeatureLayer.queryFeatures(queryChar).then((result)=>{
        let feature = result.features
        this.traj = []
        this.cnt = 0
        this.nodeIdx = [1]
        for(let i=0;i<feature.length-1;i++){
          this.traj.push.apply(this.traj,this.interpolation(feature[i].geometry,feature[i+1].geometry,i%2===0?1:-1))
          this.nodeIdx.push(this.cnt)
        }
      })
    })
  }

  interpolation(pointA, pointB,inverse){
    //calculate center
    let angle =(Math.PI/6 + Math.round(Math.random())/5)
    let pointC  = {x:0,y:0}
    if(pointA.x===pointB.x){
      pointC.x = pointA.x+Math.abs(pointB.y-pointA.y)/2*Math.tan(angle)
      pointC.y = pointA.y
    }else{
      let k = -(pointB.x-pointA.x)/(pointB.y-pointA.y)
      let x0 = (pointA.x+pointB.x)/2
      let y0 = (pointA.y+pointB.y)/2
      let dist = inverse*Math.sqrt((pointA.x-pointB.x)*(pointA.x-pointB.x)+(pointA.y-pointB.y)*(pointA.y-pointB.y))/2*Math.tan(angle)
      pointC.x = x0+dist*Math.sqrt(1/(1+k*k))
      pointC.y = y0+dist*Math.sqrt(1/(1+k*k))*k
    }
    let t = 0
    let incre = 0.1/Math.sqrt((pointA.x-pointB.x)*(pointA.x-pointB.x)+(pointA.y-pointB.y)*(pointA.y-pointB.y))
    let pnt ={x:0,y:0}, tmpPnt1 = {x:0,y:0} , tmpPnt2 = {x:0,y:0}
    let pntSet = []
    while(t<=1){
      tmpPnt1.x = (1-t)*pointA.x+t*pointC.x
      tmpPnt1.y = (1-t)*pointA.y+t*pointC.y
      tmpPnt2.x = (1-t)*pointC.x+t*pointB.x
      tmpPnt2.y = (1-t)*pointC.y+t*pointB.y
      pnt.x = (1-t)*tmpPnt1.x+t*tmpPnt2.x
      pnt.y = (1-t)*tmpPnt1.y+t*tmpPnt2.y
      pntSet.push([pnt.x,pnt.y])
      this.cnt++
      t+=incre
    }
    pntSet.push([pointB.x,pointB.y])
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
      this.bLyOpt = {
        url: this.baseBoundaryFeatureUrl,
        id: '0',
        visible: true,
        renderer
      };
      this.evtOpt = {
        url: this.baseEventFeatureUrl,
        id: '4',
        visible: true,
        popupTemplate: eventPopUpTemplate,
        renderer: this.props.trigger.heatmap ? heatMapRenderer : simpleMarkerRender
      };
      this.baseBoundaryFeatureLayer = new FeatureLayer(this.bLyOpt);
      this.baseEventFeatureLayer = new FeatureLayer(this.evtOpt);
      console.log(this.evtOpt);
      this.basePeopleFeatureLayer = new FeatureLayer({
        url: this.basePeopleFeatureUrl,
        id: '0',
        visible: true,
        //renderer: this.props.trigger.heatmap ? heatMapRenderer : simpleMarkerRender,
        definitionExpression : `Sequence=0 and Dynasty='${this.props.currentDynasty}'`,
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
      this.graphic.symbol = {
        type: "simple-line",
        color: [226, 119, 40],
        width: 1.5
      };
      this.polyline = {
        type:'polyline',
        paths:[]
      }
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
    console.log(this.baseBoundaryFeatureLayer)
    const boundaryLayer = new this.FeatureLayer({
      url: this.baseBoundaryFeatureUrl + index,
      visible: true,
      renderer
    });
    const evnetLayerIndex = searchKey(index);
    const eventLayer = new this.FeatureLayer({
      url: this.baseEventFeatureUrl + '/' + evnetLayerIndex,
      visible: true,
      popupTemplate: eventPopUpTemplate,
      renderer: this.props.trigger.heatmap ? heatMapRenderer : simpleMarkerRender
    })
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

  handleCharSwitch(){
    this.setState({showChar:!this.state.showChar})
    this.basePeopleFeatureLayer.visible = !this.state.showChar
  }
  //trajectory
  handleShowPath(){
    this.setState({showTraj:this.props.currentChar?this.state.showTraj+1:0,bntLabel:this.props.currentChar?this.state.showTraj%2===0?'暂停':'继续':'显示轨迹',speedChange:false})
  }
  handleSpeedDown(){
    if(this.state.speed < 191) this.setState({speed:this.state.speed+10,speedChange:true})
  }
  handleSpeedUp(){
    if(this.state.speed > 1) this.setState({speed:this.state.speed-10,speedChange:true})
  }
  //
  render() {
    return (
      <>
        <div id='mapDiv' style={{ height: '100%', width: '100%', padding: '5px' }}></div>
        <div className={s['switches']}>
          <Switch defaultChecked loading={this.state.charSwitchLoading} disabled={this.state.charSwitchDisable} checkedChildren="o(￣▽￣)ｄ" unCheckedChildren="（○｀ 3′○）" onChange={this.handleCharSwitch.bind(this)}>人物</Switch>
        </div>
        <div className={s['traj_set']}>
          <Button ghost icon={'caret-right'} onClick={this.handleShowPath.bind(this)}>{this.state.bntLabel}</Button>
          <ButtonGroup>
            <Button ghost icon={'step-backward'} onClick={this.handleSpeedDown.bind(this)}></Button>
            <Button ghost>{'×'+((101-this.state.speed)/100+1).toFixed(1)}</Button>
            <Button ghost icon={'step-forward'} onClick={this.handleSpeedUp.bind(this)}></Button>
          </ButtonGroup>
        </div>
        <div className={s['play_button']}>
          <Button onClick={this.handleLayerPlay.bind(this)} ghost icon={this.state.isPlay ? 'pause' : 'caret-right'}>
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