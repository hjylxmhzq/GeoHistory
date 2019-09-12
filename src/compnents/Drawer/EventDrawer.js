import React,{Component} from 'react'
import {Drawer, Button,Empty} from 'antd'

class EventDrawer extends Component{
  constructor(){
    super();
    this.state = {
      visible:false
    }
  }

  render(){
    let content = (<div/>)
    if(this.props.eventProfile){
      let eventProfile = this.props.eventProfile
      content = (
        <div>
          <p>{`事件名称：${eventProfile.HName}`}</p>
          <p>{`发生地点：${eventProfile.HCityName}`}</p>
          <p>{`起始时间：${eventProfile.STime}`}</p>
          <p>{`结束时间：${eventProfile.ETime}`}</p>
          <p>{`简介：`}</p>
          <p style={{textIndent:'2em'}}>{eventProfile.Intro}</p>
        </div>
      )
    }else{
      content=(
        <Empty description={'请选择事件'}/>
      )
    }
    return(
      <div>
        <Button style={{position:'absolute',right:300,bottom:200}} type="primary" onClick={()=>{this.setState({visible:!this.state.visible})}}>
          事件简介
        </Button>
        <Drawer
        title={"事件简介"}
        placement="right"
        closable={false}
        visible={this.state.visible}
        mask={false}
        style={{marginTop:'60px'}}
        >
          {content}
        </Drawer>
      </div>
  )}
}

export default EventDrawer