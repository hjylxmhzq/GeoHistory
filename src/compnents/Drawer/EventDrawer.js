import React,{Component} from 'react'
import {Drawer} from 'antd'

class EventDrawer extends Component{
  constructor(){
    super();
    this.state = {
      isOpen:false
    }
  }

  render(){
    return(
      <Drawer
      title={"事件简介"}
      placement="right"
      closable={false}
      visible={this.props.isShow}
      mask={false}
      style={{marginTop:'60px'}}
      >
        <p>{'事件名称：'+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].HName:'')}</p>
        <p>{'发生地点：'+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].HCityName:'')}</p>
        <p>{'起始时间：'+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].STime+' 年':'')}</p>
        <p>{'结束时间：'+(this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].ETime+' 年':'')}</p>
        <p>{'事件简介：'}</p>
        <p style={{textIndent:'2em'}}>{this.props.events.length&&this.props.eventSelected?this.props.events[this.props.eventSelected].Intro:''}</p>
      </Drawer>
  )}
}

export default EventDrawer