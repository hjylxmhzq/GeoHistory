(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,a){e.exports=a(169)},109:function(e,t,a){},110:function(e,t,a){},168:function(e,t,a){},169:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),i=a(5),r=a.n(i),l=(a(109),a(14)),h=a(15),o=a(17),c=a(16),p=a(18),d=a(172),u=(a(110),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).state={visible:!1},e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleClickbout",value:function(){this.setState({visible:!0})}},{key:"handleCancel",value:function(){this.setState({visible:!1})}},{key:"render",value:function(){return n.a.createElement("div",{className:"header"},n.a.createElement("span",{className:"title"},this.props.title),n.a.createElement("button",{className:"about",onClick:this.handleClickbout.bind(this)},this.props.about),n.a.createElement(d.a,{title:this.props.aboutTitle,visible:this.state.visible,okText:"\u786e\u8ba4",footer:null,onCancel:this.handleCancel.bind(this)},n.a.createElement("p",null,"\u7b80\u4ecb\uff1a\u8be5\u5e73\u53f0\u5c55\u793a\u4e86\u5510\u671d\u4e0d\u540c\u5e74\u4ee3\u7684\u7586\u754c\u8303\u56f4\u3001\u4eba\u7269\u8f68\u8ff9\u53ca\u5386\u53f2\u4e8b\u4ef6\uff0c\u5e76\u652f\u6301\u67e5\u8be2\u641c\u7d22\u7b49\u529f\u80fd\u3002"),n.a.createElement("p",null,"\u5236\u4f5c\u6210\u5458\uff1a\u4faf\u9a81\u8c0b \u52b3\u5927\u948a \u5434\u5b87\u4e1c \u8a79\u6587")))}}]),t}(s.Component));u.defaultProps={title:"\u5510\u4ee3\u5386\u53f2\u5730\u7406\u6570\u636e\u5c55\u793a\u5e73\u53f0",about:"\u5173\u4e8e\u6211\u4eec",aboutTitle:"ESRI DEMO-\u5510\u671d\u5386\u53f2\u5730\u7406\u4fe1\u606f\u5c55\u793a\u5e73\u53f0"};var m=u,y=a(170),v=a(171),S=a(9),g=y.a.Sider,f=v.b.SubMenu,b=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).onCollapse=function(t){console.log(t),e.setState({collapsed:t})},e.state={collapsed:!1,yearSelectedKeys:[],eventSelectedKeys:[],charSelectedKeys:[]},e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleSelectChange",value:function(e){"years"===e.keyPath[1]&&(this.state.yearSelectedKeys&&this.state.yearSelectedKeys[0]===e.key?this.setState({yearSelectedKeys:[]}):this.setState({yearSelectedKeys:[e.key]})),"characters"===e.keyPath[1]&&(this.state.charSelectedKeys&&this.state.charSelectedKeys[0]===e.key?this.setState({charSelectedKeys:[]}):this.setState({charSelectedKeys:[e.key]})),"events"===e.keyPath[1]&&(this.state.eventSelectedKeys&&this.state.eventSelectedKeys[0]===e.key?this.setState({eventSelectedKeys:[]}):this.setState({eventSelectedKeys:[e.key]})),this.props.onSelect&&this.props.onSelect(e)}},{key:"handleEventOpen",value:function(e){this.setState({eventSelectedKeys:[]}),this.props.onEventOpen&&this.props.onEventOpen(e)}},{key:"handleCharOpen",value:function(e){this.setState({charSelectedKeys:[]}),this.props.onCharOpen&&this.props.onCharOpen(e)}},{key:"handleYearOpen",value:function(e){this.setState({yearSelectedKeys:[]}),this.props.onYearOpen&&this.props.onYearOpen(e)}},{key:"render",value:function(){return n.a.createElement(g,{width:"20vh",style:{padding:"0"},collapsible:!0,collapsed:this.state.collapsed,onCollapse:this.onCollapse},n.a.createElement(v.b,{mode:"inline",defaultOpenKeys:["years"],selectedKeys:this.state.yearSelectedKeys,onOpenChange:this.handleYearOpen.bind(this)},n.a.createElement(f,{onClick:this.handleSelectChange.bind(this),key:"years",title:n.a.createElement("span",null,n.a.createElement(S.a,{type:"clock-circle"}),n.a.createElement("span",null,"\u5e74\u4ee3\u56fe\u5c42"))},this.props.years?this.props.years.map(function(e,t){return n.a.createElement(v.b.Item,{key:t},e.Year)}):console.log("year failed"))),n.a.createElement(v.b,{mode:"inline",multiple:!1,selectedKeys:this.state.charSelectedKeys,onOpenChange:this.handleCharOpen.bind(this)},n.a.createElement(f,{key:"characters",onClick:this.handleSelectChange.bind(this),title:n.a.createElement("span",null,n.a.createElement(S.a,{type:"user"}),n.a.createElement("span",null,"\u4eba\u7269\u8f68\u8ff9"))},this.props.charProfiles?this.props.charProfiles.map(function(e,t){return n.a.createElement(v.b.Item,{key:t},e.Name)}):console.log("profile failed"))),n.a.createElement(v.b,{mode:"inline",multiple:!1,selectedKeys:this.state.eventSelectedKeys,onOpenChange:this.handleEventOpen.bind(this)},n.a.createElement(f,{key:"events",onClick:this.handleSelectChange.bind(this),title:n.a.createElement("span",null,n.a.createElement(S.a,{type:"read"}),n.a.createElement("span",null,"\u5386\u53f2\u4e8b\u4ef6"))},this.props.events?this.props.events.map(function(e,t){return n.a.createElement(v.b.Item,{key:t},e.HName)}):console.log("events failed"))))}}]),t}(s.Component),C=a(102),E=a(52),w=a(101),O=a.n(w),k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).tangFeatureLayers=[],e.dojoUrl="http://tony-space.top:8007/arcgis_js_api/library/4.11/dojo/dojo.js",e.tileMapUrl="http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer",e.baseFeatureUrl="http://172.20.32.70:6080/arcgis/rest/services/TD/MapServer/",e.highlightSelectChar=[],e.state={isPlay:!1},e.stopUpdate=!0,e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentWillMount",value:function(){this.initMap()}},{key:"componentDidUpdate",value:function(){this.map&&this.stopUpdate&&this.map.layers.length&&(this.map.layers.items.map(function(e){e.visible=!1}),this.search.sources=[],this.props.isShowYear&&this.props.yearSelected&&(this.map.layers.items[15].visible=!0,this.map.layers.items[this.props.yearSelected].visible=!0,this.search.sources.push(this.searchSource[this.props.yearSelected]),this.search.sources.push(this.searchSource[15])),this.props.isShowEvent&&(this.map.layers.items[13].visible=!0,this.search.sources.push(this.searchSource[13])),this.props.isShowChar?(this.map.layers.items[14].visible=!0,this.search.sources.push(this.searchSource[14])):(this.t&&clearTimeout(this.t),this.graphic.geometry=void 0),!this.props.isCharSelectChangeToAnother||this.props.isEventSelectChangeToAnother||this.props.isYearSelectChangeToAnother||(this.props.charSelected?(this.tangFeatureLayers[14].definitionExpression="ID="+this.props.charSelected,this.tangFeatureLayers[14].labelsVisible=!0,this.t&&clearTimeout(this.t),this.queryForChar()):(this.tangFeatureLayers[14].definitionExpression=void 0,this.tangFeatureLayers[14].labelsVisible=!1,this.highlightSelectChar.length&&this.highlightSelectChar.map(function(e){e.remove()}),this.t&&clearTimeout(this.t),this.graphic.geometry=void 0)),!this.props.isEventSelectChangeToAnother||this.props.isCharSelectChangeToAnother||this.props.isYearSelectChangeToAnother||(this.props.eventSelected?this.queryForEvent():this.highlightSelectEvent&&this.highlightSelectEvent.remove()))}},{key:"interpolation",value:function(e,t,a){var s=[];void 0===a&&(a=1);for(var n=25*Math.abs(a),i=(t.x-e.x)/n,r=(t.y-e.y)/n,l=0;l<=n;){var h=e.clone();h.x=e.x+l*i,h.y=e.y+l*r,s.push(h),l++}return s.push(t),s}},{key:"drawLine",value:function(e,t){var a=this;this.traj=[];for(var s=0;s<e.length-1;s++)this.traj.push(this.interpolation(e[s].geometry,e[s+1].geometry));var n={type:"polyline",paths:[]};this.graphic.symbol={type:"simple-line",color:[226,119,40],width:1.5};for(var i=0;i<this.traj.length;i++)for(var r=0;r<this.traj[i].length-1;r++)n.paths.push([this.traj[i][r].x,this.traj[i][r].y]);var l={type:"polyline",paths:[]},h=0;!function s(){a.props.isShowChar&&a.props.charSelected?n.paths.length>0?a.t=setTimeout(function(){var i=n.paths.shift();l.paths.push(i),i[0]===e[h].geometry.x&&i[1]===e[h].geometry.y&&(a.props.curDrawingPoint&&a.props.curDrawingPoint(h),a.highlightSelectChar.push(t.highlight(e[h++].attributes.FID))),a.graphic.geometry=l,a.view.goTo({center:[i[0]+3,i[1]],zoom:6},{duration:500,easing:"in-out-expo"}),s()},100):clearTimeout(a.t):(clearTimeout(a.t),a.graphic.geometry=void 0)}()}},{key:"queryForChar",value:function(){var e=this,t=this.map.layers.items[14];this.view.whenLayerView(t).then(function(a){var s=t.createQuery();s.where="ID="+e.props.charSelected,t.queryFeatures(s).then(function(t){e.highlightSelectChar.length&&e.highlightSelectChar.map(function(e){e.remove()});var s=t.features;e.view.goTo({center:[s[0].geometry.x+3,s[0].geometry.y],zoom:6},{duration:1e3,easing:"in-out-expo"}),setTimeout(function(){e.drawLine(s,a)},1e3)})})}},{key:"queryForEvent",value:function(){var e=this,t=this.map.layers.items[13];this.view.whenLayerView(t).then(function(a){var s=t.createQuery();s.where="FID="+e.props.eventSelected,t.queryFeatures(s).then(function(t){e.highlightSelectEvent&&e.highlightSelectEvent.remove();var s=t.features[0];e.highlightSelectEvent=a.highlight(s.attributes.FID),e.view.goTo({center:[s.geometry.x+3,s.geometry.y],zoom:6},{duration:1500,easing:"in-out-expo"})})})}},{key:"initMap",value:function(){var e=this;O.a.loadModules(["esri/Map","esri/Basemap","esri/layers/TileLayer","esri/views/MapView","esri/layers/FeatureLayer","esri/Graphic","esri/widgets/Zoom","esri/widgets/Compass","esri/widgets/ScaleBar","esri/widgets/Search","dojo/domReady!"],this.dojoUrl).then(function(t){for(var a=Object(C.a)(t,10),s=a[0],n=a[1],i=a[2],r=a[3],l=a[4],h=a[5],o=a[6],c=a[7],p=a[8],d=a[9],u={title:"\u56fd\u5bb6\u4fe1\u606f",content:[{type:"fields",fieldInfos:[{fieldName:"Name",label:"\u56fd\u5bb6\u540d\u79f0",format:{places:0,digitSeparator:!0}},{fieldName:"Area",label:"\u9762\u79ef  (Km^2)",format:{places:0,digitSeparator:!0}},{fieldName:"isChina",label:"\u662f\u5426\u5c5e\u4e8e\u4e2d\u56fd",format:{places:0,digitSeparator:!0}}]}]},m={title:"\u4e8b\u4ef6\u4fe1\u606f",content:[{type:"fields",fieldInfos:[{fieldName:"HName",label:"\u540d\u79f0",format:{places:0,digitSeparator:!0}},{fieldName:"HCityName",label:"\u53d1\u751f\u5730",format:{places:0,digitSeparator:!0}},{fieldName:"Intro",label:"\u7b80\u4ecb",format:{places:0,digitSeparator:!0}},{fieldName:"STime",label:"\u5f00\u59cb\u65f6\u95f4",format:{places:0,digitSeparator:!0}},{fieldName:"ETime",label:"\u7ed3\u675f\u65f6\u95f4",format:{places:0,digitSeparator:!0}}]}]},y={title:"\u4eba\u7269\u7ecf\u5386",content:[{type:"fields",fieldInfos:[{fieldName:"name",label:"\u59d3\u540d",format:{places:0,digitSeparator:!0}},{fieldName:"year",label:"\u5e74\u4efd",format:{places:0,digitSeparator:!0}},{fieldName:"place",label:"\u5730\u70b9",format:{places:0,digitSeparator:!0}},{fieldName:"content",label:"\u7ecf\u5386",format:{places:0,digitSeparator:!0}}]}]},v={title:"\u57ce\u5e02\u4fe1\u606f",content:[{type:"fields",fieldInfos:[{fieldName:"CityName",label:"\u540d\u79f0",format:{places:0,digitSeparator:!0}},{fieldName:"lat",label:"\u7eac\u5ea6",format:{places:0,digitSeparator:!0}},{fieldName:"lng",label:"\u7ecf\u5ea6",format:{places:0,digitSeparator:!0}}]}]},S=0;S<=15;S++)if(S<=15){var g=e.baseFeatureUrl+S;e.tangFeatureLayers.push(new l({url:g,id:"tangLayer"+S,visible:!1,popupTemplate:S<=12?u:13===S?m:14===S?y:v}))}var f=new n({baseLayers:[new i({url:e.tileMapUrl})],id:"myBaseMap"});e.map=new s({basemap:f,layers:e.tangFeatureLayers}),e.view=new r({center:[115,32.1],map:e.map,container:"mapDiv",zoom:5}),e.graphic=new h;var b=new o({view:e.view,layout:"horizontal"}),E=new c({view:e.view}),w=new p({view:e.view,unit:"metric"});e.search=new d({view:e.view,allPlaceholder:"\u627e\u70b9\u4ec0\u4e48",includeDefaultSources:!1}),e.searchSource=e.tangFeatureLayers.map(function(e,t){return{layer:e,searchFields:t<=12?["Name"]:13===t?["HName"]:14===t?["name"]:["CityName"],suggestionTemplate:t<=12?"{Name}":13===t?"{HName}, \u57ce\u5e02:{HCityName}, \u8d77\u59cb\u65f6\u95f4:{STime}, \u7ed3\u675f\u65f6\u95f4:{ETime}":14===t?"{name}, \u5e74\u4efd:{year}, \u5730\u70b9:{place}, \u7ecf\u5386:{content}":"{CityName}, \u7ecf\u5ea6:{lng}, \u7eac\u5ea6:{lat}",displayField:t<=12?"Name":13===t?"HName":14===t?"name":"CityName",exactMatch:!1,name:t<=12?"\u56fd\u5bb6":13===t?"\u4e8b\u4ef6":14===t?"\u4eba\u7269":"\u57ce\u5e02",placeholder:t<=12?"\u67e5\u627e\u56fd\u5bb6-\u4f8b\uff1a\u5510":13===t?"\u67e5\u627e\u4e8b\u4ef6-\u4f8b\uff1a\u8d1e\u89c2\u4e4b\u6cbb":14===t?"\u67e5\u627e\u4eba\u7269-\u4f8b\uff1a\u674e\u767d":"\u67e5\u627e\u57ce\u5e02-\u4f8b\uff1a\u957f\u5b89"}}),e.view.graphics.add(e.graphic),e.view.ui.remove("zoom"),e.view.ui.add(b),e.view.ui.add(E),e.view.ui.add(w,"bottom-right"),e.view.ui.add(e.search);var O=e.map.layers.items.length,k=e.map.layers.items[O-1];e.view.when(function(){return k.when(function(){var e=k.createQuery();return k.queryFeatures(e)})})})}},{key:"handleLayerPlay",value:function(e){var t=this;this.stopUpdate=!this.stopUpdate,this.setState({isPlay:!this.state.isPlay}),console.log(this.state.isPlay),this.view.goTo({center:[115,32.1],zoom:4},{duration:1e3,easing:"in-out-expo"});for(var a=0;a<13;a++)this.map.layers.items[a].visible=!1,this.map.layers.items[a].definitionExpression="Name='\u5510'";!function(){var e=0,a=setInterval(function(){e<=12&&(e&&(t.map.layers.items[e-1].visible=!1),t.map.layers.items[e].visible=!0,t.map.layers.items[15].visible=!0,console.log(e)),13===e&&(t.stopUpdate=!t.stopUpdate,console.log(t.state),t.setState({isPlay:!t.state.isPlay}),t.map.layers.items.map(function(e,t){e.definitionExpression=void 0}),clearInterval(a)),e++},2e3)}()}},{key:"render",value:function(){return n.a.createElement("div",{id:"mapDiv",style:{height:"100%",width:"100%",padding:"5px"}},n.a.createElement(E.a,{loading:this.state.isPlay,onClick:this.handleLayerPlay.bind(this),ghost:!0,icon:"caret-right",style:{position:"absolute",left:"20px",bottom:"50px"}},"\u64ad\u653e\u8fb9\u754c\u53d8\u5316"))}}]),t}(s.Component),T=a(173),j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).state={isOpen:!1},e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement(T.a,{title:"\u4e8b\u4ef6\u7b80\u4ecb",placement:"right",closable:!1,visible:this.props.isShow,mask:!1,style:{marginTop:"60px"}},n.a.createElement("p",null,"\u4e8b\u4ef6\u540d\u79f0\uff1a"+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].HName:"")),n.a.createElement("p",null,"\u53d1\u751f\u5730\u70b9\uff1a"+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].HCityName:"")),n.a.createElement("p",null,"\u8d77\u59cb\u65f6\u95f4\uff1a"+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].STime+" \u5e74":"")),n.a.createElement("p",null,"\u7ed3\u675f\u65f6\u95f4\uff1a"+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].ETime+" \u5e74":"")),n.a.createElement("p",null,"\u4e8b\u4ef6\u7b80\u4ecb\uff1a"),n.a.createElement("p",{style:{textIndent:"2em"}},this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].Intro:""))}}]),t}(s.Component),K=a(174),A=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(K.a,null,n.a.createElement("div",{className:"charExp"},"\u4eba\u7269\u7ecf\u5386"),this.props.exp.map(function(e,t){return n.a.createElement(K.a.Item,{key:t,color:"#dc9123"},e.year+"\u5e74\uff0c"+e.place+"\uff0c"+e.intro)})))}}]),t}(s.Component),N=(a(168),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).state={isOpen:!1},e.iconURL="../../icon/",e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement(T.a,{title:"\u4eba\u7269\u7b80\u4ecb",placement:"right",closable:!1,visible:this.props.isShow,mask:!1,style:{marginTop:"60px"}},n.a.createElement("div",{style:{align:"center",textAlign:"center"}},n.a.createElement("img",{alt:"icon",src:this.iconURL+(this.props.charSelected?this.props.charSelected:"-1")+".jpg"})),n.a.createElement("hr",null),n.a.createElement("p",null,"\u59d3\u540d\uff1a"+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].Name:"")),n.a.createElement("p",null,"\u5b57\uff1a"+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].zi:"")),n.a.createElement("p",null,"\u53f7\uff1a"+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].hao:"")),n.a.createElement("p",null,"\u751f\u5e74\uff1a"+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].STime+" \u5e74":"")),n.a.createElement("p",null,"\u5352\u5e74\uff1a"+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].ETime+" \u5e74":"")),n.a.createElement("p",null,"\u51fa\u751f\u5730\uff1a"+(this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].Home:"")),n.a.createElement("p",null,"\u7b80\u4ecb\uff1a"),n.a.createElement("p",{style:{textIndent:"2em"}},this.props.chars.length&&this.props.charSelected?this.props.chars[this.props.charSelected].Intro:""))}}]),t}(s.Component)),x=y.a.Content,D=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).call(this))).state={yearSelectedKeys:[],charSelectedKeys:[],eventSelectedKeys:[],isYearOpen:!0,isEventOpen:!1,isCharOpen:!1,charProfiles:[],years:[],events:[],experience:[],curDrawing:0,isCharDrawerOpen:!1,isEventDrawerOpen:!1,isCharSelectChangeToAnother:!1,isEventSelectChangeToAnother:!1,isYearSelectChangeToAnother:!1},e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("./json/year.json").then(function(e){return e.json()}).then(function(t){e.setState({years:t.Tang})}),fetch("./json/profile.json").then(function(e){return e.json()}).then(function(t){e.setState({charProfiles:t.Tang}),console.log(t)}),fetch("./json/event.json").then(function(e){return e.json()}).then(function(t){e.setState({events:t.Tang})}),fetch("./json/experience.json").then(function(e){return e.json()}).then(function(t){e.setState({experience:t.Tang}),console.log(t)})}},{key:"componentWillUpdate",value:function(){}},{key:"handleSelectChange",value:function(e){"years"===e.keyPath[1]&&(this.setState({isYearSelectChangeToAnother:!0,isCharSelectChangeToAnother:!1,isEventSelectChangeToAnother:!1}),this.state.yearSelectedKeys.length&&this.state.yearSelectedKeys[0]===e.key?this.setState({yearSelectedKeys:[]}):this.setState({yearSelectedKeys:[e.key]})),"events"===e.keyPath[1]&&(this.setState({isYearSelectChangeToAnother:!1,isCharSelectChangeToAnother:!1,isEventSelectChangeToAnother:!0}),this.state.eventSelectedKeys.length&&this.state.eventSelectedKeys[0]===e.key?this.setState({eventSelectedKeys:[],isEventDrawerOpen:!1,isCharDrawerOpen:!!this.state.charSelectedKeys.length}):this.setState({eventSelectedKeys:[e.key],isEventDrawerOpen:!0,isCharDrawerOpen:!1})),"characters"===e.keyPath[1]&&(this.setState({isYearSelectChangeToAnother:!1,isEventSelectChangeToAnother:!1,isCharSelectChangeToAnother:!0}),this.state.charSelectedKeys.length&&this.state.charSelectedKeys[0]===e.key?this.setState({charSelectedKeys:[],isCharDrawerOpen:!1,isEventDrawerOpen:!!this.state.eventSelectedKeys.length}):this.setState({charSelectedKeys:[e.key],isEventDrawerOpen:!1,isCharDrawerOpen:!0}))}},{key:"handleEventOpen",value:function(e){console.log(e),e.length||this.setState({isEventDrawerOpen:!1,isCharDrawerOpen:!!this.state.charSelectedKeys.length}),this.setState({isEventOpen:!this.state.isEventOpen,eventSelectedKeys:[],isEventSelectChangeToAnother:!this.state.isEventSelectChangeToAnother,isCharSelectChangeToAnother:!1,isYearSelectChangeToAnother:!1})}},{key:"handleCharOpen",value:function(e){e.length||this.setState({isCharDrawerOpen:!1,isEventDrawerOpen:!!this.state.eventSelectedKeys.length}),this.setState({isCharOpen:!this.state.isCharOpen,charSelectedKeys:[],isCharSelectChangeToAnother:!this.state.isCharSelectChangeToAnother,isEventSelectChangeToAnother:!1,isYearSelectChangeToAnother:!1})}},{key:"handleYearOpen",value:function(e){e.length||this.setState({isYearOpen:!this.state.isYearOpen,yearSelectedKeys:[]}),this.setState({isYearOpen:!this.state.isYearOpen,isCharSelectChangeToAnother:!1,isEventSelectChangeToAnother:!1,isYearSelectChangeToAnother:!this.state.isYearSelectChangeToAnother})}},{key:"render",value:function(){var e=this,t=[];return this.state.experience.map(function(a){a.ID===e.state.charSelectedKeys[0]&&t.push(a)}),n.a.createElement("div",{className:"App"},n.a.createElement(m,null),n.a.createElement(y.a,{style:{position:"relative",height:"calc(100% - 60px)"}},n.a.createElement(b,{years:this.state.years,charProfiles:this.state.charProfiles,events:this.state.events,onSelect:this.handleSelectChange.bind(this),onYearOpen:this.handleYearOpen.bind(this),onEventOpen:this.handleEventOpen.bind(this),onCharOpen:this.handleCharOpen.bind(this)}),n.a.createElement(x,{style:{position:"relative"}},n.a.createElement(k,{yearSelected:this.state.yearSelectedKeys[0],charSelected:this.state.charSelectedKeys[0],eventSelected:this.state.eventSelectedKeys[0],isShowYear:this.state.isYearOpen,isShowEvent:this.state.isEventOpen,isShowChar:this.state.isCharOpen,isYearSelectChangeToAnother:this.state.isYearSelectChangeToAnother,isCharSelectChangeToAnother:this.state.isCharSelectChangeToAnother,isEventSelectChangeToAnother:this.state.isEventSelectChangeToAnother,curDrawingPoint:this.handleCurDrawing}),t.length?n.a.createElement(A,{exp:t}):null),n.a.createElement(j,{events:this.state.events,isShow:this.state.isEventDrawerOpen,eventSelected:this.state.eventSelectedKeys[0]}),n.a.createElement(N,{chars:this.state.charProfiles,isShow:this.state.isCharDrawerOpen,charSelected:this.state.charSelectedKeys[0]})))}}]),t}(s.Component),P=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Y(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(n.a.createElement(D,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat(".","/service-worker.js");P?(function(e,t){fetch(e).then(function(a){var s=a.headers.get("content-type");404===a.status||null!=s&&-1===s.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Y(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):Y(t,e)})}}()}},[[104,1,2]]]);
//# sourceMappingURL=main.5d5c23a7.chunk.js.map